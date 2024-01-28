ALTER TABLE items
ADD maji_flag BOOLEAN DEFAULT FALSE;


COMMENT ON COLUMN   items.maji_flag                IS     '本気商品フラグ';