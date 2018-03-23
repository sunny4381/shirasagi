namespace :cms do
  task :generate_nodes => :environment do
    Tasks::Cms::Page.generate_nodes(ENV["site"], ENV["node"])
  end

  task :generate_pages => :environment do
    Tasks::Cms::Page.generate_pages(ENV["site"], ENV["node"], ENV["attachments"])
  end

  task :update_pages => :environment do
    Tasks::Cms::Page.update_pages(ENV["site"], ENV["node"])
  end

  task :release_pages => :environment do
    Tasks::Cms::Page.release_pages(ENV["site"])
  end

  task :remove_pages => :environment do
    Tasks::Cms::Page.remove_pages(ENV["site"])
  end

  task :check_links => :environment do
    Tasks::Cms::Page.check_links(ENV["site"], ENV["node"], ENV["email"])
  end

  task :import_files => :environment do
    Tasks::Cms::Page.import_files
  end
end
