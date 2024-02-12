# frozen_string_literal: true

class BaseModel # rubocop:disable Style/Documentation
  include ActiveModel::Model

  def execute_api(key, params = nil, method: 'post', raise_flag: false) # rubocop:disable Lint/UnusedMethodArgument
    errors.clear
    url = Rails.configuration.x.base_url
    # client = HTTPClient.new
    req_url = "#{url[:api]}/#{key}"
    base_url = URI.parse(req_url)
    # HTTPリクエストの作成

    case method
    when 'post'
      # パラメータを設定
      # HTTPリクエストの作成
      Rails.logger.debug "post---------------------------------#{params}"
      boundary = '----BOUNDARYBOUNDARY----'
      file_paths = create_file_paths(params['images'])
      body = add_request_body(params)
      # マルチパート形式のリクエストボディを作成
      body = add_body_file_data(file_paths, body) if file_paths.present?
      body << "--#{boundary}--\r\n"

      request = Net::HTTP::Post.new(base_url.path)
      request.body = body.join
      request['Content-Type'] = "multipart/form-data; boundary=#{boundary}"

      # HTTPリクエストの送信
      response = Net::HTTP.start(base_url.host, base_url.port) do |http|
        http.request(request)
      end
    when 'get'
      Rails.logger.debug "params---------------------------------#{params}"
      query_string = params.present? ? "?#{params.to_query}" : nil
      # GETリクエストの作成
      request = Net::HTTP::Get.new("#{base_url.request_uri}#{query_string}")
      response = Net::HTTP.start(base_url.host, base_url.port) do |http|
        http.request(request)
      end
    end
    json_res = JSON.parse(response.body)
    return json_res if method == 'get'

    errors.add('システムエラー発生。管理者へお問い合わせください。') if response.code == 500 || response.code == 404
    ## TODO：あとで消す
    Rails.logger.debug "json_res---------------------------------#{json_res}"
    json_res['err_message'].each { |error| errors.add(error) } if json_res['err_message'].present?
    json_res
  end

  def make_data(res)
    res.transform_keys(&:to_sym)
  end

  def make_list(res)
    res.map { |obj| obj.transform_keys(&:to_sym) }
  end

  def convert_boolean(res)
    return true if res.key?(:success_message)

    false
  end

  private

  def add_request_body(params, body = [])
    boundary = '----BOUNDARYBOUNDARY----'
    # imagesファイル以外のパラメータを生成
    params.delete('images')
    params.each do |key, value|
      body << "--#{boundary}\r\n"
      body << "Content-Disposition: form-data; name=\"#{key}\"\r\n"
      body << "\r\n"
      body << "#{value}\r\n"
    end
    body
  end

  def add_body_file_data(file_paths, body)
    boundary = '----BOUNDARYBOUNDARY----'
    file_paths.each do |file_path|
      file_name = File.basename(file_path)
      read_file = File.read(file_path)
      ## TODO：あとで消す
      Rails.logger.debug "file_name---------------------------------#{file_name}"
      body << "--#{boundary}\r\n"
      body << "Content-Disposition: form-data; name=\"images[]\"; filename=\"#{file_name}\"\r\n"
      body << "Content-Type: image/jpeg\r\n"
      body << "\r\n"
      body << read_file
      body << "\r\n"
      # 画像ファイルが不要になったら削除する
      File.delete(file_path) if File.exist?(file_path) # rubocop:disable Lint/NonAtomicFileOperation
    end
    body
  end

  def create_file_paths(images)
    file_paths = []
    return if images.blank?

    # 画像ファイルの一時保存先ディレクトリ
    temp_dir = Rails.root.join('tmp', 'uploads')
    # 一時ディレクトリが存在しない場合は作成する
    Dir.mkdir(temp_dir) unless Dir.exist?(temp_dir) # rubocop:disable Lint/NonAtomicFileOperation
    # 画像ファイルの配列
    # 画像ファイルを一時的に保存し、ファイルパスの配列を作成する
    images.each_with_index do |image_file, index|
      next unless image_file

      file_path = File.join(temp_dir, "image_#{index}")
      File.binwrite(file_path, image_file.read)
      file_paths << file_path
    end
    file_paths
  end
end
