import { PrismaClient } from "@/generated/prisma";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import DeleteIssueButton from "./DeleteIssueButton";
import EditIssueButton from "./EditIssueButton";
import IssuesDetail from "./IssuesDetail";

const prisma = new PrismaClient();

interface Props {
    params: { id: string };
}

const IssueDetailPage = async (props: Props) => {
    const id = Number(props.params.id);

    if (Number.isNaN(id)) notFound();

    const issueDetail = await prisma.issue.findUnique({
        where: { id },
    });

    if (!issueDetail) notFound();

    return (
        <Grid columns={{ initial: "1", sm: "5" }} gap="5">
            <Box className="md:col-span-4">
                <IssuesDetail IssueDetail={issueDetail} />
            </Box>
            <Box>
                <Flex direction="column" gap="2">
                <EditIssueButton  issueId={issueDetail.id} />
                <DeleteIssueButton issueId={issueDetail.id} />
                </Flex>
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;
