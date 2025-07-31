import { PrismaClient } from "@/generated/prisma";
import { notFound } from "next/navigation";
import IssueFormWrapper from "./IssueFormWrapper";

const prisma = new PrismaClient();

const IssueEditPage = async ({ params }: { params: { id: string } }) => {
  const id = Number(params.id);

  if (Number.isNaN(id)) notFound(); // optional: handle invalid numeric IDs

  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) notFound();

  return <IssueFormWrapper issue={issue} />;
};

export default IssueEditPage;
