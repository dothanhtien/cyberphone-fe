import { useCallback, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";

import { layoutConfigMap } from "@/config";
import { useLayoutStore } from "@/stores/layout";

interface UsePageLayoutProps {
  segmentLabel?: string;
}

export const usePageLayout = ({ segmentLabel }: UsePageLayoutProps = {}) => {
  const pathname = usePathname();

  const getLayoutConfig = useCallback(
    (pathname: string, segmentLabel?: string) => {
      const match = Object.keys(layoutConfigMap).find((pattern) => {
        const patternParts = pattern.split("/");
        const pathParts = pathname.split("/");

        if (patternParts.length !== pathParts.length) return false;

        return patternParts.every((part, i) => {
          return (
            part === pathParts[i] ||
            (part.startsWith("[") && part.endsWith("]"))
          );
        });
      });

      if (!match) return null;

      return layoutConfigMap[match]({ segmentLabel, pathname });
    },
    [],
  );

  const config = useMemo(
    () => getLayoutConfig(pathname, segmentLabel),
    [pathname, segmentLabel, getLayoutConfig],
  );

  const setActiveMenu = useLayoutStore((s) => s.setActiveMenu);
  const setBreadcrumbs = useLayoutStore((s) => s.setBreadcrumbs);

  useEffect(() => {
    if (!config) return;

    const { title, activeMenuKey, breadcrumbs } = config;

    if (typeof document !== "undefined" && title) {
      document.title = title
        ? `CyberPhone | Admin | ${title}`
        : "CyberPhone | Admin";
    }

    if (breadcrumbs.length) setBreadcrumbs(breadcrumbs);

    if (activeMenuKey) setActiveMenu(activeMenuKey);
  }, [config, setActiveMenu, setBreadcrumbs]);
};
