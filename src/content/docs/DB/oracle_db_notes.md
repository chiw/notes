---
title: Oracle DB notes
description: Oracle DB notes
sidebar:
  order: 2
---

Overview of indexes:
An index is an optional structure, associated with a table or table cluster, that can sometimes speed data access. 
By creating an index on one or more columns of a table, 
you gain the ability in some cases to retrieve a small set of randomly distributed rows 
from the table. Indexes are one of many means of reducing disk I/O.

If a heap-organized table has no indexes, then the database must perform a full table scan to find a value. 
For example, without an index, a query of location 2700 in the hr.departments table requires the database to search every row in every table block for this value. 
This approach does not scale well as data volumes increase.

oracle index topics:
1. Index Characteristics
2. B-Tree indexes
3. Bitmap indexes
4. Function-Based indexes
5. Application domain indexes
6. Index storage

## Create Index:
CREATE INDEX supplier_idx ON supplier (supplier_name);

CREATE INDEX supplier_idx ON supplier (supplier_name, city);

CREATE INDEX supplier_idx ON supplier (supplier_name, city) COMPUTE STATISTICS;

## COMPUTE_STATISTICS: 
tells oracle to collect statistics during the creation of the index
The statistics are then used by the optimizer to choose a plan of execution when SQL statements are executed.

## Create a Function-Based Index:
In Oracle, you are not restricted to creating indexes on only columns. You can create function-based indexes.

CREATE INDEX supplier_idx ON supplier (UPPER(supplier_name));

But when using, we need to be ensure that UPPER(supplier_name) does not evaluate to a NULL value.
To ensure this, add UPPER(supplier_name) IS NOT NULL to your WHERE clause as follows

e.g.
SELECT supplier_id, supplier_name, UPPER(supplier_name)
FROM supplier
WHERE UPPER(supplier_name) IS NOT NULL
ORDER BY UPPER(supplier_name);


## Alter index
ALTER INDEX supplier_idx RENAME TO supplier_index_name;

ALTER INDEX index_name REBUILD COMPUTE STATISTICS;

## Drop an index
DROP INDEX index_name;