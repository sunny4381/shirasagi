require 'spec_helper'

describe "Local LLM Study" do
  let(:ollama_url) { ENV.fetch("OLLAMA_URL", "http://localhost:11434") }
  let(:ollama_model) { ENV.fetch("OLLAMA_MODEL", "gemma3:4b") }
  let(:ollama_llm) { Langchain::LLM::Ollama.new(url: ollama_url, default_options: { chat_model: ollama_model }) }

  before do
    Langchain.logger = Rails.logger
  end

  context "hello ai" do
    it do
      result = nil
      time = Benchmark.realtime do
        result = ollama_llm.complete(prompt: "日本語で自己紹介してください", model: ollama_model)
      end
      puts result.completion

      time = ActiveSupport::Duration.build(time)
      time = SS::Duration.format(time)
      puts "got answer from '#{ollama_url}' in #{time}"
    end
  end

  context "refine法による要約" do
    let(:all_text) { File.read("#{Rails.root}/spec/fixtures/dragonball.txt") }

    it do
      refine_first_template = <<~TEXT
        次の文章を800文字以内で日本語で要約してください。
        ------
        {text}
        ------
      TEXT
      refine_first_template = Langchain::Prompt::PromptTemplate.new(
        template: refine_first_template, input_variables: %w(text))

      refine_template = <<~TEXT
        次の文章を800文字以内で日本語で要約してください。
        ------
        {existing_answer}
        {text}
        ------
      TEXT
      refine_template = Langchain::Prompt::PromptTemplate.new(
        template: refine_template, input_variables: %w(existing_answer text))

      client = Faraday.new(url: ollama_url) do |conn|
        conn.request :json
        conn.response :json
        conn.response :raise_error
        conn.response :logger, Langchain.logger, {headers: true, bodies: true, errors: true}
      end
      final_answer = nil
      chunks = Langchain::Chunker::Text.new(all_text, chunk_size: 2000, chunk_overlap: 200, separator: "\n").chunks
      overall_time = Benchmark.realtime do
        chunks.each_with_index do |chunk, i|
          # puts "text length=#{chunk.text.length}"
          if final_answer
            existing_answer = final_answer.sub(/---\R.*\z/m, "")
            # puts "existing_answer=#{existing_answer}"
            prompt = refine_template.format(existing_answer: existing_answer, text: chunk.text)
          else
            prompt = refine_first_template.format(text: chunk.text)
          end
          # result = ollama_llm.complete(prompt: prompt, model: ollama_model)
          responses_stream = []
          parameters = { prompt: prompt, model: ollama_model, stream: false, options: { temperature: 0.0 } }
          time = Benchmark.realtime do
            client.post("api/generate", parameters) do |req|
              req.options.timeout = 60 * 10 # 10分
              req.options.on_data = proc do |chunk, _size|
                chunk.split("\n").each do |chunk_line|
                  parsed_chunk = JSON.parse(chunk_line)
                  responses_stream << parsed_chunk
                end
              end
            end
          end
          # result = generate_final_completion_response(responses_stream, ollama_model)
          final_response = responses_stream.last.merge(
            "response" => responses_stream.map { |resp| resp["response"] }.join
          )
          result = Langchain::LLM::OllamaResponse.new(final_response, model: ollama_model)
          final_answer = result.completion

          time = ActiveSupport::Duration.build(time)
          time = SS::Duration.format(time)
          puts "#{i}: got partial answer from '#{ollama_url}' in #{time}"
        end
      end

      puts final_answer

      overall_time = ActiveSupport::Duration.build(overall_time)
      overall_time = SS::Duration.format(overall_time)
      puts "got answer from '#{ollama_url}' in #{overall_time}"
    end
  end

  context "検索キーワード/クエリ拡張: 単なるキーワード展開ではなく直接Elasticsearch DSLを導出させる" do
    let(:system_prompt) do
      template = <<~TEXT
        You are an expert Elasticsearch query engineer.
        Convert user search inputs into valid Elasticsearch Query DSL JSON.
        Output ONLY valid raw JSON. No markdown blocks like ```json, no explanations.
      TEXT
      Langchain::Prompt::PromptTemplate.new(template: template, input_variables: SS::EMPTY_ARRAY)
    end
    let(:user_prompt) do
      template = <<~TEXT
        Target search fields: {target_fields}
        Original query: {original_queries}

        Generate an Elasticsearch 'bool' query using 'should' clauses to expand the search.
        Include the original query with a higher boost (boost: 2.0) and include 3-4 semantic synonyms or related terms with a lower boost (boost: 1.0).
        Set minimum_should_match to 1.
      TEXT
      Langchain::Prompt::PromptTemplate.new(template: template, input_variables: %w(target_fields original_queries))
    end
    let(:target_fields) { %w(name text_index) }
    let(:original_queries) { ENV.fetch("QUERY", "ドラゴンボール 魔人ブー").split(/\s+/) }

    it do
      messages = [
        { role: "system", content: system_prompt.format },
        { role: "user", content: user_prompt.format(target_fields: target_fields.inspect, original_queries: original_queries.inspect) }
      ]
      result = nil
      time = Benchmark.realtime do
        result = ollama_llm.chat(messages: messages, model: ollama_model)
      end
      puts result.chat_completion

      time = ActiveSupport::Duration.build(time)
      puts "got answer from '#{ollama_url}' in #{SS::Duration.format(time)} has #{result.completion_tokens} tokens; means #{result.completion_tokens / time} tokens/s"
    end
  end
end
