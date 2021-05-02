-- Drop and recreate Users table for products

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price int NOT NULL,
  stock int NOT NULL,
  is_approved Boolean NOT NULL DEFAULT false,
  is_for_sale Boolean NOT NULL DEFAULT true,
  user_id int NOT NULL DEFAULT 1,
  thumbnail VARCHAR(255) NOT NULL,
  imge_id int DEFAULT 0
);
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO labber;
GRANT USAGE, SELECT ON sequence products_id_seq TO labber;

