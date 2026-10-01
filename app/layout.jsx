import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { profile, summary } from "../lib/data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const title = `${profile.name} — ${profile.headline}`;

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")
  ),
  title,
  description: profile.tagline,
  keywords: [
    "Generative AI Engineer",
    "Data Scientist",
    "Machine Learning Engineer",
    "Agentic AI",
    "RAG",
    "LangGraph",
    "MLOps",
    "LLM Fine-Tuning",
    profile.name,
  ],
  authors: [{ name: profile.name, url: profile.linkedin }],
  openGraph: {
    title,
    description: profile.tagline,
    type: "profile",
    images: [{ url: profile.photo, width: 1200, height: 1200, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: profile.tagline,
  },
  icons: { icon: "/headshot.png" },
};

export const viewport = {
  themeColor: "#04060d",
  colorScheme: "dark",
};

/* Structured data so recruiters' tooling reads the profile correctly */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.titles,
  description: summary[0],
  email: `mailto:${profile.email}`,
  telephone: profile.phone,
  image: profile.photo,
  sameAs: [profile.linkedin, profile.github],
  address: { "@type": "PostalAddress", addressCountry: "US" },
  worksFor: { "@type": "Organization", name: "Wells Fargo" },
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of North Texas" },
    { "@type": "CollegeOrUniversity", name: "Vidya Jyothi Institute of Technology" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} scroll-smooth`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
