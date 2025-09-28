import { IssueStatusBadge } from "@/app/components";
import { Issue } from "@/generated/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import ReactMarkdown from "react-markdown";

const IssuesDetail = ({IssueDetail}:{IssueDetail:Issue}) => {
  return (
   <>
   <Heading>{IssueDetail.title}</Heading>
            <Flex className="space-x-3 " my="2">
                <IssueStatusBadge status={IssueDetail.status}></IssueStatusBadge>
                <Text>{IssueDetail.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose max-w-full" mt="4">
                <ReactMarkdown>{IssueDetail.description}</ReactMarkdown>
            </Card>
   </>
  )
}

export default IssuesDetail;