
-- Photos
CREATE TABLE IF NOT EXISTS photos (
id BIGINT CONSTRAINT photoId PRIMARY KEY,
styleId  BIGINT,
url text,
thumbnail_url text,
CONSTRAINT fk_style
  FOREIGN KEY(styleId)
    REFERENCES styles(id)
);
-- Definition
-- Copy
COPY photos(id, styleId, url, thumbnail_url)
FROM '/home/benjis-brain/hackreactor/senior/sdc/ProductsCSV/photos.csv'
DELIMITER ','
CSV HEADER;

CREATE TABLE IF NOT EXISTS related (
id BIGINT CONSTRAINT rid PRIMARY KEY,
current_product_id BIGINT,
related_product_id BIGINT
);
-- Definition
-- Copy
COPY related(id, current_product_id, related_product_id)
FROM '/home/benjis-brain/hackreactor/senior/sdc/ProductsCSV/related.csv'
DELIMITER ','
CSV HEADER;

DELETE FROM related WHERE related_product_id = 0;
ALTER TABLE related ADD CONSTRAINT fk_current FOREIGN KEY (current_product_id) REFERENCES product(id);
ALTER TABLE related ADD CONSTRAINT fk_related FOREIGN KEY (related_product_id) REFERENCES product(id);
-- Features
CREATE TABLE IF NOT EXISTS features (
id BIGINT CONSTRAINT fid PRIMARY KEY,
product_id BIGINT,
feature varChar(50),
value varChar(50),
CONSTRAINT fk_product FOREIGN KEY(product_id) REFERENCES product(id)
);
-- Definition
-- Copy
COPY features(id, product_id, feature, value)
FROM '/home/benjis-brain/hackreactor/senior/sdc/ProductsCSV/features.csv'
DELIMITER ','
CSV HEADER;

COPY skus(id, styleId, size, quantity)
FROM '/home/benjis-brain/hackreactor/senior/sdc/ProductsCSV/skus.csv'
DELIMITER ','
CSV HEADER;