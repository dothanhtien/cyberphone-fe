"use client";

import { type LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import React, { useState, useEffect } from "react";

export function DynamicIcon({
  name,
  className,
  ...props
}: { name: string } & LucideProps) {
  const [Icon, setIcon] = useState<React.ComponentType<LucideProps> | null>(
    null,
  );

  useEffect(() => {
    let isCurrent = true;
    const importFn =
      dynamicIconImports[name as keyof typeof dynamicIconImports];
    if (!importFn)
      return () => {
        isCurrent = false;
      };
    importFn()
      .then((mod) => {
        if (isCurrent)
          setIcon(() => mod.default as React.ComponentType<LucideProps>);
      })
      .catch((err) => {
        if (isCurrent) {
          console.error(`DynamicIcon: failed to load icon "${name}"`, err);
          setIcon(null);
        }
      });
    return () => {
      isCurrent = false;
    };
  }, [name]);

  if (!Icon) return <span className={className} />;
  return <Icon className={className} {...props} />;
}
