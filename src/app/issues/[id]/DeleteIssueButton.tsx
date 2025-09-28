import { TrashIcon } from "@radix-ui/react-icons"
import { Button } from "@radix-ui/themes"

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <Button className="hover:cursor-pointer" color="red">
            <TrashIcon />
            Delete Issue </Button>
    )
}

export default DeleteIssueButton