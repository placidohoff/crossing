import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6">
      <h1 className="text-2xl font-semibold">Crossing Guards</h1>
      {/* Temporary entry point until login (FR-1) and role routing (FR-3) exist. */}
      <Link
        href="/admin"
        className="rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-brand-fg hover:opacity-90"
      >
        Go to admin dashboard
      </Link>
    </main>
  );
}
