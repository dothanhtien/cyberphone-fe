import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { Trash2, UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";

interface UploadBrandLogoProps {
  initialLogo?: string | null;
}

export default function UploadBrandLogo({ initialLogo }: UploadBrandLogoProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { setValue, watch } = useFormContext();

  const logo = watch("logo");

  useEffect(() => {
    if (!logo && !isDirty) {
      setPreview(initialLogo ?? null);
      setIsDirty(true);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }, [logo, initialLogo, isDirty]);

  useEffect(() => {
    return () => {
      if (preview && preview.startsWith("blob:")) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleFileChange = (file: File) => {
    setValue("logo", file, { shouldDirty: true, shouldValidate: true });
    if (initialLogo) {
      setValue("removeLogo", false);
    }
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileChange(file);
  };

  const handleRemove = () => {
    setValue("logo", undefined, { shouldDirty: true, shouldValidate: true });
    if (initialLogo) {
      setValue("removeLogo", true, { shouldDirty: true, shouldValidate: true });
    }
    if (preview && preview.startsWith("blob:")) {
      URL.revokeObjectURL(preview);
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
        onChange={handleInputChange}
        className="hidden"
      />

      <div
        className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer hover:bg-accent/40 transition"
        onClick={() => inputRef.current?.click()}
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
            priority
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
