import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { UseFormReturn } from "react-hook-form";
import { UploadCloud } from "lucide-react";

import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { CreateCategoryFormValues } from "@/features/categories/schemas";
import { cn } from "@/lib/utils";

interface LogoUploadFieldProps {
  form: UseFormReturn<CreateCategoryFormValues>;
}

export function LogoUploadField({ form }: LogoUploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (file?: File) => {
    if (!file) return;

    form.setValue("logo", file, {
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
          isDragging ? "border-primary bg-primary/5" : "hover:bg-accent/40",
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
  );
}
