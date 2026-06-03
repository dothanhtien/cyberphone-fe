"use client";

import { Move, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";

export interface ProductSectionField {
  categoryId: string;
  categoryName: string;
  title: string;
  enabled: boolean;
  displayOrder: number;
  deleted?: boolean;
}

interface ProductSectionCardProps {
  fieldId: string;
  index: number;
  value: ProductSectionField;
  onChange: (updated: ProductSectionField) => void;
  onRemove: () => void;
}

export function ProductSectionCard({
  fieldId,
  index,
  value,
  onChange,
  onRemove,
}: ProductSectionCardProps) {
  const { ref, handleRef, isDragging } = useSortable({ id: fieldId, index });

  return (
    <div ref={ref} className={cn(isDragging && "z-50 opacity-80")}>
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <button
              type="button"
              ref={handleRef}
              className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground touch-none"
            >
              <Move className="h-4 w-4" />
            </button>
            <CardTitle>{value.categoryName}</CardTitle>
          </div>
          <CardAction className="flex items-center gap-2">
            <Switch
              checked={value.enabled}
              onCheckedChange={(checked) =>
                onChange({ ...value, enabled: checked })
              }
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={onRemove}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor={`title-${fieldId}`}>Title</Label>
            <Input
              id={`title-${fieldId}`}
              value={value.title}
              onChange={(e) => onChange({ ...value, title: e.target.value })}
              className="h-8 text-sm"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
