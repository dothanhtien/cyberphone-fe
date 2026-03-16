import { useEffect, useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import CharacterCount from "@tiptap/extension-character-count";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";

import { cn } from "@/lib/utils";
import { EditorToolbar } from "./EditorToolbar";
import { LinkDialog } from "./LinkDialog";
import { ImagesDialog } from "./ImagesDialog";
import { CustomImage } from "./extensions/CustomImage";
import { Media } from "@/features/media/types";

interface RichTextEditorProps {
  value?: string;
  onChange: (value: string) => void;
  minHeight?: string;
  mediaItems?: Media[];
  isLoadingMediaItems?: boolean;
  onFetchMediaItems?: () => void;
  onUploadMediaItems?: (files: File[]) => void;
  isUploadingMediaItems?: boolean;
  onDeleteMediaItem?: (id: string) => void;
  isDeletingMediaItem?: boolean;
}

export function RichTextEditor({
  value,
  minHeight = "200px",
  onChange,
  mediaItems,
  isLoadingMediaItems,
  onFetchMediaItems,
  onUploadMediaItems,
  isUploadingMediaItems,
  onDeleteMediaItem,
  isDeletingMediaItem,
}: RichTextEditorProps) {
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [selectedLinkText, setSelectedLinkText] = useState("");
  const [imagesDialogOpen, setImagesDialogOpen] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
        link: false,
        underline: false,
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: {
          class:
            "text-primary underline underline-offset-4 cursor-pointer hover:text-primary/80",
        },
      }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      CustomImage,
      CharacterCount,
    ],
    immediatelyRender: false,
    content: value,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
  });

  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();
    const next = value ?? "";

    if (current !== next) {
      editor.commands.setContent(next, {
        emitUpdate: false,
      });
    }
  }, [value, editor]);

  const characterCount = editor?.storage.characterCount;

  const openLinkDialog = () => {
    if (!editor) return;
    editor.chain().focus().run();
    const { from, to } = editor.state.selection;
    const text = editor.state.doc.textBetween(from, to, "");
    setSelectedLinkText(text);
    setLinkDialogOpen(true);
  };

  const openImagesDialog = () => {
    setImagesDialogOpen(true);
    onFetchMediaItems?.();
  };

  if (!editor) return null;

  return (
    <div
      className={cn(
        "rounded-lg border border-input transition-shadow bg-background overflow-hidden",
        "focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50",
      )}
    >
      {editor && (
        <EditorToolbar
          editor={editor}
          onOpenChangeLinkDialog={openLinkDialog}
          onOpenChangeImagesDialog={openImagesDialog}
        />
      )}

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

      <LinkDialog
        open={linkDialogOpen}
        onOpenChange={setLinkDialogOpen}
        editor={editor}
        selectedLinkText={selectedLinkText}
      />

      <ImagesDialog
        open={imagesDialogOpen}
        onOpenChange={setImagesDialogOpen}
        editor={editor}
        mediaItems={mediaItems}
        isLoadingMediaItems={isLoadingMediaItems}
        onUploadMediaItems={onUploadMediaItems}
        isUploadingMediaItems={isUploadingMediaItems}
        onDeleteMediaItem={onDeleteMediaItem}
        isDeletingMediaItem={isDeletingMediaItem}
      />
    </div>
  );
}
