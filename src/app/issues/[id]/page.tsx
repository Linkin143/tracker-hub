import { PrismaClient } from "@/generated/prisma";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
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
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <IssuesDetail IssueDetail={issueDetail} />
            </Box>
            <Box>
                <EditIssueButton issueId={issueDetail.id} />
            </Box>
        </Grid>
    );
};

export default IssueDetailPage;
