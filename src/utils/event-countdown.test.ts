// Runtime validation coverage for: next-event countdown behavior
import { describe, expect, it } from "vitest";
import { calculateEventCountdown } from "./event-countdown";

describe("calculateEventCountdown", () => {
  it("reports events on the current local date as today", () => {
    const now = new Date(2026, 0, 1, 21, 30);

    expect(calculateEventCountdown("2026-01-01", now)).toEqual({ status: "today" });
  });

  it("returns only the number of calendar days until the event date", () => {
    const now = new Date(2026, 0, 1, 12, 34);

    expect(calculateEventCountdown("2026-01-03", now)).toEqual({
      status: "countdown",
      days: 2,
    });
  });

  it("counts the next calendar date as one day even when it is less than 24 hours away", () => {
    const now = new Date(2026, 0, 1, 23, 59);

    expect(calculateEventCountdown("2026-01-02", now)).toEqual({
      status: "countdown",
      days: 1,
    });
  });

  it("marks past events as expired", () => {
    const now = new Date(2026, 0, 2, 0, 1);

    expect(calculateEventCountdown("2026-01-01", now)).toEqual({ status: "expired" });
  });
});
