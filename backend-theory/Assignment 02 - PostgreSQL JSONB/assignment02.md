# Assignment 02 — PostgreSQL as SQL + NoSQL: Working with JSONB

## Part A — Theory

### 1. What is JSONB and how is it different from JSON?

PostgreSQL provides both `json` and `jsonb` data types for storing JSON data. The main difference is how the data is stored internally. The `json` type stores the original JSON text, while `jsonb` stores the data in a decomposed binary format.

Because JSONB is parsed when it is stored, PostgreSQL can process and query JSONB data efficiently. JSON may have a slight advantage during insertion because the original text does not need to be converted into the binary representation used by JSONB. However, JSONB is generally more useful when applications frequently search, filter, or index JSON data.

JSONB also supports indexing, including GIN indexes, which can improve searches involving JSONB data.

Example:

```sql
CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    attributes JSONB
);

INSERT INTO products (name, attributes)
VALUES (
    'Wireless Mouse',
    '{"brand": "Logitech", "wireless": true}'
);
```

Therefore, JSONB is particularly useful when JSON data needs to be queried and indexed rather than simply stored and returned as original text.

---

### 2. How can PostgreSQL work as both SQL and NoSQL in the same table?

PostgreSQL can combine traditional relational columns with flexible JSONB data in the same table.

For example, a product table can contain structured columns such as `id`, `name`, `category`, and `price`. These columns have defined SQL data types and can use constraints such as `PRIMARY KEY` and `NOT NULL`.

At the same time, product-specific information can be stored in a JSONB column called `attributes`. Different products can therefore have different attributes without requiring a separate SQL column for every possible property.

For example, a laptop may contain RAM and CPU information, while a book may contain author and page count.

```sql
CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    attributes JSONB
);
```

This approach combines the structured nature of SQL with the flexibility normally associated with NoSQL document databases.

---

### 3. Explain the JSONB operators `->`, `->>`, `@>` and `?`

PostgreSQL provides several operators for working with JSONB data.

The `->` operator extracts a JSON object field or array element and returns it as a JSON/JSONB value.

The `->>` operator also extracts a field, but returns the result as text. This is useful when the extracted value needs to be compared or converted to another data type.

The `@>` operator checks whether one JSONB value contains another JSONB value. It returns a Boolean result.

The `?` operator checks whether a specified key exists at the top level of a JSONB object.

Examples:

```sql
SELECT attributes -> 'brand'
FROM products;
```

The result is returned as a JSON value.

```sql
SELECT attributes ->> 'brand'
FROM products;
```

The result is returned as text.

Containment:

```sql
SELECT name
FROM products
WHERE attributes @> '{"wireless": true}';
```

Key existence:

```sql
SELECT name
FROM products
WHERE attributes ? 'brand';
```

These operators make it possible to query flexible JSONB data directly using SQL.

---

### 4. What is a GIN index and what does it speed up?

GIN stands for **Generalized Inverted Index**. PostgreSQL can use GIN indexes to efficiently search values contained inside JSONB documents.

For example, a product catalog may contain thousands of products with different JSONB attributes. Searching the JSONB column for a particular key-value combination can become expensive if PostgreSQL has to examine every row.

A GIN index can improve queries involving JSONB operators such as containment and key existence.

Example:

```sql
CREATE INDEX idx_products_attributes
ON products USING GIN (attributes);
```

A query such as:

```sql
SELECT name
FROM products
WHERE attributes @> '{"wireless": true}';
```

can benefit from the JSONB GIN index, particularly when the table is large.

However, an index does not guarantee faster execution for every query. PostgreSQL's query planner chooses the execution method based on the table size and estimated cost.

In this assignment, only five products were stored. PostgreSQL selected a sequential scan during `EXPLAIN ANALYZE`, which is reasonable because scanning five rows is inexpensive.

A GIN index therefore becomes more useful as the amount of JSONB data increases.

---

### 5. PostgreSQL JSONB vs MongoDB

PostgreSQL JSONB and MongoDB can both store flexible document-style data, but their database models are different.

PostgreSQL is primarily a relational database. JSONB adds flexible document storage inside PostgreSQL while still allowing traditional SQL features such as typed columns, constraints, transactions, and joins.

MongoDB is a document-oriented database. Its primary data model consists of BSON documents, which provide flexible schemas and nested data structures.

PostgreSQL is useful when an application requires relational features together with flexible attributes. MongoDB is useful when the application's data naturally fits a document-oriented model.

Example PostgreSQL JSONB query:

```sql
SELECT name
FROM products
WHERE attributes @> '{"wireless": true}';
```

The same type of search in MongoDB can be written as:

```javascript
db.products.find({
  "attributes.wireless": true,
});
```

Both systems support indexes and querying nested data. PostgreSQL provides strong relational capabilities, while MongoDB is centered around document-oriented storage.

---

# Part B — Hands-On

## Task 1 — Create the Products Table

```sql
CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    price NUMERIC(10,2) NOT NULL,
    attributes JSONB
);
```

The table was successfully created in PostgreSQL.

---

## Task 2 — Insert Five Products

```sql
INSERT INTO products (name, category, price, attributes) VALUES
('Clean Code', 'book', 499.00,
    '{"author": "Robert C. Martin", "pages": 464}'),

('HP Pavilion', 'laptop', 65000.00,
    '{"brand": "HP", "ram_gb": 16, "cpu": "Intel i5"}'),

('Wireless Mouse', 'accessory', 999.00,
    '{"brand": "Logitech", "wireless": true, "dpi": 1600}'),

('Mechanical Keyboard', 'accessory', 3499.00,
    '{"brand": "Keychron", "switch": "Red", "wireless": true}'),

('Samsung Galaxy S24', 'phone', 74999.00,
    '{"brand": "Samsung", "storage_gb": 256, "5g": true}');
```

Output:

```text
INSERT 0 5
```

The five products were successfully inserted.

---

## Task 3 — Category-Specific Queries

### Laptop

```sql
SELECT name, attributes ->> 'ram_gb' AS ram
FROM products
WHERE category = 'laptop'
  AND (attributes ->> 'ram_gb')::int >= 16;
```

### Book

```sql
SELECT name, attributes ->> 'author' AS author
FROM products
WHERE category = 'book';
```

### Accessory

```sql
SELECT name, attributes ->> 'wireless' AS wireless
FROM products
WHERE category = 'accessory'
  AND (attributes ->> 'wireless')::boolean = true;
```

### Phone

```sql
SELECT name, attributes ->> '5g' AS supports_5g
FROM products
WHERE category = 'phone'
  AND (attributes ->> '5g')::boolean = true;
```

The queries demonstrate how category-specific information can be stored and extracted from the JSONB column.

---

## Task 4 — JSONB Containment

```sql
SELECT name
FROM products
WHERE attributes @> '{"wireless": true}';
```

Output:

```text
Wireless Mouse
Mechanical Keyboard
```

The `@>` operator checks whether the JSONB document contains the specified key-value pair.

---

## Task 5 — Update JSONB

A discount attribute was added to the Wireless Mouse:

```sql
UPDATE products
SET attributes = attributes || '{"discount_pct": 10}'
WHERE name = 'Wireless Mouse';
```

Output:

```text
UPDATE 1
```

Verification:

```sql
SELECT name, attributes
FROM products
WHERE name = 'Wireless Mouse';
```

Result:

```text
Wireless Mouse |
{"dpi": 1600, "brand": "Logitech", "wireless": true, "discount_pct": 10}
```

---

## Task 6 — GIN Index

A GIN index was created on the JSONB column:

```sql
CREATE INDEX idx_products_attributes
ON products USING GIN (attributes);
```

Output:

```text
CREATE INDEX
```

`EXPLAIN ANALYZE` was then used:

```sql
EXPLAIN ANALYZE
SELECT name
FROM products
WHERE attributes @> '{"wireless": true}';
```

The execution plan showed:

```text
Seq Scan on products
Rows Removed by Filter: 3
Execution Time: 0.030 ms
```

The sequential scan is expected because the table contains only five rows. PostgreSQL can determine that scanning five rows is inexpensive, so using the index is not necessary for this small dataset.

---

# Part C — MongoDB Equivalent

The same five products can be represented as MongoDB documents.

```javascript
use backend_assignment2

db.products.insertMany([
  {
    name: "Clean Code",
    category: "book",
    price: 499.00,
    attributes: {
      author: "Robert C. Martin",
      pages: 464
    }
  },
  {
    name: "HP Pavilion",
    category: "laptop",
    price: 65000.00,
    attributes: {
      brand: "HP",
      ram_gb: 16,
      cpu: "Intel i5"
    }
  },
  {
    name: "Wireless Mouse",
    category: "accessory",
    price: 999.00,
    attributes: {
      brand: "Logitech",
      wireless: true,
      dpi: 1600
    }
  },
  {
    name: "Mechanical Keyboard",
    category: "accessory",
    price: 3499.00,
    attributes: {
      brand: "Keychron",
      switch: "Red",
      wireless: true
    }
  },
  {
    name: "Samsung Galaxy S24",
    category: "phone",
    price: 74999.00,
    attributes: {
      brand: "Samsung",
      storage_gb: 256,
      "5g": true
    }
  }
])
```

### Equivalent MongoDB Queries

Laptop:

```javascript
db.products.find({
  category: "laptop",
  "attributes.ram_gb": { $gte: 16 },
});
```

Accessory:

```javascript
db.products.find({
  category: "accessory",
  "attributes.wireless": true,
});
```

Phone:

```javascript
db.products.find({
  category: "phone",
  "attributes.5g": true,
});
```

Wireless products:

```javascript
db.products.find({
  "attributes.wireless": true,
});
```

Updating the discount:

```javascript
db.products.updateOne(
  { name: "Wireless Mouse" },
  { $set: { "attributes.discount_pct": 10 } },
);
```

---

# PostgreSQL JSONB vs MongoDB

| Feature               | PostgreSQL JSONB                    | MongoDB                      |
| --------------------- | ----------------------------------- | ---------------------------- |
| Database model        | Relational + JSONB                  | Document-oriented            |
| Flexible attributes   | JSONB column                        | BSON document                |
| Query language        | SQL + JSONB operators               | MongoDB query syntax         |
| Joins                 | Native SQL joins                    | Document-oriented operations |
| Transactions          | Supported                           | Supported                    |
| Schema                | Structured columns + flexible JSONB | Flexible document schema     |
| JSON/document indexes | GIN and other indexes               | MongoDB indexes              |
| Data representation   | Rows + JSONB                        | Documents                    |

---

# Conclusion

This assignment demonstrates that PostgreSQL can support both relational and flexible document-style data through JSONB.

The product catalog used normal SQL columns for important structured information such as product name, category, and price, while variable product-specific information was stored in the JSONB `attributes` column.

JSONB operators were used to extract values, check containment, and update documents. A GIN index was also created and examined using `EXPLAIN ANALYZE`.

The same product data was then represented using MongoDB documents, showing how both PostgreSQL JSONB and MongoDB can support flexible product attributes while using different database models and query syntax.
