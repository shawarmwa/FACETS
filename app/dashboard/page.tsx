import { Role } from "@prisma/client";

import EvaluationChart from "@/components/EvaluationChart";
import ExportReportButton from "@/components/ExportReportButton";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { hasPermission } from "@/lib/rbac";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) return null;

  const user = session.user;
  const isFaculty = user.role === Role.FACULTY;

  const evaluations = await prisma.evaluation.findMany({
    where: isFaculty ? { facultyId: user.id } : undefined,
    include: { faculty: true },
    orderBy: { createdAt: "asc" }
  });

  const grouped = evaluations.reduce<Record<string, number[]>>((acc, item) => {
    const key = item.faculty.name ?? item.faculty.email;
    acc[key] = acc[key] ? [...acc[key], item.rating] : [item.rating];
    return acc;
  }, {});

  const labels = Object.keys(grouped);
  const values = labels.map((key) => grouped[key].reduce((sum, value) => sum + value, 0) / grouped[key].length);

  return (
    <main className="mx-auto max-w-5xl space-y-8 p-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-600">
          Signed in as {user.email} ({user.role})
        </p>
      </header>

      <section className="rounded border bg-white p-4">
        <h2 className="mb-4 text-xl font-semibold">Evaluation Analytics</h2>
        {labels.length > 0 ? (
          <EvaluationChart labels={labels} values={values} />
        ) : (
          <p className="text-slate-500">No evaluation data available.</p>
        )}
      </section>

      {hasPermission(user.role, "view_reports") || hasPermission(user.role, "view_own_reports") ? (
        <ExportReportButton
          title="Faculty Evaluation Summary"
          lines={[
            `Total evaluations: ${evaluations.length}`,
            ...labels.map((label, i) => `${label}: ${values[i].toFixed(2)} average`)
          ]}
        />
      ) : null}
    </main>
  );
}
