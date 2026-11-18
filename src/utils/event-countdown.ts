export type EventCountdown =
  | { status: "today" }
  | { status: "expired" }
  | { status: "countdown"; days: number };

export function calculateEventCountdown(fechaISO: string, now: Date): EventCountdown {
  const [year, month, day] = fechaISO.split("-").map(Number);
  const eventDate = new Date(year, month - 1, day);

  if (!Number.isFinite(eventDate.getTime())) return { status: "expired" };
  if (
    eventDate.getFullYear() !== year
    || eventDate.getMonth() !== month - 1
    || eventDate.getDate() !== day
  ) {
    return { status: "expired" };
  }

  const eventDay = Date.UTC(year, month - 1, day);
  const today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
  const days = Math.round((eventDay - today) / 86_400_000);

  if (days < 0) return { status: "expired" };
  if (days === 0) return { status: "today" };

  return { status: "countdown", days };
}
