A web UI for the [Tork](https://github.com/runabol/tork) Workflow Engine.

![screenshot](screenshot.png "Screenshot")

## Getting Started

First, run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Configuration

Default configuration can be found at [.env.development](.env.development).

You can override the default configuration by creating an `.env.local` file.

## TODO

1. Pagination of jobs
2. Retry a failed task
3. Duplicate a job
4. Show node status
5. Cancel a running job
6. Add a drop-down of sample jobs on New Job page.
