import { STORE_NAME } from "@/config";

export function Footer() {
  return (
    <footer className="text-center pb-8 text-sm text-muted-foreground">
      © 2026 {STORE_NAME}. All rights reserved.
    </footer>
  );
}
