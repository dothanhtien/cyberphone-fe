"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { Control, FieldValues, Path, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "lucide-react";
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
import { SelectParentCategoryDialog } from "./selectParentCategoryDialog";
import { apiService } from "@/lib/api";
import { Category } from "@/interfaces";

const optionalUrl = z
  .string()
  .url({ message: "Must be a valid URL" })
  .max(512, { message: "URL must be at most 512 characters" })
  .or(z.literal(""))
  .transform((val) => (val === "" ? undefined : val))
  .optional();

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(255, "Max 255 characters"),
  slug: z.string().min(1, "Slug is required").max(255, "Max 255 characters"),
  description: z
    .string()
    .or(z.literal(""))
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
  logoUrl: optionalUrl,
  parentId: z
    .string()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  name: "",
  slug: "",
  description: undefined,
  logoUrl: undefined,
  parentId: undefined,
};

interface FormInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  type?: string;
}

function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
}: FormInputProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input {...field} type={type} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface FormTextareaProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
}

function FormTextarea<T extends FieldValues>({
  control,
  name,
  label,
}: FormTextareaProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Textarea {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export function CategoryForm() {
  const [modal, setModal] = useState<{
    open: boolean;
  }>({ open: false });
  const [parentCategory, setParentCategory] = useState<Category>();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await apiService.categories.createCategory(values);
      toast.success("Category created successfully");
      form.reset();
    } catch (err) {
      let errorMessage = "Failed to create category";
      if (err instanceof AxiosError) {
        errorMessage = err.response?.data?.message ?? errorMessage;
      }
      console.error(errorMessage, err);
      toast.error(errorMessage);
    }
  };

  const handleCloseModal = () => setModal({ open: false });

  return (
    <>
      <div className="max-w-[800px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormInput control={form.control} name="name" label="Name" />

            <FormInput control={form.control} name="slug" label="Slug" />

            <FormTextarea
              control={form.control}
              name="description"
              label="Description"
            />

            <FormInput control={form.control} name="logoUrl" label="Logo URL" />

            <div>
              <div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setModal({ open: true })}
                >
                  <Link /> Assign parent category
                </Button>
              </div>

              {parentCategory && (
                <div className="mt-3">
                  Parent category: {parentCategory.name}
                </div>
              )}
            </div>

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>

      <SelectParentCategoryDialog
        open={modal.open}
        onOpenChange={(isOpen) => !isOpen && handleCloseModal()}
        onSelect={(category) => {
          handleCloseModal();
          form.setValue("parentId", category?.id);
          setParentCategory(category);
        }}
      />
    </>
  );
}
