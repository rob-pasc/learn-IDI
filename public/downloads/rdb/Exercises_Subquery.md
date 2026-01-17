
# Schema `northwind1`

-----

## Simple Tasks

These tasks typically use a subquery in the `WHERE` clause with `IN`, `NOT IN`, or a simple comparison operator (`=`, `>`, etc.).

### 1\. Find all products in the 'Beverages' category

  * **Task:** List the names and unit prices of all products that belong to the category named 'Beverages'.
  * **Query:**
    ```sql
    SELECT product_name, unit_price
    FROM northwind1.products
    WHERE category_id IN (
      SELECT category_id
      FROM northwind1.categories
      WHERE category_name = 'Beverages'
    );
    ```
 

### 2\. Find all customers who have never placed an order

  * **Task:** List the company names of all customers who do not have any orders in the `orders` table.
  * **Query:**
    ```sql
    SELECT company_name
    FROM northwind1.customers
    WHERE customer_id NOT IN (
        SELECT customer_id
        FROM northwind1.orders
    );
    ```

-----

## Medium Tasks

These tasks involve more complex `WHERE` conditions, such as using `EXISTS` or comparing against an aggregate value (like an average).

### 3\. Find products more expensive than the average

  * **Task:** List the product name and unit price of all products that are more expensive than the average unit price of *all* products.
  * **Query:**
    ```sql
    SELECT p.product_name, p.unit_price
    FROM northwind1.products p
    WHERE p.unit_price > (
        SELECT AVG(unit_price)
        FROM northwind1.products
    );
    ```
 
### 4\. Find suppliers of discontinued products

  * **Task:** List the company names of all suppliers who supply at least one product that is marked as `discontinued`.
  * **Query:**
    ```sql
    SELECT s.company_name
    FROM northwind1.suppliers s
    WHERE EXISTS (
        SELECT 1
        FROM northwind1.products p
        WHERE p.discontinued = TRUE
            AND s.supplier_id = p.supplier_id
    );
    ```
 
-----

## Hard Tasks

These tasks often involve subqueries in the `FROM` clause (derived tables) to perform multi-stage aggregations, or complex correlated subqueries in the `SELECT` clause.

### 5\. List all customers and their total order count

  * **Task:** Display every customer's company name and, next to it, the total number of orders they have placed. Include customers who have placed 0 orders.
  * **Query:**
    ```sql
    SELECT
        c.company_name,
        (
            SELECT COUNT(*)
            FROM northwind1.orders o
            WHERE c.customer_id = o.customer_id
        ) AS order_count
    FROM northwind1.customers c;
    ```


### 6\. Calculate the average number of line items per order

  * **Task:** First, find the number of different products (line items) on each order. Then, calculate the average of those counts.
  * **Query:**
    ```sql
    SELECT AVG(line_items) AS average_order_items
    FROM (
        SELECT
            order_id,
            COUNT(product_id) AS line_items
        FROM northwind1.order_details od
        GROUP BY od.order_id
    ) AS order_items;
    ```
 
### 7\. Find the employee with the most orders for 'Germany'

  * **Task:** Identify the employee (first name and last name) who has processed the highest number of orders shipped to 'Germany'.
  * **Query:**
    ```sql
    SELECT
        e.firstname,
        e.lastname
    FROM northwind1.employees e
    WHERE e.employee_id = (
        SELECT o.employee_id
        FROM northwind1.orders o
        WHERE ship_country = 'Germany'
        GROUP BY o.employee_id
        ORDER BY COUNT(order_id) DESC
        LIMIT 1
    );
    ```

