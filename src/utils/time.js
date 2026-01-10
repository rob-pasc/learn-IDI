export function timeSlotForWeekday(weekday) {
  if (!weekday) return null;

  const w = weekday.toLowerCase();
  if (w.includes("dienstag")) return "10:15–12:30";
  if (w.includes("samstag")) return "10:00–11:30";

  return null; // z.B. Montag Prüfung -> keine Standardzeit
}

export function sessionEndDateTime(e) {
  const slot = timeSlotForWeekday(e.weekday);
  if (!slot) return null;

  const [, end] = slot.split("–");
  const [hh, mm] = end.split(":").map(Number);

  const [y, m, d] = e.date.split("-").map(Number);
  return new Date(y, m - 1, d, hh, mm, 0, 0); // local time (Europe/Vienna on user's machine)
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
