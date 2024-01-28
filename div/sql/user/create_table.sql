CREATE TABLE
public.admin_users (
     id                 BIGSERIAL           PRIMARY KEY     --id
    ,email              text                                --E-mail
    ,password           text                                --パスワード
    ,deleted_at         timestamp with time zone            --削除日時
    ,created_at         timestamp with time zone            --作成日時
    ,updated_at         timestamp with time zone            --更新日時
);

COMMENT ON COLUMN    admin_users.id                     IS     'ID';
COMMENT ON COLUMN   admin_users.email                  IS     'E-mail';
COMMENT ON COLUMN   admin_users.password               IS     'パスワード';
COMMENT ON COLUMN   admin_users.deleted_at             IS     '削除日時';
COMMENT ON COLUMN   admin_users.created_at             IS     '作成日時';
COMMENT ON COLUMN   admin_users.updated_at             IS     '更新日時';