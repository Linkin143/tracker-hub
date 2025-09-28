"use client"; // 🔑 Mark it as a Client Component

import { Issue } from "@prisma/client";
import dynamic from "next/dynamic";
// If the loading component exists at a different path, update the import accordingly.
// For example, if the skeleton is in _components/IssueFormSkeleton.tsx:
import IssueFormSkeleton from "@/app/issues/_components/IssueFormSkeleton";

// Dynamically import IssueForm with SSR disabled
const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

export default function IssueFormWrapper({ issue }: { issue: Issue }) {
  return <IssueForm issue={issue} />;
}
