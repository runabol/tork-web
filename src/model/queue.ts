interface Queue {
  name: string;
  size: number;
  subscribers: number;
  unacked: number;
}
