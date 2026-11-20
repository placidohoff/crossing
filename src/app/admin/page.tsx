import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  AlertIcon,
  ArrowRightIcon,
  BellIcon,
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  DownloadIcon,
  LogoIcon,
  UsersIcon,
} from "./icons";
import {
  admin,
  attention,
  checkIn,
  schedule,
  schools,
  stats,
  today,
  totalLocations,
  week,
  type Cell,
} from "./mock-data";

export const metadata: Metadata = {
  title: "Admin dashboard · Crossing Crew",
};

const navItems = ["Schedule", "Availability", "Guards", "Locations"];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopNav />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        <Header />
        <StatCards />
        <div className="mt-4 grid gap-4 lg:grid-cols-[1fr_18rem]">
          <WeeklySchedule />
          <div className="flex flex-col gap-4">
            <NeedsAttention />
            <AvailabilityCheckIn />
          </div>
        </div>
        <div className="mt-4 grid gap-4 lg:grid-cols-[3fr_2fr]">
          <LocationCoverage />
          <ScheduleKey />
        </div>
      </main>
    </div>
  );
}

/* ---------- Layout pieces ---------- */

function TopNav() {
  return (
    <header className="border-b border-line bg-surface">
      <div className="flex items-center gap-6 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2 py-3 font-semibold">
          <span className="grid size-8 place-items-center rounded-lg bg-brand text-brand-fg">
            <LogoIcon width={18} height={18} />
          </span>
          Crossing Crew
        </Link>
        <nav aria-label="Main" className="hidden gap-5 self-stretch text-sm md:flex">
          {navItems.map((item) => {
            const active = item === "Locations";
            return (
              <a
                key={item}
                href="#"
                aria-current={active ? "page" : undefined}
                className={`flex items-center border-b-2 ${
                  active
                    ? "border-brand font-medium text-brand"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                {item}
              </a>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            aria-label="Notifications"
            className="grid size-8 place-items-center rounded-lg border border-line text-muted hover:text-foreground"
          >
            <BellIcon />
          </button>
          <Avatar name={admin.fullName} />
          <span className="hidden text-sm font-medium sm:inline">{admin.fullName}</span>
        </div>
      </div>
    </header>
  );
}

function Header() {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <p className="text-xs font-semibold tracking-wider text-brand uppercase">{today}</p>
        <h1 className="mt-2 text-2xl font-semibold sm:text-3xl">Good morning, {admin.firstName}</h1>
        <p className="mt-1 text-sm text-muted">Here&apos;s your coverage outlook for the week.</p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2 text-sm font-medium hover:bg-surface-muted"
        >
          <DownloadIcon /> Export
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-medium text-brand-fg hover:opacity-90"
        >
          <CheckIcon /> Publish schedule
        </button>
      </div>
    </div>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <section className={`rounded-xl border border-line bg-surface ${className}`}>{children}</section>
  );
}

function CardHeader({
  title,
  subtitle,
  children,
}: {
  title: ReactNode;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-4">
      <div>
        <h2 className="font-semibold">{title}</h2>
        {subtitle && <p className="mt-0.5 text-xs text-muted">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}

function Avatar({ name, small = false }: { name: string; small?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-full bg-surface-muted font-semibold text-muted ${
        small ? "size-6 text-[10px]" : "size-8 text-xs"
      }`}
    >
      {initials(name)}
    </span>
  );
}

/* ---------- Stat cards ---------- */

type Tone = "brand" | "warn" | "danger";

const toneClasses: Record<Tone, string> = {
  brand: "bg-brand-soft text-brand",
  warn: "bg-warn-soft text-warn",
  danger: "bg-danger-soft text-danger",
};

function StatCard({
  label,
  value,
  total,
  note,
  icon,
  tone,
}: {
  label: string;
  value: ReactNode;
  total?: number;
  note: string;
  icon: ReactNode;
  tone: Tone;
}) {
  return (
    <Card className="flex items-center justify-between p-4">
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="mt-2 text-2xl font-semibold">
          {value}
          {total !== undefined && <span className="text-sm font-normal text-muted"> / {total}</span>}
        </p>
        <p className="mt-1 text-xs text-muted">{note}</p>
      </div>
      <span className={`grid size-9 place-items-center rounded-lg ${toneClasses[tone]}`}>{icon}</span>
    </Card>
  );
}

function StatCards() {
  return (
    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        label="Locations covered"
        value={stats.locationsCovered.value}
        total={stats.locationsCovered.total}
        note={stats.locationsCovered.note}
        icon={<CheckIcon />}
        tone="brand"
      />
      <StatCard
        label="Needs a guard"
        value={stats.needsGuard.value}
        note={stats.needsGuard.note}
        icon={<AlertIcon />}
        tone="warn"
      />
      <StatCard
        label="Guards available"
        value={stats.guardsAvailable.value}
        total={stats.guardsAvailable.total}
        note={stats.guardsAvailable.note}
        icon={<UsersIcon />}
        tone="brand"
      />
      <StatCard
        label="Schedule status"
        value={stats.scheduleStatus.value}
        note={stats.scheduleStatus.note}
        icon={<AlertIcon />}
        tone="danger"
      />
    </div>
  );
}

/* ---------- Weekly schedule ---------- */

function ScheduleCell({ cell }: { cell: Cell }) {
  if (cell.status === "open") {
    return (
      <button
        type="button"
        className="rounded-md border border-dashed border-line px-2.5 py-1 text-xs font-medium text-muted hover:border-brand hover:text-brand"
      >
        + Assign
      </button>
    );
  }
  if (cell.status === "absence") {
    return <StatusPill tone="danger" label="Absence" title={`${cell.guard} reported an absence`} />;
  }
  return (
    <span className="flex items-center gap-2 text-xs">
      <Avatar name={cell.guard} small />
      {cell.guard}
    </span>
  );
}

function WeeklySchedule() {
  return (
    <Card className="flex flex-col">
      <CardHeader title="Weekly schedule" subtitle={week.shiftNote}>
        <div className="flex items-center gap-2 text-sm font-medium">
          <button
            type="button"
            aria-label="Previous week"
            className="grid size-7 place-items-center rounded-md border border-line text-muted hover:text-foreground"
          >
            <ChevronLeftIcon />
          </button>
          <span className="whitespace-nowrap">{week.label}</span>
          <button
            type="button"
            aria-label="Next week"
            className="grid size-7 place-items-center rounded-md border border-line text-muted hover:text-foreground"
          >
            <ChevronRightIcon />
          </button>
        </div>
      </CardHeader>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[44rem] text-left text-sm">
          <thead className="bg-surface-muted text-[11px] font-semibold tracking-wider text-muted uppercase">
            <tr>
              <th scope="col" className="px-4 py-3">
                Crossing location
              </th>
              {week.days.map((day) => (
                <th key={day} scope="col" className="px-3 py-3">
                  {day}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {schedule.map((row) => (
              <tr key={row.location} className="border-t border-line">
                <th scope="row" className="px-4 py-3 font-normal">
                  <span className="block text-xs font-semibold">{row.location}</span>
                  <span className="block text-xs text-muted">{row.school}</span>
                </th>
                {row.days.map((cell, i) => (
                  <td key={i} className="px-3 py-3">
                    <ScheduleCell cell={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-auto flex items-center justify-between border-t border-line px-4 py-3 text-xs">
        <span className="text-muted">
          Showing {schedule.length} of {totalLocations} locations
        </span>
        <TextLink>View all locations</TextLink>
      </div>
    </Card>
  );
}

/* ---------- Sidebar ---------- */

function TextLink({ children }: { children: ReactNode }) {
  return (
    <a href="#" className="inline-flex items-center gap-1 text-xs font-medium text-brand hover:underline">
      {children} <ArrowRightIcon width={12} height={12} />
    </a>
  );
}

function NeedsAttention() {
  return (
    <Card>
      <CardHeader
        title={
          <span className="flex items-center gap-2">
            Needs attention
            <span className="rounded-full bg-warn-soft px-2 py-0.5 text-[10px] font-semibold text-warn">
              {stats.needsGuard.value} open
            </span>
          </span>
        }
      />
      <ul>
        {attention.map((item) => (
          <li key={item.title} className="flex gap-3 border-t border-line px-4 py-3 first:border-t-0">
            <span
              className={`grid size-7 shrink-0 place-items-center rounded-md ${
                item.kind === "absence" ? toneClasses.danger : toneClasses.warn
              }`}
            >
              {item.kind === "absence" ? <AlertIcon width={14} height={14} /> : <ClockIcon width={14} height={14} />}
            </span>
            <div>
              <p className="text-xs font-semibold">{item.title}</p>
              <p className="text-xs text-muted">{item.detail}</p>
              <div className="mt-1">
                <TextLink>{item.action}</TextLink>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function AvailabilityCheckIn() {
  const pct = Math.round((checkIn.responded / checkIn.total) * 100);
  return (
    <Card>
      <CardHeader title="Availability check-in" subtitle={checkIn.period} />
      <div className="px-4 pt-3">
        <div className="flex justify-between text-xs">
          <span className="font-semibold">
            {checkIn.responded} of {checkIn.total} responded
          </span>
          <span className="text-muted">{pct}%</span>
        </div>
        <div
          role="progressbar"
          aria-label="Availability responses"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-2 h-1.5 rounded-full bg-surface-muted"
        >
          <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
        </div>
      </div>
      <ul className="px-4 py-2">
        {checkIn.guards.map((g) => (
          <li key={g.name} className="flex items-center gap-3 py-2">
            <Avatar name={g.name} />
            <div className="flex-1">
              <p className="text-xs font-semibold">{g.name}</p>
              <p className="text-xs text-muted">{g.note}</p>
            </div>
            <span
              className={`rounded-md px-2 py-0.5 text-[10px] font-semibold ${
                g.status === "Posted" ? toneClasses.brand : toneClasses.warn
              }`}
            >
              {g.status}
            </span>
          </li>
        ))}
      </ul>
      <div className="border-t border-line py-3 text-center">
        <TextLink>View all availability</TextLink>
      </div>
    </Card>
  );
}

/* ---------- Bottom row ---------- */

function LocationCoverage() {
  return (
    <Card>
      <CardHeader title="Location coverage" subtitle={`Your ${totalLocations} active crossing locations`}>
        <button
          type="button"
          className="rounded-lg border border-line px-3 py-1.5 text-xs font-medium hover:bg-surface-muted"
        >
          Manage locations
        </button>
      </CardHeader>
      <ul className="grid gap-2 p-4 sm:grid-cols-2">
        {schools.map((s) => (
          <li
            key={s.name}
            className="flex items-center justify-between rounded-lg border border-line px-3 py-2.5 text-xs"
          >
            <span className="font-semibold">{s.name}</span>
            <span className="text-muted">{s.crossings} crossings</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function StatusPill({ tone, label, title }: { tone: Tone; label: string; title?: string }) {
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-medium ${toneClasses[tone]}`}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}

function ScheduleKey() {
  return (
    <Card>
      <CardHeader title="Schedule key" subtitle="Assignment status at a glance" />
      <div className="flex flex-wrap gap-2 p-4">
        <StatusPill tone="brand" label="Assigned" />
        <StatusPill tone="warn" label="Open shift" />
        <StatusPill tone="danger" label="Absence" />
      </div>
    </Card>
  );
}
