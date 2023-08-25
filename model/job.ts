interface Job {
  id: string;
  parentId: string;
  name: string;
  description: string;
  state: string;
  createdAt: string;
  startedAt: string;
  completedAt: string;
  failedAt: string;
  execution: Task[];
  tasks: Task[];
  inputs: Map<String, String>;
  position: number;
  taskCount: number;
  output: string;
}
