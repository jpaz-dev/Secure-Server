To create a SSL certificates use: 

openssl rsa -in keytmp.pem -out key.pem

openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365