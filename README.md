## App Overview

Real-time chat application with authentication. This application includes the following features:

- Users can create an account by signing-up
- User can sign-in to the application after successful registration
- Users can view and update their profile details after their account is created
- Users can chat with each other in real-time and even when the receiving user is offline
- Users chat history is saved in the system, users can get all their messages with another user when they sign-in
- Routes for messaging are protected with jwt strategy

### Starting The Application

This app uses `yarn` as a package manager. Ensure you have it installed on your system and have at least `node v18` installed on your computer. All commands mentioned below are executed in the project's root directory.

> Note: You will need an environment file to be able to run the application. Kindly place the `.env` file sent to you via email in the project's root directory. In case you do not have the `.env` file kindly contact the author.

#### Development

- To start the application in development mode, run:

```shell
yarn start:dev
```

#### Production

- For production environments, set **"NODE_ENV"** variable to **"production"** in the `.env` file

```js
NODE_ENV = production
```

- Run the following commands to compile the app, and run the compiled output

```shell
yarn build
yarn start
```

- Note: To compile and start the app at the same time, run

```shell
yarn start:all
```

#### Docker Container

- To run the application in production mode inside a docker container run

```shell
docker-compose up --build
```

### Technologies used

Some of the major packages used are listed below

- **nodemon**: for hot reloads during development
- **tsx**: to execute typescript files during development
- **bcrypt**: for hashing passwords
- **dotenv**: for using environment variables
- **express**: for creating a http server
- **ws**: for creating a websocket server
- **mongoose**: to connect to a mongodb database

### Real Time Messages

- The front end needs to have a websocket context which wraps the app
- After successful authentication, the context creates a websocket connection
- This websocket connection is only for receiving real-time messages
- When a message is sent, it is saved to data-base and then automatically sent to socket connection of the receiver
- Front-end needs to send message to the `messages/send/:id` endpoint while having a websocket connection to `ws://<your-hostname>:port`

### Endpoints

#### `POST` /auth/register

```json
{
  "username": "john",
  "email": "abc@def.com",
  "password": "abc123",
  "fullname": "John"
}
```

#### `POST` /auth/login

```json
{
  "email": "abc@def.com",
  "password": "abc123"
}
```

#### `POST` /auth/logout

```json
{}
```

#### `GET` /messages/`:receiverId`

```json
{}
```

#### `POST` /messages/send/`:receiverId`

```json
{
  "message": "Hi"
}
```

#### `GET` /user

```json
{}
```

#### `POST` /user

```json
{
  "email": "abc@def.com",
  "username": "john1"
}
```

### Assumptions

- Since friend request feature is not mentioned in requirements, any registered user can talk to all registered users
- Data validation handled in front-end
- Assessment requirements mention use of `WebSocket`, hence the `ws` library is used instead of `socket.io`, therefore to ensure successful communication, the front-end application should also be a standard websocket client

### What are DTOs

- DTO stands for _Data Transfer Object_. DTOs are a concept from NestJs. DTOs are interfaces that describe the structure of the json objects sent in the request and response bodies.

### Further Improvement

The following features have not been implemented due to time constraints

- Swagger UI setup and API documentation generated by swagger. The API documentation is written in this readme file
- Indexing for efficient retrieval of data from the database
- Authentication for database access
- Microservice architechture, current app is a monolith application.
- Data validation. Data received from the front end is not checked for formats and types, it is assumed the frnt end handles this
- Test coverage reports
- Tests with mocking
