import Image from "@tiptap/extension-image";
import { ResizableNodeView } from "@tiptap/react";

export const CustomImage = Image.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      align: {
        default: "center",
        parseHTML: (element) => element.getAttribute("data-align") || "center",
        renderHTML: (attributes) => ({
          "data-align": attributes.align,
          class: `image-${attributes.align}`,
        }),
      },
    };
  },

  addNodeView() {
    return ({ node, getPos, editor, HTMLAttributes }) => {
      const img = document.createElement("img");

      img.src = HTMLAttributes.src;

      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        if (
          value == null ||
          key === "width" ||
          key === "height" ||
          key === "align"
        )
          return;

        img.setAttribute(key, String(value));
      });

      const nodeView = new ResizableNodeView({
        editor,
        element: img,
        node,
        getPos,
        onResize: (w, h) => {
          img.style.width = `${w}px`;
          img.style.height = `${h}px`;
        },
        onCommit: (w, h) => {
          const pos = getPos();
          if (pos === undefined) return;

          editor.commands.updateAttributes("image", {
            width: w,
            height: h,
          });
        },
        onUpdate: (updatedNode) => {
          if (updatedNode.type !== node.type) return false;

          img.src = updatedNode.attrs.src;

          const align = updatedNode.attrs.align || "center";
          img.setAttribute("data-align", align);
          img.classList.remove("image-left", "image-center", "image-right");
          img.classList.add(`image-${align}`);

          const container = img.closest("[data-resize-container]");
          if (container instanceof HTMLElement) {
            container.setAttribute("data-align", align);
          }

          return true;
        },

        options: {
          directions: ["bottom-right", "bottom-left", "top-right", "top-left"],
          min: { width: 50, height: 50 },
          preserveAspectRatio: true,
        },
      });

      const initialAlign = node.attrs.align || "center";

      const resizeContainer = img.closest("[data-resize-container]");

      if (resizeContainer instanceof HTMLElement) {
        resizeContainer.setAttribute("data-align", initialAlign);
        resizeContainer.classList.add(`align-${initialAlign}`);
      }

      return nodeView;
    };
  },
});
