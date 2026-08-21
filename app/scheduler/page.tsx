"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Clock,
  Globe,
  Video,
  User,
  Mail,
  Phone,
  Building,
  FileText,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  CalendarPlus,
  ShieldCheck,
  Zap,
  CheckCircle,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { createBooking, type Booking } from "../actions/bookingActions";

const SERVICES = [
  {
    id: "ai-automation",
    name: "AI & Intelligent Automation",
    description: "Custom LLMs, workflow agents & smart automation pipelines",
    icon: Sparkles,
    badge: "Most Requested",
  },
  {
    id: "digital-product",
    name: "Web & Mobile Product Design",
    description: "High-performance Next.js web applications & mobile platforms",
    icon: Globe,
    badge: "Popular",
  },
  {
    id: "enterprise-software",
    name: "Custom Enterprise Software",
    description: "Scalable backend architectures, ERP & SaaS ecosystems",
    icon: Building,
    badge: "High Scale",
  },
  {
    id: "cloud-iot",
    name: "IoT & Cloud Infrastructure",
    description: "Embedded telemetry, real-time IoT & AWS/GCP cloud systems",
    icon: Zap,
    badge: "Technical",
  },
];

const DURATIONS = [
  { value: 15, label: "15 min", desc: "Quick Discovery" },
  { value: 30, label: "30 min", desc: "Strategy & Scope (Recommended)", default: true },
  { value: 45, label: "45 min", desc: "Technical Deep Dive" },
];

const TIMEZONES = [
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

const TIME_SLOTS = [
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

const PLATFORMS = [
  { id: "Google Meet", label: "Google Meet", note: "Auto-generated link" },
  { id: "Zoom", label: "Zoom Video", note: "Meeting link sent in email" },
  { id: "Microsoft Teams", label: "Microsoft Teams", note: "Teams bridge" },
  { id: "Phone Call", label: "Direct Phone Call", note: "We call your number" },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const WEEKDAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SchedulerPage() {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form selections
  const [selectedService, setSelectedService] = useState<string>("AI & Intelligent Automation");
  const [duration, setDuration] = useState<number>(30);
  const [timezone, setTimezone] = useState<string>("UTC");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("10:00 AM");
  const [platform, setPlatform] = useState<string>("Google Meet");

  // Calendar state
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState<number>(today.getMonth());
  const [currentYear, setCurrentYear] = useState<number>(today.getFullYear());

  // Attendee info
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Submission & Confirmed state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  // Auto-detect timezone
  useEffect(() => {
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTz) {
        const match = TIMEZONES.find((t) => t.value === userTz);
        if (match) setTimezone(match.value);
        else setTimezone(userTz);
      }
    } catch {
      setTimezone("UTC");
    }
  }, []);

  // Pre-select tomorrow or first valid date
  useEffect(() => {
    if (!selectedDate) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
      const dd = String(tomorrow.getDate()).padStart(2, "0");
      const formatted = `${yyyy}-${mm}-${dd}`;
      setSelectedDate(formatted);
      setCurrentMonth(tomorrow.getMonth());
      setCurrentYear(tomorrow.getFullYear());
    }
  }, [selectedDate]);

  const daysInMonth = useMemo(() => {
    return new Date(currentYear, currentMonth + 1, 0).getDate();
  }, [currentYear, currentMonth]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(currentYear, currentMonth, 1).getDay();
  }, [currentYear, currentMonth]);

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const isDateDisabled = (day: number) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);
    const todayMidnight = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return dateToCheck < todayMidnight;
  };

  const handleDaySelect = (day: number) => {
    if (isDateDisabled(day)) return;
    const yyyy = currentYear;
    const mm = String(currentMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    setSelectedDate(`${yyyy}-${mm}-${dd}`);
  };

  const validateAttendeeDetails = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.email.trim()) errs.email = "Work email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) errs.email = "Valid email is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmitBooking = async () => {
    if (!validateAttendeeDetails()) return;
    setIsSubmitting(true);
    setServerError(null);

    try {
      const result = await createBooking({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        service: selectedService,
        duration: duration,
        bookingDate: selectedDate,
        bookingTime: selectedTime || "10:00 AM",
        timezone: timezone,
        meetingPlatform: platform,
        notes: formData.notes,
      });

      if (result.success && result.booking) {
        setConfirmedBooking(result.booking);
        setStep(4);
      } else {
        setServerError(result.error || "Failed to confirm booking. Please try again.");
      }
    } catch {
      setServerError("An unexpected network error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyBookingCode = () => {
    if (!confirmedBooking) return;
    navigator.clipboard.writeText(confirmedBooking.referenceCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const generateGoogleCalendarUrl = () => {
    if (!confirmedBooking) return "#";
    const title = encodeURIComponent(`Neirah Tech Consultation: ${confirmedBooking.service}`);
    const details = encodeURIComponent(
      `Meeting with Neirah Tech Architecture Team\nService: ${confirmedBooking.service}\nPlatform: ${confirmedBooking.meetingPlatform}\nReference ID: ${confirmedBooking.referenceCode}\nAttendee: ${confirmedBooking.name}`
    );
    const location = encodeURIComponent(confirmedBooking.meetingPlatform);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  const downloadICSFile = () => {
    if (!confirmedBooking) return;
    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Neirah Tech//Digital Consultation Scheduler//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:REQUEST",
      "BEGIN:VEVENT",
      `SUMMARY:Neirah Tech: ${confirmedBooking.service}`,
      `DESCRIPTION:Consultation Session with Neirah Tech.\\nReference: ${confirmedBooking.referenceCode}\\nPlatform: ${confirmedBooking.meetingPlatform}`,
      `LOCATION:${confirmedBooking.meetingPlatform}`,
      `STATUS:CONFIRMED`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `neirah-tech-${confirmedBooking.referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formattedSelectedDate = useMemo(() => {
    if (!selectedDate) return "";
    const [y, m, d] = selectedDate.split("-").map(Number);
    const dateObj = new Date(y, m - 1, d);
    return dateObj.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }, [selectedDate]);

  return (
    <main className="min-h-screen bg-[#000018] text-slate-100 pt-28 pb-20 px-4 sm:px-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-[700px] rounded-full bg-[#EEAD0E]/5 blur-[140px]" />
      <div className="pointer-events-none absolute top-10 left-10 h-72 w-72 rounded-full bg-cyan-500/5 blur-[120px]" />

      <div className="max-w-6xl mx-auto space-y-12 relative z-10">
        {/* Page Hero Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EEAD0E]/10 border border-[#EEAD0E]/20 text-[#EEAD0E] text-xs font-semibold uppercase tracking-wider">
            <Sparkles size={13} />
            Direct Architecture Consultation
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            Schedule a Strategy Session with <span className="text-[#EEAD0E]">Neirah Tech</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            Reserve a 1-on-1 strategy and architecture session with our lead software engineers and AI consultants. Let&apos;s map out your roadmap.
          </p>
        </div>

        {/* Main Scheduler Container */}
        <div className="rounded-3xl border border-[#EEAD0E]/20 bg-[#000024] shadow-[0_25px_90px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col md:flex-row">
          {/* Left Summary / Consultant Info */}
          <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-white/10 bg-[#00001a]/90 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-[#EEAD0E] to-amber-300 text-[#000020] font-black text-xl shadow-lg shadow-amber-500/20">
                  N
                  <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#000020]" />
                  </span>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-[#EEAD0E]">
                    Neirah Tech Architecture
                  </div>
                  <div className="text-base font-bold text-white">Live Consultation</div>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 mb-6 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 mb-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  Available for Q3 & Q4 2026 Projects
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Direct scoping, architectural breakdown, and project timeline estimation with zero sales fluff.
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Session Blueprint
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-[#EEAD0E]/15 text-[#EEAD0E]">
                    <Sparkles size={13} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-100">{selectedService}</div>
                    <div className="text-[11px] text-slate-400">{duration} minutes consultation</div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-500/15 text-sky-400">
                    <CalendarIcon size={13} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-100">{formattedSelectedDate || "Pick a date"}</div>
                    <div className="text-[11px] text-slate-400">
                      {selectedTime ? `${selectedTime} (${timezone.split("/")[1]?.replace(/_/g, " ") || timezone})` : "Choose preferred time"}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3 text-xs text-slate-300">
                  <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-400">
                    <Video size={13} />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-100">{platform}</div>
                    <div className="text-[11px] text-slate-400">Direct meeting link provided upon booking</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span>100% Free Consultation • Strict NDA</span>
              </div>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <Zap size={14} className="text-[#EEAD0E]" />
                <span>Instant Calendar Sync (.ics + Google)</span>
              </div>
            </div>
          </div>

          {/* Right Interactive Scheduler Widget */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between min-h-[580px]">
            {step < 4 && (
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  {[
                    { num: 1, label: "Topic & Scope" },
                    { num: 2, label: "Date & Time" },
                    { num: 3, label: "Your Details" },
                  ].map((s) => (
                    <button
                      key={s.num}
                      type="button"
                      onClick={() => {
                        if (step > s.num) setStep(s.num as any);
                      }}
                      disabled={step < s.num}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                        step === s.num
                          ? "bg-[#EEAD0E] text-[#000020] shadow-md shadow-amber-500/20"
                          : step > s.num
                          ? "bg-white/10 text-slate-200 hover:bg-white/15 cursor-pointer"
                          : "bg-white/5 text-slate-500 cursor-not-allowed"
                      }`}
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black/20 text-[10px]">
                        {step > s.num ? "✓" : s.num}
                      </span>
                      <span className="hidden sm:inline">{s.label}</span>
                    </button>
                  ))}
                </div>
                <div className="text-xs text-slate-400 font-medium">Step {step} of 3</div>
              </div>
            )}

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      What would you like to discuss?
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Choose the area of expertise you&apos;d like to focus on during our session.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SERVICES.map((srv) => {
                      const isSelected = selectedService === srv.name;
                      const Icon = srv.icon;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => setSelectedService(srv.name)}
                          className={`group relative cursor-pointer rounded-2xl border p-4 transition-all duration-200 ${
                            isSelected
                              ? "border-[#EEAD0E] bg-[#EEAD0E]/10 shadow-[0_0_20px_rgba(238,173,14,0.15)]"
                              : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.05]"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div
                              className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                                isSelected
                                  ? "bg-[#EEAD0E] text-[#000020]"
                                  : "bg-white/10 text-slate-300 group-hover:text-white"
                              }`}
                            >
                              <Icon size={18} />
                            </div>
                            <span
                              className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                                isSelected ? "bg-[#EEAD0E] text-[#000020]" : "bg-white/10 text-slate-400"
                              }`}
                            >
                              {srv.badge}
                            </span>
                          </div>
                          <div className="font-semibold text-sm text-slate-100 mb-1">{srv.name}</div>
                          <div className="text-xs text-slate-400 leading-relaxed">{srv.description}</div>
                        </div>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Preferred Session Duration
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {DURATIONS.map((dur) => (
                        <button
                          key={dur.value}
                          type="button"
                          onClick={() => setDuration(dur.value)}
                          className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all ${
                            duration === dur.value
                              ? "border-[#EEAD0E] bg-[#EEAD0E]/15 text-white shadow-[0_0_15px_rgba(238,173,14,0.15)]"
                              : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200"
                          }`}
                        >
                          <span className="text-sm font-bold">{dur.label}</span>
                          <span className="text-[10px] mt-0.5 text-slate-400">{dur.desc}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#EEAD0E] to-amber-400 px-6 py-3 text-sm font-bold text-[#000020] shadow-lg shadow-amber-500/25 transition-all hover:translate-x-0.5 hover:shadow-amber-500/40"
                  >
                    <span>Choose Date & Time</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-1 flex flex-col justify-between"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-base font-bold text-white">
                          {MONTH_NAMES[currentMonth]} {currentYear}
                        </div>
                        <div className="text-xs text-slate-400">Select consultation date</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition"
                        >
                          <ChevronLeft size={16} />
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:bg-white/10 hover:text-white transition"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-slate-400 py-1">
                      {WEEKDAY_NAMES.map((d) => (
                        <div key={d} className="text-slate-400">
                          {d}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center">
                      {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                        <div key={`empty-${i}`} className="h-9 w-full" />
                      ))}

                      {Array.from({ length: daysInMonth }).map((_, i) => {
                        const day = i + 1;
                        const mm = String(currentMonth + 1).padStart(2, "0");
                        const dd = String(day).padStart(2, "0");
                        const dateKey = `${currentYear}-${mm}-${dd}`;
                        const isSelected = selectedDate === dateKey;
                        const disabled = isDateDisabled(day);
                        const isToday =
                          today.getDate() === day &&
                          today.getMonth() === currentMonth &&
                          today.getFullYear() === currentYear;

                        return (
                          <button
                            key={day}
                            type="button"
                            disabled={disabled}
                            onClick={() => handleDaySelect(day)}
                            className={`relative h-9 w-full rounded-xl text-xs font-semibold transition-all flex flex-col items-center justify-center ${
                              isSelected
                                ? "bg-[#EEAD0E] text-[#000020] font-bold shadow-md shadow-amber-500/30 scale-105 z-10"
                                : disabled
                                ? "text-slate-600 cursor-not-allowed bg-transparent"
                                : isToday
                                ? "border border-[#EEAD0E]/60 text-[#EEAD0E] hover:bg-white/10 cursor-pointer"
                                : "text-slate-200 hover:bg-white/10 hover:text-white cursor-pointer"
                            }`}
                          >
                            <span>{day}</span>
                            {!disabled && !isSelected && (
                              <span className="h-1 w-1 rounded-full bg-emerald-400/80 mt-0.5" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-white/10">
                      <div className="flex items-center gap-2 mb-1.5">
                        <Globe size={13} className="text-[#EEAD0E]" />
                        <label className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                          Time Zone
                        </label>
                      </div>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-[#00001a] px-3 py-2 text-xs text-slate-200 outline-none focus:border-[#EEAD0E]"
                      >
                        {TIMEZONES.map((tz) => (
                          <option key={tz.value} value={tz.value} className="bg-[#000024] text-white">
                            {tz.label} ({tz.offset})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Guaranteed Available Time Slots Matrix */}
                  <div className="lg:col-span-5 space-y-4 border-t lg:border-t-0 lg:border-l border-white/10 lg:pl-6 pt-4 lg:pt-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <Clock size={15} className="text-sky-400" />
                        <div className="text-sm font-bold text-white">Available Time Slots</div>
                      </div>
                      <div className="text-xs text-slate-400 mt-0.5">
                        {formattedSelectedDate}
                      </div>
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {TIME_SLOTS.map((slot) => {
                        const isSelected = selectedTime === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            onClick={() => setSelectedTime(slot.time)}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? "border-[#EEAD0E] bg-[#EEAD0E]/15 text-white shadow-md shadow-amber-500/20"
                                : "border-white/10 bg-white/[0.02] text-slate-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span>{slot.time}</span>
                              <span className="text-[10px] text-slate-500 font-normal">
                                ({slot.period})
                              </span>
                            </div>

                            {slot.popular && (
                              <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                                Popular
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
                  >
                    <ArrowLeft size={15} />
                    <span>Back to Topics</span>
                  </button>

                  <button
                    type="button"
                    disabled={!selectedDate || !selectedTime}
                    onClick={() => setStep(3)}
                    className={`group flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all cursor-pointer ${
                      selectedDate && selectedTime
                        ? "bg-gradient-to-r from-[#EEAD0E] to-amber-400 text-[#000020] shadow-lg shadow-amber-500/25 hover:translate-x-0.5 hover:shadow-amber-500/40"
                        : "bg-white/10 text-slate-500 cursor-not-allowed"
                    }`}
                  >
                    <span>Continue to Details</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-5 flex-1 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Tell us about you & your project
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      We will send calendar invites and consultation prep notes to this email.
                    </p>
                  </div>

                  {serverError && (
                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-400">
                      {serverError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                      Preferred Video / Call Platform
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {PLATFORMS.map((p) => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPlatform(p.id)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            platform === p.id
                              ? "border-[#EEAD0E] bg-[#EEAD0E]/15 text-white shadow-sm shadow-amber-500/20"
                              : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-slate-200"
                          }`}
                        >
                          <div className="text-xs font-bold">{p.label}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">{p.note}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Alex Johnson"
                          className={`w-full rounded-xl border bg-white/[0.03] py-2.5 pl-10 pr-3 text-xs text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-[#EEAD0E] ${
                            errors.name ? "border-red-500/60" : "border-white/10"
                          }`}
                        />
                      </div>
                      {errors.name && <p className="text-[10px] text-red-400 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Work Email *
                      </label>
                      <div className="relative">
                        <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="alex@company.com"
                          className={`w-full rounded-xl border bg-white/[0.03] py-2.5 pl-10 pr-3 text-xs text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-[#EEAD0E] ${
                            errors.email ? "border-red-500/60" : "border-white/10"
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-[10px] text-red-400 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Phone Number (with Country Code) *
                      </label>
                      <div className="relative">
                        <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 019-2834"
                          className={`w-full rounded-xl border bg-white/[0.03] py-2.5 pl-10 pr-3 text-xs text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-[#EEAD0E] ${
                            errors.phone ? "border-red-500/60" : "border-white/10"
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Company / Organization (Optional)
                      </label>
                      <div className="relative">
                        <Building size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="e.g. Acme Corp"
                          className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-3 text-xs text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-[#EEAD0E]"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Brief Project Overview or Questions (Optional)
                    </label>
                    <div className="relative">
                      <FileText size={15} className="absolute left-3.5 top-3 text-slate-500" />
                      <textarea
                        rows={2}
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        placeholder="Tell us what you're building, target launch dates, or key tech stacks..."
                        className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-3 text-xs text-slate-100 placeholder:text-slate-600 outline-none transition focus:border-[#EEAD0E] resize-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition"
                  >
                    <ArrowLeft size={15} />
                    <span>Back to Calendar</span>
                  </button>

                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={handleSubmitBooking}
                    className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#EEAD0E] to-amber-400 px-7 py-3 text-sm font-bold text-[#000020] shadow-lg shadow-amber-500/25 transition-all hover:translate-x-0.5 hover:shadow-amber-500/40 disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#000020] border-t-transparent" />
                        <span>Securing Your Slot...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm & Book Consultation</span>
                        <CheckCircle2 size={16} />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}

            {/* STEP 4 */}
            {step === 4 && confirmedBooking && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex-1 flex flex-col items-center justify-center text-center py-4 space-y-6"
              >
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                  <CheckCircle2 size={42} />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="absolute inset-0 rounded-full border border-emerald-400/40"
                  />
                </div>

                <div className="space-y-1 max-w-md">
                  <h3 className="text-2xl font-black text-white tracking-tight">
                    Consultation Confirmed!
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    We have reserved your session. A calendar invite and connection details have been sent to{" "}
                    <span className="font-semibold text-[#EEAD0E]">{confirmedBooking.email}</span>.
                  </p>
                </div>

                <div className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-2 text-xs">
                  <span className="text-slate-400">Reference ID:</span>
                  <span className="font-mono font-bold text-white">{confirmedBooking.referenceCode}</span>
                  <button
                    onClick={copyBookingCode}
                    className="ml-1 text-slate-400 hover:text-white transition"
                    title="Copy Reference ID"
                  >
                    {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                  </button>
                </div>

                <div className="w-full max-w-md rounded-2xl border border-white/10 bg-[#00001a] p-4 text-left space-y-2.5 text-xs">
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-400">Topic:</span>
                    <span className="font-semibold text-slate-100">{confirmedBooking.service}</span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-400">Date & Time:</span>
                    <span className="font-semibold text-slate-100">
                      {formattedSelectedDate} @ {confirmedBooking.bookingTime}
                    </span>
                  </div>
                  <div className="flex justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-400">Platform:</span>
                    <span className="font-semibold text-slate-100">{confirmedBooking.meetingPlatform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration:</span>
                    <span className="font-semibold text-[#EEAD0E]">{confirmedBooking.duration} Minutes</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                  <a
                    href={generateGoogleCalendarUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition"
                  >
                    <CalendarPlus size={14} className="text-sky-400" />
                    <span>Add to Google Calendar</span>
                  </a>

                  <button
                    type="button"
                    onClick={downloadICSFile}
                    className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/15 px-4 py-2.5 text-xs font-semibold text-white hover:bg-white/20 transition"
                  >
                    <CalendarIcon size={14} className="text-amber-400" />
                    <span>Download .ICS File</span>
                  </button>
                </div>

                <Link
                  href="/"
                  className="rounded-xl bg-gradient-to-r from-[#EEAD0E] to-amber-400 px-8 py-2.5 text-xs font-bold text-[#000020] shadow-md shadow-amber-500/20 hover:brightness-110 transition"
                >
                  Return to Home
                </Link>
              </motion.div>
            )}
          </div>
        </div>

        {/* What to Expect / FAQ Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEAD0E]/15 text-[#EEAD0E] mb-3">
              <CheckCircle size={20} />
            </div>
            <h4 className="font-bold text-white text-base">Direct Technical Advice</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Speak directly with software engineers and cloud architects rather than high-pressure salespeople.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-500/15 text-sky-400 mb-3">
              <ShieldCheck size={20} />
            </div>
            <h4 className="font-bold text-white text-base">Confidential by Default</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              All discussions, architecture drafts, and intellectual property shared are protected under standard non-disclosure terms.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 space-y-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-400 mb-3">
              <HelpCircle size={20} />
            </div>
            <h4 className="font-bold text-white text-base">Actionable Next Steps</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Following the call, we provide a structured written summary with recommended tech stacks, milestones, and scope breakdowns.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}