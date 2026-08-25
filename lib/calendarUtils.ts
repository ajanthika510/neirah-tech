import {
  Globe,
  Smartphone,
  Bot,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Cpu,
  FlaskConical,
} from "lucide-react";
import type { Booking } from "../app/actions/bookingActions";

export const SERVICES = [
  {
    id: "business-website",
    name: "Business Website",
    description: "Create a modern website that attracts customers & helps your business grow 24/7",
    icon: Globe,
    badge: "Popular",
  },
  {
    id: "mobile-apps",
    name: "Mobile Apps",
    description: "Allow your customers to access your services anytime from iOS & Android",
    icon: Smartphone,
    badge: "High Demand",
  },
  {
    id: "ai-assistant",
    name: "AI Assistant",
    description: "Automate repetitive tasks & answer customer inquiries instantly with custom AI",
    icon: Bot,
    badge: "Most Requested",
  },
  {
    id: "digital-marketing",
    name: "Digital Marketing",
    description: "Increase visibility & attract more customers through SEO, Ads & brand awareness",
    icon: TrendingUp,
    badge: "Growth",
  },
  {
    id: "business-software",
    name: "Business Software",
    description: "Track sales, inventory, CRM, finances & analytics in one unified dashboard",
    icon: BarChart3,
    badge: "Enterprise",
  },
  {
    id: "consulting",
    name: "Consulting",
    description: "Choose the right technology roadmap, architecture & strategy for your business",
    icon: ShieldCheck,
    badge: "Advisory",
  },
  {
    id: "smart-iot",
    name: "Smart Devices & IoT",
    description: "Sensors, drones & smart devices bringing real-time telemetry & automation",
    icon: Cpu,
    badge: "IoT Tech",
  },
  {
    id: "innovation-lab",
    name: "Innovation Lab",
    description: "R&D prototyping, emerging AI research & custom future tech exploration",
    icon: FlaskConical,
    badge: "R&D",
  },
];

export const DURATIONS = [
  { value: 15, label: "15 min", desc: "Quick Discovery" },
  { value: 30, label: "30 min", desc: "Strategy & Scope (Recommended)", default: true },
  { value: 45, label: "45 min", desc: "Technical Deep Dive" },
];

export const TIMEZONES = [
  { value: "America/New_York", label: "New York (EST/EDT)", offset: "UTC-5 / -4" },
  { value: "America/Los_Angeles", label: "Los Angeles (PST/PDT)", offset: "UTC-8 / -7" },
  { value: "America/Chicago", label: "Chicago (CST/CDT)", offset: "UTC-6 / -5" },
  { value: "Europe/London", label: "London (GMT/BST)", offset: "UTC+0 / +1" },
  { value: "Europe/Paris", label: "Paris / Berlin (CET/CEST)", offset: "UTC+1 / +2" },
  { value: "Asia/Dubai", label: "Dubai (GST)", offset: "UTC+4" },
  { value: "Asia/Colombo", label: "Sri Lanka / India (IST)", offset: "UTC+5:30" },
  { value: "Asia/Singapore", label: "Singapore (SGT)", offset: "UTC+8" },
  { value: "Australia/Sydney", label: "Sydney (AEST)", offset: "UTC+10" },
  { value: "UTC", label: "Universal Coordinated Time (UTC)", offset: "UTC" },
];

export const TIME_SLOTS = [
  { time: "09:00 AM", period: "Morning", popular: false },
  { time: "10:00 AM", period: "Morning", popular: true },
  { time: "11:00 AM", period: "Morning", popular: false },
  { time: "11:45 AM", period: "Morning", popular: false },
  { time: "01:30 PM", period: "Afternoon", popular: false },
  { time: "02:30 PM", period: "Afternoon", popular: true },
  { time: "03:30 PM", period: "Afternoon", popular: false },
  { time: "04:30 PM", period: "Afternoon", popular: true },
  { time: "05:30 PM", period: "Evening", popular: false },
  { time: "06:30 PM", period: "Evening", popular: true },
  { time: "07:30 PM", period: "Evening", popular: false },
];

export const PLATFORMS = [
  { id: "Google Meet", label: "Google Meet", note: "Auto-generated link" },
  { id: "Zoom", label: "Zoom Video", note: "Meeting link sent in email" },
  { id: "Microsoft Teams", label: "Microsoft Teams", note: "Teams bridge" },
  { id: "Phone Call", label: "Direct Phone Call", note: "We call your number" },
];

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Generate Google Calendar event URL
 */
export function generateGoogleCalendarUrl(booking: Booking): string {
  const title = encodeURIComponent(`Neirah Tech Consultation: ${booking.service}`);
  const details = encodeURIComponent(
    `Meeting with Neirah Tech Architecture Team\nService: ${booking.service}\nPlatform: ${booking.meetingPlatform}\nReference ID: ${booking.referenceCode}\nAttendee: ${booking.name}`
  );
  const location = encodeURIComponent(booking.meetingPlatform);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
}

/**
 * Generate and trigger download of .ics calendar file
 */
export function downloadICSFile(booking: Booking): void {
  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Neirah Tech//Digital Consultation Scheduler//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:REQUEST",
    "BEGIN:VEVENT",
    `SUMMARY:Neirah Tech: ${booking.service}`,
    `DESCRIPTION:Consultation Session with Neirah Tech.\\nReference: ${booking.referenceCode}\\nPlatform: ${booking.meetingPlatform}`,
    `LOCATION:${booking.meetingPlatform}`,
    `STATUS:CONFIRMED`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `neirah-tech-${booking.referenceCode}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
