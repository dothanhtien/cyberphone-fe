import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";
import DOMPurify from "dompurify";

import { Button } from "@/components/ui/button";

interface DescriptionProps {
  description: string;
}

export function Description({ description }: DescriptionProps) {
  const [open, setOpen] = useState(false);
  const sanitizedHtml = DOMPurify.sanitize(description);

  return (
    <div className="relative">
      <div
        className={`prose max-w-none ProseMirror overflow-hidden transition-all duration-300 ${
          open ? "max-h-full" : "max-h-125"
        }`}
        dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
      />

      <div className="w-full flex justify-center mt-4">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? "Show less" : "Read more"}
          <ChevronDownIcon
            className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
            size={20}
          />
        </Button>
      </div>
    </div>
  );
}
