module Tasks
  module Cms
    class Es
      class << self
        def ping(site_or_name)
          with_site(site_or_name) do |site|
            puts site.elasticsearch_client.ping
          end
        end

        def info(site_or_name)
          with_site(site_or_name) do |site|
            puts site.elasticsearch_client.info.to_json
          end
        end

        def list_indexes(site_or_name)
          with_site(site_or_name) do |site|
            puts site.elasticsearch_client.cat.indices
          end
        end

        def list_types(site_or_name)
          with_site(site_or_name) do |site|
            index_name = site.elasticsearch_index_name
            puts site.elasticsearch_client.indices.get(index: index_name)[index_name]['mappings'].keys
          end
        end

        def drop(site_or_name)
          with_site(site_or_name) do |site|
            puts site.elasticsearch_client.indices.delete(index: site.elasticsearch_index_name).to_json
          end
        end

        def create_indexes(site_or_name)
          with_site(site_or_name) do |site|
            settings = ::File.read(Rails.root.join('vendor', 'elasticsearch', 'cms', 'settings.json'))
            settings = JSON.parse(settings)

            mappings = ::File.read(Rails.root.join('vendor', 'elasticsearch', 'cms', 'mappings.json'))
            mappings = JSON.parse(mappings)

            puts site.elasticsearch_client.indices.create(
              index: site.elasticsearch_index_name,
              body: { settings: settings, mappings: mappings}
            ).to_json
          end
        end

        def feed_all(site_or_name)
          with_site(site_or_name) do |site|
            feed_all_pages(site)
          end
        end

        def feed_all_pages(site_or_name)
          with_site(site_or_name) do |site|
            criteria = ::Cms::Page.site(site).and_public
            all_ids = criteria.pluck(:id)
            all_ids.each_slice(100) do |ids|
              criteria.in(id: ids).to_a.each do |page|
                job_klass = page.elasticsearch_indexing_class
                next if !job_klass

                job = job_klass.bind(site_id: site.id, node_id: page.parent.try(:id))
                job.perform_now(action: 'index', id: page.id)

                break
              end

              break
            end
          end
        end

        def feed_all_nodes(site_or_name)
          with_site(site_or_name) do |site|
            criteria = ::Cms::Node.site(site).and_public
            all_ids = criteria.pluck(:id)
            all_ids.each_slice(100) do |ids|
              criteria.in(id: ids).to_a.each do |node|
                job_klass = node.elasticsearch_indexing_class
                next if !job_klass

                job = job_klass.bind(site_id: site.id, node_id: node.id)
                job.perform_now(action: 'index', id: node.id)
              end
            end
          end
        end

        def ingest_drop(site_or_name)
          with_site(site_or_name) do |site|
            puts site.elasticsearch_client.ingest.delete_pipeline(id: 'attachment').to_json
          end
        end

        def ingest_init(site_or_name)
          with_site(site_or_name) do |site|
            settings = ::File.read(Rails.root.join('vendor', 'elasticsearch', 'ingest_attachment.json'))
            settings = JSON.parse(settings)

            puts site.elasticsearch_client.ingest.put_pipeline(id: 'attachment', body: settings).to_json
          end
        end

        def ingest_info(site_or_name)
          with_site(site_or_name) do |site|
            puts site.elasticsearch_client.ingest.get_pipeline(id: 'attachment').to_json
          end
        end

        private

        def with_site(site_or_name)
          if site_or_name.is_a?(String)
            site = ::SS::Site.find_by(host: site_or_name) rescue nil
            if !site
              puts "#{site_or_name}: site not found"
              return
            end
          else
            site = site_or_name
          end

          if !site.elasticsearch_enabled?
            puts 'elasticsearch was not enabled'
            return
          end

          if site.elasticsearch_client.nil?
            puts 'elasticsearch was not configured'
            return
          end

          yield site
        end
      end
    end
  end
end
