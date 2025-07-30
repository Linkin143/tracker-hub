import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import { PrismaClient } from "@/generated/prisma";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Box, Button, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

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
        <Grid columns={{initial:"1", md:"2"}} gap="5">
            <Box>
                <Heading>{IssueDetail.title}</Heading>
            <Flex className="space-x-3 " my="2">
                <IssueStatusBadge status={IssueDetail.status}></IssueStatusBadge>
                <Text>{IssueDetail.createdAt.toDateString()}</Text>
            </Flex>
            <Card className="prose" mt="4">
                <ReactMarkdown>{IssueDetail.description}</ReactMarkdown>
            </Card>
            </Box>
            <Box>
                <Button className="Hover:cursor-pointer">
                    <Pencil2Icon />
                <Link href={`/issues/${IssueDetail.id}/edit`}> Edit Issue</Link>
                </Button>
            </Box>

        </Grid>
    )
}

export default IssueDetailPage;