module GmapPlotter

  class Server < Sinatra::Base
    helpers Sinatra::ContentFor

    # make defaults explicit
    set :public_folder, File.dirname(__FILE__) + '/public'
    set :views, settings.root + '/views'

    get '/' do
      erb :main_layout do
        erb :main
      end
    end

    post '/upload' do
      content_type :json
      begin
        a_hash = if params['file']
                   tmp_file = params['file'][:tempfile]
                   content = tmp_file.read
                   points = JSON.parse(content)
                   {
                       :'plot-type' => params['plot-type'],
                       :points => points
                   }
                 else
                   {
                       :'plot-type' => 'path',
                       :points => []
                   }
                 end
        json a_hash
      rescue
        a_hash =  {
            :'plot-type' => 'path',
            :points => []
        }
        json a_hash
      end
    end

  end


end