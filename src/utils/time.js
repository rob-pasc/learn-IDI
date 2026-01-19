// This file is for time-related js helper functions

export function timeSlotForWeekday(weekday) {
  if (!weekday) return null;

  const w = weekday.toLowerCase();
  if (w.includes("dienstag")) return "10:15–12:30";
  if (w.includes("samstag")) return "10:00–11:30";

  return null; 
}

export function sessionEndDateTime(e) {
  const slot = timeSlotForWeekday(e.weekday);
  if (!slot) return null;

  const [, end] = slot.split("–");
  const [hh, mm] = end.split(":").map(Number);

  const [y, m, d] = e.date.split("-").map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0); // local time 
}

export function isoToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function daysUntil(fromIso, toIso) {
  // dates are ISO, interpret as local midnight
  const [fy, fm, fd] = fromIso.split("-").map(Number);
  const [ty, tm, td] = toIso.split("-").map(Number);

  const from = new Date(fy, fm - 1, fd);
  const to = new Date(ty, tm - 1, td);

  const ms = to.getTime() - from.getTime();
  const days = Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));

  return `${days} Tagen`;
}

export function formatDate(iso) {
  const [y, m, d] = iso.split("-");
  return `${d}.${m}.${y}`;
}

export function formatMonth(yyyyMm) {
  const [y, m] = yyyyMm.split("-");
  const names = [
    "Jänner",
    "Februar",
    "März",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Dezember",
  ];
  const idx = Number(m) - 1;
  return `${names[idx] ?? m} ${y}`;
}

export function sessionStartDateTime(e) {
  const slot = timeSlotForWeekday(e.weekday);
  if (!slot) return null;

  const [start] = slot.split("–");
  const [hh, mm] = start.split(":").map(Number);

  const [y, m, d] = e.date.split("-").map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0);
}

export function localMidnight(isoDate) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(y, m - 1, d, 0, 0, 0, 0);
}

export function dayDiffLocal(fromDate, toDate) {
  const a = new Date(fromDate.getFullYear(), fromDate.getMonth(), fromDate.getDate());
  const b = new Date(toDate.getFullYear(), toDate.getMonth(), toDate.getDate());
  const ms = b.getTime() - a.getTime();
  return Math.max(0, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function isSameLocalDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function formatInHoursMinutes(diffMs) {
  const totalMin = Math.ceil(diffMs / (1000 * 60));
  if (totalMin < 60) return `in ${totalMin} Min`;

  const h = Math.floor(totalMin / 60);
  const m = totalMin % 60;

  if (m === 0) return `in ${h} Std`;
  return `in ${h} Std ${m} Min`;
}

export function relativeUntilEvent(e, now = new Date()) {
  const todayIso = isoToday();

  // Sessions: compare vs start time, so we can show "in X Std Y Min"
  if (e?.kind === "session") {
    const start = sessionStartDateTime(e);
    if (!start) return relativeByDateOnly(e.date, now);

    const diffMs = start.getTime() - now.getTime();
    if (diffMs <= 0) return "läuft gerade";

    if (isSameLocalDay(now, start)) return formatInHoursMinutes(diffMs);

    const days = dayDiffLocal(now, start);
    if (days === 1) return "Morgen";
    return `in ${days} Tagen`;
  }

  if (e?.date === todayIso) return "Heute";
  return relativeByDateOnly(e.date, now);
}

export function relativeByDateOnly(isoDate, now = new Date()) {
  const target = localMidnight(isoDate);
  const days = dayDiffLocal(now, target);

  if (days <= 0) return "Heute";
  if (days === 1) return "Morgen";
  return `in ${days} Tagen`;
}

