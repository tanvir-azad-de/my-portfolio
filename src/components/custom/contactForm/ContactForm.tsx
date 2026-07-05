"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const ContactSchema = z.object({
  name: z.string().min(2, "Please enter at least 2 characters."),
  email: z.string().email("Please enter a valid email."),
  subject: z.string().min(2, "Please add a subject."),
  message: z.string().min(10, "Please write at least 10 characters."),
  // Honeypot: if filled -> likely bot
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactValues = z.infer<typeof ContactSchema>;

export default function ContactForm() {
  const [status, setStatus] = React.useState<"idle" | "sending" | "sent" | "error">("idle");

  const form = useForm<ContactValues>({
    resolver: zodResolver(ContactSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      company: "", // honeypot
    },
  });

  const onSubmit = async (values: ContactValues) => {
    try {
      setStatus("sending");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed request");
      setStatus("sent");
      form.reset();
    } catch (e) {
      setStatus("error");
    } finally {
      // reset status after a moment if you want
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
      <p className="text-muted-foreground mb-8">
          Have a question or a project in mind? Send me a message!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your name</FormLabel>
                <FormControl>
                  <Input placeholder="Ada Lovelace" {...field} className="border-primary/30 placeholder:text-primary/40"/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="you@example.com" {...field} className="border-primary/30 placeholder:text-primary/40"/>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

       
 
          </div>
          <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="How can I help?" {...field}  className="border-primary/30 placeholder:text-primary/40"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell me a bit about your project or question…"
                  className="min-h-[140px] resize-y border-primary/30 placeholder:text-primary/40"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Honeypot (hidden from humans) */}
        <FormField
          control={form.control}
          name="company"
          render={({ field }) => (
            <div className="hidden">
              <Input tabIndex={-1} autoComplete="off" {...field} />
            </div>
          )}
        />

        <div className="flex items-start flex-col gap-3">
          <Button type="submit" className="text-white hover:text-white/60 font-bold bg-secondary-foreground cursor-pointer hover:bg-secondary-foreground/90 shadow-none justify-center w-full md:w-auto" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send Email"}
          </Button>
          {status === "sent" && <p className="text-sm text-green-600">Thanks! I’ll get back to you soon.</p>}
          {status === "error" && <p className="text-sm text-red-600">Something went wrong. Please try again.</p>}
        </div>
      </form>
    </Form>
  );
}
