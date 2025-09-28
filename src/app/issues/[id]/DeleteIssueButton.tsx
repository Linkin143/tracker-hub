"use client"

import { TrashIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex, Spinner } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {

    const router = useRouter()
    const [error, setError] = useState(false);
    const [isDeleting, setDeleting] = useState(false);

    const handleDelete = async () => {
        try {
            setDeleting(true)
            await axios.delete(`/api/issues/${issueId}`);
            router.push("/issues");
            router.refresh();
        } catch (error) {
            setError(true)
            setDeleting(false);
            console.error(error);
        }
    }

    return (
        <>

            <AlertDialog.Root open={error}>
                <AlertDialog.Content maxWidth="450px">
                    <AlertDialog.Title>error Occured</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Ooo! Unable to delete the issue. Please try again.
                    </AlertDialog.Description>
                    <AlertDialog.Cancel>
                        <Button mt="4" variant="soft" color="gray" className="hover:cursor-pointer" onClick={() => setError(false)}>
                            ok
                        </Button>
                    </AlertDialog.Cancel>

                </AlertDialog.Content>
            </AlertDialog.Root>


            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button className="hover:cursor-pointer" color="red" disabled={isDeleting}>
                        <TrashIcon />
                        Delete Issue
                        {isDeleting && (<Spinner />)}
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
                            <Button variant="solid" color="red" onClick={handleDelete}>
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