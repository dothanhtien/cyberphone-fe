import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AxiosError } from "axios";
import { toast } from "sonner";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RequiredLabel } from "@/components/requiredLabel";
import { UploadLogo } from "@/components/uploadLogo";
import { apiService } from "@/lib/api";
import { Brand } from "@/interfaces";

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
  logo: z
    .custom<File>((val) => val instanceof File, {
      message: "Logo must be a valid file",
    })
    .optional(),
  websiteUrl: optionalUrl,
  removeLogo: z.boolean().optional(),
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  name: "",
  slug: "",
  description: "",
  logo: undefined,
  websiteUrl: "",
  removeLogo: undefined,
};

interface BrandFormProps {
  action?: "create" | "update";
  brand?: Brand;
}

export function BrandForm({ action = "create", brand }: BrandFormProps) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  useEffect(() => {
    if (brand) {
      form.reset(
        Object.fromEntries(
          Object.entries(brand).map(([k, v]) => [k, v ?? undefined])
        ) as FormSchema
      );
    }
  }, [form, brand]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const op =
        action === "update" && brand
          ? () => apiService.brands.updateBrand(brand.id, values)
          : () => apiService.brands.createBrand(values);

      await op();

      toast.success(
        `Brand ${action === "create" ? "created" : "updated"} successfully`
      );

      if (action === "create") {
        form.reset(defaultValues);
      }
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message ?? "Request failed"
          : "Failed to save brand";
      console.error(errorMessage, err);
      toast.error(errorMessage);
    }
  };

  return (
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
                <UploadLogo initialLogo={brand?.logoUrl} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="websiteUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Website URL</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {action === "create" && (
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Creating..." : "Create"}
          </Button>
        )}
        {action === "update" && (
          <Button
            type="submit"
            className="mr-2"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Updating..." : "Update"}
          </Button>
        )}
      </form>
    </Form>
  );
}
