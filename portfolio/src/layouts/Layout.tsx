import "./tailwind.css"
import "./style.css"
import Header from "./Header"
import { ReactNode } from "react";
import Footer from "./Footer";

export type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
                <main className="pt-4 pb-16 flex-grow ">
                    {children}
                </main>


            <Footer />
        </div>
    )
}