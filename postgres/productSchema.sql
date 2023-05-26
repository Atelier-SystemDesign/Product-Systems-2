--You are connected to database "product2" as user "postgres" via socket in "/var/run/postgresql" at port "5432".

-- Product
-- Definition
CREATE TABLE IF NOT EXISTS product (
id BIGINT CONSTRAINT pid PRIMARY KEY,
name varChar(100),
slogan varChar(500),
description text,
category varChar(100),
default_price integer
);
-- Copy
COPY product(id, name, slogan, description, category, default_price)
FROM '/home/benjis-brain/hackreactor/senior/sdc/ProductsCSV/product.csv'
DELIMITER ','
CSV HEADER;
-- Related
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

-- Styles
CREATE TABLE IF NOT EXISTS styles (
id BIGINT CONSTRAINT styleId PRIMARY KEY,
product_id BIGINT,
name  varChar(100),
sale_price varChar(10),
original_price integer,
default_style  smallint,
CONSTRAINT fk_product FOREIGN KEY(product_id)
    REFERENCES product(id)
);
-- Definition
-- Copy
COPY styles(id, product_id, name, sale_price, original_price, default_style)
FROM '/home/benjis-brain/hackreactor/senior/sdc/ProductsCSV/styles.csv'
DELIMITER ','
CSV HEADER;

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

-- Skus
CREATE TABLE IF NOT EXISTS skus (
id BIGINT CONSTRAINT skuId PRIMARY KEY,
styleId  BIGINT,
size varChar(8),
quantity  smallint,
CONSTRAINT fk_style
  FOREIGN KEY(styleId)
    REFERENCES styles(id)
);
-- Definition
-- Copy
COPY skus(id, styleId, size, quantity)
FROM '/home/benjis-brain/hackreactor/senior/sdc/ProductsCSV/skus.csv'
DELIMITER ','
CSV HEADER;
-- Transformation

-- Products
----Comes from----
--Product
--features
--related

-- Styles
----Comes from----
--style
--photos

-- Skus
----Comes from----
--skus
