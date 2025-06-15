export interface Task {
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

export interface TaskLogPart {
  contents: string;
  createdAt: string;
}

export interface Parallel {
  tasks: Task[];
}
