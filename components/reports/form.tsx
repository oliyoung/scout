'use client'

import { ReportType } from "@prisma/client"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "../ui/button"
import { useUser } from "@clerk/nextjs"

const ReportForm = () => {
    const { user } = useUser()
    const types = Object.keys(ReportType);

    const FormSchema = z.object({
        type: z.string({
            required_error: "Please select an email to display.",
        })
    })

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        fetch('/api/reports', {
            method: 'POST',
            body: JSON.stringify({ ...data, userId: user?.id })
        })
    }

    return <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                                <SelectValue placeholder='Select a Type' />
                            </SelectTrigger>
                            <SelectContent>
                                {types.map(t =>
                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                )}
                            </SelectContent>
                        </Select>
                    </FormItem>
                )} />
            <Button type="submit">Submit</Button>
        </form>
    </Form>
}

export default ReportForm