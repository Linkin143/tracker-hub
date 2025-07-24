'use client';

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>();

    const onSubmit = async (data: IssueForm) => {
        console.log("Submitted Data:", data);
        await axios.post("/api/issues", data);
        router.push("/issues");
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
            {/* Title Field */}
            <TextField.Root placeholder="Title" {...register("title")}>
                <TextField.Slot>
                    <MagnifyingGlassIcon height="16" width="16" />
                </TextField.Slot>
            </TextField.Root>

            {/* Description Field */}
            <Controller
                name="description"
                control={control}
                render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
            />

            <Button type="submit">Submit New Issue</Button>
        </form>
    );
};

export default NewIssuePage;
