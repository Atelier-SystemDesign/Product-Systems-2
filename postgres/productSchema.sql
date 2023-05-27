--You are connected to database "product2" as user "postgres" via socket in "/var/run/postgresql" at port "5432".

-- Product
-- Definition
CREATE TABLE IF NOT EXISTS productAPI (
id BIGINT CONSTRAINT ppid PRIMARY KEY,
name varChar(100),
slogan varChar(500),
description text,
category varChar(100),
default_price integer
);
-- Copy
COPY productAPI(id, name, slogan, description, category, default_price)
FROM '/home/benjis-brain/hackreactor/senior/sdc/ProductsCSV/product.csv'
DELIMITER ','
CSV HEADER;
-- Related

-- Styles
CREATE TABLE IF NOT EXISTS stylesAPI (
id BIGINT CONSTRAINT styleId PRIMARY KEY,
product_id BIGINT,
name  varChar(100),
sale_price varChar(10),
original_price integer,
default_style  smallint,
CONSTRAINT fk_product FOREIGN KEY(product_id)
    REFERENCES productAPI(id)
);
-- Definition
-- Copy
COPY stylesAPI(id, product_id, name, sale_price, original_price, default_style)
FROM '/home/benjis-brain/hackreactor/senior/sdc/ProductsCSV/styles.csv'
DELIMITER ','
CSV HEADER;

-- Skus
CREATE TABLE IF NOT EXISTS relatedAPI (
product_id BIGINT CONSTRAINT relatedId PRIMARY KEY,
relates_to BIGINT[],
CONSTRAINT related_fk
  FOREIGN KEY(product_id)
    REFERENCES productAPI(id)
);
-- Definition
-- Copy


ALTER TABLE productAPI ADD features json[];
ALTER TABLE stylesAPI ADD photos json[];
ALTER TABLE stylesAPI ADD skus TEXT;