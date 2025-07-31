import { PrismaClient } from "@/generated/prisma";
import { notFound } from "next/navigation";
import IssueFormWrapper from "./IssueFormWrapper";

const prisma = new PrismaClient();

interface Props {
  params: {
    id: string;
  };
}

const IssueEditPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  return <IssueFormWrapper issue={issue} />;
};

export default IssueEditPage;
