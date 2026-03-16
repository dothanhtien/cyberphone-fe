import { useRef, useState } from "react";
import Image from "next/image";
import { Editor } from "@tiptap/react";
import { Trash2, Upload } from "lucide-react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { Media } from "@/features/media/types";
import { Spinner } from "../ui/spinner";
import { Input } from "@base-ui/react";

interface ImagesDialogProps {
  editor: Editor;
  open: boolean;
  onOpenChange: (value: boolean) => void;
  mediaItems?: Media[];
  isLoadingMediaItems?: boolean;
  onUploadMediaItems?: (files: File[]) => void;
  isUploadingMediaItems?: boolean;
  onDeleteMediaItem?: (id: string) => void;
  isDeletingMediaItem?: boolean;
}

export function ImagesDialog({
  editor,
  open,
  onOpenChange,
  mediaItems = [],
  isLoadingMediaItems = false,
  onUploadMediaItems,
  isUploadingMediaItems = false,
  onDeleteMediaItem,
  isDeletingMediaItem = false,
}: ImagesDialogProps) {
  const [selectedImage, setSelectedImage] = useState<Media | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const addImage = () => {
    if (!selectedImage) return;

    const chain = editor.chain().focus();

    if (editor.isActive("image")) {
      chain.updateAttributes("image", {
        src: selectedImage.url,
      });
    } else {
      chain.setImage({
        src: selectedImage.url,
      });
    }

    chain.run();
  };

  const handleSelectImage = () => {
    addImage();
    onOpenChange(false);
    setSelectedImage(null);
  };

  const handleUpload = (files: FileList | null) => {
    if (!files || !onUploadMediaItems) return;

    try {
      const fileArray = Array.from(files);
      onUploadMediaItems(fileArray);
    } finally {
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-4xl" aria-describedby="">
        <DialogHeader>
          <DialogTitle>Select image to insert</DialogTitle>
        </DialogHeader>

        <div className="-mx-4 no-scrollbar max-h-[50vh] overflow-y-auto px-4">
          {isLoadingMediaItems && (
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2">
                <Spinner className="size-6" />
                <span>Loading...</span>
              </div>
            </div>
          )}

          {!isLoadingMediaItems && !!mediaItems.length && (
            <div className="grid grid-cols-4 gap-6">
              {mediaItems.map((item) => (
                <div key={item.id} className="relative">
                  <Image
                    src={item.url}
                    width={300}
                    height={300}
                    alt=""
                    className={cn(
                      "mx-auto border-2 border-transparent rounded-lg cursor-pointer p-3",
                      selectedImage?.id === item.id && "border-orange-400",
                    )}
                    loading="eager"
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev?.id === item.id ? null : item,
                      )
                    }
                  />

                  <Button
                    variant="destructive"
                    size="icon-xs"
                    className="absolute top-0 right-0 text-red-500"
                    onClick={() => onDeleteMediaItem?.(item.id)}
                    disabled={isDeletingMediaItem}
                  >
                    <Trash2 />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {!isLoadingMediaItems && !mediaItems.length && (
            <div>No items found</div>
          )}
        </div>

        <Input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={(e) => handleUpload(e.target.files)}
        />

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploadingMediaItems}
          >
            {isUploadingMediaItems ? (
              <>
                <Spinner className="size-4" />
                Uploading...
              </>
            ) : (
              <>
                <Upload />
                Upload
              </>
            )}
          </Button>

          <Button
            type="button"
            onClick={handleSelectImage}
            disabled={!selectedImage}
          >
            Select
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
