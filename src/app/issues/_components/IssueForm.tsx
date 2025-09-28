'use client';

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { validationSchemas } from "@/app/validationSchemas";
import { Issue } from "@/generated/prisma";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Callout, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueFormData = z.infer<typeof validationSchemas>




const IssueForm = ({ issue }: { issue?: Issue }) => {
    const router = useRouter();
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(validationSchemas)
    });

    const [error, setError] = useState("");
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = async (data: IssueFormData, event: any) => {
        console.log("Submitted Data:", data);
        try {
            setSubmitting(true)

            event.preventDefault();
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}/`, data)
            } else {
                await axios.post("/api/issues", data);
            }
            router.push("/issues/list");
            router.refresh();

        } catch (error) {
            setSubmitting(false);
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
                <TextField.Root defaultValue={issue?.title} placeholder="Title" {...register("title")}>
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                {/* Description Field */}
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting} type="submit">
                    {issue ? "Update Issue" : "Submit New Issue"}{" "}
                    {isSubmitting && <Spinner />}
                </Button>
            </form>
        </div>
    );
};

export default IssueForm;
