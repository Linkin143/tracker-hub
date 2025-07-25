'use client';

import { validationSchemas } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

type IssueForm = z.infer<typeof validationSchemas>

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });

const NewIssuePage = () => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(validationSchemas)
    });

    const [error, setError] = useState("");


    const onSubmit = async (data: IssueForm, event: any) => {
        console.log("Submitted Data:", data);
        try {
            event.preventDefault();
            await axios.post("/api/issues", data);
            router.push("/issues");

        } catch (error) {
            
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
                {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
                
                {/* Description Field */}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
                <Button type="submit">Submit New Issue</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
