## Tork UI

A web UI for the [Tork](https://github.com/runabol/tork) Workflow Engine.

## Screenshots

List Jobs:

![jobs](screenshots/jobs-v3.png "Jobs")

Create Job:

![create job](screenshots/create-job.png "Create Job")

View Job:

![view job](screenshots/view-job-v5.png "View Job")

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Docker

```bash
docker run \
  -it \
  --rm \
  --name=tork-web \
  -p 3000:3000 \
  -e BACKEND_URL=http://host.docker.internal:8000 \
  runabol/tork-web
```

## Configuration

Default configuration can be found at [.env.development](.env.development).

You can override the default configuration by creating an `.env.local` file.

## TODO

1. Show node status
2. Add a drop-down of sample jobs on New Job page.
3. Job stats

## License

Copyright (c) 2023-present Arik Cohen. Tork and Tork Web is free and open-source software licensed under the MIT License.
