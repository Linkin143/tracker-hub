"use client"; // 🔑 Mark it as a Client Component

import { Issue } from "@prisma/client";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";

// Dynamically import IssueForm with SSR disabled
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default function IssueFormWrapper({ issue }: { issue: Issue }) {
  return <IssueForm issue={issue} />;
}
