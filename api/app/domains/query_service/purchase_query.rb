require 'sequel'

class PurchaseQuery
  DB = Sequel.connect(Rails.configuration.x.sequel[:db])

  def get_all
    DB[:Purchase]
      .select(
        Sequel.as(Sequel[:Customer][:name], :customer_name),
        Sequel.as(Sequel[:items][:name], :item_name),
        Sequel[:Customer][:email],
        Sequel[:Customer][:state],
        Sequel[:Customer][:country],
        Sequel[:Customer][:postal_code],
        Sequel[:Customer][:line1],
        Sequel[:Customer][:line2],
        Sequel[:Purchase][:support_flag],
        Sequel[:Purchase][:quantity],
        Sequel[:Purchase][:createdAt],
      )
      .inner_join(
        :Customer,
        Sequel[:Purchase][:customerId] => Sequel[:Customer][:id]
      )
      .inner_join(:items, Sequel[:Purchase][:itemId] => Sequel[:items][:id])
      .all
  end


  def find(id)
    DB[:Purchase].where(:id => id).first
  end
end
