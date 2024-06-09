---
title: Idempotency
description: Idempotency
---

# Idempotency
- The result of a successfully performed request is independent of the number of times it is executed.
<br/>

## Idempotent HTTP method
- A method that can be invoked many times without the different outcomes.

- `POST` is NOT idempotent
- `GET`, `PUT`, `DELETE`, `HEAD`, `OPTIONS` and `TRACE` are idempotent.
<br/>

## Safe (HTTP Methods)
An HTTP method is safe if it doesn't alter the state of the server. 

In other words, a method is safe if it leads to a read-only operation.
<br/>

## HTTP Methods Safe / Idempotent
| HTTP Method |Safe?| Idempotent? | Reason |
|-------------|-----|----------------|--------|
|`POST`|Unsafe|Not Idempotent|`POST` APIs are used to create a new resource on the server.|
|`PATCH`|Unsafe|Not Idempotent|`PATCH` is partial update.|
|`GET`|Safe|Yes||
|`PUT`|Unsafe|Yes|`PUT` APIs are used to update the resource state. <br/>If you invoke a PUT API N times, the very first request will update the resource; <br/> the other N-1 requests will just overwrite the same resource state again and again – effectively not changing anything.|
|`DELETE`|Unsafe|Yes|When you invoke N similar `DELETE` requests, the first request will delete the resource and the response will be 200 (OK) or 204 (No Content). <br/> Other N-1 requests will return 404 (Not Found). <br/>Clearly, the response is different from the first request, but there is no change of state for any resource on the server-side because the original resource is already deleted.


## POST
`POST /add_row HTTP/1.1` is not idempotent; if it is called several times, it adds several rows:
<br/>

## GET
GET /pageX HTTP/1.1 is idempotent. Called several times in a row, the client gets the same results:

```
GET /pageX HTTP/1.1
GET /pageX HTTP/1.1
GET /pageX HTTP/1.1
GET /pageX HTTP/1.1
```
<br/>

## DELETE
`DELETE /idX/delete HTTP/1.1` is idempotent, even if the returned status code may change between requests:

```
DELETE /idX/delete HTTP/1.1   -> Returns 200 if idX exists
DELETE /idX/delete HTTP/1.1   -> Returns 404 as it just got deleted
DELETE /idX/delete HTTP/1.1   -> Returns 404
```
<br/>

## Reference
- https://developer.mozilla.org/en-US/docs/Glossary/Idempotent
- https://restfulapi.net/idempotent-rest-apis/
- https://matthung0807.blogspot.com/2019/02/http-idempotent-methods.html