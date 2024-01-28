ALTER TABLE items
ADD postage integer DEFAULT NULL,
ADD inventory integer DEFAULT NULL;


COMMENT ON COLUMN   items.postage                IS     '送料';
COMMENT ON COLUMN   items.inventory              IS     '在庫';