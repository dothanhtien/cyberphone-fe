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
import UploadBrandLogo from "./uploadBrandLogo";
import { apiService } from "@/lib/api";

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
  logo: z.any().optional(),
  websiteUrl: optionalUrl,
});

type FormSchema = z.infer<typeof formSchema>;

const defaultValues: FormSchema = {
  name: "",
  slug: "",
  description: "",
  logo: undefined,
  websiteUrl: "",
};

export default function BrandForm() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await apiService.brands.createBrand(values);

      toast.success("Category created successfully");

      form.reset(defaultValues);
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
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
            <FormItem>
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
                <UploadBrandLogo />
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
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Creating..." : "Create"}
        </Button>
      </form>
    </Form>
  );
}
