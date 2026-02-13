"use client";

import { PageTransition } from "@ojpp/ui";

export default function Template({ children }: { children: React.ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
