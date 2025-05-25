import './tailwind.css';
import './style.css';
import Header from './Header';
import { ReactNode } from 'react';
import Footer from './Footer';

export type LayoutProps = {
    children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col min-h-screen overflow-hidden">
            <Header />
                <main className="relative z-10 pt-16 pb-16 flex-grow ">
                    {children}
                </main>


            <Footer />
        </div>
    )
}