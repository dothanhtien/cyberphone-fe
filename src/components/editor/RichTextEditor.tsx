import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

import { cn } from "@/lib/utils";
import { EditorToolbar } from "./EditorToolbar";

interface RichTextEditorProps {
  value?: string;
  onChange: (value: string) => void;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  minHeight = "200px",
  onChange,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-primary underline underline-offset-4 cursor-pointer hover:text-primary/80",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CharacterCount,
    ],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  const characterCount = editor?.storage.characterCount;

  return (
    <div
      className={cn(
        "rounded-lg border border-input transition-shadow bg-background overflow-hidden",
        "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
      )}
    >
      {editor && <EditorToolbar editor={editor} />}

      <EditorContent
        editor={editor}
        className="px-4 py-3 text-sm"
        style={{ minHeight }}
      />

      <div className="flex items-center justify-between border-t border-input bg-muted/30 px-3 py-1.5">
        <span className="text-xs text-muted-foreground">
          {characterCount?.characters() ?? 0} characters
        </span>
      </div>
    </div>
  );
}
