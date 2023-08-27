import {
  parseISO,
  format,
  formatDuration,
  formatDistanceStrict,
  formatDistanceToNowStrict,
} from "date-fns";

export function formatTimestamp(ts: string) {
  return format(parseISO(ts), "MM/dd/yy HH:mm:ss");
}

export function formatRuntime(state: string, from?: string, to?: string) {
  if (state === "CANCELLED" || !from) {
    return undefined;
  }
  const fromDate = parseISO(from);
  if (to) {
    const toDate = parseISO(to);
    return formatDistanceStrict(fromDate, toDate);
  }
  return formatDistanceToNowStrict(fromDate);
}
