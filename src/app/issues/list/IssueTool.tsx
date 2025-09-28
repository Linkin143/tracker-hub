import { Button } from "@radix-ui/themes"
import Link from "next/link"

const IssueTool = () => {
    return (
        <div className="mb-5">
            <Button>
                <Link href="/issues/new">
                    Create New Issue
                </Link>
            </Button>
        </div>
    )
}

export default IssueTool