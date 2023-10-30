interface Task {
  id: string;
  name: string;
  state: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  failedAt?: string;
  error: string;
  result: string;
  run: string;
  parallel: Parallel;
  gpus: string;
}

interface Parallel {
  tasks: Task[];
}
