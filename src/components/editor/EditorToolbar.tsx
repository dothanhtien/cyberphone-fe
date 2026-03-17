import { Editor, useEditorState } from "@tiptap/react";
import {
  AlignCenter,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Code,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Image as ImageIcon,
  Italic,
  Link,
  Link2Off,
  List,
  ListOrdered,
  Minus,
  Quote,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";

import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Toggle } from "../ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { editorToolbarStateSelector } from "./editorToolbarState";
import { cn } from "@/lib/utils";

interface ToolbarButtonProps {
  isActive?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  tooltip: string;
  onClick: () => void;
}

function ToolbarButton({
  isActive,
  disabled,
  children,
  tooltip,
  onClick,
}: ToolbarButtonProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Toggle
            size="sm"
            pressed={isActive}
            onPressedChange={onClick}
            disabled={disabled}
            className={cn(
              "h-8 w-8 p-0",
              isActive && "bg-accent text-accent-foreground border",
            )}
          >
            {children}
          </Toggle>
        </TooltipTrigger>
        <TooltipContent side="top" className="text-xs">
          {tooltip}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

interface EditorToolbarProps {
  editor: Editor;
  onOpenChangeLinkDialog?: () => void;
  onOpenChangeImagesDialog?: () => void;
}

export function EditorToolbar({
  editor,
  onOpenChangeLinkDialog,
  onOpenChangeImagesDialog,
}: EditorToolbarProps) {
  const editorState = useEditorState({
    editor,
    selector: editorToolbarStateSelector,
  });

  const setImageAlign = (align: "left" | "center" | "right") => {
    editor.chain().focus().updateAttributes("image", { align }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-0.5 border-b border-input bg-muted/40 px-2 py-1.5">
      {/* History */}
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editorState.canUndo}
            >
              <Undo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            Undo
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editorState.canRedo}
            >
              <Redo2 className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            Redo
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Headings */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        isActive={editorState.isHeading1}
        tooltip="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        isActive={editorState.isHeading2}
        tooltip="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        isActive={editorState.isHeading3}
        tooltip="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Text formatting */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBold().run()}
        isActive={editorState.isBold}
        tooltip="Bold (⌘B)"
      >
        <Bold className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        isActive={editorState.isItalic}
        tooltip="Italic (⌘I)"
      >
        <Italic className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        isActive={editorState.isUnderline}
        tooltip="Underline (⌘U)"
      >
        <Underline className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        isActive={editorState.isStrike}
        tooltip="Strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        isActive={editorState.isCode}
        tooltip="Inline Code"
      >
        <Code className="h-4 w-4" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Alignment */}
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        isActive={editorState.isAlignLeft}
        tooltip="Align Left"
      >
        <AlignLeft className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        isActive={editorState.isAlignCenter}
        tooltip="Align Center"
      >
        <AlignCenter className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        isActive={editorState.isAlignRight}
        tooltip="Align Right"
      >
        <AlignRight className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        isActive={editorState.isAlignJustify}
        tooltip="Justify"
      >
        <AlignJustify className="h-4 w-4" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Lists */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        isActive={editorState.isBulletList}
        tooltip="Bullet List"
      >
        <List className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        isActive={editorState.isOrderedList}
        tooltip="Ordered List"
      >
        <ListOrdered className="h-4 w-4" />
      </ToolbarButton>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Blocks */}
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        isActive={editorState.isBlockquote}
        tooltip="Blockquote"
      >
        <Quote className="h-4 w-4" />
      </ToolbarButton>
      <ToolbarButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        isActive={editorState.isCodeBlock}
        tooltip="Code Block"
      >
        <Code2 className="h-4 w-4" />
      </ToolbarButton>

      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">
            Horizontal Rule
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Separator orientation="vertical" className="mx-1 h-6" />

      {/* Link */}
      <ToolbarButton
        onClick={() => onOpenChangeLinkDialog?.()}
        isActive={editorState.isLink}
        tooltip="Add Link"
      >
        <Link className="h-4 w-4" />
      </ToolbarButton>
      {editorState.isLink && (
        <ToolbarButton
          onClick={() => editor.chain().focus().unsetLink().run()}
          tooltip="Remove Link"
        >
          <Link2Off className="h-4 w-4" />
        </ToolbarButton>
      )}

      {/* Image */}
      <ToolbarButton
        onClick={() => onOpenChangeImagesDialog?.()}
        isActive={editorState.isImage}
        tooltip="Insert Image"
      >
        <ImageIcon className="h-4 w-4" />
      </ToolbarButton>

      {editorState.isImage && (
        <div className="flex items-center gap-0.5 border-l pl-1">
          <ToolbarButton
            onClick={() => setImageAlign("left")}
            isActive={editorState.imageAlign === "left"}
            tooltip="Align Image Left"
          >
            <AlignHorizontalJustifyStart className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setImageAlign("center")}
            isActive={editorState.imageAlign === "center"}
            tooltip="Align Image Center"
          >
            <AlignHorizontalJustifyCenter className="h-4 w-4" />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => setImageAlign("right")}
            isActive={editorState.imageAlign === "right"}
            tooltip="Align Image Right"
          >
            <AlignHorizontalJustifyEnd className="h-4 w-4" />
          </ToolbarButton>
        </div>
      )}
    </div>
  );
}
