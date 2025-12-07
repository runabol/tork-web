import {
  parseISO,
  format,
  formatDuration,
  Duration,
  minutesToHours,
  differenceInSeconds,
  secondsToMinutes,
} from "date-fns";

export function formatTimestamp(ts: string) {
  return format(parseISO(ts), "MM/dd/yy HH:mm:ss");
}

export function formatRuntime(state: string, from?: string, to?: string) {
  if (state === "CANCELLED" || !from) {
    return undefined;
  }
  const fromDate = parseISO(from);
  var toDate: Date;
  if (to) {
    toDate = parseISO(to);
  } else {
    toDate = new Date();
  }
  const sec = differenceInSeconds(toDate, fromDate);
  const mins = secondsToMinutes(sec);
  const hours = minutesToHours(mins);
  const dur: Duration = {
    minutes: mins - hours * 60,
    hours: hours,
    seconds: hours > 0 ? 0 : sec - mins * 60,
  };
  return formatDuration(dur);
}
