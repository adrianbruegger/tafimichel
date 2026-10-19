import type { Metadata } from "next";
import { Switcher } from "@/components/design/switcher";
import "./design.css";

// Proposals, not pages of the site: they stay out of the index and the sitemap.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function DesignLayout({ children }: LayoutProps<"/design">) {
  return (
    <>
      {children}
      <Switcher />
    </>
  );
}
