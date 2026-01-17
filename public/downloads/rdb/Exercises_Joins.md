## Simple Tasks

These tasks involve a single `INNER JOIN` between two tables, linking them by their primary and foreign keys.

### 1\. List all products and their category names

* **Task:** Display the name of each product and the name of the category it belongs to.
* **Query:**
```sql
SELECT
    p.product_name,
    c.category_name
FROM northwind1.products p
INNER JOIN northwind1.categories c
    ON p.category_id = c.category_id;
```


### 2\. List all orders and the customer's company name

* **Task:** Show the `order_id` for every order and the company name of the customer who placed it.
* **Query:**
```sql
SELECT
    o.order_id,
    c.company_name
FROM northwind1.orders o
JOIN northwind1.customers c
    ON o.customer_id = c.customer_id;
```

-----

## Medium Tasks

These tasks involve using `LEFT JOIN` to find non-matching rows or joining three or more tables together.

### 3\. List ALL customers and their order IDs

* **Task:** Display every customer's company name along with any `order_id`s they have placed. **Crucially, include customers who have placed zero orders.**
* **Query:**
```sql
SELECT
    o.order_id,
    c.company_name
FROM northwind1.orders o
RIGHT JOIN northwind1.customers c
    ON o.customer_id = c.customer_id;
```


### 4\. List product, category, and supplier information

* **Task:** Show the product name, its category name, and the company name of its supplier, all in one list.
* **Query:**
```sql
SELECT
    p.product_name,
    c.category_name,
    s.company_name
FROM northwind1.products p
JOIN northwind1.categories c
    ON p.category_id = c.category_id
JOIN northwind1.suppliers s
    ON p.supplier_id = s.supplier_id;
```

-----

## Hard Tasks

These tasks involve more complex concepts like `SELF JOIN`s (joining a table to itself) or combining `JOIN`s with aggregations (`GROUP BY`) to create summary reports.

### 5\. List each employee and their manager's name

* **Task:** Display the full name of each employee and, next to them, the full name of the person they report to (their manager).
* **Query:**
```sql
SELECT
    e.firstname AS employee_firstname,
    e.lastname AS employee_lastname,
    m.firstname AS manager_firstname,
    m.lastname AS manager_lastname
FROM northwind1.employees e
LEFT JOIN northwind1.employees m
    ON e.reports_to = m.employee_id;
```


### 6\. Calculate the total sales for each customer

* **Task:** List every customer's company name and the total amount of money they have spent, calculated from all their order details. Sort the list from highest-spending customer to lowest.
* **Query:**
```sql
SELECT
    c.company_name,
    SUM(od.unit_price * od.quantity * (1 - od.discount)) AS total_money_spent
FROM northwind1.customers c
JOIN northwind1.orders o
    ON c.customer_id = o.customer_id
JOIN northwind1.order_details od
    ON o.order_id = od.order_id
GROUP BY c.customer_id, c.company_name
ORDER BY total_money_spent DESC;
```
