## Find a Friend API

This project consists in an API for pet adoption developed using Node.js, TypeScript, PrismaORM and Docker.
This project CI (Continuous Integration) was made using Github Actions and execute test routines made with Fastify. Unit tests run automatically on each push and e2e tests run in each pull request in this repository.
Furthermore, a front-end will be developed for this application in the future using React.

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
