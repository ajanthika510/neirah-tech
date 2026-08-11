import { LucideIcon } from "lucide-react";

export interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
  icon: LucideIcon;
  gradient: string;
}