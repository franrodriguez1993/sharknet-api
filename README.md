## Shatknet E-Commerce APIrest

Shatknet is an E-Commerce APIrest built with NodeJS, Typescript, PostgreSQL, JSON web token, and ImageKit. It provides endpoints for creating and managing products, orders, and customers, as well as uploading and managing product images using ImageKit. The APIrest also includes authentication using JSON web tokens.

### Getting Started

To get started with this project, follow these steps:

- Clone the repository: git clone https://github.com/franrodriguez1993/sharknet-api.git
- Install dependencies: npm install
- Copy the example .env file and fill in the appropriate values: cp .env.example .env
- Create a PostgreSQL database and update the .env file with the database URL.
- Start the server: npm run dev

### Environment Variables:

JSON Web Token secret keys:
There're two JWT secret keys because one of the keys is for a refresh session system.

- JWT_SECRET
- JWT_REFRESH

PostgreSQL variables:
You can create a local postgreSQL database or use an online database service.

- POSTGRES_HOST
- POSTGRES_DB
- POSTGRES_USERNAME
- POSTGRES_PASSWORD

Cors:
Add a list of URLs for the white list by default you can set "http://localhost:5000"
CORS_URL1 =
CORS_URL2 =

ImageKit:
Variables for the online image hosting.

IK_PUBLIC_KEY =
IK_PRIVATE_KEY=
IK_URL_ENDPOINT =

Spanish docs:
https://documenter.getpostman.com/view/22341124/2s8Z6vaaGK
