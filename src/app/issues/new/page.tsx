'use client';

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, TextField } from "@radix-ui/themes";
import dynamic from "next/dynamic"; // Import dynamic for client-only components

import "easymde/dist/easymde.min.css";

// Dynamically import SimpleMDE with SSR disabled
const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
});

const NewIssuePage = () => {
    return (
        <div className="max-w-xl space-y-3">
            <TextField.Root placeholder="Title">
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>

            <SimpleMDE placeholder="Description" />
            <Button>Submit New Issue</Button>
        </div>
    );
};

export default NewIssuePage;
