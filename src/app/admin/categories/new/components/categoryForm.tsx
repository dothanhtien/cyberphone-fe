"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link as LinkIcon } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RequiredLabel } from "@/components/requiredLabel";
import { UploadLogo } from "@/components/uploadLogo";
import { SelectCategoryDialog } from "./selectCategoryDialog";
import { Category } from "@/interfaces";
import { apiService } from "@/lib/api";

const emptyToUndefined = z
  .string()
  .transform((val) => (val?.trim() === "" ? undefined : val))
  .optional();

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  slug: z.string().min(1, "Slug is required").max(255),
  description: emptyToUndefined,
  parentId: emptyToUndefined,
  logo: z
    .custom<File>((val) => val instanceof File, {
      message: "Logo must be a valid file",
    })
    .optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  name: "",
  slug: "",
  description: "",
  parentId: undefined,
  logo: undefined,
};

export function CategoryForm() {
  const [modalOpen, setModalOpen] = useState(false);
  const [parentCategory, setParentCategory] = useState<Category | null>(null);

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: FormSchema) => {
    try {
      await apiService.categories.createCategory(values);

      toast.success(`Category created successfully`);

      form.reset(defaultValues);
      setParentCategory(null);
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message ?? "Request failed"
          : "Failed to save category";

      console.error(errorMessage, err);
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <RequiredLabel>Name</RequiredLabel>
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
              <FormItem>
                <RequiredLabel>Slug</RequiredLabel>
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
              <FormItem>
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
            name="logo"
            render={() => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <UploadLogo initialLogo={null} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setModalOpen(true)}
            >
              <LinkIcon className={parentCategory ? "text-green-500" : ""} />{" "}
              {parentCategory
                ? `Assigned parent category: ${parentCategory.name}`
                : "Assign parent category"}
            </Button>
          </div>

          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating..." : "Create"}
          </Button>
        </form>
      </Form>

      <SelectCategoryDialog
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSelect={(category) => {
          setModalOpen(false);
          form.setValue("parentId", category?.id, {
            shouldDirty: true,
            shouldValidate: true,
          });
          setParentCategory(category ?? null);
        }}
      />
    </>
  );
}
