-- Schema creation for pruefungbsp
DROP SCHEMA If EXISTS northwind1 CASCADE;
CREATE SCHEMA northwind1;

-- Table creation
CREATE TABLE northwind1.categories (
    category_id SERIAL PRIMARY KEY,
    category_name TEXT,
    description TEXT,
    picture TEXT
);

CREATE TABLE northwind1.suppliers (
    supplier_id SERIAL PRIMARY KEY,
    company_name TEXT,
    contact_name TEXT,
    contact_title TEXT,
    address TEXT,
    city TEXT,
    region TEXT,
    postal_code TEXT,
    country TEXT,
    phone TEXT,
    fax TEXT,
    home_page TEXT
);

CREATE TABLE northwind1.shippers (
    shipper_id SERIAL PRIMARY KEY,
    company_name TEXT,
    phone TEXT
);

CREATE TABLE northwind1.employees (
    employee_id SERIAL PRIMARY KEY,
    lastname TEXT,
    firstname TEXT,
    title TEXT,
    title_of_courtesy TEXT,
    birth_date DATE,
    hire_date DATE,
    address TEXT,
    city TEXT,
    region TEXT,
    postal_code TEXT,
    country TEXT,
    home_phone TEXT,
    extension TEXT,
    photo TEXT,
    notes TEXT,
    reports_to INTEGER
);

CREATE TABLE northwind1.customers (
    customer_id SERIAL PRIMARY KEY,
    customer_code TEXT,
    company_name TEXT,
    contact_name TEXT,
    contact_title TEXT,
    address TEXT,
    city TEXT,
    region TEXT,
    postal_code TEXT,
    country TEXT,
    phone TEXT,
    fax TEXT
);

CREATE TABLE northwind1.products (
    product_id SERIAL PRIMARY KEY,
    product_name TEXT,
    supplier_id INTEGER REFERENCES northwind1.suppliers(supplier_id),
    category_id INTEGER REFERENCES northwind1.categories(category_id),
    quantity_per_unit TEXT,
    unit_price NUMERIC(10,2),
    units_in_stock BIGINT,
    units_on_order BIGINT,
    reorder_level BIGINT,
    discontinued BOOLEAN
);

CREATE TABLE northwind1.orders (
    order_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES northwind1.customers(customer_id),
    employee_id INTEGER REFERENCES northwind1.employees(employee_id),
    order_date DATE,
    required_date DATE,
    shipped_date DATE,
    ship_via INTEGER REFERENCES northwind1.shippers(shipper_id),
    freight NUMERIC(10,2),
    ship_name TEXT,
    ship_address TEXT,
    ship_city TEXT,
    ship_region TEXT,
    ship_postal_code TEXT,
    ship_country TEXT
);

CREATE TABLE northwind1.order_details (
    order_id INTEGER REFERENCES northwind1.orders(order_id),
    product_id INTEGER REFERENCES northwind1.products(product_id),
    unit_price NUMERIC(10,2),
    quantity BIGINT,
    discount NUMERIC(4,2),
    PRIMARY KEY (order_id, product_id)
);

-- Example data insertion
INSERT INTO northwind1.categories (category_name, description, picture)
VALUES
('Beverages', 'Soft drinks, coffees, teas, beers, and ales', NULL),
('Condiments', 'Sweet and savory sauces, relishes, spreads, and seasonings', NULL);

INSERT INTO northwind1.suppliers (company_name, contact_name, contact_title, address, city, region, postal_code, country, phone, fax, home_page)
VALUES
('Exotic Liquids', 'Charlotte Cooper', 'Purchasing Manager', '49 Gilbert St.', 'London', NULL, 'EC1 4SD', 'UK', '1715552222', NULL, NULL),
('New Orleans Cajun Delights', 'Shelley Burke', 'Order Administrator', 'P.O. Box 78934', 'New Orleans', 'LA', '70117', 'USA', '1005554820', NULL, NULL);

INSERT INTO northwind1.shippers (company_name, phone)
VALUES
('Speedy Express', '555-1234'),
('United Package', '555-5678');

INSERT INTO northwind1.employees (lastname, firstname, title, title_of_courtesy, birth_date, hire_date, address, city, region, postal_code, country, home_phone, extension, photo, notes, reports_to)
VALUES
('Davolio', 'Nancy', 'Sales Representative', 'Ms.', '1948-12-08', '1992-05-01', '507 20th Ave. E. Apt. 2A', 'Seattle', 'WA', '98122', 'USA', '206-555-9857', '5467', NULL, 'Experienced sales rep.', NULL),
('Fuller', 'Andrew', 'Vice President, Sales', 'Dr.', '1952-02-19', '1992-08-14', '908 W. Capital Way', 'Tacoma', 'WA', '98401', 'USA', '206-555-9482', '3456', NULL, 'Leads the sales team.', NULL);

INSERT INTO northwind1.customers (customer_code, company_name, contact_name, contact_title, address, city, region, postal_code, country, phone, fax)
VALUES
('ALFKI', 'Alfreds Futterkiste', 'Maria Anders', 'Sales Representative', 'Obere Str. 57', 'Berlin', NULL, '12209', 'Germany', '030-0074321', '030-0076545'),
('ANATR', 'Ana Trujillo Emparedados y helados', 'Ana Trujillo', 'Owner', 'Avda. de la Constitución 2222', 'México D.F.', NULL, '05021', 'Mexico', '(5) 555-4729', '(5) 555-3745');

INSERT INTO northwind1.products (product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued)
VALUES
('Chai', 1, 1, '10 boxes x 20 bags', 18.00, 39, 0, 10, FALSE),
('Chang', 1, 1, '24 - 12 oz bottles', 19.00, 17, 40, 25, FALSE),
('Konbu',2,2,'LG ARUN',20,19,0,5,FALSE);

INSERT INTO northwind1.orders (customer_id, employee_id, order_date, required_date, shipped_date, ship_via, freight, ship_name, ship_address, ship_city, ship_region, ship_postal_code, ship_country)
VALUES
(1, 1, '2023-12-01', '2023-12-15', '2023-12-05', 1, 32.38, 'Alfreds Futterkiste', 'Obere Str. 57', 'Berlin', NULL, '12209', 'Germany'),
(2, 2, '2023-12-02', '2023-12-16', '2023-12-06', 2, 11.61, 'Ana Trujillo Emparedados y helados', 'Avda. de la Constitución 2222', 'México D.F.', NULL, '05021', 'Mexico');

INSERT INTO northwind1.order_details (order_id, product_id, unit_price, quantity, discount)
VALUES
(1, 1, 18.00, 10, 0.1),
(2, 2, 19.00, 5, 0.2);