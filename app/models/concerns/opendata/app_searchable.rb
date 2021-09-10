module Opendata::AppSearchable
  extend ActiveSupport::Concern

  module ClassMethods
    def search_params
      params = []
      params << :keyword
      params << :tag
      params << :area_id
      params << :category_id
      params << :license
      params << :option
      params
    end

    def search_options
      %w(all_keywords any_keywords any_conditions).map do |w|
        [I18n.t("opendata.search_options.#{w}"), w]
      end
    end

    def search(params)
      criteria = self.all
      return criteria if params.blank?

      SEARCH_HANDLERS.each do |handler|
        criteria = criteria.send(handler, params)
      end

      criteria
    end

    SEARCH_HANDLERS = [
      :search_keyword, :search_name, :search_tag, :search_area_id, :search_category_id,
      :search_license, :search_poster ].freeze

    def search_keyword(params)
      return all if params.blank? || params[:keyword].blank?

      option = params[:option].presence || 'all_keywords'
      method = option == 'all_keywords' ? 'and' : 'any'
      all.keyword_in(
        params[:keyword],
        :name,
        :text,
        "appfiles.name",
        "appfiles.filename",
        "appfiles.text",
        method: method
      )
    end

    def search_name(params)
      return all if params.blank? || params[:name].blank?
      all.keyword_in params[:keyword], :name
    end

    def search_tag(params)
      return all if params.blank? || params[:tag].blank?

      if params[:option].presence == 'any_conditions'
        all.where("$or" => [{ tags: params[:tag] }])
      else
        all.where(tags: params[:tag])
      end
    end

    def search_area_id(params)
      return all if params.blank? || params[:area_id].blank?

      if params[:option].presence == 'any_conditions'
        all.where("$or" => [{ area_ids: params[:area_id].to_i }])
      else
        all.where(area_ids: params[:area_id].to_i)
      end
    end

    def search_category_id(params)
      return all if params.blank? || params[:category_id].blank?

      category_id = params[:category_id].to_i
      category_node = Cms::Node.site(params[:site]).and_public.where(id: category_id).first
      return all if category_node.blank?

      category_ids = [ category_id ]
      category_node.all_children.and_public.each do |child|
        category_ids << child.id
      end

      if params[:option].presence == 'any_conditions'
        all.where("$or" => [{ category_ids: { "$in" => category_ids } }])
      else
        all.where(category_ids: { "$in" => category_ids })
      end
    end

    def search_license(params)
      return all if params.blank? || params[:license].blank?

      if params[:option].presence == 'any_conditions'
        all.where("$or" => [{ license: params[:license] }])
      else
        all.where(license: params[:license])
      end
    end

    def search_poster(params)
      return all if params.blank? || params[:poster].blank?

      poster = params[:poster]
      cond = case poster
             when "member"
               { :workflow_member_id.exists => true }
             when "admin"
               { :workflow_member_id => nil }
             end
      return all if cond.blank?

      if params[:option].presence == 'any_conditions'
        all.where("$or" => [ cond ])
      else
        all.where(cond)
      end
    end
  end
end
