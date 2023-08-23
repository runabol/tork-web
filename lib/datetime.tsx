import { parseISO, format } from "date-fns";

export function formatTimestamp(ts: string) {
  return format(parseISO(ts), "MM/dd/yy HH:mm:ss");
}
