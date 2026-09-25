user: admin
email: admin@mail.com
pass: admin


```
curl -X POST http://127.0.0.1:8000/api/auth/token/ -H "Content-Type: application/json" -d '{"username":"testuser","password":"testpassword123"}'
