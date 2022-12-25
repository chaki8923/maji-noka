class BaseModel
    include ActiveModel::Model

    def execute_api(key, params, method: 'post', raise_flag: false)
        errors.clear
        url = Rails.configuration.x.base_url
        client = HTTPClient.new
        req_url = url[:api] + '/' + key

        case method
          when 'post' then
          res = client.post(req_url, params.to_h)
          when 'get' then
          res = client.get(req_url, params.to_h)
          ## TODO：あとで消す
          Rails.logger.debug "basemodel---------------------------------#{res.body}"
        end
        
        return res.body if method == 'get'
      
        if res.status_code == 500 || res.status_code == 404
          errors.add("システムエラー発生。管理者へお問い合わせください。")
        else
          return true if res.body.empty?
          errors.add(res.body)
        end
    end
end