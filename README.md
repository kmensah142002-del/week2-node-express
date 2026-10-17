# week2-node-express

Simple Express API for the Week 2 assignment.

## Run
```bash
npm install
npm start
```

## Test with curl
```bash
curl http://localhost:3000/
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name":"Ama","email":"ama@example.com"}'
curl -X POST http://localhost:3000/user -H "Content-Type: application/json" -d '{"name":"Ama"}'   # 400
curl http://localhost:3000/user/42
```

## Git
```bash
git init
git add .
git commit -m "Week 2: Express API"
git branch -M main
git remote add origin https://github.com/<your-username>/week2-node-express.git
git push -u origin main
```
