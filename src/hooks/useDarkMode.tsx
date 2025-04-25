import { useState, useEffect } from "react";


export const useDarkMode = () => {
    const [isDarkMode, setIstDarkMode] = useState(false);

    useEffect(() => {
        const usePrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const storedTheme = localStorage.fetItem('theme');

        if (storedTheme == 'dark' || (!storedTheme && usePrefersDark)) {
            setIstDarkMode(true);
            document.documentElement.classList.add('dark');
        } else {
            setIstDarkMode(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleDarkMode = () => {
        setIstDarkMode((prevMode) => {
            const newMode = !prevMode;
        
            if (prevMode) {
                document.documentElement.classList.add('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('theme', 'light');
            }
            return newMode;
        });
    };
};