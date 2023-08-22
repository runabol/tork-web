import { parseISO, format } from "date-fns";

export function formatTimestamp(ts: string) {
  return format(parseISO(ts), "LLLL d, yyyy HH:mm:ss");
}
