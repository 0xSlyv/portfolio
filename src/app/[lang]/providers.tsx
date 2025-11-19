'use client';

import { I18nProvider, useI18n } from "@/i18n/I18nProvider";
import { ThemeProvider } from "@/contexts/theme-context";
import CursorFollower from "@/_components/ui/cursor-follower";
import { useState, useEffect } from 'react';
import { House, Paintbrush, Languages, Layers } from "lucide-react";
import { useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import PopStyles from "@/_components/pop-out/pop-styles";
import PopLanguage from "@/_components/pop-out/pop-language";
import Popover from "@/_components/ui/pop-over";

const SquigglyLine = dynamic<{
    className?: string;
    count?: number;
    minSegments?: number;
    maxSegments?: number;
    speed?: number;
}>(() => import('@/_components/ui/squiggly-line').then(mod => mod.default), {
    ssr: false
});

// Dynamically import the Dock component with SSR disabled
const Dock = dynamic(() => import('@/_components/ui/dock-bar'), {
    ssr: false
});

function DockWrapper() {
    const [isClient, setIsClient] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [isStylesOpen, setIsStylesOpen] = useState(false);
    const [isLanguageOpen, setIsLanguageOpen] = useState(false);

    // Ensure we're on the client before rendering the dock
    useEffect(() => {
        setIsClient(true);

        // Handle hash changes
        const handleHashChange = () => {
            if (typeof window !== 'undefined' && window.location.hash) {
                const section = window.location.hash.substring(1);
                setActiveSection(section);
            } else {
                setActiveSection('home');
            }
        };

        // Set initial active section
        handleHashChange();

        // Add event listener for hash changes
        window.addEventListener('hashchange', handleHashChange);

        // Cleanup
        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const { lang } = useParams();

    const dockItems = [
        {
            icon: <House size={20} />,
            label: 'Profile',
            onClick: () => {
                window.location.href = `/${lang}/home#profile`;
                setActiveSection('profile');
            },
            className: `hover:bg-theme-color/10 ${activeSection === 'profile' || activeSection === 'home' ? 'bg-theme-color/20' : ''}`
        },
        {
            icon: <Layers size={20} />,
            label: 'Projects',
            onClick: () => {
                window.location.href = `/${lang}/home#projects`;
                setActiveSection('projects');
            },
            className: `hover:bg-theme-color/10 ${activeSection === 'projects' ? 'bg-theme-color/20' : ''}`
        },
        {
            label: 'separator',
            className: 'pointer-events-none'
        },
        {
            icon: (
                <Popover
                    mode="click"
                    position="right-top"
                    onOpenChange={setIsStylesOpen}
                    trigger={({ onClick }) => (
                        <div
                            className="flex items-center justify-center w-full h-full rounded-full hover:bg-theme-color/10"
                            onClick={onClick}
                        >
                            <Paintbrush size={20} />
                        </div>
                    )}
                >
                    <div className="p-4 bg-main/90 backdrop-blur-lg rounded-lg shadow-lg border border-subtle/50 mb-4">
                        <PopStyles />
                    </div>
                </Popover>
            ),
            label: isStylesOpen ? null : 'Styles',
            className: '!p-0'
        },
        {
            icon: (
                <Popover
                    mode="click"
                    position="right-top"
                    onOpenChange={setIsLanguageOpen}
                    trigger={({ onClick }) => (
                        <div
                            className="flex items-center justify-center w-full h-full rounded-full hover:bg-theme-color/10"
                            onClick={onClick}
                        >
                            <Languages size={20} />
                        </div>
                    )}
                >
                    <div className="p-4 bg-main/90 backdrop-blur-lg rounded-lg shadow-lg border border-subtle/50 mb-4">
                        <PopLanguage />
                    </div>
                </Popover>
            ),
            label: isLanguageOpen ? null : 'Language',
            className: '!p-0'
        },
    ];

    return (
        <>
            {isClient && (
                <Dock
                    items={dockItems}
                    panelHeight={64}
                    baseItemSize={44}
                    magnification={60}
                    className="backdrop-blur-lg"
                />
            )}
        </>
    );
}

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ThemeProvider>
            <I18nProvider>
                <div className="fixed inset-0 overflow-hidden -z-10">
                    <SquigglyLine
                        count={5}
                        speed={15}
                        minSegments={3}
                        maxSegments={6}
                        className="opacity-10 dark:opacity-30"
                    />
                </div>
                <CursorFollower />
                <DockWrapper />
                {children}
            </I18nProvider>
        </ThemeProvider>
    );
}
