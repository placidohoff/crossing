// Placeholder data for the admin dashboard until the database is implemented.

export type Cell =
  | { status: "assigned"; guard: string }
  | { status: "open" }
  | { status: "absence"; guard: string };

export type ScheduleRow = {
  location: string;
  school: string;
  days: Cell[]; // Mon–Fri
};

export const admin = { firstName: "Jordan", fullName: "Jordan Miller" };

export const today = "Tuesday, October 13, 2026";

export const stats = {
  locationsCovered: { value: 46, total: 50, note: "92% of weekly shifts" },
  needsGuard: { value: 4, note: "Across 3 school days" },
  guardsAvailable: { value: 18, total: 24, note: "For the week of Oct 19" },
  scheduleStatus: { value: "Draft", note: "Last edited 9:42 AM" },
};

export const week = {
  label: "Oct 19 – 23",
  shiftNote: "Morning shifts · 7:15–8:45 AM",
  days: ["Mon · 19", "Tue · 20", "Wed · 21", "Thu · 22", "Fri · 23"],
};

const a = (guard: string): Cell => ({ status: "assigned", guard });
const open: Cell = { status: "open" };

export const schedule: ScheduleRow[] = [
  {
    location: "Oak & 3rd Street",
    school: "Lincoln Elementary",
    days: [a("Amy Lee"), a("Amy Lee"), open, a("Amy Lee"), a("Amy Lee")],
  },
  {
    location: "Pine Avenue & 8th",
    school: "Roosevelt Middle",
    days: [a("Marco Ruiz"), open, a("Marco Ruiz"), a("Marco Ruiz"), a("Marco Ruiz")],
  },
  {
    location: "Maple & Jefferson",
    school: "Lincoln Elementary",
    days: [
      a("Tara White"),
      a("Tara White"),
      a("Tara White"),
      a("Tara White"),
      { status: "absence", guard: "Tara White" },
    ],
  },
  {
    location: "Cedar Blvd & 1st",
    school: "Washington Primary",
    days: [open, a("David Kim"), a("David Kim"), a("David Kim"), open],
  },
  {
    location: "Broadway & Elm",
    school: "Roosevelt Middle",
    days: [a("Nina Shah"), a("Nina Shah"), a("Nina Shah"), open, a("Nina Shah")],
  },
];

export const totalLocations = 10;

export const attention = [
  {
    kind: "absence" as const,
    title: "1 absence reported",
    detail: "Maple & Jefferson · Fri, Oct 23",
    action: "Find a replacement",
  },
  {
    kind: "open" as const,
    title: "3 shifts unassigned",
    detail: "Tue, Wed & Fri · 2 locations",
    action: "Review open shifts",
  },
];

export const checkIn = {
  period: "For next week · Oct 19–23",
  responded: 18,
  total: 24,
  guards: [
    { name: "Ben Carter", note: "Updated today", status: "Posted" as const },
    { name: "Sofia Wilson", note: "Updated yesterday", status: "Posted" as const },
    { name: "James Liu", note: "No response yet", status: "Waiting" as const },
  ],
};

export const schools = [
  { name: "Lincoln Elementary", crossings: 3 },
  { name: "Roosevelt Middle", crossings: 3 },
  { name: "Washington Primary", crossings: 2 },
  { name: "Jefferson Academy", crossings: 2 },
];
