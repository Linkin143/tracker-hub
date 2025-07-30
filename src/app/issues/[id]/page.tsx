import { PrismaClient } from "@/generated/prisma";
import { Box, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import EditIssueButton from "./EditIssueButton";
import IssuesDetail from "./IssuesDetail";

const prisma = new PrismaClient();


interface Props {
    params: { id: string }
}


const IssueDetailPage = async ({ params }: Props) => {



    const IssueDetail = await prisma.issue.findUnique({

        where: {
            id: parseInt(params.id)
        }
    });

    if (!IssueDetail) notFound();



    return (
        <Grid columns={{ initial: "1", md: "2" }} gap="5">
            <Box>
                <IssuesDetail IssueDetail={IssueDetail}></IssuesDetail>
            </Box>
            <Box>
                <EditIssueButton issueId={IssueDetail.id}>

                </EditIssueButton>
            </Box>

        </Grid>
    )
}

export default IssueDetailPage;