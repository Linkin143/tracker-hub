import { Status } from "@/generated/prisma"
import { Badge } from "@radix-ui/themes"



const statusMap: Record<Status, { label: string, color: "red" | "orange" | "green" }> = {

    OPEN: { label: "Open", color: "red" },
    IN_PROGRESS: { label: "In Progress", color: "orange" },
    CLOSED: { label: "Closed", color: "green" },
}
const IssueStatusBadge = ({ status }: { status: Status }) => {
    return (
        <div>
            <Badge color={statusMap[status].color}
            >{statusMap[status].label}</Badge>
        </div>
    )
}

export default IssueStatusBadge