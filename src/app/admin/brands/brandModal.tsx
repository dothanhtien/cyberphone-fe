"use client";

import { useEffect } from "react";
import { AxiosError } from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { apiService } from "@/lib/api";

interface BrandModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(255, { message: "Name must be at most 255 characters" }),

  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .max(255, { message: "Slug must be at most 255 characters" }),

  description: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .or(z.literal(""))
    .optional(),
  websiteUrl: z
    .url({ message: "Website must be a valid URL" })
    .max(512, { message: "Website URL must be at most 512 characters" })
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  logoUrl: z
    .url({ message: "Logo must be a valid URL" })
    .max(512, { message: "Logo URL must be at most 512 characters" })
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
});

export function BrandModal({ open, onOpenChange, onSuccess }: BrandModalProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: undefined,
      logoUrl: undefined,
      websiteUrl: undefined,
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await apiService.brands.createBrand(values);
      onOpenChange(false);
      toast.success("Brand created successfully");
      onSuccess();
    } catch (err) {
      let errorMessage = "An error occurred when creating the brand";
      console.error(errorMessage, err);
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message ?? errorMessage;
      }
      toast.error(errorMessage);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[600px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Add new brand</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 mb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="logoUrl"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Logo URL</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="websiteUrl"
                render={({ field }) => (
                  <FormItem className="grid gap-3">
                    <FormLabel>Website</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
