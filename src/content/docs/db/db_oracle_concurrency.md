---
title: Oracle Concurrency
description: Oracle Concurrency
sidebar:
  order: 2
---

ANSI/ISO Transaction Isolation Levels
The SQL standard, which has been adopted by both ANSI and ISO/IEC, defines four levels of transaction isolation. These levels have differing degrees of impact on transaction processing throughput.

## ANSI/ISO Transaction Isolation levels
- Read uncommitted
- Read committed
- Repeatable read
- Serializable


These isolation levels are defined in terms of phenomena that must be prevented between concurrently executing transactions. 

Preventable Read phenomena are:
|Preventable Read phenomena|                     |
|--------------------------|---------------------|
|Dirty Read                |A transaction reads data that has been written by another transaction that has not been committed yet.|
|Nonrepeatable (fuzzy) Read|A transaction rereads data it has previously read and finds that another committed transaction has modified or deleted the data. <br/><br/> For example, a user queries a row and then later queries the same row, only to discover that the data has changed.|
|Phantom Read              |A transaction reruns a query returning a set of rows that satisfies a search condition and finds that another committed transaction has inserted additional rows that satisfy the condition. <br/><br/> For example, a transaction queries the number of employees. Five minutes later it performs the same query, but now the number has increased by one because another user inserted a record for a new hire. More data satisfies the query criteria than before, but unlike in a fuzzy read the previously read data is unchanged.|

Preventable Read Phenomena by Isolation Level
|Isolation Level |Dirty Read  |Nonrepeatable (fuzzy) Read|Phantom Read|
|----------------|------------|--------------------------|------------|
|Read uncommitted|Possible    |Possible                  |Possible    |
|Read committed  |Not Possible|Possible                  |Possible    |
|Repeatable read |Not Possible|Not Possible              |Possible    |
|Serializable    |Not Possible|Not Possible              |Not Possible|

## Oracle Database provides the transaction isolation levels:
|Oracle Isolation Levels|                  |
|-----------------------|------------------|
|Read Committed Isolation Level|(Default) <br/> Every query executed by a transaction sees only data committed before the query—not the transaction—began.|
|Serializable Isolation Level|A transaction sees only changes committed at the time the transaction—not the query—began and changes made by the transaction itself.|
|Read-Only Isolation Level|Similar to the serializable isolation level, but read-only transactions do not permit data to be modified in the transaction unless the user is `SYS`.|

## Read Commited Isolation Level (Default)
A query in a read committed transaction avoids reading data that commits while the query is in progress. 

For example, if a query is halfway through a scan of a million-row table, and if a different transaction commits an update to row 950,000, then the query does not see this change when it reads row 950,000. 
However, because the database does not prevent other transactions from modifying data read by a query, other transactions may change data between query executions. 

Thus, a transaction that runs the same query twice may experience fuzzy reads and phantoms.

### Read Consistency in the Read Committed Isolation Level (Subqueries)
The database provides a consistent result set for every query, guaranteeing data consistency, with no action by the user.

An **implicit query**, such as a query implied by **a WHERE clause in an UPDATE statement**, is guaranteed a consistent set of results. 
However, each statement in an implicit query does not see the changes made by the DML statement itself, but sees the data as it existed before changes were made.

### Conflicting Writes in Read Committed Transactions (Row locks)
n a read committed transaction, a conflicting write occurs when the transaction attempts to change a row updated by an uncommitted concurrent transaction.

The transaction that prevents the row modification is sometimes called a blocking transaction. The read committed transaction waits for the blocking transaction to end and release its row lock.

The options are as follows:
- If the blocking transaction rolls back, then the waiting transaction proceeds to change the previously locked row as if the other transaction never existed.
- If the blocking transaction commits and releases its locks, then the waiting transaction proceeds with its intended update to the newly changed row.

### Lost updates

## Serializable Isolation Level

## Read-Only Isolation Level

## Reference
- https://docs.oracle.com/en/database/oracle/oracle-database/21/cncpt/data-concurrency-and-consistency.html#GUID-7F2C6927-5482-4144-B43B-5E90EF4E055B