"use client";

import { Move, Trash2 } from "lucide-react";
import { useSortable } from "@dnd-kit/react/sortable";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardAction,
  CardContent,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export interface CategoryPanelField {
  categoryId: string;
  categoryName: string;
  icon?: string;
  enabled: boolean;
  displayOrder: number;
  deleted?: boolean;
}

interface CategoryPanelCardProps {
  fieldId: string;
  index: number;
  value: CategoryPanelField;
  onChange: (updated: CategoryPanelField) => void;
  onRemove: () => void;
}

export function CategoryPanelCard({
  fieldId,
  index,
  value,
  onChange,
  onRemove,
}: CategoryPanelCardProps) {
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
            <div className="flex items-center gap-2">
              <Label htmlFor={`icon-${fieldId}`}>Icon</Label>
              <a
                href="https://lucide.dev/icons/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-muted-foreground underline hover:text-foreground"
              >
                Browse Lucide icons
              </a>
            </div>
            <Input
              id={`icon-${fieldId}`}
              placeholder="e.g. shopping-cart"
              value={value.icon ?? ""}
              onChange={(e) => onChange({ ...value, icon: e.target.value })}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
