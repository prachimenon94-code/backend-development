# Assignment 02 — PostgreSQL as SQL + NoSQL: Working with JSONB

## Overview

This assignment explores how PostgreSQL can support both traditional relational data and flexible NoSQL-style data using the **JSONB** data type.

A product catalog was created using PostgreSQL JSONB, followed by JSONB queries, updates, indexing, and a comparison with MongoDB.

## Objectives

- Understand PostgreSQL `JSONB`
- Compare `JSON` and `JSONB`
- Store structured and flexible data in the same table
- Use JSONB operators such as `->`, `->>`, `@>` and `?`
- Create a GIN index on JSONB data
- Use `EXPLAIN ANALYZE`
- Compare PostgreSQL JSONB with MongoDB

## Technologies Used

- PostgreSQL 18.6
- SQL
- JSONB
- MongoDB
- MongoDB Shell
- VS Code

## Project Structure

```text
Assignment 02 - PostgreSQL JSONB/
│
├── README.md
├── assignment02.md
└── screenshots/
    └── task.png
```

## PostgreSQL Product Catalog

The following products were stored in the PostgreSQL `products` table:

| Product             | Category  |   Price |
| ------------------- | --------- | ------: |
| Clean Code          | Book      |    ₹499 |
| HP Pavilion         | Laptop    | ₹65,000 |
| Wireless Mouse      | Accessory |    ₹999 |
| Mechanical Keyboard | Accessory |  ₹3,499 |
| Samsung Galaxy S24  | Phone     | ₹74,999 |

The `attributes` column uses the PostgreSQL `JSONB` data type, allowing different categories to store different attributes.

### Example

```sql
SELECT name
FROM products
WHERE attributes @> '{"wireless": true}';
```

This query returned:

```text
Wireless Mouse
Mechanical Keyboard
```

## JSONB Operations

The assignment demonstrates:

- `->` — extracts a JSON value
- `->>` — extracts a JSON value as text
- `@>` — checks JSONB containment
- `?` — checks whether a key exists

## Updating JSONB

A discount field was added to the Wireless Mouse:

```sql
UPDATE products
SET attributes = attributes || '{"discount_pct": 10}'
WHERE name = 'Wireless Mouse';
```

## GIN Index

A GIN index was created on the JSONB column:

```s

```
