import type { Editor, EditorStateSnapshot } from "@tiptap/react";

export function editorToolbarStateSelector(ctx: EditorStateSnapshot<Editor>) {
  return {
    // History
    canUndo: ctx.editor.can().chain().undo().run() ?? false,
    canRedo: ctx.editor.can().chain().redo().run() ?? false,

    // Typography
    isHeading1: ctx.editor.isActive("heading", { level: 1 }) ?? false,
    isHeading2: ctx.editor.isActive("heading", { level: 2 }) ?? false,
    isHeading3: ctx.editor.isActive("heading", { level: 3 }) ?? false,

    // Text formatting
    isBold: ctx.editor.isActive("bold") ?? false,
    canBold: ctx.editor.can().chain().toggleBold().run() ?? false,
    isItalic: ctx.editor.isActive("italic") ?? false,
    canItalic: ctx.editor.can().chain().toggleItalic().run() ?? false,
    isStrike: ctx.editor.isActive("strike") ?? false,
    canStrike: ctx.editor.can().chain().toggleStrike().run() ?? false,
    isUnderline: ctx.editor.isActive("underline") ?? false,
    canUnderline: ctx.editor.can().chain().toggleUnderline().run() ?? false,
    isCode: ctx.editor.isActive("code") ?? false,
    canCode: ctx.editor.can().chain().toggleCode().run() ?? false,

    // Alignment
    isAlignLeft: ctx.editor.isActive({ textAlign: "left" }) ?? false,
    isAlignCenter: ctx.editor.isActive({ textAlign: "center" }) ?? false,
    isAlignRight: ctx.editor.isActive({ textAlign: "right" }) ?? false,
    isAlignJustify: ctx.editor.isActive({ textAlign: "justify" }) ?? false,

    // Lists and blocks
    isBulletList: ctx.editor.isActive("bulletList") ?? false,
    isOrderedList: ctx.editor.isActive("orderedList") ?? false,
    isCodeBlock: ctx.editor.isActive("codeBlock") ?? false,
    isBlockquote: ctx.editor.isActive("blockquote") ?? false,

    // Link
    isLink: ctx.editor.isActive("link") ?? false,

    // Image
    isImage: ctx.editor.isActive("image"),
    imageAlign: ctx.editor.getAttributes("image").align as string | undefined,
  };
}

export type EditorToolbarState = ReturnType<typeof editorToolbarStateSelector>;
