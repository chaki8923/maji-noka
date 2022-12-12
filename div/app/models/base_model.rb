class BaseModel
    include ActiveModel::Model

    def execute_api(key, params, method: 'post', raise_flag: false)
        errors.clear
        url = Rails.configuration.x.base_url
        Rails.logger.debug "base_model/key---------------------------------#{key}"
        Rails.logger.debug "base_model/params---------------------------------#{params}"
        Rails.logger.debug "base_api_url---------------------------------#{url[:api] }"
        client = HTTPClient.new

        req_url = url[:api] + '/' + key
        ## TODO:あとで消す
        Rails.logger.debug "base_model_req_ary---------------------------------#{req_url}"
        res = client.post(req_url, params.to_h)

    end
end