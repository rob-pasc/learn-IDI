-- This script ADDS more data to the tables created in 'Northwind-small.sql'.
-- It assumes the initial data from that script has already been inserted.

-- Add 6 more Categories (IDs 3-8)
INSERT INTO northwind1.categories (category_name, description)
VALUES
('Dairy Products', 'Cheeses, milks, yogurts'),
('Grains/Cereals', 'Breads, crackers, pasta, and cereal'),
('Meat/Poultry', 'Prepared meats and poultry'),
('Produce', 'Dried fruit and bean curd'),
('Seafood', 'Seaweed and fish'),
('Confections', 'Desserts, candies, and sweet breads');

-- Add 3 more Suppliers (IDs 3-5)
INSERT INTO northwind1.suppliers (company_name, contact_name, contact_title, address, city, region, postal_code, country, phone)
VALUES
('Tokyo Traders', 'Yoshi Nagase', 'Marketing Manager', '9-8 Sekimai Musashino-shi', 'Tokyo', NULL, '100', 'Japan', '(03) 3555-5011'),
('Cooperativa de Quesos Las Cabras', 'Antonio del Valle', 'Export Administrator', 'Calle del Rosal 4', 'Oviedo', 'Asturias', '33007', 'Spain', '(98) 598 76 54');

-- Add 1 more Shipper (ID 3)
INSERT INTO northwind1.shippers (company_name, phone)
VALUES
('Federal Shipping', '(503) 555-9931');

-- Add 5 more Employees (IDs 3-7)
-- We'll make them report to Employee 2 (Andrew Fuller)
INSERT INTO northwind1.employees (lastname, firstname, title, title_of_courtesy, birth_date, hire_date, address, city, region, postal_code, country, home_phone, extension, notes, reports_to)
VALUES
('Leverling', 'Janet', 'Sales Representative', 'Ms.', '1963-08-30', '1992-04-01', '722 Moss Bay Blvd.', 'Kirkland', 'WA', '98033', 'USA', '(206) 555-3412', '3355', 'Janet is a great salesperson.', 2),
('Peacock', 'Margaret', 'Sales Representative', 'Mrs.', '1937-09-19', '1993-05-03', '4110 Old Redmond Rd.', 'Redmond', 'WA', '98052', 'USA', '(206) 555-8122', '5176', 'Margaret has many successful sales.', 2),
('Buchanan', 'Steven', 'Sales Manager', 'Mr.', '1955-03-04', '1993-10-17', '14 Garrett Hill', 'London', NULL, 'SW1 8JR', 'UK', '(71) 555-4848', '3453', 'Steven manages the UK sales team.', 2),
('Suyama', 'Michael', 'Sales Representative', 'Mr.', '1963-07-02', '1993-10-17', 'Coventry House Miner Rd.', 'London', NULL, 'EC2 7JR', 'UK', '(71) 555-7773', '428', 'Michael is fluent in Japanese.', 5),
('King', 'Robert', 'Sales Representative', 'Mr.', '1960-05-29', '1994-01-02', 'Edgeham Hollow Winchester Way', 'London', NULL, 'RG1 9SP', 'UK', '(71) 555-5598', '465', 'Robert is a key part of the UK team.', 5);

-- Add 10 more Customers (IDs 3-12)
INSERT INTO northwind1.customers (customer_code, company_name, contact_name, contact_title, address, city, region, postal_code, country, phone, fax)
VALUES
('ANTON', 'Antonio Moreno Taquería', 'Antonio Moreno', 'Owner', 'Mataderos 2312', 'México D.F.', NULL, '05023', 'Mexico', '(5) 555-3932', NULL),
('BERGS', 'Berglunds snabbköp', 'Christina Berglund', 'Order Administrator', 'Berguvsvägen 8', 'Luleå', NULL, 'S-958 22', 'Sweden', '0920-123 465', '0920-123 467'),
('BLAUS', 'Blauer See Delikatessen', 'Hanna Moos', 'Sales Representative', 'Forsterstr. 57', 'Mannheim', NULL, '68306', 'Germany', '0621-08460', '0621-08924'),
('BOLID', 'Bólido Comidas preparadas', 'Martín Sommer', 'Owner', 'C/ Araquil, 67', 'Madrid', NULL, '28023', 'Spain', '(91) 555 22 82', '(91) 555 91 99'),
('BONAP', 'Bon app''', 'Laurence Lebihan', 'Owner', '12, rue des Bouchers', 'Marseille', NULL, '13008', 'France', '91.24.45.40', '91.24.45.41'),
('BOTTM', 'Bottom-Dollar Markets', 'Elizabeth Lincoln', 'Accounting Manager', '23 Tsawassen Blvd.', 'Tsawassen', 'BC', 'T2F 8M4', 'Canada', '(604) 555-4729', '(604) 555-3745'),
('BSBEV', 'B''s Beverages', 'Victoria Ashworth', 'Sales Representative', 'Fauntleroy Circus', 'London', NULL, 'EC2 5NT', 'UK', '(171) 555-1212', NULL),
('CACTU', 'Cactus Comidas para llevar', 'Patricio Simpson', 'Sales Agent', 'Cerrito 333', 'Buenos Aires', NULL, '1010', 'Argentina', '(1) 135-5555', '(1) 135-4892'),
('CENTC', 'Centro comercial Moctezuma', 'Francisco Chang', 'Marketing Manager', 'Sierras de Granada 9993', 'México D.F.', NULL, '05022', 'Mexico', '(5) 555-3392', '(5) 555-7293'),
('CHOPS', 'Chop-suey Chinese', 'Yang Wang', 'Owner', 'Hauptstr. 29', 'Bern', NULL, '3012', 'Switzerland', '0452-076545', NULL);

-- Add 15 more Products (IDs 4-18)
INSERT INTO northwind1.products (product_name, supplier_id, category_id, quantity_per_unit, unit_price, units_in_stock, units_on_order, reorder_level, discontinued)
VALUES
('Aniseed Syrup', 1, 2, '12 - 550 ml bottles', 10.00, 13, 70, 25, FALSE),
('Chef Anton''s Cajun Seasoning', 2, 2, '48 - 6 oz jars', 22.00, 53, 0, 0, FALSE),
('Grandma''s Boysenberry Spread', 2, 2, '12 - 8 oz jars', 25.00, 120, 0, 25, FALSE),
('Uncle Bob''s Organic Dried Pears', 3, 6, '12 - 1 lb pkgs.', 30.00, 15, 0, 10, FALSE),
('Tofu', 3, 6, '40 - 100 g pkgs.', 23.25, 35, 0, 0, FALSE),
('Genen Shouyu', 3, 2, '24 - 250 ml bottles', 15.50, 39, 0, 5, TRUE),
('Queso Cabrales', 4, 3, '1 kg pkg.', 21.00, 22, 30, 30, FALSE),
('Queso Manchego La Pastora', 4, 3, '10 - 500 g pkgs.', 38.00, 86, 0, 0, FALSE),
('Ikura', 3, 7, '12 - 200 ml jars', 31.00, 31, 0, 0, FALSE),
('Carnarvon Tigers', 5, 7, '16 kg pkg.', 62.50, 42, 0, 0, FALSE),
('Teatime Chocolate Biscuits', 5, 8, '10 boxes x 12 pieces', 9.20, 25, 0, 5, FALSE),
('Sir Rodney''s Marmalade', 5, 8, '30 gift boxes', 81.00, 40, 0, 0, FALSE),
('Gorgonzola Telino', 4, 3, '12 - 100 g pkgs', 12.50, 0, 70, 20, TRUE),
('Mascarpone Fabioli', 4, 3, '24 - 200 g pkgs.', 32.00, 9, 40, 25, FALSE),
('Geitost', 4, 3, '500 g', 2.50, 112, 0, 20, FALSE);

-- Add 10 more Orders (IDs 3-12)
INSERT INTO northwind1.orders (customer_id, employee_id, order_date, required_date, shipped_date, ship_via, freight, ship_name, ship_address, ship_city, ship_region, ship_postal_code, ship_country)
VALUES
(3, 3, '2024-01-10', '2024-02-07', '2024-01-15', 3, 45.50, 'Antonio Moreno Taquería', 'Mataderos 2312', 'México D.F.', NULL, '05023', 'Mexico'),
(5, 4, '2024-01-12', '2024-02-09', '2024-01-17', 1, 22.98, 'Blauer See Delikatessen', 'Forsterstr. 57', 'Mannheim', NULL, '68306', 'Germany'),
(4, 5, '2024-01-15', '2024-02-12', '2024-01-20', 2, 65.83, 'Berglunds snabbköp', 'Berguvsvägen 8', 'Luleå', NULL, 'S-958 22', 'Sweden'),
(9, 6, '2024-01-20', '2024-02-17', '2024-01-25', 3, 3.25, 'B''s Beverages', 'Fauntleroy Circus', 'London', NULL, 'EC2 5NT', 'UK'),
(10, 7, '2024-02-01', '2024-03-01', '2024-02-06', 1, 58.17, 'Cactus Comidas para llevar', 'Cerrito 333', 'Buenos Aires', NULL, '1010', 'Argentina'),
(8, 2, '2024-02-05', '2024-03-05', '2024-02-10', 2, 22.98, 'Bottom-Dollar Markets', '23 Tsawassen Blvd.', 'Tsawassen', 'BC', 'T2F 8M4', 'Canada'),
(1, 4, '2024-02-10', '2024-03-09', '2024-02-15', 3, 140.51, 'Alfreds Futterkiste', 'Obere Str. 57', 'Berlin', NULL, '12209', 'Germany'),
(6, 1, '2024-02-12', '2024-03-11', '2024-02-17', 2, 3.67, 'Bólido Comidas preparadas', 'C/ Araquil, 67', 'Madrid', NULL, '28023', 'Spain'),
(7, 3, '2024-03-01', '2024-03-29', '2024-03-06', 1, 12.51, 'Bon app''', '12, rue des Bouchers', 'Marseille', NULL, '13008', 'France'),
(5, 4, '2024-03-02', '2024-03-30', NULL, 2, 6.93, 'Blauer See Delikatessen', 'Forsterstr. 57', 'Mannheim', NULL, '68306', 'Germany');

-- Add Order Details for the new orders
INSERT INTO northwind1.order_details (order_id, product_id, unit_price, quantity, discount)
VALUES
(3, 4, 10.00, 10, 0),
(3, 5, 22.00, 5, 0.1),
(3, 10, 21.00, 12, 0.1),
(4, 8, 23.25, 2, 0),
(4, 13, 31.00, 20, 0),
(5, 11, 38.00, 15, 0.05),
(5, 18, 2.50, 30, 0.05),
(6, 14, 62.50, 4, 0),
(7, 1, 18.00, 25, 0.15),
(7, 7, 30.00, 30, 0),
(7, 12, 31.00, 10, 0.15),
(8, 16, 12.50, 6, 0.05),
(8, 17, 32.00, 1, 0.05),
(9, 3, 20.00, 10, 0),
(9, 8, 23.25, 1, 0),
(10, 11, 38.00, 20, 0.1),
(10, 15, 9.20, 5, 0.1);