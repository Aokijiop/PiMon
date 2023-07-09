-- CREATE TABLE products (
--     id INT,
--     name VARCHAR(50),
--     price INT,
--     on_sale BOOLEAN
-- );

CREATE TABLE characters (
    uid INT,
    name VARCHAR(50),
    level INT,
    weapon VARCHAR(50)
);

INSERT INTO characters (uid, name, level, weapon) VALUES (615224465, 'Eula', 90, 'The Unforged');

INSERT INTO characters (uid, name, level, weapon) VALUES (615224465, 'Zhongli', 90, 'Vortex Vanquisher');
DELETE FROM characters WHERE uid=615224465 AND name='Zhongli';
DELETE FROM characters WHERE uid=615224465 AND name='Qiqi';

UPDATE characters SET 
ALTER TABLE users ADD COLUMN email INT;
ALTER TABLE table_name DROP COLUMN column_name;
ALTER TABLE characters ADD COLUMN id SERIAL PRIMARY KEY;