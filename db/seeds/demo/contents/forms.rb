puts "# forms"

def save_form(data)
  puts data[:name]
  cond = { site_id: @site._id, name: data[:name], sub_type: data[:sub_type] }
  html = File.read("forms/" + data.delete(:filename)) rescue nil
  item = Cms::Form.find_or_create_by(cond)
  item.attributes = data.merge html: html
  item.update
  item.add_to_set group_ids: @site.group_ids

  item
end

def save_column(type, data)
  case type
  when :text
    model = Cms::Column::TextField
  when :text_area
    model = Cms::Column::TextArea
  when :number
    model = Cms::Column::NumberField
  when :date
    model = Cms::Column::DateField
  when :url
    model = Cms::Column::UrlField2
  when :checkbox
    model = Cms::Column::CheckBox
  when :radio
    model = Cms::Column::RadioButton
  when :select
    model = Cms::Column::Select
  when :file_upload
    model = Cms::Column::FileUpload
  when :head_line
    model = Cms::Column::Headline
  when :list
    model = Cms::Column::List
  when :table
    model = Cms::Column::Table
  when :youtube
    model = Cms::Column::Youtube
  when :free
    model = Cms::Column::Free
  end
  puts data[:name]
  cond = { site_id: @site._id, form_id: data[:form].id, name: data[:name] }
  item = model.find_or_initialize_by(cond)
  item.attributes = data.reverse_merge(cur_site: @site)
  puts item.errors.full_messages unless item.save
  item
end

def save_init_column(data)
  puts "[#{data[:order]}]#{data[:column].name}"
  cond = { site_id: @site._id, order: data[:order] }

  item = Cms::InitColumn.find_or_create_by(cond)
  item.attributes = data.reverse_merge(cur_site: @site)
  puts item.errors.full_messages unless item.save
  item
end

@form = save_form(name: '観光情報', order: 10, state: 'public', filename: '1.html', sub_type: 'static', group_ids: [@g_seisaku.id])

@form_columns = [
  save_column(:file_upload, form: @form, name: 'メイン画像', order: 10, required: 'required',
              tooltips: '画像ファイルをアップロードしてください。', html_tag: 'img', file_type: 'image'),

  save_column(:text_area, form: @form, name: '説明文', order: 20, required: 'required',
              tooltips: '観光地の説明を入力してください。'),

  save_column(:text, form: @form, name: '所在地', order: 30, required: 'optional',
              tooltips: '所在地を入力してください。', input_type: 'text'),

  save_column(:text, form: @form, name: 'アクセス', order: 40, required: 'optional',
              tooltips: 'アクセス情報を入力してください。', input_type: 'text'),

  save_column(:text, form: @form, name: '営業時間', order: 50, required: 'optional',
              tooltips: '営業時間を入力してください。', input_type: 'text'),

  save_column(:text, form: @form, name: '休業日', order: 60, required: 'optional',
              tooltips: '休業日を入力してください。', input_type: 'text'),

  save_column(:text, form: @form, name: '料金', order: 70, required: 'optional',
              tooltips: '料金を入力してください。', input_type: 'text'),

  save_column(:text, form: @form, name: '電話番号', order: 80, required: 'optional',
              tooltips: '電話番号を入力してください。', input_type: 'tel'),

  save_column(:text, form: @form, name: 'E-mail', order: 90, required: 'optional',
              tooltips: 'E-mailを入力してください。', input_type: 'email'),

  save_column(:url, form: @form, name: 'ホームページ', order: 100, required: 'optional',
              tooltips: 'ホームページのURLを入力してください。'),

  save_column(:file_upload, form: @form, name: '写真1', order: 110, required: 'optional',
              tooltips: '写真を登録してください。', html_tag: 'img', file_type: 'image'),

  save_column(:file_upload, form: @form, name: '写真2', order: 120, required: 'optional',
              tooltips: '写真を登録してください。', html_tag: 'img', file_type: 'image'),

  save_column(:file_upload, form: @form, name: '写真3', order: 130, required: 'optional',
              tooltips: '写真を登録してください。', html_tag: 'img', file_type: 'image'),

  save_column(:file_upload, form: @form, name: '写真4', order: 140, required: 'optional',
              tooltips: '写真を登録してください。', html_tag: 'img', file_type: 'image'),

  save_column(:file_upload, form: @form, name: '写真5', order: 150, required: 'optional',
              tooltips: '写真を登録してください。', html_tag: 'img', file_type: 'image'),
]

@form2 = save_form(name: 'イベント報告', order: 20, state: 'public', filename: '2.html', sub_type: 'static', group_ids: [@g_seisaku.id])

@form_columns2 = [
  save_column(:file_upload, form: @form2, name: 'メイン写真', order: 10, required: 'required',
              tooltips: '写真を登録してください。', html_tag: 'img', file_type: 'image'),

  save_column(:file_upload, form: @form2, name: 'サブ写真1', order: 20, required: 'optional',
              tooltips: '写真を登録してください。', html_tag: 'img', file_type: 'image'),

  save_column(:file_upload, form: @form2, name: 'サブ写真2', order: 30, required: 'optional',
              tooltips: '写真を登録してください。', html_tag: 'img', file_type: 'image'),

  save_column(:text_area, form: @form2, name: '内容', order: 40, required: 'optional',
              tooltips: 'イベント報告を入力してください。')
]

@form3 = save_form(name: '広報シラサギ', order: 30, state: 'public', filename: '3.html', sub_type: 'static', group_ids: [@g_seisaku.id])

@form_columns3 = [
  save_column(:file_upload, form: @form3, name: '表紙画像', order: 10, required: 'required',
              tooltips: '表紙の画像を登録してください。', html_tag: 'img', file_type: 'image'),

  save_column(:file_upload, form: @form3, name: '全ページ', order: 20, required: 'required',
              tooltips: '全ページのPDFを登録してください。', html_tag: 'img', file_type: 'attachment'),

  save_column(:file_upload, form: @form3, name: '個別ページ1', order: 30, required: 'optional',
              tooltips: '個別ページのPDFを登録してください。', html_tag: 'img', file_type: 'attachment'),

  save_column(:file_upload, form: @form3, name: '個別ページ2', order: 40, required: 'optional',
              tooltips: '個別ページのPDFを登録してください。', html_tag: 'img', file_type: 'attachment'),

  save_column(:file_upload, form: @form3, name: '個別ページ3', order: 50, required: 'optional',
              tooltips: '個別ページのPDFを登録してください。', html_tag: 'img', file_type: 'attachment'),

  save_column(:file_upload, form: @form3, name: '個別ページ4', order: 60, required: 'optional',
              tooltips: '個別ページのPDFを登録してください。', html_tag: 'img', file_type: 'attachment'),

  save_column(:file_upload, form: @form3, name: '個別ページ5', order: 70, required: 'optional',
              tooltips: '個別ページのPDFを登録してください。', html_tag: 'img', file_type: 'attachment'),

  save_column(:file_upload, form: @form3, name: '個別ページ6', order: 80, required: 'optional',
              tooltips: '個別ページのPDFを登録してください。', html_tag: 'img', file_type: 'attachment'),

  save_column(:file_upload, form: @form3, name: '個別ページ7', order: 90, required: 'optional',
              tooltips: '個別ページのPDFを登録してください。', html_tag: 'img', file_type: 'attachment'),

  save_column(:file_upload, form: @form3, name: '個別ページ8', order: 100, required: 'optional',
              tooltips: '個別ページのPDFを登録してください。', html_tag: 'img', file_type: 'attachment'),

  save_column(:file_upload, form: @form3, name: '個別ページ9', order: 110, required: 'optional',
              tooltips: '個別ページのPDFを登録してください。', html_tag: 'img', file_type: 'attachment'),

  save_column(:file_upload, form: @form3, name: '個別ページ10', order: 120, required: 'optional',
              tooltips: '個別ページのPDFを登録してください。', html_tag: 'img', file_type: 'attachment'),
]

@form4 = save_form(
  name: 'ブロック入力', order: 40, state: 'public', filename: '4.html', sub_type: 'entry', group_ids: [@g_seisaku.id]
)

@form_columns4 = [
  save_column(:text, form: @form4, name: '一行入力', order: 10, required: 'optional', input_type: 'text'),
  save_column(:text_area, form: @form4, name: '複数行入力', order: 20, required: 'optional'),
  save_column(:head_line, form: @form4, name: '見出し', order: 30, required: 'optional'),
  save_column(:url, form: @form4, name: 'リンク', order: 40, required: 'optional'),
  save_column(:file_upload, form: @form4, name: 'イメージ', order: 50, required: 'optional', file_type: 'image'),
  save_column(:file_upload, form: @form4, name: '添付ファイル', order: 60, required: 'optional', file_type: 'attachment'),
  save_column(:list, form: @form4, name: '番号付きリスト', order: 70, required: 'optional', list_type: 'ol'),
  save_column(:list, form: @form4, name: '番号なしリスト', order: 80, required: 'optional', list_type: 'ul'),
  save_column(:table, form: @form4, name: '表', order: 90, required: 'optional'),
  save_column(:youtube, form: @form4, name: 'YouTube埋め込み', order: 100, required: 'optional'),
  save_column(:file_upload, form: @form4, name: '動画埋め込み', order: 110, required: 'optional', file_type: 'video'),
  save_column(:free, form: @form4, name: '自由入力', order: 120, required: 'optional'),
  save_column(:text, form: @form4, name: 'ライン', order: 130, required: 'optional', input_type: 'text',
    layout: '<hr>', place_holder: 'ラインを挿入します。記入しないでください。'),
]

@form5 = save_form(
  name: 'インタビュー', order: 50, state: 'public', filename: '5.html', sub_type: 'entry', group_ids: [@g_seisaku.id]
)

@form_columns5 = [
  save_column(:file_upload, form: @form5, name: '画像', order: 10, required: 'optional',
              tooltips: '画像を登録してください。', file_type: 'image'),

  save_column(:text, form: @form5, name: '名前', order: 20, required: 'optional',
              tooltips: '名前を入力してください。', input_type: 'text'),

  save_column(:head_line, form: @form5, name: '質問', order: 30, required: 'optional',
              tooltips: '質問を入力してください。'),

  save_column(:text_area, form: @form5, name: '回答', order: 40, required: 'optional',
              tooltips: '回答を入力してください。'),

  save_column(:file_upload, form: @form5, name: '画像左', order: 50, required: 'optional',
              tooltips: "画像を登録してください。\nテキストの左に回り込みます。", file_type: 'image'),

  save_column(:file_upload, form: @form5, name: '画像右', order: 60, required: 'optional',
              tooltips: "画像を登録してください。\nテキストの右に回り込みます。", file_type: 'image'),
]

save_init_column(order: 10, form: @form5, column: @form_columns5[0])
save_init_column(order: 20, form: @form5, column: @form_columns5[1])
save_init_column(order: 30, form: @form5, column: @form_columns5[2])
save_init_column(order: 40, form: @form5, column: @form_columns5[4])
save_init_column(order: 50, form: @form5, column: @form_columns5[3])
save_init_column(order: 60, form: @form5, column: @form_columns5[2])
save_init_column(order: 70, form: @form5, column: @form_columns5[5])
save_init_column(order: 80, form: @form5, column: @form_columns5[3])

@form6 = save_form(
  name: 'youtube登録', order: 0, state: 'public', filename: '6.html', sub_type: 'entry', group_ids: [@g_seisaku.id]
)

@form_columns6 = [
  save_column(:youtube, form: @form6, name: '動画URL', order: 10, required: 'optional',
              tooltips: 'YoutubeのURLを入力してください。', place_holder: 'YoutubeのURLを入力してください。')
]

@form7 = save_form(
  name: '人口・世帯数', order: 0, state: 'public', filename: '7.html', sub_type: 'static', group_ids: [@g_seisaku.id]
)

@form_columns7 = [
  save_column(:text, form: @form7, name: '総人口', order: 10, required: 'required', input_type: 'text'),
  save_column(:text, form: @form7, name: '男性', order: 20, required: 'required', input_type: 'text'),
  save_column(:text, form: @form7, name: '女性', order: 30, required: 'required', input_type: 'text'),
  save_column(:text, form: @form7, name: '世帯数', order: 40, required: 'required', input_type: 'text')
]

@form8 = save_form(
  name: '避難所情報', order: 0, state: 'public', filename: '8.html', sub_type: 'static', group_ids: [@g_seisaku.id]
)

@form_columns8 = [
  save_column(:select, form: @form8, name: '地域', order: 10, required: 'required', select_options: %w(東部 北部 南部)),
  save_column(:text, form: @form8, name: 'ID', order: 20, required: 'required', input_type: 'text'),
  save_column(:text, form: @form8, name: '郵便番号', order: 30, required: 'required', input_type: 'text'),
  save_column(:text, form: @form8, name: '名称', order: 40, required: 'required', input_type: 'text'),
  save_column(:text, form: @form8, name: '名称_カナ', order: 50, required: 'required', input_type: 'text'),
  save_column(:text_area, form: @form8, name: '所在地_連結表記', order: 60, required: 'required'),
  save_column(:text, form: @form8, name: '電話番号', order: 70, required: 'required', input_type: 'text'),
  save_column(:text, form: @form8, name: '想定収容人数', order: 80, required: 'required', input_type: 'text')
]

puts "form dbs"

def save_form_db(data)
  puts data[:name]
  cond = { site_id: @site.id, form_id: data[:form].id, name: data[:name] }
  item = Cms::FormDb.find_or_create_by(cond)
  item.attributes = data.reverse_merge(cur_site: @site)
  item.save!
  item
end
@form_db1 = save_form_db name: "避難所情報（土砂災害）", form: @form8,
  import_url: ::File.join(@site.full_url, "dataset/shirasagi_City_designation_Shelter.csv"),
  import_primary_key: "ID", import_page_name: "名称",
  import_column_options: [{name: "災害種別_崖崩れ、土石流及び地滑り", kind: "any_of", values: ["1"]}],
  import_map: 1, generate_on_import: 1, import_skip_same_file: 1
@form_db2 = save_form_db name: "避難所情報（地震）", form: @form8,
  import_url: ::File.join(@site.full_url, "dataset/shirasagi_City_designation_Shelter.csv"),
  import_primary_key: "ID", import_page_name: "名称",
  import_column_options: [{name: "災害種別_地震", kind: "any_of", values: ["1"]}],
  import_map: 1, generate_on_import: 1, import_skip_same_file: 1
@form_db3 = save_form_db name: "避難所情報（津波）", form: @form8,
  import_url: ::File.join(@site.full_url, "dataset/shirasagi_City_designation_Shelter.csv"),
  import_primary_key: "ID", import_page_name: "名称",
  import_column_options: [{name: "災害種別_津波", kind: "any_of", values: ["1"]}],
  import_map: 1, generate_on_import: 1, import_skip_same_file: 1
