## App Overview

Real-time chat app with authentication

### Dev Dependencies

1. **nodemon**: for hot reloads during development
2. **tsx**: to execute typescript files during development

### Dependecies

1. **express**: Library to build server
2. **dotenv**: Enables the use of .env file

### Real Time Messages

- The front end needs to have a websocket context which wraps the app
- After successful authentication, the context creates a websocket connection
- This websocket connection is only for receiving real-time messages
- When a message is sent, it is saved to data-base and then automatically sent to socket connection of the receiver
- Front-end needs to send message to the `messages/send/:id` endpoint

### Assumptions

- Since friend request feature is not mentioned in requirements, any registered user can talk to all registered users
- Data validation handled in front-end
- Assessment requirements mention use of `WebSocket`, assuming it mentions the protocol and not a specific API or library implementation, this project is using `socket.io` library to manage websocket connections

### Challenges

- How to have a different chat room for different people

### What are DTOs

- DTO stands for _Data Transfer Object_. DTOs are interfaces that describe the structure of the requests and responses.

### How generate a random jwt secret

- open git bash or bash
- type `openssl rand -base64 32`
