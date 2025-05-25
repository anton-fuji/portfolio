import "./tailwind.css";
import "./style.css";
import Header from "./Header";
import type { ReactNode } from "react";
import Footer from "./Footer";

export type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <Header />
      <main className="relative z-10 flex-grow pt-16 pb-16">{children}</main>

      <Footer />
    </div>
  );
}
