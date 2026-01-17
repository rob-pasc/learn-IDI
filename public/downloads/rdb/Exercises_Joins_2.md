That's great\! Since we have a richer dataset now, let's explore some more complex and practical `JOIN` scenarios.

Here are two more exercises, one focusing on a four-table `INNER JOIN` and another combining an `OUTER JOIN` with filtering.

-----

## Medium-to-Hard Tasks (Cont.)

### 7\. Find details of ALL products ordered in 'Germany'

  * **Task:** List the name, unit price, quantity, and discount for every product line item that was part of an order shipped to the country 'Germany'.
  * **Query:**
    ```sql
    SELECT
      p.product_name,
      od.unit_price AS order_unit_price,
      od.quantity,
      od.discount,
      o.order_id
    FROM northwind1.products p
    JOIN northwind1.order_details od ON p.product_id = od.product_id
    JOIN northwind1.orders o ON od.order_id = o.order_id
    WHERE o.ship_country = 'Germany';
    ```
  * **Explanation:** This requires a three-way `INNER JOIN`:
    1.  `products` (`p`) to `order_details` (`od`) to get the item details.
    2.  `order_details` (`od`) to `orders` (`o`) to find the order header information.
    3.  Finally, we apply a `WHERE` clause on the `orders` table to filter the results, only keeping line items from orders that match the `ship_country` condition.

### 8\. List all Shippers and the number of orders they haven't yet shipped

  * **Task:** Display the company name of every shipper, and the count of orders assigned to them that still have a `NULL` value in the `shipped_date` column (meaning they are pending shipment). Include shippers who have 0 pending orders.
  * **Query:**
    ```sql
    SELECT
      s.company_name AS shipper_name,
      COUNT(o.order_id) AS pending_orders_count
    FROM northwind1.shippers s
    LEFT JOIN northwind1.orders o
      ON s.shipper_id = o.ship_via AND o.shipped_date IS NULL
    GROUP BY s.shipper_id, s.company_name
    ORDER BY pending_orders_count DESC;
    ```
  * **Explanation:**
    1.  **`LEFT JOIN` on `shippers` (`s`):** We start with the `shippers` table to ensure **all** shippers are included, even if they have no pending orders.
    2.  **Filter in the `ON` Clause:** The condition `o.shipped_date IS NULL` is placed in the `ON` clause, not the `WHERE` clause. This is vital for a `LEFT JOIN`. It filters the `orders` *before* joining. If it were in the `WHERE` clause, it would convert the `LEFT JOIN` back into an `INNER JOIN` by discarding shippers with no matching pending orders.
    3.  **`GROUP BY` and `COUNT()`:** We group the result by the shipper and use `COUNT(o.order_id)` to count the remaining (pending) orders for each shipper. If a shipper had no pending orders, the `COUNT()` will correctly return 0.