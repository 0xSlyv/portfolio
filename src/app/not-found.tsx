import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4">
            <h1 className="text-6xl font-bold mb-4 text-theme-color">404</h1>
            <h2 className="text-2xl font-semibold mb-8">Page Not Found</h2>
            <p className="text-muted-foreground mb-8 text-center max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <Link
                href="/"
                className="px-6 py-3 rounded-full bg-theme-color text-white font-medium hover:opacity-90 transition-opacity"
            >
                Return Home
            </Link>
        </div>
    );
}
