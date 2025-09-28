import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button className="hover:cursor-pointer" color="red">
                        <TrashIcon />
                        Delete Issue
                    </Button>
                </AlertDialog.Trigger>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure you want to delete this Issue? This action is permanent and cannot be undone.
                    </AlertDialog.Description>

                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="solid" color="red">
                               Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>



            </AlertDialog.Root>



        </>
    )
}

export default DeleteIssueButton;