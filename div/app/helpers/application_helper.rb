module ApplicationHelper

  def change_json(str)
    return JSON.parse(str)
  end
end
