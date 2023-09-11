interface Metrics {
  jobs: JobMetrics;
  tasks: TaskMetrics;
  nodes: NodeMetrics;
}

interface JobMetrics {
  running: number;
}

interface TaskMetrics {
  running: number;
}

interface NodeMetrics {
  online: number;
  cpuPercent: number;
}
