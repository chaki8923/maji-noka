class BaseModel
    include ActiveModel::Model

    def execute_api(key, params = nil, method: 'post', raise_flag: false)
        errors.clear
        url = Rails.configuration.x.base_url
        client = HTTPClient.new
        req_url = url[:api] + '/' + key

        case method
          when 'post' then
            res = client.post(req_url, params.to_h)
          when 'get' then
            res = client.get(req_url, params.to_h)
        end
        
        return res.body if method == 'get'
      
        if res.status_code == 500 || res.status_code == 404
          errors.add("システムエラー発生。管理者へお問い合わせください。")
        else
          # post成功ならbodyは空
          return true if res.body.empty?
          # 失敗ならバリューオブジェクトのエラー文が入る
          errors.add(res.body)
        end
    end

    def send_error(msg)
      errors.clear
      errors.add(msg)
    end
end