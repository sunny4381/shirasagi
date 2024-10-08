module Workflow::Extensions::Route
  class Approvers < Array
    def mongoize
      self.to_a
    end

    class << self
      def demongoize(object)
        if object.present?
          Workflow::Extensions::Route::Approvers.new(normalize(object))
        else
          Workflow::Extensions::Route::Approvers.new
        end
      end

      def mongoize(object)
        case object
        when self.class
          object.mongoize
        when Array
          Workflow::Extensions::Route::Approvers.new(normalize(object)).mongoize
        else
          object
        end
      end

      private

      def normalize(array)
        ret = array.map do |hash|
          normalize_hash hash
        end
        ret.compact!
        ret.each do |hash|
          hash[:level] = hash[:level].to_i if hash[:level].present?
          hash[:user_id] = normalize_user_id(hash[:user_id]) if hash[:user_id].present?
          hash[:editable] = hash[:editable].to_i if hash[:editable].present?
          hash[:alternatable] = hash[:alternatable].to_i if hash[:alternatable].present?
        end
        ret.to_a.uniq
      end

      def normalize_hash(hash)
        if hash.kind_of?(String)
          convert_from_string(hash)
        elsif hash.respond_to?(:symbolize_keys)
          hash.symbolize_keys
        else
          nil
        end
      end

      # rubocop:disable Lint/DuplicateBranch
      def normalize_user_id(user_id)
        if BSON::ObjectId.legal?(user_id)
          user_id
        elsif user_id.numeric?
          user_id.to_i
        else
          user_id
        end
      end
      # rubocop:enable Lint/DuplicateBranch

      def convert_from_string(text)
        return nil if text.blank?
        begin
          Hash[[:level, :user_id, :editable, :alternatable].zip(text.split(",").map(&:strip))]
        rescue
          nil
        end
      end
    end
  end

  class RequiredCounts < Array
    def mongoize
      self.to_a
    end

    class << self
      def demongoize(object)
        if object.present?
          Workflow::Extensions::Route::RequiredCounts.new(normalize(object))
        else
          Workflow::Extensions::Route::RequiredCounts.new
        end
      end

      def mongoize(object)
        case object
        when self.class
          object.mongoize
        when Array
          Workflow::Extensions::Route::RequiredCounts.new(normalize(object)).mongoize
        else
          object
        end
      end

      private

      def normalize(array)
        ret = array.map do |item|
          convert_from_item(item)
        end
        ret.compact
      end

      def convert_from_item(item)
        begin
          if item == "false" || item.kind_of?(FalseClass)
            false
          else
            num = item.to_i
            num == 0 ? false : num
          end
        rescue
          nil
        end
      end
    end
  end

  class Circulations < Array
    def mongoize
      self.to_a
    end

    class << self
      def demongoize(object)
        if object.present?
          Workflow::Extensions::Route::Circulations.new(normalize(object))
        else
          Workflow::Extensions::Route::Circulations.new
        end
      end

      def mongoize(object)
        case object
        when self.class
          object.mongoize
        when Array
          Workflow::Extensions::Route::Circulations.new(normalize(object)).mongoize
        else
          object
        end
      end

      private

      def normalize(array)
        ret = array.map do |hash|
          normalize_hash hash
        end
        ret.compact!
        ret.each do |hash|
          hash[:level] = hash[:level].to_i if hash[:level].present?
          hash[:user_id] = normalize_user_id(hash[:user_id]) if hash[:user_id].present?
        end
        ret.to_a.uniq
      end

      def normalize_hash(hash)
        if hash.kind_of?(String)
          convert_from_string(hash)
        elsif hash.respond_to?(:symbolize_keys)
          hash.symbolize_keys
        else
          nil
        end
      end

      # rubocop:disable Lint/DuplicateBranch
      def normalize_user_id(user_id)
        if BSON::ObjectId.legal?(user_id)
          user_id
        elsif user_id.numeric?
          user_id.to_i
        else
          user_id
        end
      end
      # rubocop:enable Lint/DuplicateBranch

      def convert_from_string(text)
        return nil if text.blank?
        begin
          Hash[[:level, :user_id].zip(text.split(",").map(&:strip))]
        rescue
          nil
        end
      end
    end
  end
end
