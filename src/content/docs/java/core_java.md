---
title: Core Java
description: Core Java
sidebar:
  order: 1
---

## Java always pass-by-value
- https://www.cs.virginia.edu/~jh2jf/courses/cs2110/java-pass-by-value.html
- primitive type, variable values stored in stack memory
- object, copy the object reference in stack memory

## break vs continue
- break: jump out of a loop
- continue: break one iteration, continue to next iteration

## Serialization vs deserialization
Serialization: convert Object to byte stream
Deserialization: convert byte stream to Object


## Private constructor 
- to restrict object creation.
- if constructor is declared as private, then its object are only accessible from within the declared class. 
- Cannot access its objects from outside the constructor class.

## Reflection 
- is a feature in Java which allows an executing Java program to examine or "introspect" upon itself, and manipulate internal properties of the program. 
- support dynamic retrival and manipulation of classes and datastructures within a Java program
For example, it's possible for a Java class to obtain the names of all its members and display them.
Refelect can:
- find methods of a class, constructors, methods, fields
- invoke methods by name
- create new objects
- change field values

## Unmodifiable vs Immutable
// unmodifiable list - A read only view of another collection, the source collection still can be modified and will be reflected
List list2 = Collections.unmodifiableList(list1);

// immutable list - A read only copy of another collection, source collection update will not reflect to the immutable list
List list3 = Collections.unmodifiableList(new ArrayList<>(list1));

## How to create immutable class:
- declare the class as final, so cannot be extended
- class members should be private, so cannot be accessed outside of class
- no setter methods
- getter method should return the copy of class members
- initilized only via constructor

## final keyword:
- can't be extended or modified
- final is only about the reference, but not about the contents of the referenced object

## Static keyword:
- static variables - a variable which belongs to the class and initilized only once at the start of execution.
- static methods - a method that belongs to a class rather than an instance of a class
- static block - set of instructions that runs only once when a class is loaded into memory
- static nested class - nested class declared as static

## Static Nested class vs Inner Class (non static)
- Static Nest Class - Nested classes that are declared static. (Can instantiate without instantiate outer class, can access outer class private static members)
- Inner class - Non-static nested classes. (Need first instantiate Outer class first, then instantiate inner class)
    - sometimes inner class will also cause memory leak, as inner class object implicitly holds a reference of outer class object, making it cannot GC
    - so if inner class does not need to access outer class members, change to static class instead


## Java Enumerations
- Enum is a special Java type used to define collections of constants.

.valueOf(String str) 
Level level = Level.valueOf("HIGH");

.name() return name of the enum
.toString() default return name, but can be overriden

EnumSet, 
EnumMap

```
public enum Day {
    SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY
}
```

## Thread vs Executor
Thread is used to run your code in parallel.
Executor is an interface which also provides parallel execution, but via a thread pool.
- allows your task to be executed by a worker thread form thread pool.

## ExecutorService (Java6) vs Fork/Join Pool (Java7)

Fork/Join
The fork/join an ExecutorService for running ForkJoinTasks. It is designed for work that can be broken into smaller pieces recursively.
(work-stealing algo: worker thread tries to get tasks from the head of it's own dequeue. 
When it is empty, the thread takes a task from tail of the dequeue of another busy thread.)

Fork/Join's logic is very simple:
1. separate (fork) each large task into smaller tasks (ForkJoinTask, RecursiveAction);
2. process each task in a separate thread (separating those into even smaller tasks if necessary); 
3. join the results.

## ForkJoinPool set ClassLoader (Java 8 vs Java 9/10/11)
https://stackoverflow.com/questions/49113207/completablefuture-forkjoinpool-set-class-loader

```
In Java SE 9, threads that are part of the fork/join common pool will always return the system class loader as their thread context class loader. 
In previous releases, the thread context class loader may have been inherited from whatever thread causes the creation of the fork/join common pool thread, 
e.g. by submitting a task.
```

```
package foo;

public class MyForkJoinWorkerThreadFactory implements ForkJoinWorkerThreadFactory {

    @Override
    public final ForkJoinWorkerThread newThread(ForkJoinPool pool) {
        return new MyForkJoinWorkerThread(pool);
    }

    private static class MyForkJoinWorkerThread extends ForkJoinWorkerThread {

        private MyForkJoinWorkerThread(final ForkJoinPool pool) {
            super(pool);
            // set the correct classloader here
            setContextClassLoader(Thread.currentThread().getContextClassLoader());
        }
    }
} 
```

## RecursiveAction vs RecursiveTask (for ForJoinPool)
RecursiveAction: do not have return result
RecursiveTask: have return result

ExecutorService is an Executor that provides methods to manage the progress-tracking and termination of asynchronous tasks.

Runnable is an interface which represents a task that could be executed by either a Thread or Executor or some similar means.
Thread is a class which creates a new thread.

## Thread states
- https://javaconceptoftheday.com/difference-between-blocked-vs-waiting-states-in-java/

- `NEW` - when a thread is newly created
- `RUNNABLE` - when thread.start() is triggered
- `WAITING` - when the wait(), join(), will remain WAITING state, will be waken up by other threads calling notify() or notifyAll()
- `TIME_WAITING` - waiting for another thread release the lock, up to a given time
- `BLOCKED` - notified by other thread, but still has not got the lock yet, waiting other thread to release the lock
- `TERMINATED` - thread exits

## intrinsic lock (monitor lock) vs extrinsic lock
- Lock: More fine grined and flexibility, With locks, you can release and acquire the locks in any order. - - Also Lock can have fairness.
- Synchronized block: with synchronized, you can release the locks only in the order it was acquired.

### Intrinsic lock:
- In intrinsic locks, acquire-release pairs are block-structured.
In other words, a lock is always released in the same basic block in which it was acquired, regardless of how control exits the block.

### Extrinsic lock:
Extrinsic locks allow the facility to have more explicit control.


## ReentrantLock
- allows threads to enter into the lock on a resource more than once.
- When the thread 1st enter into the lock, a hold count is set to 1.
- Before unlocking the thread can re-enter into lock again and everytime hold count is incremented by one.
- For every unlock(), hold count is decremented by one and when hold count is 0, the resource is unlocked.


- wait() -> suspend a thread, will release the lock or monitor
- join() -> wait this thread to die (https://www.baeldung.com/java-thread-join)
- notify() -> wakes up a single random thread which is waiting for this object's monitor.
- notifyAll() -> wakes up all thread which is waiting for this object's mointor.


-  sleep() -> different from wait(), change state to TIME_WAITING


- https://howtodoinjava.com/java/multi-threading/sleep-vs-wait/



## Lock vs Synchronized

### Synchronzied
- fully contained within a method
- Not support fairness

### lock
- lock() and unlock() operation can be in different methods
    
- support fairness, can config fairness property that the longest waiting thread is given access to the lock

## Lock implementations
- `ReentrantLock`
- `ReentrantReadWriteLock`
- `StampedLock` - supports read and write locks, when lock, will provide a stamp which is then used to release the lock, Optimistic locking

e.g.
https://www.baeldung.com/java-concurrent-locks

```
public class CustomSharedStack {

    Stack<String> stack = new Stack<>();
    int CAPACITY = 5;

    ReentrantLock lock = new ReentrantLock();
    Condition notEmptyCondition = lock.newCondition();
    Condition notFullCondition = lock.newCondition();

    public void pushToStack(Item item) {
        lock.lock();
        try {
            while(stack.size() == CAPACITY) {
                notFullCondition.await(); // wait for not full condition
            }

            stack.push(item);
            notEmptyCondition.signalAll(); // tell other threads not empty anymore

        } catch(InterrupttedException e) {

        } finally {
            lock.unlock();
        }
    }

    public void popFromStack() {
        lock.lock();
        try {
            while(stack.size() == 0) {
                notEmptyCondition.await(); // wait for not empty condition
            }

            return stack.pop();
            notFullCondition.signalAll(); // tell other threads not full anymore

        } finally {            
            lock.unlock();
        }
    }
}
```


### `tryLock()` DOES NOT work with wait() / notify() / notifyAll()
https://stackoverflow.com/questions/52990630/using-trylock-together-with-wait-and-notify-notifyall

Reason: Every object has an implicit lock. Calling wait/notify always uses the implicit lock
Solution: Use Condition 
e.g. Condition notEmpty = lock.newCondition();
notEmpty.signalAll



https://www.cnblogs.com/xing901022/p/8696550.html
https://www.youtube.com/watch?v=J3QZ5gfCtAg  <- CountdownLatch / CyclicBarrier / Phaser (Phaser can be used as both countdownlatch and cyclicBarrier)
### CountDownLatch 
- Awaiting thread waiting for multiple threads (e.g. 3) to trigger countDown(). When all threads (3 threads) have called, the awaiting thread continues to execute
- CountDownLatch cannot be reused

### CyclicBarrier 
- when different threads (e.g. 3) wait for each other and when all have finished their execution, the results will be combined in the parent thread
- CyclicBarrier can be reused

### Semaphore
- A counting semaphore. Conceptually, a semaphore maintains a set of permits.


https://jenkov.com/tutorials/java-concurrency/volatile.html

## Volatile vs Atomic
- volatile keyword guarantees that all reads of - a volatile variable are read directly from main memory, 
- and all writes to a volatile variable are written directly to main memory

- but does not prevent from race conditions, e.g. 2 threads are adding 1 to the volatile counter
    - we should use synchronized block to gaurantee the reading and writing of the variable is atomic
    - e.g. AtomicInteger, AtomicLong AtomicReference
- AtomicInteger could be slow if too many threads will cause too much CPU on AtomicInteger's compare and swap



## Type of class loaders
1. Bootstrap class loader
2. Extension class loaders (extension of the standard core java classes)
3. System/Application class loader (loading all application level classes into JVM, loads files found in classpath env variable)

## hashCode()
```
@Override
public int hashCode() {
    int hash = 7;
    hash = 31 * hash + (int) id;
    hash = 31 * hash + (name == null ? 0 : name.hashCode());
    hash = 31 * hash + (email == null ? 0 : email.hashCode());
    return hash;
}
```

## Data structure BigO
```
Array
Access: O(1)
Search: O(N)
Insert: O(N)
Delete: O(N)

Stack, Queue
Access: O(N)
Search: O(N)
Insert: O(1)
Delete: O(1)

LinkedList, double linked list
Access: O(n)
Search: O(n)
Insert: O(1)
Delete: O(1)
```

## TreeMap: 
celingKey(), floorKey(), firstKey(), lastKey(), headMap(), tailMap() --> they will return null if no such key


## Queue FIFO:
Throws exception: add(), remove(), element()
return special value: offer(), poll(), peek()

## Stack LIFO:
peek(), pop(), push()

Dequeue should be used instead of Stack:
Throws exception: addFirst()/removeFirst()/getFirst()   addLast()/removeLast()/getLast()
return special value: offerFirst()/pollFirst()/peekFirst()   offerLast()/pollLast()/peekLast()

BlockingQueue - commonly used in producer-consumer scenario:
- ArrayBlockingQueue - Bounded blocking queue backed by Array
- LinkedBlockingQueue - Optionally bounded blocking queue backed by LinkedList
- Blocking: put(e), take()

producer consumer design:
- Create a shared queue data structure with capacity (BlockingQueue, or Queue with locks NOT_FULL, NOT_EMPTY)
- If not using blocking queue, implement put() take() method
- Implement Runnable for Producer which will keep running, while queue is not full, put new item to the queue
- Implement Runnable for Consumer which will keep running, while queue is not empty, take first itme from queue
- new 2 threads to run Producer and Consumer Runnable

## CompletableFuture vs Future
- CompletableFuture is used for asynchronous programming in Java, 
  which means writing non-blocking code by running a task on a separate thread than the main thread,
  and later notify the main thread about it's progress (e.g. completed, failed etc)
- Future provides .isDone() .get(), but does not provide any method to manually complete the result (e.g. CompletableFuture.complete())
- Can complete manually (e.g. If API call is time-consuming, you are running it in a separate thread and returning a Future. 
If that API service is down, you want to complete the Future manually by the last cached price of the product. Future can't but CompletableFuture can)

- Can chain multiple futures together (thenApply, thenCompose)
- Can combine multiple futures together 
- Have exception handling


## FunctionalInterface
- an interface which has Single Abstract method (unimplemented method)
- can also have default methods or static methods
- Main diff between abstract class: abstract classes can have constructors, state and behavior

## Abstract class vs Interface
Both of them cannot be instantiated.
Interface helps to declare the functionality, but not implementing it. (Can have default/static methods, but do not have state)
Abstract class can provide some common functionality implementation for the subclasses, allows code reusability.


## Polymophism means "many forms"
- use the methods to perform different tasks
- method overloading (same method name different params) 
- method overriding (child class implements the same method which already provided in parent class)

## Method overloading: 
same method name, but different parameters (no of params / param type)
(Compile time polymophism)
increase readability of the program

## Method overriding: 
subclass to provide the specific implementation that is already provided by parent classes 
(Run-time polymorphism)

HashMap: only allows 1 null key
ConcurrentMaps (ConcurrentHashMap, ConcurrentSkipListMap): Not allow null key (avoid ambiguous)
- ConcurrentHashMap.putIfAbsent() <- to prevent race condition

Important!!
https://books.trinket.io/thinkjava2/chapter9.html
HashMap keys must be IMMUTABLE
String is immutable.
Wrapper classes are immutable (e.g. Integer, Double, Boolean, Character, Long)

Set does not allow null, does not allows duplicates
- Treemap does not allow null
- HashSet allosw 1 null value

Map does not allow duplicates, and only accept 1 null


## AOP
AspectJ spring boot
https://www.baeldung.com/aspectj
https://segmentfault.com/a/1190000013290504
https://blog.jayway.com/2007/02/16/static-mock-using-aspectj/

## Spring Order
- Smallest Value has highest precedence, which will run first
- Highest Value has lowest precedence, which will run later
- High order advice will run first



## JVM Heap vs Non-heap
https://betterprogramming.pub/understanding-the-jvm-memory-model-heap-vs-non-heap-c14aa6fa703e

Heap: (Eden space, survivor space s0, s1, Old gen)
Non Heap: (Meatpspace, Stack memory, code cache)

MetaData: 
Class loader loads a class, allocates memory in the metaspace for its metadata,
that memory is owned by class loader and is only released when class load itself is unloaded.

Stack memory: 
LIFO, contains method that thread called that did not finish its execution, also local variables
- if primitive type, store entirely in stack memory
- if Object, only object reference is stored, actual value is stored on the heap
- memory handling faster than heap
- much smaller capacity than heap
- more safe than heap, can only be accessed by the thread

Code cache:
- compiled byptecode -> machine code by JVM intepreter -> optimization during runtime by JIT compiler 
- optimized machine code stored under code cache


GraalVM
https://dzone.com/articles/profiling-native-images-in-java

Pros:
- faster startup
    - no classloading - all classes have been already loaded, linked and even partially initiated.
    - no interpreted code
    - no need to start JIT compiler and JIT our code to make it performant

Cons:
- reflection
- Only enterprise provides G1GC, otherwise serialGC, heap size
- no threaddudmp, as no JVMTI


Streams Optional.ofNullable:
https://stackoverflow.com/questions/17081063/how-should-we-manage-jdk8-stream-for-null-values
List<String> listOfStuffFiltered = Optional.ofNullable(listOfStuff)
                .orElseGet(Collections::emptyList)
                .stream()
                .filter(Objects::nonNull)
                .collect(Collectors.toList());



Hibernate notes:
N+1 problem
https://stackoverflow.com/questions/32453989/what-is-the-solution-for-the-n1-issue-in-jpa-and-hibernate

The query fetch N times

Root cause: Lazy loading
Fix: Eager fetch, can be explicitly declared in JPA query

e.g.
"from Manufacturer manufacturer join fetch manufacturer.contact contact"

SQL Injection

Solution:
1. Prepared Statements
2. Parameterized Queries

Spring Transaction
@Transactional
-> spring creates proxies for all the classes annotation with @Transactional, either on class or on any of the methods
-> proxy allows spring to inject transactional around the method (to start/commit the transaction)

Isolation Level
DEFAULT (default)
READ_UNCOMMITTED - Oracle not supported
READ_COMMITTED - Default for Oracle, Postgre, SQL Server
REPEATABLE_READ - MySQL default, Oracle not supported 
SERIALIZABLE - highest level of isolation, prevents all concurrency side effects, but lowest concurrent access rate as it executes concurrent calls sequentially.

Oralcle isolation level
Read committed (Default) - every query executed by a transaction sees only data commited before the query began
Serializable - transaction sees only changes committed at the time transaction begin and changes made by transaction itself
Read-only - 

Propagation Level
REQUIRED  (default) - transaction 1 and transaction 2 will be under same transaction
REQUIRES_NEW - transaction 2 executes in a new transaction, outer transaction is suspended
NESTED - uses a single physical transaction with multiple savepoints that it can roll back to.

JPA Locking
https://hackernoon.com/optimistic-and-pessimistic-locking-in-jpa
https://stackoverflow.com/questions/58786195/what-is-the-relation-between-spring-transactional-and-spring-lock-annotation
https://www.baeldung.com/java-jpa-transaction-locks

Optimistic locking: 
- the transaction doesn't lock the entity immediately. Instead, the transaction commonly saves the entity's state with a version number assigned to it.
- @Version
- if the entity is changed, the version number is increased by 1 (or timestamp updated)
- When save, if original version does not match the version in DB, throw exception
- Version number does not change When change @OneToMany and @ManyToMany collections with mappedBy attribute

Pessimistic locking:
- when using perssimistic lock in a transaction and access an entity, entity will be locked immediately. Lock will be released by commit/rollback the transaction.
- table rows are locked at DB level.
- PESSIMISTIC_READ
- PESSIMISTIC_WRITE
- PESSIMISTIC_FORCE_INCREMENT

2 types of locks:
Shared lock:
If someone holds a shared lock, we can read but cannot write in data. If want to modify/delete reserved data, need to obtain exclusive lock.

Exclusive lock:
can be obtained using "SELECT ... FOR UPDATE" statements

## Hibernate 1st level cache vs 2nd level cache
- https://www.java67.com/2017/10/difference-between-first-level-and-second-level-cache-in-Hibernate.html

- 1st level cache - Session level (EntityManager level), always enabled and cannot disable
- 2nd level cache - SessionFactory level (EntityManagerFactory level), disabled by default

- 1st level cache is bounded to the current executing thread, so the cached entities cannot be shared by multiple concurrent requests.
- 2nd level cache is designed to be used by multiple concurrent requests.

- Sequence:
    - DefaultLoadEventListener -> load from session cache (1st level) -> not found, load from 2nd level cache -> load from DB

## RxJava
- https://code.tutsplus.com/tutorials/concurrency-in-rxjava-2--cms-29288
- Schedulers - used to execute a unit of work on a thread.
- subscribeOn(Schedulers.io) - tell observable which schedule to use to push emission
- observeOn() - to tell what thread the consumer will use to receive the emissions

### How to handle back pressure
- Pull strategy - produces only send new request when Subscriber requests
- Limited push strategy - publisher can only send a maximum amount of itesm to client at once
- Canceling the data streaming when consumer cannot process more requests

### RxJava BackPressured
- observables emitting items faster than subscriber can consume
- onBackPressureBuffer


## deadlock (can capture threaddump)
- since Java 1.8 can use jcmd
- jcmd
- jcmd $PID Thread.print

- Unix
- kill -3 <pid>

- spring-boot-actuator
- expose thread dump endpoints
- /actuator/threaddump


## Heapdump (can use to check memory leak)
- jcmd
- jcmd <pid> GC.heap_dump <file-path>

- spring-boot-actuator
- expose threa dump endpoints
- /actuator/heapdump

## Memory leak
- when GC unable to remove the no longer use objects in heap
    - static fields - will not be collected, so becareful when store large collections in static fields
    - singletons, try to use lazy load approach instead of eager load
    - unclosed resources
    - improper implement equals() and hashcode() methods
        - supposed Map should not allow duplicate keys, if implement wrongly will be regarded as different keys
    - Inner class - as inner class object implicity holds a reference to outer class object, make it unable to be GC.

- GC removes unreferenced objects periodically, but it never collects objects that are still being referenced
- Symptoms
    - heap size does not drop in APM tools (e.g. jvisualVM, AppDynamics etc)

Generics
- Parameterized Type 
- allows type to be a parameter of class / methods / and interfaces.
- can create classes / methods which can be worked with different types
- Bounded vs Unbounded generics
    - Bound: <? extends T> , <? extends super T>
    - Unbounded: <?>
- Array does not support Generics


## Parallel GC
https://www.informit.com/articles/article.aspx?p=2496621&seqNum=2
At the time when Parallel GC was introduced in HotSpot, only the young generation used a parallel stop-the-world collector. 
Old generation collections used a single-threaded stop-the-world collector.
- Enhanced version of Parallel GC by adding multithreaded old generation collector to be used with a mutlithreaded young gen collector.
- enabled by XX:+UseParallelOldGC

## G1GC
https://www.oracle.com/technical-resources/articles/java/g1gc.html
G1 - designed for application which require shorter GC pauses.
divides the heap into fixed-sized regions.

### G1GC Concepts
- allocating objects to young gen, and promoting aged objects to old gen
- finding live objects in old gen through concurrent (parallel) marking phase. (Marking phase is triggered when total Java heap occupancy exceeds default threshold)
- recovering free memory by compacting live objects through parallel copying.

- heap is divided into a number of equally sized regions. During Startup JVM will set the region size (1MB - 32MB).
- goal is no more than 2048 regions.
- eden / survivor / old gen are logical sets of these regions and are not continous
- During young collections, G1GC adjust young gen (eden and survivor sizes) to meet soft real-time target.
- During mixed collections, G1GC adjust number of old regions that are collected based on 
    a target number of mixed GC, 
    % of live objects in each region of heap
    overall acceptable heap waste %
- Compaction - reduces heap fragmentation by incremental parallel copy of live objects from one or more sets of regions (CSet) into differnt new regions.
    - in order to reclaim as much heap space as possible.
    - while attempting not to exceed the pause time goal (garbage first)
- Use Remembered Sets (RSets) to track references into regions. Enable parallel and independent collection of regions. ()

- After 1 conncurent marking cycle complete, G1GC switches from young GC to perform mixed GC.
- In mixed GC, G1GC will optionally add some old regions to the set of eden and surviror regsions that will be collected.
- After the G1GC collects a sufficient number of old regions (over multiple mixed GC), G1 back to perform young GC until next marking cycle complete.

### Marking Cycle:
- Initial mark phase - 
- Root region scanning phase - scan survivor regions, runs concurrently (not STW), complete before next STW young GC start.
- Concurrent marking phase - find live objects across the entier heap, runs concurrently, can be interrupted by STW
- Remark phase - STW collection, helps to complete the marking cycle.
- Cleanup phase - STW operation of accounting RSets scrubbing. During accounting, G1GC identifiers completely free regions and mixed GC candidates.


## Comparator
- https://javarevisited.blogspot.com/2021/09/comparator-comparing-thenComparing-example-java-.html#axzz7aTQbNjOI
- Comparing vs thenComparing
- Comparator.comparing(Function<? super T, ? extends U) - accept a Function that extracts a comparator sort key from Type T, return Comparator<T>
- Comparator.thenComparing<Comparator<? super T> comparator> - accepts a comparator, and return another compator

e.g.
listOfBooks.sort(Comparator.comparing((Book b) -> b.getAuthor()));
same as
listOfBooks.sort(Comparator.comparing(Book::getAuthor));

if we need to add more compare criteria, e.g. price


## Project Loom (Java 19)
https://www.youtube.com/watch?v=_fRN7tpLyPk
- 2 types of concurrency
    - Competitive: all threads compete for the CPUs/cores
    - Cooperative: each thread hand of the CPUs to the next
- loom implementation does both
    - OS schedule carrier threads to CPU/cores
    - JDK codes schedule virtual threads to carrier threads
- Most virtual threads scheduling codes are written in Java in JDK (jdk.internal.vm.Continuation)
- those written in C in JVM
    - copy of the stack frames back and forth
    - GCs modified to find references in stack on heap (virtual thread context stores in heap, a stack on heap)
- there are cases not working, native codes in C
    - sometimes virtual threads are pinned to their carrier thread
    - synchronized block
        - written in assembly, uses an address on the stack, stack frames cannot be copied
        - so will stick to the same virtual threads
    - so prefer to use ReentrantLock over synchronized()
- ThreadLocals
    - basically hashMap
    - too heavy for virtual threads (imagine 1M virtual threads, will have 1M of hashMaps, which seems bad)
    - in virtual thread, has new concept, ExtentLocal / ScopedLocal
- Structured Concurrency
    - already