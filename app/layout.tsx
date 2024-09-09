import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Next App",
	description: "A simple nextjs app featuring user accounts",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${inter.className} min-h-screen relative`}>
				<Navbar />
				<Toaster position="bottom-left" />
				{children}
			</body>
		</html>
	);
}
