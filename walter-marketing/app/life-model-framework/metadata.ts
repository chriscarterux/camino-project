import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life Model Framework | Context Engineering for Personalized AI",
  description:
    "Transform generic AI into personalized intelligence through a structured 5-phase framework. Build your digital psychological twin with validated psychometrics, personal history, and context engineering.",
  keywords: [
    "life model",
    "context engineering",
    "personalized AI",
    "AI context",
    "psychological framework",
    "digital twin",
    "AI personalization",
    "psychometrics",
    "self-awareness",
    "AI guidance",
  ],
  openGraph: {
    title: "The Life Model Framework - Context Engineering for AI",
    description:
      "A structured 5-phase methodology to build your digital psychological twin and transform generic AI into truly personalized guidance.",
    type: "website",
    url: "https://camino.app/life-model-framework",
    images: [
      {
        url: "/og-life-model-framework.png",
        width: 1200,
        height: 630,
        alt: "Life Model Framework - 5 Phases",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The Life Model Framework",
    description:
      "Transform generic AI into personalized intelligence through structured context engineering.",
    images: ["/og-life-model-framework.png"],
  },
};
