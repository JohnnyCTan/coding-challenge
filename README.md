

## Description

A simple NestJS backend API that allows users to create, retrieve, update, and delete notes in a json file.

## Installation

```bash
$ npm install
```

## Running the app (this will run on port 3000)

```bash
$ npm run start
```

## API Endpoints

| Method | Endpoint | Payload |
| --- | --- | ---- |
| GET | /notes | | |
| GET | /notes/`:id` | |
| POST | /notes | `{ title: [STRING], body: [STRING] }` |
| PUT | /notes/`:id` | `{ title: [STRING], body: [STRING] }` |
| DELETE | /notes/`:id` | |

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).
