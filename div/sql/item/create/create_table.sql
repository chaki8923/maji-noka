CREATE TABLE
public.items (
     id                 BIGSERIAL           PRIMARY KEY     --id
    ,name              text                                --商品名
    ,price             text                                --値段
    ,description       text                                --説明
    ,images            json                                --画像
    ,deleted_at        timestamp with time zone            --削除日時
    ,created_at        timestamp with time zone            --作成日時
    ,updated_at        timestamp with time zone            --更新日時
);

COMMENT ON COLUMN   items.id                     IS     'ID';
COMMENT ON COLUMN   items.name                   IS     '商品名';
COMMENT ON COLUMN   items.price                  IS     '価格';
COMMENT ON COLUMN   items.description            IS     '説明';
COMMENT ON COLUMN   items.images                 IS     '商品画像';
COMMENT ON COLUMN   items.deleted_at             IS     '削除日時';
COMMENT ON COLUMN   items.created_at             IS     '作成日時';
COMMENT ON COLUMN   items.updated_at             IS     '更新日時';