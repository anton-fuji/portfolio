import "./tailwind.css";
import "./style.css";
import type { ReactNode } from "react";

import { LanguageProvider } from "../i18n";
import Footer from "./Footer";
import Header from "./Header";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col overflow-hidden">
        <Header />
        <main className="relative z-10 flex-grow pt-16 pb-16">{children}</main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
