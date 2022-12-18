class BaseModel
    include ActiveModel::Model

    def execute_api(key, params, method: 'post', raise_flag: false)
        errors.clear
        url = Rails.configuration.x.base_url

        client = HTTPClient.new

        req_url = url[:api] + '/' + key
        res = client.post(req_url, params.to_h)
        ## TODO:あとで消す
        Rails.logger.debug "base_model_body---------------------------------#{res.body.empty?}"
        Rails.logger.debug "base_model_response---------------------------------#{res.status_code}"
        Rails.logger.debug "base_model_res---------------------------------#{res.inspect}"
        if res.body.empty?
          return true
        else
          Rails.logger.debug "else---------------------------------#{res.inspect}"
          errors.add(res.body)
        end
    end
end