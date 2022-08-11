---
weight: 3
bookFlatSection: true
title: "Golang (goroutines & concurrency)"
toc: true
---

##  Go concurrency patterns by Rob Pike
https://www.youtube.com/watch?v=f6kdp27TYZs
Main takeaways
- Go routines, has its own call stack, which grows and shrinks as required, and its very cheap, and not a thread
- how to resolve synchronization? channels
- Channels - connection between goroutines, allow them to communicate
    - send message to channel is a blocking operation
    - receive a message from a channel is also a blocking operation
    - when not send/receive, will be waiting
    - in fundatmental, channels are communicate and synchronize in a single operation
- Buffered channels
    - Go channels can also be created with a buffer
    - Buffering removes synchronization
- Go don't communicate by sharing memory, share memory by communicating
    - don't have a piece of shared memory and put locks and mutexes and condition variables around it to protect parallel access
    - instead, use the channel to pass the data back and forth between the goroutines
https://notes.shichao.io/gopl/ch9/