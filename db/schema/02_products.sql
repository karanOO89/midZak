-- Drop and recreate Users table for products

DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL,
  stock INTEGER  NOT NULL,
  is_approved Boolean NOT NULL DEFAULT true,
  is_for_sale Boolean NOT NULL DEFAULT true,
  user_id INTEGER  NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  thumbnail VARCHAR(255) NOT NULL,
  image_id INTEGER  DEFAULT 0
);
GRANT ALL PRIVILEGES ON TABLE products TO labber;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO labber;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO labber;

