## Find a Friend API

This project consists in an API for pet adoption developed using Node.js, TypeScript, PrismaORM and Docker.
This project CI (Continuous Integration) was made using Github Actions and execute test routines made with Fastify. Unit tests run automatically on each push and e2e tests run in each pull request in this repository.
The interface for this application was developed using React and TypeScript, and can be found [here](https://github.com/dameness/find-a-friend-frontend).

## 💡 Run the project

1. Clone the project:

```
$ git clone https://github.com/dameness/find-a-friend-api
```

2. Go to the project directory:

```
$ cd find-a-friend-api
```

3. Install dependencies:

```
$ yarn
```

4. Run migrations and docker compose:

```
$ docker compose up -d
```

```
$ npm run migrate:run
```

5. Start server:

```
$ npm run dev
```

## 💻 HTTP Routes

### POST `/organizations`

Register Organization

#### Request Body

```json
{
  "name": "Organization",
  "email": "mail@mail.com",
  "phone": "99999999",
  "password": "123456",
  "zip_code": "99999999",
  "state": "SP",
  "city": "Santo André",
  "neighborhood": "Jardim do Estádio",
  "street": "Rua das Hortências"
}
```

### GET `/states`

Get all states and cities

### GET `/organizations/:id`

Get organization by Id

### POST `/sessions`

Authenticate organization

#### Request Body

```json
{
  "email": "mail@mail.com",
  "password": "123456"
}
```

### PATCH `/token/refresh`

Refresh JWT Token: set new refresh token cookie and send new access token

### POST `/upload`

Send file to server

#### Request Body

File (image) sent by front-end.

### GET `/uploads/:filename`

Get file with informed filename in uploads folder. Used for app images uploaded by the user

### POST `/pets`

Register Pet. When registering a pet, the user sends an image, that is automatically uploaded and the pet is
registered with the corresponding URL

#### Request Body

```json
{
  "name": "Pet",
  "description": "description", // optional
  "requirements": "requirements", // optional
  "age": "ADULT", // optional
  "size": "MEDIUM", // optional
  "energy": "MEDIUM", // optional
  "independency": "MEDIUM", // optional
  "space_needed": "MEDIUM", // optional
  "image_url": "/uploads/generated-image-url.png"
}
```

### GET `/pets`

Filter all pets.

#### Query Params

```js
request.query = {
  city: 'city',
  age: 'PUPPY' | 'ADULT' | 'SENIOR', // optional
  size: 'SMALL' | 'MEDIUM' | 'BIG', // optional
  energy: 'LOW' | 'MEDIUM' | 'HIGH', // optional
  independency: 'LOW' | 'MEDIUM' | 'HIGH', // optional
  space_needed: 'LOW' | 'MEDIUM' | 'HIGH', // optional
};
```

### GET `/pet/:id`

Get pet by id.

### Functional Requirements

- [x] The system should be able to register a pet

- [x] The system should be able to list all pets available for adoption in a city

- [x] The system should be able to filter pets based on its characteristics

- [x] The system should be able to show details of a pet

- [x] The system should be able to register an organization

- [x] The system should allow organizations to log in

### Business Rules

- [x] A city must be informed in order to list pets

- [x] An organization must have an address and a phone number

- [x] A pet should be linked to an organization

- [x] The user who wants to adopt a pet should contact the organization via Whatsapp

- [x] All the filters for pets, except for the city, are optional

- [x] An organization that logs in can access the application as an admin
