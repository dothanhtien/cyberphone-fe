"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ImageIcon, Info, RefreshCw, UploadCloud } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RequiredFieldLabel } from "@/components/RequiredFieldLabel";
import { cn } from "@/lib/utils";
import { slugify } from "@/utils/slugify";
import {
  CreateCategoryFormValues,
  createCategorySchema,
} from "@/features/categories/schemas";

interface CategoryFormProps {
  onSubmit: (values: CreateCategoryFormValues) => void;
  defaultValues?: Partial<CreateCategoryFormValues>;
  isSubmitting?: boolean;
}

export function CategoryForm({ onSubmit, defaultValues }: CategoryFormProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const slugTouched = useRef(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<CreateCategoryFormValues>({
    resolver: zodResolver(createCategorySchema),
    defaultValues,
    mode: "all",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const name = useWatch({
    control: form.control,
    name: "name",
  });

  useEffect(() => {
    if (!slugTouched.current) {
      setValue("slug", slugify(name ?? ""), {
        shouldDirty: true,
        shouldValidate: !!name?.trim(),
      });
    }
  }, [name, setValue]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (file?: File) => {
    if (!file) return;

    setValue("logo", file, {
      shouldDirty: true,
      shouldValidate: true,
    });

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;

    handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
      id="category-form"
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info size={16} /> Basic details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <div className="grid grid-cols-2 gap-4">
              <Field>
                <RequiredFieldLabel htmlFor="name">
                  Category name
                </RequiredFieldLabel>
                <Input
                  id="name"
                  placeholder="Smartphone"
                  {...register("name")}
                />
                <FieldError>{errors.name?.message}</FieldError>
              </Field>

              <Field>
                <RequiredFieldLabel htmlFor="slug">Slug</RequiredFieldLabel>

                <div className="relative">
                  <Input
                    id="slug"
                    placeholder="smartphone"
                    {...register("slug")}
                    onFocus={() => {
                      slugTouched.current = true;
                    }}
                  />

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        onClick={() => {
                          const regenerated = slugify(name ?? "");

                          if (!regenerated) return;

                          slugTouched.current = false;

                          setValue("slug", regenerated, {
                            shouldDirty: true,
                            shouldValidate: true,
                          });
                        }}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                        title="Regenerate slug"
                      >
                        <RefreshCw size={16} />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Regenerate from name</TooltipContent>
                  </Tooltip>
                </div>

                <FieldError>{errors.slug?.message}</FieldError>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="parentCategory">Parent category</FieldLabel>
              <Select
                onValueChange={(value) =>
                  setValue("parentId", value, { shouldDirty: true })
                }
              >
                <SelectTrigger id="parentCategory">
                  <SelectValue placeholder="Select parent category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="138fda19-1822-4866-8b37-1112990af009">
                      Apple
                    </SelectItem>
                    <SelectItem value="e7ee8d5c-3353-4e84-a566-879bca368ea5">
                      Samsung
                    </SelectItem>
                    <SelectItem value="9b417a6b-8097-4675-b29c-6e7a5c3613ff">
                      Lenovo
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>

            <Field>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Textarea
                id="description"
                placeholder="Type the description here"
                className="min-h-30"
                {...register("description")}
              />
            </Field>
          </FieldGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon size={16} /> Media
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Field>
            <FieldLabel htmlFor="logo">Category thumbnail</FieldLabel>
            <Input
              ref={fileInputRef}
              id="logo"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFileChange(e.target.files?.[0])}
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              className={cn(
                "border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition h-53 flex justify-center items-center",
                isDragging
                  ? "border-primary bg-primary/5"
                  : "hover:bg-accent/40",
              )}
            >
              {preview ? (
                <div className="relative h-40 w-40 mx-auto">
                  <Image
                    src={preview}
                    alt="Preview"
                    fill
                    className="rounded-lg object-contain"
                  />
                </div>
              ) : (
                <div>
                  <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
                  <p className="mt-2 text-sm text-muted-foreground">
                    Drag & drop or click to upload
                  </p>
                </div>
              )}
            </div>
          </Field>
        </CardContent>
      </Card>
    </form>
  );
}
