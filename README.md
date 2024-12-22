## Tork UI

A web UI for the [Tork](https://github.com/runabol/tork) Workflow Engine.

## Screenshots

List Jobs:

![jobs](screenshots/jobs-v6.png "Jobs")

Create Job:

![create job](screenshots/create-job.png "Create Job")

View Job:

![view job](screenshots/view-job-v5.png "View Job")

Task Logs:

![task logs](screenshots/task-logs.png "Task Logs")

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:8100](http://localhost:8100) with your browser to see the application.

## Docker

```bash
docker run \
  -it \
  --rm \
  --name=tork-web \
  -p 8100:8100 \
  -e BACKEND_URL=http://host.docker.internal:8000 \
  runabol/tork-web
```

## Configuration

Default configuration can be found at [.env.development](.env.development).

You can override the default configuration by creating an `.env.local` file.

## License

Copyright (c) 2023-present Arik Cohen. Tork and Tork Web is free and open-source software licensed under the MIT License.
