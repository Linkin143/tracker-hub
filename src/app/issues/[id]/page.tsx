import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { PrismaClient } from "@/generated/prisma";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";
const prisma = new PrismaClient();


interface Props {
    params: { id: string }
}


const IssueDetailPage = async ({ params }: Props) => {



    const IssueDetail = await prisma.issue.findUnique({
        where: {
            id: parseInt(params.id)
        }
    })

    if (!IssueDetail) notFound();




    return (
        <div>
            <Heading>{IssueDetail.title}</Heading>
            <Flex className="space-x-3 " my="2">
                <IssueStatusBadge status={IssueDetail.status}></IssueStatusBadge>
                <Text>{IssueDetail.createdAt.toDateString()}</Text>
            </Flex>
            <Card>
                <p>{IssueDetail.description}</p>
            </Card>

        </div>
    )
}

export default IssueDetailPage;