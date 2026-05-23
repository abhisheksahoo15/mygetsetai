import type { Metadata } from "next";
import "./globals.css";
import { ChatBot } from "../components/ChatBot";

export const metadata: Metadata = {
  title: "Getsetai Innovations - Digital Transformation & AI",
  description: "Getsetai Innovations — AI center in Bhilai. Best software development company in Bhilai and Chhattisgarh. Master AI, Robotics, and Full-Stack Development.",
  keywords: [
    "Getsetai",
    "Getsetai Innovations",
    "AI center Bhilai",
    "software development Bhilai",
    "best software company Chhattisgarh",
    "AI training Bhilai",
    "Python courses Bhilai"
  ],
  icons: {
    icon: '/favicon.svg'
  },
  openGraph: {
    title: 'Getsetai Innovations — AI Center in Bhilai',
    description: 'Leading AI center in Bhilai and top software development company in Chhattisgarh.',
    siteName: 'Getsetai Innovations',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Getsetai Innovations — AI Center in Bhilai',
    description: 'AI training, software development and enterprise solutions in Bhilai, Chhattisgarh.'
  }
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

        {/* JSON-LD LocalBusiness schema for SEO (Bhilai, Chhattisgarh) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Getsetai Innovations",
              telephone: "+91 92028 93485",
              email: "innovationsgetsetai@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Kohka, Bhilai Nagar",
                addressLocality: "Bhilai",
                addressRegion: "Chhattisgarh",
                postalCode: "490023",
                addressCountry: "IN"
              },
              description: "Getsetai Innovations — AI center in Bhilai and a leading software development company serving Chhattisgarh.",
              logo: "/favicon.svg",
              areaServed: ["Bhilai", "Bhilai Nagar", "Durg", "Raipur", "Chhattisgarh"]
            })
          }}
        />
      </body>
    </html>
  );
}