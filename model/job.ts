interface Job {
  id: string;
  parentId: string;
  name: string;
  description: string;
  tags?: string[];
  state: string;
  createdAt: string;
  startedAt: string;
  completedAt: string;
  failedAt: string;
  execution: Task[];
  tasks: Task[];
  inputs: Map<String, String>;
  secrets: Map<String, String>;
  position: number;
  taskCount: number;
  output: string;
  defaults: any;
  webhooks: Webhook[];
}

interface Webhook {
  url: string;
  headers: Map<string, string>;
}
