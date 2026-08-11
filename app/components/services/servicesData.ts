import {
  Globe,
  Smartphone,
  Bot,
  TrendingUp,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

import { Service } from "./types";

export const services: Service[] = [
  {
    id: 1,
    title: "Business Website",
    subtitle: "Build Trust Online",
    description:
      "Create a modern website that attracts customers and helps your business grow 24/7.",
    benefits: [
      "Professional Design",
      "Google Friendly",
      "Fast Loading",
      "Mobile Responsive",
    ],
    icon: Globe,
    gradient: "from-sky-500 to-cyan-400",
  },

  {
    id: 2,
    title: "Mobile Apps",
    subtitle: "Stay Connected",
    description:
      "Allow your customers to access your services anytime from their phones.",
    benefits: [
      "Android",
      "iPhone",
      "Push Notifications",
      "Easy Updates",
    ],
    icon: Smartphone,
    gradient: "from-indigo-500 to-sky-500",
  },

  {
    id: 3,
    title: "AI Assistant",
    subtitle: "Save Time",
    description:
      "Automate repetitive tasks and answer customer questions instantly.",
    benefits: [
      "24/7 Support",
      "Chatbot",
      "Automation",
      "WhatsApp",
    ],
    icon: Bot,
    gradient: "from-cyan-500 to-sky-500",
  },

  {
    id: 4,
    title: "Digital Marketing",
    subtitle: "Reach More Customers",
    description:
      "Increase visibility and attract more customers through online marketing.",
    benefits: [
      "SEO",
      "Facebook Ads",
      "Google Ads",
      "Brand Awareness",
    ],
    icon: TrendingUp,
    gradient: "from-sky-600 to-indigo-500",
  },

  {
    id: 5,
    title: "Business Software",
    subtitle: "Manage Everything",
    description:
      "Track sales, inventory, customers and reports in one place.",
    benefits: [
      "Sales",
      "Inventory",
      "CRM",
      "Reports",
    ],
    icon: BarChart3,
    gradient: "from-cyan-500 to-indigo-600",
  },

  {
    id: 6,
    title: "Consulting",
    subtitle: "Expert Guidance",
    description:
      "Choose the right technology based on your business goals.",
    benefits: [
      "Planning",
      "Roadmap",
      "Training",
      "Support",
    ],
    icon: ShieldCheck,
    gradient: "from-indigo-600 to-sky-500",
  },
];