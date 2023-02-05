ALTER TABLE item
ADD maji_flag BOOLEAN DEFAULT FALSE;


COMMENT ON COLUMN   item.maji_flag                IS     '本気商品フラグ';