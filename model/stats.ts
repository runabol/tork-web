interface Stats {
  jobs: JobStats;
  tasks: TaskStats;
  nodes: NodeStats;
}

interface JobStats {
  running: number;
}

interface TaskStats {
  running: number;
}

interface NodeStats {
  online: number;
  cpuPercent: number;
}
