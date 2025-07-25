import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { validationSchemas } from "../../validationSchemas";
const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = validationSchemas.safeParse(body);

  if (!validation.success) {
    const formattedError = z.treeifyError(validation.error); // ✅ use this instead of .format()
    return NextResponse.json(formattedError, { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: body.title,
      description: body.description
    }
  });

  return NextResponse.json(newIssue);
}
