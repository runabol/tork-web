export interface Metrics {
  jobs: JobMetrics;
  tasks: TaskMetrics;
  nodes: NodeMetrics;
}

export interface JobMetrics {
  running: number;
}

export interface TaskMetrics {
  running: number;
}

export interface NodeMetrics {
  online: number;
  cpuPercent: number;
}
