---
title: JWT Token
description: JWT Token
---

Usage of JWT Tokens:

1. Authorization
2. Information Exchange

JWT tokens consist of 3 parts separated by a period ( . ).

1. Header
2. Payload
3. Signature

The JWT typically looks like:
```
aaaa.bbbb.cccc
```

|JWT Structure|values|
|-------------|------|
|Header       |`alg`: signing algorithm being used, such as HMAC SHA256 or RSA <br/> `typ`: type of the token (e.g. JWT)|
|Payload      |Claims. Claims are statements about an entity (typically, the user) and additional data. <br/> There are three types of claims: `registered`, `public`, and `private` claims.|
|Signature    |To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that.|

## Header
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

## Payload
```
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

### Registered claims
- A set of predefined claims which are not mandatory but recommended, to provide a set of useful, interoperable claims.
- https://datatracker.ietf.org/doc/html/rfc7519#section-4.1

|registered claims|        |
|-----------------|--------|
|"iss" (Issuer) Claim| Identifies the principal that issued the JWT. <br/> The processing of this claim is generally application specific. <br/> The "iss" value is a case-sensitive string containing a StringOrURI value.|
|"sub" (Subject) Claim| Identifies the principal that is the subject of the JWT.|
|"aud" (Audience) Claim| Identifies the recipients that the JWT is intended for.|
|"exp" (Expiration Time) Claim| Identifies the expiration time on or after which the JWT MUST NOT be accepted for processing.|
|"nbf" (Not Before) Claim| Identifies the time before which the JWT MUST NOT be accepted for processing|
|"iat" (Issued At) Claim| identifies the time at which the JWT was issued|
|"jti" (JWT ID) Claim| Provides a unique identifier for the JWT <br/> The "jti" claim can be used to prevent the JWT from being replayed. |

### "jti" claim
The "jti" (JWT ID) claim provides a unique identifier for the JWT.
The identifier value MUST be assigned in a manner that ensures that there is a negligible probability that the same value will be accidentally assigned to a different data object; if the application uses multiple issuers, collisions MUST be prevented among values produced by different issuers as well.  
The "jti" claim can be used to prevent the JWT from being replayed.

### Public claims

### Private claims

## Reference
- https://jwt.io/introduction  (JWT Token structure)