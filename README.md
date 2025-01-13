# yapping-api-gateway

A backend service for a chat application, designed and developed for research and development purposes. Built with scalability, efficiency, and modern communication protocols in mind.

## Features

- User authentication with JWT.
- CRUD operations for resource.
- Integration with RabbitMQ for messaging.
- Real-time updates using WebSockets.
- GRPC communication between service.
- Secure and optimized for production.

## Tech Stack

- **Language:** TypeScript
- **Framework:** NestJS
- **Database:** MongoDB
- **Queue:** RabbitMQ
- **Socket:** SocketIO
- **Other Tools:** Docker, Swagger, Jest

## Getting Started

### Prerequisites

- Node.js (v20+)
- Nestjs CLI (v10+)
- Docker (optional)
- MongoDB instance (local or cloud)
- RabbitMQ instance

### Project setup

```bash
# Clone the repository
git clone https://github.com/biFebriansyah/yapping-api-gateway.git

# Install Depencies
pnpm install
```

### Compile and run the project

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

### Run tests

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Authors

- [@biFebriansyah](https://www.github.com/biFebriansyah)

## License

[MIT](https://choosealicense.com/licenses/mit/)
