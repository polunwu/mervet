class App
  def call(env)
    path_info = (env['PATH_INFO'] == '/') ? '/index.html' : env['PATH_INFO']
    if path_info.split('/').last["."]
      extension = path_info.split('/').last.split('.').last
    else # /abc 預設為 /abc.html
      path_info += ".html"
      extension = "html"
    end
    file_full_path = "dist#{path_info}"
    if File.file?(file_full_path)
      file = File.read(file_full_path)
      [200,{'Content-Type' => content_type[extension], 'Cache-Control' => 'public, max-age=86400'},[file]]
    else # 沒有的資源就 404 才正常
      [404,{},[]]
    end
  end

  def content_type
    {
      'html' => 'text/html',
      'js'   => 'text/javascript',
      'css'  => 'text/css',
      'svg'  => 'image/svg+xml',
      'ico'  => 'image/x-icon',
      'map'  => 'application/octet-stream',
      'png'  => 'image/png',
      'jpg'  => 'image/jpeg',
      'jpeg'  => 'image/jpeg',
      'gif'  => 'image/gif',
    }
  end
end

run App.new