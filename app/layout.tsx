import type { Metadata } from "next";
import "./globals.css";
import { ChatBot } from "../components/ChatBot";

export const metadata: Metadata = {
  title: "Getsetai Innovations - Digital Transformation & AI",
  description: "Master AI, Robotics, and Full-Stack Development with Getsetai Innovations.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <ChatBot />
      </body>
    </html>
  );
}