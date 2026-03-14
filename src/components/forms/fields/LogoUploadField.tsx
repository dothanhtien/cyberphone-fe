import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { Trash, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface LogoUploadFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  fieldName?: Path<T>;
  removeFieldName?: Path<T>;
  label?: string;
  existingImage?: string;
}

export function LogoUploadField<T extends FieldValues>({
  form,
  fieldName = "logo" as Path<T>,
  removeFieldName = "removeLogo" as Path<T>,
  label = "Logo",
  existingImage,
}: LogoUploadFieldProps<T>) {
  const [preview, setPreview] = useState<string | null>(null);
  const [removed, setRemoved] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const previewSrc = preview ?? (removed ? null : existingImage) ?? null;

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (file?: File) => {
    if (!file) return;

    setRemoved(false);

    form.setValue(fieldName, file as PathValue<T, Path<T>>, {
      shouldDirty: true,
      shouldValidate: true,
    });

    if (removeFieldName) {
      form.setValue(removeFieldName, false as PathValue<T, Path<T>>, {
        shouldDirty: true,
      });
    }

    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleRemove = () => {
    if (preview?.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setRemoved(true);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    form.setValue(fieldName, undefined as PathValue<T, Path<T>>, {
      shouldDirty: true,
    });

    if (existingImage && removeFieldName) {
      form.setValue(removeFieldName, true as PathValue<T, Path<T>>, {
        shouldDirty: true,
      });
    }
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
      <div className="flex justify-between items-center">
        <FieldLabel htmlFor={fieldName}>{label}</FieldLabel>

        {previewSrc && (
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="text-red-500 hover:text-red-500"
            onClick={handleRemove}
          >
            <Trash size={14} className="mr-1" /> Remove logo
          </Button>
        )}
      </div>

      <Input
        ref={fileInputRef}
        id={fieldName}
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
        {previewSrc ? (
          <div className="relative h-40 w-40 mx-auto">
            <Image
              src={previewSrc}
              alt="Preview"
              fill
              sizes="160px"
              loading="eager"
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
