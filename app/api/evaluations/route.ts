import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import { z } from "zod";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  facultyId: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  feedback: z.string().min(5),
  courseCode: z.string().min(2)
});

export async function GET() {
  const session = await auth();
  if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const where =
    session.user.role === Role.FACULTY
      ? { facultyId: session.user.id }
      : session.user.role === Role.STUDENT
        ? { submittedById: session.user.id }
        : undefined;

  const evaluations = await prisma.evaluation.findMany({ where, orderBy: { createdAt: "desc" } });
  return NextResponse.json(evaluations);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user || session.user.role !== Role.STUDENT) {
    return NextResponse.json({ error: "Only students can submit evaluations" }, { status: 403 });
  }

  const payload = await req.json();
  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const faculty = await prisma.user.findUnique({ where: { id: parsed.data.facultyId } });
  if (!faculty || faculty.role !== Role.FACULTY) {
    return NextResponse.json({ error: "Faculty not found" }, { status: 404 });
  }

  const evaluation = await prisma.evaluation.create({
    data: {
      ...parsed.data,
      submittedById: session.user.id
    }
  });

  return NextResponse.json(evaluation, { status: 201 });
}
