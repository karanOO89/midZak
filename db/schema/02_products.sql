DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price int NOT NULL,
  stock int NOT NULL,
  is_approved Boolean NOT NULL DEFAULT FALSE,
  is_for_sale Boolean NOT NULL DEFAULT FALSE,
  user_id int,
  thumbnail  VARCHAR(255) NOT NULL,
  imge_id int
);
GRANT ALL PRIVILEGES ON products TO labber;
GRANT USAGE, SELECT ON sequence products_id_seq TO labber;