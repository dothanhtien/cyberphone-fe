"use client";

import { type LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import React, { useState, useEffect } from "react";

export function DynamicIcon({ name, className, ...props }: { name: string } & LucideProps) {
  const [Icon, setIcon] = useState<React.ComponentType<LucideProps> | null>(
    null,
  );

  useEffect(() => {
    const importFn =
      dynamicIconImports[name as keyof typeof dynamicIconImports];
    if (!importFn) return;
    importFn().then((mod) =>
      setIcon(() => mod.default as React.ComponentType<LucideProps>),
    );
  }, [name]);

  if (!Icon) return <span className={className} />;
  return <Icon className={className} {...props} />;
}
