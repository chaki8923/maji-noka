ALTER TABLE item
ADD postage integer DEFAULT NULL,
ADD inventory integer DEFAULT NULL;


COMMENT ON COLUMN   item.postage                IS     '送料';
COMMENT ON COLUMN   item.inventory              IS     '在庫';