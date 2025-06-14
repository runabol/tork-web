export interface Node {
  id: string;
  name: string;
  hostname: string;
  startedAt: string;
  cpuPercent: number;
  lastHeartbeatAt: string;
  status: string;
  taskCount: number;
  version: string;
}
