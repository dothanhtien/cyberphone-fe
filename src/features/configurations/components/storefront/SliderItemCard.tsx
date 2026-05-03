"use client";

import Image from "next/image";
import { UploadCloud, Trash2, Move } from "lucide-react";
import { useRef, useState } from "react";
import { useSortable } from "@dnd-kit/react/sortable";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { DEFAULT_IMAGE } from "@/constants";
import { cn } from "@/lib/utils";

export interface SliderItemField {
  id: string;
  file?: File;
  preview?: string | null;
  url?: string | null;
  title: string;
  altText: string;
  isDeactivated: boolean;
  isDeleted: boolean;
}

interface SliderItemCardProps {
  fieldId: string;
  index: number;
  value: SliderItemField;
  onChange: (updated: SliderItemField) => void;
  onRemove: () => void;
}

export function SliderItemCard({
  fieldId,
  index,
  value,
  onChange,
  onRemove,
}: SliderItemCardProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [dragging, setDragging] = useState(false);

  const { ref, handleRef, isDragging } = useSortable({ id: fieldId, index });

  const handleUpload = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const original = files[0];
    const ext = original.name.split(".").pop();
    const file = new File([original], `${value.id}.${ext}`, {
      type: original.type,
    });
    const preview = URL.createObjectURL(file);
    onChange({ ...value, file, preview });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleUpload(e.dataTransfer.files);
  };

  const imageSrc = value.preview ?? value.url ?? DEFAULT_IMAGE;

  return (
    <div ref={ref} className={cn(isDragging && "z-50 opacity-80")}>
      <Card size="sm" className={cn(value.isDeactivated && "opacity-60")}>
        <CardHeader className="border-b">
          <div className="flex items-center gap-2">
            <button
              type="button"
              ref={handleRef}
              className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
            >
              <Move className="h-4 w-4" />
            </button>
            <CardTitle>Slide {index + 1}</CardTitle>
          </div>
          <CardAction>
            <div className="flex items-center gap-2">
              <Switch
                size="sm"
                checked={!value.isDeactivated}
                onCheckedChange={(checked) =>
                  onChange({ ...value, isDeactivated: !checked })
                }
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={onRemove}
                className="text-destructive hover:text-destructive h-7 w-7 p-0"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardAction>
        </CardHeader>

        <CardContent className="pt-3 space-y-3">
          <div
            onClick={() => inputRef.current?.click()}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "relative w-full rounded-lg overflow-hidden border border-dashed cursor-pointer transition group",
              !imageSrc || imageSrc === DEFAULT_IMAGE ? "aspect-16/3" : "",
              dragging
                ? "border-primary bg-accent/50"
                : "border-border hover:bg-accent/40",
            )}
          >
            {imageSrc !== DEFAULT_IMAGE ? (
              <>
                <div className="relative w-full h-36">
                  <Image
                    src={imageSrc}
                    alt={value.title || `Slide ${index + 1}`}
                    fill
                    unoptimized
                    className="object-contain"
                  />
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col items-center justify-center gap-1">
                  <UploadCloud className="h-5 w-5 text-white" />
                  <p className="text-xs text-white">Replace</p>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center gap-1.5 h-full p-3">
                <UploadCloud className="h-5 w-5 text-muted-foreground" />
                <p className="text-xs text-muted-foreground text-center">
                  Click or drag to upload
                </p>
              </div>
            )}
          </div>

          <Input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleUpload(e.target.files)}
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-xs">Title</Label>
              <Input
                size={1}
                value={value.title}
                onChange={(e) => onChange({ ...value, title: e.target.value })}
                placeholder="Slide title"
                className="h-8 text-sm"
              />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Alt Text</Label>
              <Input
                size={1}
                value={value.altText}
                onChange={(e) =>
                  onChange({ ...value, altText: e.target.value })
                }
                placeholder="Image description"
                className="h-8 text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
