module ApplicationHelper

  def change_json(str)
    return JSON.parse(str)
  end

  def format_date(date)
    date_time = DateTime.parse(date)
    # フォーマットを指定して日時を表示
    date_time.strftime("%Y年%m月%d日 %H時%M分%S秒")
  end
end
