'use client';

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { validationSchemas } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Button, Callout, TextField } from "@radix-ui/themes";
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
    const [isSubmitting, setSubmitting] = useState(false);

    const onSubmit = async (data: IssueForm, event: any) => {
        console.log("Submitted Data:", data);
        try {
            setSubmitting(true)
            event.preventDefault();
            await axios.post("/api/issues", data);
            router.push("/issues");

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
                <TextField.Root placeholder="Title" {...register("title")}>
                    <TextField.Slot>
                        <MagnifyingGlassIcon height="16" width="16" />
                    </TextField.Slot>
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                {/* Description Field */}
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Description" {...field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmitting} type="submit">Submit New Issue{isSubmitting && <Spinner />}</Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
