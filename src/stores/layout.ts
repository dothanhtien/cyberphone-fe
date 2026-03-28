import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { BreadcrumbItem } from "@/types";

interface LayoutState {
  activeMenu: string;
  breadcrumbs: BreadcrumbItem[];

  setActiveMenu: (key: string) => void;
  setBreadcrumbs: (items: BreadcrumbItem[]) => void;
  resetLayout: () => void;
}

export const useLayoutStore = create<LayoutState>()(
  devtools(
    (set) => ({
      activeMenu: "",
      breadcrumbs: [],
      setActiveMenu: (key) => set({ activeMenu: key }),
      setBreadcrumbs: (items) => set({ breadcrumbs: items }),
      resetLayout: () => set({ activeMenu: "", breadcrumbs: [] }),
    }),
    { name: "layout-store" },
  ),
);
