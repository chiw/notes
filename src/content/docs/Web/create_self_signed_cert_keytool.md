---
title: Create Self signed cert with Java Keytool
description: Create Self signed cert with Java Keytool
sidebar:
  order: 1
---



**keytool** location: `$JAVA_HOME/bin`
**validity** in days, e.g. 365 * 20 years = 7300 days

1. Generate key pair
```
$JAVA_HOME/bin/keytool -genkeypair -alias demo-self-signed -keyalg RSA -keystore demo-self-signed-cert-keystore.jks -keypass keypassword -storepass storepassword
```

2. Convert JKS to the PKCS12 format
```
$JAVA_HOME/bin/keytool -importkeystore -srckeystore demo-self-signed-cert-keystore.jks -srcstorepass storepassword -srckeypass keypassword -srcalias demo-self-signed -destalias demo-self-signed -destkeystore demo-self-signed-cert-keystore.p12 -deststoretype PKCS12 -deststorepass password -destkeypass password
```

3. Exporting the Private key from the PKCS12 format keystore
```
openssl pkcs12 -in demo-self-signed-cert-keystore.p12 -nodes -nocerts -out demo-self-signed-cert-keystore-private-key.pem
```

4. Exporting the Public Key
```
openssl pkcs12 -in demo-self-signed-cert-keystore.p12 -nokeys -out demo-self-signed-cert-keystore-public-key-cert.pem
```


## Reference
- https://javamastermind.com/2020/01/19/create-a-self-signed-certificate-with-java-keytool/
- https://dzone.com/articles/extracting-a-private-key-from-java-keystore-jks