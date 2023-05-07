CREATE TABLE
public.item(
     id                 BIGSERIAL           PRIMARY KEY     --id
    ,name              text                                --商品名
    ,price             text                                --値段
    ,description       text                                --説明
    ,images            json                                --画像
    ,deleted_at        timestamp with time zone            --削除日時
    ,created_at        timestamp with time zone            --作成日時
    ,updated_at        timestamp with time zone            --更新日時
);

COMMENT ON TABLE    item.id                     IS     'ID';
COMMENT ON COLUMN   item.name                   IS     '商品名';
COMMENT ON COLUMN   item.price                  IS     '価格';
COMMENT ON COLUMN   item.description            IS     '説明';
COMMENT ON COLUMN   item.images                 IS     '商品画像';
COMMENT ON COLUMN   item.deleted_at             IS     '削除日時';
COMMENT ON COLUMN   item.created_at             IS     '作成日時';
COMMENT ON COLUMN   item.updated_at             IS     '更新日時';