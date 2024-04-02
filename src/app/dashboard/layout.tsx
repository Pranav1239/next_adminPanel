import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });
import { cn } from "@/lib/utils"
import { ToastContainer } from "react-toastify";


export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={cn(
                "min-h-screen bg-background font-sans antialiased",
                inter.className
            )}>
                <div>
                    <ToastContainer />
                </div>
                {children}
            </body>
        </html>
    );
}
