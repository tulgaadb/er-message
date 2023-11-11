"use client";

import * as z from "zod";
import axios from "axios";
import qs from "query-string";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface ChatInputProps {
  section: string;
  user: string;
}

const formSchema = z.object({
  content: z.string().min(1),
});

export const ChatInput = ({ section, user }: ChatInputProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
    },
  });

  const isSubmitting = form.formState.isSubmitting;
  console.log(
    "🚀 ~ file: chat-input.tsx:36 ~ ChatInput ~ isSubmitting:",
    isSubmitting
  );

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("🚀 ~ file: chat-input.tsx:36 ~ onSubmit ~ values:", values);
    try {
      form.reset();
      await axios.post("/api/messages", {
        content: values?.content,
        section,
        user,
      });
      router.refresh();
    } catch (error) {
      console.log(error);
    } finally {
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <div className="relative p-4 pb-6">
                  <Input
                    disabled={isSubmitting}
                    className="px-14 py-6 bg-zinc-200/90 dark:bg-zinc-700/75 border-none border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-zinc-600 dark:text-zinc-200"
                    {...field}
                  />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};