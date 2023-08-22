import SideBar from "@/components/sidebar";
import "./globals.css";
import { Inter } from "next/font/google";
import MobileSideBar from "@/components/mobile-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lucid | Home",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className={`${inter.className} h-full`}>
        <div>
          <MobileSideBar />
          <SideBar />
          {children}
        </div>
      </body>
    </html>
  );
}
