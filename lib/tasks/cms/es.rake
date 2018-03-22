namespace :cms do
  namespace :es do
    task ping: :environment do
      ::Tasks::Cms::Es.ping(ENV['site'])
    end

    task info: :environment do
      ::Tasks::Cms::Es.info(ENV['site'])
    end

    task list_indexes: :environment do
      ::Tasks::Cms::Es.list_indexes(ENV['site'])
    end

    task list_types: :environment do
      ::Tasks::Cms::Es.list_types(ENV['site'])
    end

    task drop: :environment do
      ::Tasks::Cms::Es.drop(ENV['site'])
    end

    task create_indexes: :environment do
      ::Tasks::Cms::Es.create_indexes(ENV['site'])
    end

    task feed_all: :environment do
      ::Tasks::Cms::Es.feed_all(ENV['site'])
    end

    task feed_all_pages: :environment do
      ::Tasks::Cms::Es.feed_all_pages(ENV['site'])
    end

    task feed_all_nodes: :environment do
      ::Tasks::Cms::Es.feed_all_nodes(ENV['site'])
    end
  end
end
