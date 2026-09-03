"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Copy,
  Check,
  CalendarPlus,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { createBooking, type Booking } from "../../actions/bookingActions";
import {
  SERVICES,
  DURATIONS,
  TIMEZONES,
  TIME_SLOTS,
  PLATFORMS,
  MONTH_NAMES,
  WEEKDAY_NAMES,
  generateGoogleCalendarUrl,
  downloadICSFile,
} from "../../../lib/calendarUtils";

interface BookingEngineProps {
  isModal?: boolean;
  onClose?: () => void;
  defaultService?: string;
}

export default function BookingEngine({
  isModal = false,
  onClose,
  defaultService,
}: BookingEngineProps) {
  // Wizard step: 1: Service & Duration, 2: Calendar & Time, 3: Attendee Details, 4: Confirmation
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const initialDateInfo = useMemo(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    return {
      formatted: `${yyyy}-${mm}-${dd}`,
      month: tomorrow.getMonth(),
      year: tomorrow.getFullYear(),
    };
  }, []);

  const initialTimezone = useMemo(() => {
    if (typeof window === "undefined") return "UTC";
    try {
      const userTz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      if (userTz) {
        const match = TIMEZONES.find((t) => t.value === userTz);
        return match ? match.value : userTz;
      }
    } catch {
      // fallback
    }
    return "UTC";
  }, []);

  // Form selections
  const [selectedService, setSelectedService] = useState<string>(
    defaultService || "AI & Intelligent Automation"
  );
  const [duration, setDuration] = useState<number>(30);
  const [timezone, setTimezone] = useState<string>(initialTimezone);
  const [selectedDate, setSelectedDate] = useState<string>(initialDateInfo.formatted);
  const [selectedTime, setSelectedTime] = useState<string>("10:00 AM");
  const [platform, setPlatform] = useState<string>("Google Meet");

  // Calendar state
  const today = useMemo(() => new Date(), []);
  const [currentMonth, setCurrentMonth] = useState<number>(initialDateInfo.month);
  const [currentYear, setCurrentYear] = useState<number>(initialDateInfo.year);

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

    if (!formData.name.trim()) {
      errs.name = "Full name is required";
    } else if (formData.name.trim().length < 2) {
      errs.name = "Name must be at least 2 characters";
    }

    const emailValue = formData.email.trim();
    if (!emailValue) {
      errs.email = "Work email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
      if (!emailValue.includes("@")) {
        errs.email = "Email must include '@' symbol";
      } else if (!emailValue.split("@")[1]?.includes(".")) {
        errs.email = "Email domain must include '.' (e.g. .com, .org, .io)";
      } else {
        errs.email = "Please enter a valid email (e.g. alex@company.com)";
      }
    }

    const cleanPhone = formData.phone.replace(/[^\d+]/g, "");
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (cleanPhone.length < 8) {
      errs.phone = "Please enter a valid phone number with area/country code";
    }

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
    <div className="flex flex-col md:flex-row w-full text-slate-900">
      {/* ========================================================
          LEFT SIDEBAR: Consultant & Live Booking Summary
      ======================================================== */}
      <div className="w-full md:w-80 lg:w-96 border-b md:border-b-0 md:border-r border-slate-200/80 bg-[#F8FBFF] p-6 md:p-8 flex flex-col justify-between relative">
        <div>
          {/* Brand / Consultant Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 text-white font-black text-xl shadow-md shadow-sky-500/20">
              N
              <span className="absolute -bottom-0.5 -right-0.5 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white" />
              </span>
            </div>
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-sky-600">
                Neirah Tech
              </div>
              <div className="text-base font-bold text-slate-900">Live Consultation</div>
            </div>
          </div>

          {/* Status Callout */}
          <div className="rounded-2xl border border-sky-100 bg-white p-4 mb-6 shadow-sm backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 mb-1">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for Q3 & Q4 2026 Projects
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Meet with our lead solutions architects to design, scope, and plan your next-gen software or AI system.
            </p>
          </div>

          {/* Dynamic Live Selection Recap */}
          <div className="space-y-3.5">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Session Blueprint
            </div>

            {/* Selected Service */}
            <div className="flex items-start gap-3 text-xs text-slate-700">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-600 border border-sky-100">
                <Sparkles size={13} />
              </div>
              <div>
                <div className="font-semibold text-slate-900">{selectedService}</div>
                <div className="text-[11px] text-slate-500">{duration} minutes consultation</div>
              </div>
            </div>

            {/* Selected Date & Time */}
            <div className="flex items-start gap-3 text-xs text-slate-700">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600 border border-cyan-100">
                <CalendarIcon size={13} />
              </div>
              <div>
                <div className="font-semibold text-slate-900">
                  {formattedSelectedDate || "Pick a date"}
                </div>
                <div className="text-[11px] text-slate-500">
                  {selectedTime
                    ? `${selectedTime} (${timezone.split("/")[1]?.replace(/_/g, " ") || timezone})`
                    : "Choose preferred time"}
                </div>
              </div>
            </div>

            {/* Meeting Platform */}
            <div className="flex items-start gap-3 text-xs text-slate-700">
              <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-100">
                <Video size={13} />
              </div>
              <div>
                <div className="font-semibold text-slate-900">{platform}</div>
                <div className="text-[11px] text-slate-500">Meeting link provided upon booking</div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Badges Footer */}
        <div className="mt-8 pt-4 border-t border-slate-200/80 space-y-2">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <ShieldCheck size={14} className="text-emerald-600" />
            <span>100% Free Consultation • No Obligation</span>
          </div>
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Zap size={14} className="text-sky-600" />
            <span>Instant Calendar Sync (.ics + Google)</span>
          </div>
        </div>
      </div>

      {/* ========================================================
          RIGHT PANEL: Dynamic Multi-Step Scheduler Engine
      ======================================================== */}
      <div className="flex-1 p-6 md:p-8 flex flex-col justify-between min-h-[560px] bg-white">
        {/* Step Navigation Bar */}
        {step < 4 && (
          <div className="flex items-center justify-between pb-6 border-b border-slate-100 mb-6">
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
                    if (step > s.num) setStep(s.num as 1 | 2 | 3 | 4);
                  }}
                  disabled={step < s.num}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    step === s.num
                      ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-md shadow-sky-500/20"
                      : step > s.num
                      ? "bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 cursor-pointer"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
                >
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black/10 text-[10px]">
                    {step > s.num ? "✓" : s.num}
                  </span>
                  <span className="hidden sm:inline">{s.label}</span>
                </button>
              ))}
            </div>

            <div className="text-xs text-slate-600 font-semibold mr-10 sm:mr-12">Step {step} of 3</div>
          </div>
        )}

        {/* ========================================================
            STEP 1: SELECT TOPIC & DURATION
        ======================================================== */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 flex-1 flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  What would you like to discuss?
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  Select the primary domain or challenge your team is looking to solve.
                </p>
              </div>

              {/* Service Grid */}
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
                          ? "border-sky-500 bg-sky-50/70 shadow-[0_0_20px_rgba(14,165,233,0.12)] text-slate-900 ring-1 ring-sky-400"
                          : "border-slate-200 bg-white hover:border-sky-200 hover:bg-slate-50/60 shadow-sm"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div
                          className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
                            isSelected
                              ? "bg-gradient-to-br from-sky-500 to-indigo-600 text-white shadow-sm"
                              : "bg-slate-100 text-slate-700 group-hover:text-sky-600"
                          }`}
                        >
                          <Icon size={18} />
                        </div>
                        <span
                          className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full ${
                            isSelected ? "bg-sky-100 text-sky-800" : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {srv.badge}
                        </span>
                      </div>
                      <div className="font-bold text-sm text-slate-900 mb-1">{srv.name}</div>
                      <div className="text-xs text-slate-600 leading-relaxed font-normal">{srv.description}</div>
                    </div>
                  );
                })}
              </div>

              {/* Duration Picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Preferred Session Duration
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {DURATIONS.map((dur) => (
                    <button
                      key={dur.value}
                      type="button"
                      onClick={() => setDuration(dur.value)}
                      className={`flex flex-col items-center justify-center p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                        duration === dur.value
                          ? "border-sky-500 bg-sky-50/80 text-slate-900 shadow-sm ring-1 ring-sky-400"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className="text-sm font-bold text-slate-900">{dur.label}</span>
                      <span className="text-[10px] mt-0.5 text-slate-500 font-medium">{dur.desc}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Next Step CTA */}
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:translate-x-0.5 hover:shadow-sky-500/35 cursor-pointer"
              >
                <span>Choose Date & Time</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            STEP 2: CUSTOM CALENDAR & TIME SLOTS
        ======================================================== */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6 flex-1 flex flex-col justify-between"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left: Custom Calendar Matrix */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-base font-bold text-slate-900">
                      {MONTH_NAMES[currentMonth]} {currentYear}
                    </div>
                    <div className="text-xs text-slate-600 font-medium">Select consultation date</div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900 transition cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold uppercase tracking-wider text-slate-500 py-1">
                  {WEEKDAY_NAMES.map((d) => (
                    <div key={d} className="text-slate-500">
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
                            ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white font-bold shadow-md shadow-sky-500/30 scale-105 z-10"
                            : disabled
                            ? "text-slate-300 cursor-not-allowed bg-transparent font-normal"
                            : isToday
                            ? "border-2 border-sky-500 text-sky-700 font-bold hover:bg-sky-50 cursor-pointer"
                            : "text-slate-800 font-medium hover:bg-sky-50/80 hover:text-sky-700 cursor-pointer"
                        }`}
                      >
                        <span>{day}</span>
                        {!disabled && !isSelected && (
                          <span className="h-1 w-1 rounded-full bg-emerald-500 mt-0.5" />
                        )}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Globe size={13} className="text-sky-600" />
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                      Time Zone
                    </label>
                  </div>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-900 font-medium outline-none focus:border-sky-500 cursor-pointer"
                  >
                    {TIMEZONES.map((tz) => (
                      <option key={tz.value} value={tz.value} className="bg-white text-slate-900">
                        {tz.label} ({tz.offset})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Right: Available Time Slots Matrix */}
              <div className="lg:col-span-5 space-y-4 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-6 pt-4 lg:pt-0">
                <div>
                  <div className="flex items-center gap-2">
                    <Clock size={15} className="text-sky-600" />
                    <div className="text-sm font-bold text-slate-900">Available Time Slots</div>
                  </div>
                  <div className="text-xs text-slate-600 font-medium mt-0.5">{formattedSelectedDate}</div>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTime(slot.time)}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs transition-all cursor-pointer ${
                          isSelected
                            ? "border-sky-500 bg-sky-50 text-sky-950 font-bold shadow-sm ring-1 ring-sky-400"
                            : "border-slate-200 bg-white text-slate-800 hover:border-sky-300 hover:bg-slate-50 font-medium"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{slot.time}</span>
                          <span className="text-[10px] text-slate-500 font-normal">
                            ({slot.period})
                          </span>
                        </div>

                        {slot.popular && (
                          <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                            Popular
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
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
                    ? "bg-gradient-to-r from-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25 hover:translate-x-0.5 hover:shadow-sky-500/35"
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                }`}
              >
                <span>Continue to Details</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            STEP 3: ATTENDEE DETAILS & SUBMISSION
        ======================================================== */}
        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-5 flex-1 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">
                  Tell us about you & your project
                </h3>
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  We will send calendar invites and consultation prep notes to this email.
                </p>
              </div>

              {serverError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-600 font-medium">
                  {serverError}
                </div>
              )}

              {/* Video Platform Choice */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                  Preferred Video / Call Platform
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {PLATFORMS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setPlatform(p.id)}
                      className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                        platform === p.id
                          ? "border-sky-500 bg-sky-50 text-sky-950 shadow-sm ring-1 ring-sky-400 font-bold"
                          : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 font-medium"
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{p.label}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5 font-medium">{p.note}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Input Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Johnson"
                      className={`w-full rounded-xl border bg-slate-50/80 py-2.5 pl-10 pr-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/15 ${
                        errors.name ? "border-red-400 bg-red-50/30" : "border-slate-200"
                      }`}
                    />
                  </div>
                  {errors.name && <p className="text-[10px] text-red-600 font-semibold mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Work Email *
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className={`w-full rounded-xl border bg-slate-50/80 py-2.5 pl-10 pr-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/15 ${
                        errors.email ? "border-red-400 bg-red-50/30" : "border-slate-200"
                      }`}
                    />
                  </div>
                  {errors.email && <p className="text-[10px] text-red-600 font-semibold mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Phone / WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 000-0000"
                      className={`w-full rounded-xl border bg-slate-50/80 py-2.5 pl-10 pr-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/15 ${
                        errors.phone ? "border-red-400 bg-red-50/30" : "border-slate-200"
                      }`}
                    />
                  </div>
                  {errors.phone && <p className="text-[10px] text-red-600 font-semibold mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Company / Organization
                  </label>
                  <div className="relative">
                    <Building size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Corp"
                      className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-10 pr-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/15"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Project Notes / Scope (Optional)
                </label>
                <textarea
                  rows={2}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Share any background context, goals, or current stack..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 p-3 text-xs text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-500/15"
                />
              </div>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 transition cursor-pointer"
              >
                <ArrowLeft size={15} />
                <span>Back to Time</span>
              </button>

              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleSubmitBooking}
                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 px-7 py-3 text-sm font-bold text-white shadow-lg shadow-sky-500/25 transition-all hover:shadow-sky-500/35 disabled:opacity-50 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Confirming Slot...</span>
                  </>
                ) : (
                  <>
                    <span>Confirm & Schedule Meeting</span>
                    <CheckCircle2 size={16} className="transition-transform group-hover:scale-110" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* ========================================================
            STEP 4: CONFIRMATION & CALENDAR SYNC
        ======================================================== */}
        {step === 4 && confirmedBooking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6 flex-1 flex flex-col justify-center text-center py-4"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 shadow-sm">
              <Check size={32} strokeWidth={3} />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider mb-2">
                Booking Confirmed
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                You&apos;re on the Schedule!
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 mt-2 max-w-md mx-auto leading-relaxed">
                A calendar invitation and Google Meet connection details have been sent to{" "}
                <span className="font-bold text-slate-900">{confirmedBooking.email}</span>.
              </p>
            </div>

            {/* Reference Badge */}
            <div className="mx-auto flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-sm">
              <span className="text-xs text-slate-600 font-medium">Reference Code:</span>
              <span className="font-mono text-sm font-bold text-sky-600">
                {confirmedBooking.referenceCode}
              </span>
              <button
                type="button"
                onClick={copyBookingCode}
                className="ml-2 text-slate-500 hover:text-slate-900 transition cursor-pointer"
                title="Copy reference code"
              >
                {copiedCode ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
            </div>

            {/* Calendar Export Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={generateGoogleCalendarUrl(confirmedBooking)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 transition-all shadow-sm cursor-pointer"
              >
                <CalendarPlus size={15} className="text-sky-600" />
                <span>Add to Google Calendar</span>
              </a>

              <button
                type="button"
                onClick={() => downloadICSFile(confirmedBooking)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-bold text-slate-800 transition-all shadow-sm cursor-pointer"
              >
                <CalendarIcon size={15} className="text-indigo-600" />
                <span>Download .ICS (Apple / Outlook)</span>
              </button>
            </div>

            {/* Done CTA */}
            <div className="pt-4">
              {isModal && onClose ? (
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 hover:scale-105 transition-all cursor-pointer"
                >
                  Close Window
                </button>
              ) : (
                <Link
                  href="/"
                  className="inline-block px-8 py-2.5 rounded-xl bg-gradient-to-r from-sky-500 to-indigo-600 text-white text-xs font-bold shadow-md shadow-sky-500/20 hover:scale-105 transition-all cursor-pointer"
                >
                  Back to Homepage
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
