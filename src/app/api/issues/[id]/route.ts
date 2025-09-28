import { validationSchemas } from "@/app/validationSchemas";
import { PrismaClient } from "@/generated/prisma";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
const prisma = new PrismaClient();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();
  const validation = validationSchemas.safeParse(body);

  if (!validation.success) {
    const formattedError = z.treeifyError(validation.error); // ✅ use this instead of .format()
    return NextResponse.json(formattedError, { status: 400 });
  }

  const findIssue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!findIssue)
    return NextResponse.json({ error: "Invalid issue" }, { status: 404 });

  const udpdatedIssue = await prisma.issue.update({
    where: {
      id: findIssue.id,
    },
    data: {
      title: body.title,
      description: body.description,
    },
  });

  return NextResponse.json(udpdatedIssue, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
const issue= await prisma.issue.findUnique({
  where:{id:parseInt(params.id)}
})

if(!issue){
  return NextResponse.json({error:"Invalid Issue"}, {status:404})
}

await prisma.issue.delete({
  where:{id:issue.id}
})

return NextResponse.json({})

}