"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { Trash2, UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadLogoProps {
  initialUrl?: string | null;
}

export function UploadLogo({ initialUrl }: UploadLogoProps) {
  const { setValue, watch } = useFormContext();
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  const logo = watch("logo");

  useEffect(() => {
    if (!logo) {
      setPreview(initialUrl ?? null);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [logo, initialUrl]);

  useEffect(() => {
    return () => {
      if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFile = (file: File) => {
    setValue("logo", file, { shouldDirty: true, shouldValidate: true });
    if (initialUrl) setValue("removeLogo", false);
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleClick = () => inputRef.current?.click();

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setValue("logo", undefined, { shouldDirty: true, shouldValidate: true });
    if (initialUrl) {
      setValue("removeLogo", true, { shouldDirty: true, shouldValidate: true });
    }
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-3">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
        }}
        className="hidden"
      />

      <div
        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-accent/40 transition"
        onClick={handleClick}
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <UploadCloud className="mx-auto h-8 w-8 text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          Drag & drop an image here, or click to browse
        </p>
      </div>

      {preview && (
        <div className="mt-3 flex flex-col items-center gap-2">
          <Image
            src={preview}
            alt="preview"
            width={160}
            height={160}
            className="rounded-lg border shadow-sm object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="sm"
            onClick={handleRemove}
          >
            <Trash2 className="w-4 h-4 mr-1" /> Remove
          </Button>
        </div>
      )}
    </div>
  );
}
