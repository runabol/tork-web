interface Task {
  id: string;
  name: string;
  state: string;
  createdAt: string;
  startedAt: string;
  completedAt: string;
  failedAt: string;
  error: string;
  result: string;
  run: string;
  parallel: Parallel;
}

interface Parallel {
  tasks: Task[];
}
