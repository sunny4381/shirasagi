class Cms::Liquid::StdHeadTag < Liquid::Block
  def initialize(tag_name, markup, options)
    super
  end

  def render(context)
    output = super

    cms = context['cms']

    ret = ''
    ret << "<meta charset=\"UTF-8\" />\n" unless output =~ /<meta\s+?charset/
    ret << "<title>#{cms.window_name}</title>\n" unless output =~ /<title/
    ret << cms.stylesheet_link_tags
    ret << cms.javascript_src_tags
    ret << output
    ret << cms.opengraph
    ret << cms.twitter_card
    if cms.csrf_token?
      ret << cms.csrf_meta_tags
    end

    ret
  end
end
