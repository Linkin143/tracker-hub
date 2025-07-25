'use client';

import { InfoCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit } = useForm<IssueForm>();

    const [error, setError] = useState("");


    const onSubmit = async (data: IssueForm) => {
        console.log("Submitted Data:", data);
        try {
            await axios.post("/api/issues", data);
            router.push("/issues");
        } catch (error) {
            console.log(error);
            setError("An error occurred.");
        }
    };

    return (

        <div className="max-w-xl">
            {error && <Callout.Root color="red" className="mb-5">
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}


            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
        </div>
    );
};

export default NewIssuePage;
