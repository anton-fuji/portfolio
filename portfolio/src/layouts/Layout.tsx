import "./tailwind.css"
import Header from "./Header"
import { ReactNode } from "react";

export type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div>
            <Header />
            <main className="pt-4 pb-16">{children}</main>
        </div>
    )
}