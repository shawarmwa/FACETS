import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center justify-center gap-8 p-6 text-center">
      <h1 className="text-4xl font-bold">Faculty Evaluation System</h1>
      <p className="text-slate-600">
        Secure, role-based platform for managing evaluations, analytics, and exportable reports.
      </p>
      <div className="flex gap-4">
        <Link className="rounded bg-blue-600 px-4 py-2 text-white" href="/login">
          Login
        </Link>
        <Link className="rounded border border-slate-300 px-4 py-2" href="/register">
          Register
        </Link>
      </div>
    </main>
  );
}
