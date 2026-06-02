import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import DOMPurify from "dompurify";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface DescriptionProps {
  description: string;
}

export function Description({ description }: DescriptionProps) {
  const [open, setOpen] = useState(false);
  const sanitizedHtml = DOMPurify.sanitize(description);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-1 h-6 rounded-full bg-primary" />
        <h2 className="text-xl font-bold">Product Description</h2>
      </div>

      <Separator className="mb-6" />

      <div className="relative">
        <div
          className={`prose max-w-none ProseMirror overflow-hidden transition-all duration-500 ${
            open ? "max-h-none" : "max-h-96"
          }`}
          dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
        />

        {!open && (
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-background to-transparent pointer-events-none" />
        )}
      </div>

      <div className="flex justify-center mt-6">
        <Button
          variant="outline"
          className="gap-2 px-8"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Show less" : "Read more"}
          <ChevronDownIcon
            className={`size-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
          />
        </Button>
      </div>
    </div>
  );
}
