json.columnDefs [
                  { headerName: "Id", field: '_id' },
                  {
                    headerName: I18n.t("ss.basic_info"),
                    children: [
                      { headerName: Cms::Node.t(:filename), field: 'filename', filter: "agTextColumnFilter" },
                      { headerName: Cms::Node.t(:depth), field: 'depth', filter: 'agNumberColumnFilter' },
                      { headerName: Cms::Node.t(:route), field: 'route', filter: "agTextColumnFilter" },
                      { headerName: Cms::Node.t(:name), field: 'name', editable: editable?("name"), filter: "agTextColumnFilter" },
                      { headerName: Cms::Node.t(:index_name), field: 'index_name', editable: editable?("index_name") },
                      { headerName: Cms::Node.t(:layout_id), field: 'layout.name', filter: "agTextColumnFilter" },
                    ]
                  },
                  {
                    headerName: I18n.t("modules.addons.cms/node_setting"),
                    children: [
                      { headerName: Cms::Node.t(:page_layout_id), field: 'page_layout.name', editable: editable?("page_layout") },
                      { headerName: Cms::Node.t(:order), field: 'order', editable: editable?("order") },
                      { headerName: Cms::Node.t(:shortcut), field: 'shortcut', editable: editable?("shortcut") },
                      { headerName: Cms::Node.t(:view_route), field: 'view_route', editable: editable?("view_route") },
                    ]
                  },
                  {
                    headerName: I18n.t("modules.addons.cms/meta"),
                    children: [
                      { headerName: t(:keywords, scope: "mongoid.attributes.cms/addon/meta"), field: 'keywords', editable: editable?("keywords") },
                      { headerName: t(:description, scope: "mongoid.attributes.cms/addon/meta"), field: 'description', editable: editable?("description") },
                      { headerName: t(:summary_html, scope: "mongoid.attributes.cms/addon/meta"), field: 'summary_html', editable: editable?("summary_html") },
                    ]
                  },
                  {
                    headerName: I18n.t("modules.addons.cms/node_list"),
                    children: [
                      { headerName: t(:conditions, scope: "mongoid.attributes.cms/addon/list/model"), field: 'conditions', editable: editable?("conditions") },
                      { headerName: t(:sort, scope: "mongoid.attributes.cms/addon/list/model"), field: 'sort', editable: editable?("sort") },
                      { headerName: t(:limit, scope: "mongoid.attributes.cms/addon/list/model"), field: 'limit', editable: editable?("limit") },
                      { headerName: t(:new_days, scope: "mongoid.attributes.cms/addon/list/model"), field: 'new_days', editable: editable?("new_days") },
                      { headerName: t(:loop_format, scope: "mongoid.attributes.cms/addon/list/model"), field: 'loop_format', editable: editable?("loop_format") },
                      { headerName: t(:loop_liquid, scope: "mongoid.attributes.cms/addon/list/model"), field: 'loop_liquid', editable: editable?("loop_liquid") },
                      { headerName: t(:upper_html, scope: "mongoid.attributes.cms/addon/list/model"), field: 'upper_html', editable: editable?("upper_html") },
                      { headerName: t(:loop_html, scope: "mongoid.attributes.cms/addon/list/model"), field: 'loop_html', editable: editable?("loop_html") },
                      { headerName: t(:lower_html, scope: "mongoid.attributes.cms/addon/list/model"), field: 'lower_html', editable: editable?("lower_html") },
                      { headerName: t(:no_items_display_state, scope: "mongoid.attributes.cms/addon/list/model"), field: 'no_items_display_state', editable: editable?("no_items_display_state") },
                      { headerName: t(:substitute_html, scope: "mongoid.attributes.cms/addon/list/model"), field: 'substitute_html', editable: editable?("substitute_html") },
                    ]
                  },
                  {
                    headerName: I18n.t("modules.addons.category/setting"),
                    children: [
                      { headerName: t(:st_category_ids, scope: "mongoid.attributes.category/addon/setting"), field: 'st_category_ids' },
                    ]
                  },
                  {
                    headerName: I18n.t("modules.addons.cms/release"),
                    children: [
                      { headerName: t(:state, scope: "mongoid.attributes.cms/addon/release"), field: 'state' },
                      { headerName: t(:released_type, scope: "mongoid.attributes.cms/addon/release"), field: 'released_type' },
                      { headerName: t(:released, scope: "mongoid.attributes.cms/addon/release"), field: 'released', valueFormatter: "dateTimeFormatter" },
                    ]
                  },
                  {
                    headerName: I18n.t("modules.addons.cms/group_permission"),
                    children: [
                      { headerName: t(:group_ids, scope: "mongoid.attributes.cms/addon/group_permission"), field: 'group_ids' },
                    ]
                  },
                  { headerName: Cms::Node.t(:updated), field: 'updated', valueFormatter: "dateTimeFormatter" },
                  { headerName: Cms::Node.t(:created), field: 'created', valueFormatter: "dateTimeFormatter" },
                ]

json.defaultColDef do
  json.sortable true
  json.resizable true
  # json.enableRowGroup true # only available in AG Grid Enterprise
  # json.enablePivot true # only available in AG Grid Enterprise
  # json.enableValue true # only available in AG Grid Enterprise
end

json.sideBar do
  json.toolPanels [ 'columns' ]
end

json.singleClickEdit true

json.rowData do
  criteria = Cms::Node.site(@cur_site).allow(:read, @cur_user)
  all_ids = criteria.pluck(:id)
  all_ids.each_slice(100) do |ids|
    criteria.in(id: ids).to_a.each do |node|
      json.child! do
        # basic_info
        json._id node.id
        json.route node.label(:route)
        json.depth node.depth
        json.name node.name
        json.index_name node.index_name
        json.filename node.filename
        node.layout.try do |layout|
          json.layout layout, :_id, :name, :filename
        end
        # cms/node_setting
        node.try(:page_layout).try do |layout|
          json.layout layout, :_id, :name, :filename
        end
        json.order node.order
        json.shortcut node.label(:shortcut)
        json.view_route node.label(:view_route)
        # cms/meta
        json.keywords node.try(:keywords)
        json.description node.try(:description)
        json.summary_html node.try(:summary_html)
        # cms/node_list
        json.conditions node.try(:conditions)
        json.sort node.try(:label, :sort)
        json.limit node.try(:limit)
        json.new_days node.try(:new_days)
        json.loop_format node.try(:label, :loop_format)
        json.loop_liquid node.try(:loop_liquid)
        json.upper_html node.try(:upper_html)
        json.loop_html node.try(:loop_html)
        json.lower_html node.try(:lower_html)
        json.no_items_display_state node.try(:label, :no_items_display_state)
        json.substitute_html node.try(:substitute_html)
        # category/setting
        json.st_category_ids node.try(:st_category_ids)
        # cms/release
        json.state node.try(:label, :state)
        json.released_type node.try(:label, :released_type)
        json.released node.try(:released)
        # cms/group_permission
        json.group_ids node.try(:group_ids)
        json.updated node.try(:updated)
        json.created node.try(:created)
      end
    end
  end
end

# reversed = {}
# fields.each do |klass, field_keys|
#   field_keys.each do |field_key|
#     reversed[field_key] ||= Set.new
#     reversed[field_key].add(klass)
#   end
# end
#
# json.columnDefs do
#   reversed.each do |field_key, classes|
#     json.child! do
#       header_name = nil
#       canonical_class = classes.first
#       canonical_class.lookup_ancestors.each do |klass|
#         model_key = klass.model_name.i18n_key
#         locale_key = :"#{canonical_class.i18n_scope}.attributes.#{model_key}.#{field_key}"
#         next unless I18n.exists?(locale_key)
#
#         if klass.is_a?(SS::Addon)
#           model_name = I18n.t("modules.addons.#{model_key.to_s.sub("/addon/", "/")}", default: nil)
#         end
#         if model_name.blank?
#           model_name = I18n.t("mongoid.models.#{model_key}", default: nil)
#         end
#         model_name ||= I18n.t("ss.basic_info")
#         field_name = I18n.t(locale_key)
#         header_name = "#{model_name}/#{field_name}"
#
#         break
#       end
#
#       json.headerName header_name || field_key.humanize
#       json.field field_key
#
#       field_def = canonical_class.fields[field_key]
#       if field_key != "_id" && [ Integer, String ].include?(field_def.type)
#         json.editable true
#       end
#     end
#   end
# end
