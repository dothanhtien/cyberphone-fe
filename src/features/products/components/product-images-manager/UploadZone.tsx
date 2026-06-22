"use client";

import { UploadCloud } from "lucide-react";
import { useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface UploadZoneProps {
  multiple?: boolean;
  label: string;
  onUpload: (files: FileList | null) => void;
}

export function UploadZone({
  multiple = false,
  label,
  onUpload,
}: UploadZoneProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  return (
    <>
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          onUpload(e.dataTransfer.files);
        }}
        className={cn(
          "flex flex-col items-center justify-center gap-2 p-6 rounded-xl border border-dashed cursor-pointer transition",
          dragging
            ? "border-primary bg-accent/50"
            : "border-border hover:bg-accent/40",
        )}
      >
        <UploadCloud className="h-6 w-6 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xs text-muted-foreground/70">PNG, JPG up to 5MB</p>
      </div>

      <Input
        ref={inputRef}
        type="file"
        multiple={multiple}
        accept="image/*"
        className="hidden"
        onChange={(e) => onUpload(e.target.files)}
      />
    </>
  );
}
