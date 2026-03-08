import { useCallback, useState } from "react";
import { Editor } from "@tiptap/react";
import { ExternalLink, LinkIcon, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";

interface LinkDialogProps {
  editor: Editor;
  open: boolean;
  selectedLinkText?: string;
  onOpenChange: (value: boolean) => void;
}

function LinkDialogContent({
  editor,
  selectedLinkText = "",
  onOpenChange,
}: Omit<LinkDialogProps, "open">) {
  const existingLinkAttrs = editor.getAttributes("link");
  const existingUrl = existingLinkAttrs.href ?? "";
  const isLinkActive = editor.isActive("link");

  const [linkUrl, setLinkUrl] = useState(existingUrl);
  const [linkNewTab, setLinkNewTab] = useState(
    isLinkActive ? existingLinkAttrs.target === "_blank" : true,
  );
  const [linkText, setLinkText] = useState(selectedLinkText);

  const insertLink = useCallback(() => {
    if (!linkUrl.trim()) return;
    const target = linkNewTab ? "_blank" : "_self";

    const { from, to } = editor.state.selection;
    const hasSelection = from !== to;

    if (hasSelection) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl.trim(), target })
        .run();
    } else if (linkText.trim()) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: "text",
          text: linkText.trim(),
          marks: [
            {
              type: "link",
              attrs: {
                href: linkUrl.trim(),
                target,
                rel: "noopener noreferrer",
              },
            },
          ],
        })
        .run();
    } else {
      editor.chain().focus().setLink({ href: linkUrl.trim(), target }).run();
    }

    onOpenChange(false);
  }, [editor, linkUrl, linkText, linkNewTab, onOpenChange]);

  const removeLink = useCallback(() => {
    editor.chain().focus().extendMarkRange("link").unsetLink().run();
    onOpenChange(false);
  }, [editor, onOpenChange]);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <LinkIcon className="h-4 w-4" />
          {isLinkActive ? "Edit link" : "Insert link"}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-4 py-1">
        <div className="space-y-1.5">
          <Label htmlFor="link-url">
            URL <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <ExternalLink className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="link-url"
              className="pl-9"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && insertLink()}
              autoFocus
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="link-text">Text display</Label>
          <Input
            id="link-text"
            value={linkText}
            onChange={(e) => setLinkText(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && insertLink()}
          />
        </div>

        <div className="flex items-center justify-between rounded-lg border border-input px-3 py-2.5">
          <div>
            <p className="text-sm font-medium">Open in new tab</p>
            <p className="text-xs text-muted-foreground">
              target=&quot;_blank&quot;
            </p>
          </div>
          <Switch checked={linkNewTab} onCheckedChange={setLinkNewTab} />
        </div>
      </div>

      <DialogFooter className="flex-row items-center gap-2 sm:gap-2">
        {isLinkActive && (
          <Button
            variant="ghost"
            size="sm"
            className="mr-auto text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={removeLink}
          >
            <Trash2 className="mr-1.5 h-3.5 w-3.5" />
            Remove link
          </Button>
        )}
        <Button variant="outline" onClick={() => onOpenChange(false)}>
          Cancel
        </Button>
        <Button onClick={insertLink} disabled={!linkUrl.trim()}>
          {isLinkActive ? "Update" : "Insert"}
        </Button>
      </DialogFooter>
    </>
  );
}

export function LinkDialog({
  editor,
  open,
  selectedLinkText,
  onOpenChange,
}: LinkDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-sm"
        aria-describedby="link-dialog-description"
      >
        <LinkDialogContent
          key={String(open)}
          editor={editor}
          selectedLinkText={selectedLinkText}
          onOpenChange={onOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
}
