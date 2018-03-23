module Tasks
  module Cms
    class Page
      class << self
        def generate_nodes(site, node)
          with_node(::Cms::Node::GenerateJob, site: site, node: node)
        end

        def generate_pages(site, node, attachments)
          with_node(::Cms::Page::GenerateJob, site: site, node: node, attachments: attachments)
        end

        def update_pages(site, node)
          with_node(::Cms::Page::UpdateJob, site: site, node: node)
        end

        def release_pages(site)
          with_site(::Cms::Page::ReleaseJob, site: site)
        end

        def remove_pages(site)
          with_site(::Cms::Page::RemoveJob, site: site)
        end

        def check_links(site, node, email)
          with_node(::Cms::CheckLinksJob, site: site, node: node, email: email)
        end

        def import_files
          Cms::ImportFilesJob.perform_now
        end

        private

        def find_sites(site)
          return ::Cms::Site unless site
          ::Cms::Site.where host: site
        end

        def with_site(job_class, opts = {})
          opts = opts.dup
          find_sites(opts.delete(:site)).each do |site|
            job = job_class.bind(site_id: site)
            job.perform_now(opts)
          end
        end

        def with_node(job_class, opts = {})
          opts = opts.dup
          find_sites(opts.delete(:site)).each do |site|
            job = job_class.bind(site_id: site)
            node = opts.delete(:node)
            job = job.bind(node_id: ::Cms::Node.site(site).find_by(filename: node).id) if node
            job.perform_now(opts)
          end
        end
      end
    end
  end
end
