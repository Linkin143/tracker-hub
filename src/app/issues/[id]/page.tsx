import { PrismaClient } from "@/generated/prisma";
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
            <p>{IssueDetail.title}</p>
            <p>{IssueDetail.description}</p>
            <p>{IssueDetail.status}</p>
            <p>{IssueDetail.createdAt.toDateString()}</p>

        </div>
    )
}

export default IssueDetailPage;