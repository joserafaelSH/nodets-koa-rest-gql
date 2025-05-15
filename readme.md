# Experimental repository for test koajs <REST and GQL>

This is a simple playground around KOAjs and yoga gql.
**Just an exploration**

## 🚀 Features

Trying to

- Layer architecture
- DDD
- HTPP
- GQL
- RBAC
- Unit, Integration and E2E test
- MongoDB
- Global error handling

## 📁 Project Structure

```
node-start-template/
├── src/
│   └── app/
│       └── dto/
│           └──auth.ts
│           └──user.ts
│   └── domain/
│       └── entities/
│           └──user.ts
│       └── repository/
│           └──user.ts
│       └── services/
│           └──user.ts
│   └── infra/
│       └── auth/
│       └── gql/
│           └──schema
│               └──schema.ts
│           └──context.ts
│           └──gql.ts
│       └── http/
│           └──http.ts
│       └── libs/
│           └──bcrypt.ts
│           └──jwt.ts
│       └── logger/
│           └──logger.ts
│   └── index.ts
├── build/
├── .env
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── .eslintignore
├── tsconfig.json
├── package.json
├── README.md
└── postman-http.json
```
