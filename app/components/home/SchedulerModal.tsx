"use client";

import { FormEvent, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, CalendarDays, ArrowRight, Clock, User, Mail, Phone } from "lucide-react";

interface SchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  date?: string;
  time?: string;
}

export default function SchedulerModal({
  isOpen,
  onClose,
}: SchedulerModalProps) {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  /* Prevent background scrolling while modal is open */
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /* Close modal with Escape key */
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    /* Remove error while typing */
    setErrors((previous) => ({
      ...previous,
      [name]: "",
    }));
  };

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    /* Name */
    if (!form.name.trim()) {
      newErrors.name = "Please enter your name.";
    } else if (form.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    /* Email */
    if (!form.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      newErrors.email = "Please enter a valid email address.";
    }

    /* Phone */
    if (!form.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (
      !/^[+]?[0-9\s()-]{7,15}$/.test(form.phone)
    ) {
      newErrors.phone = "Please enter a valid phone number.";
    }

    /* Date */
    if (!form.date) {
      newErrors.date = "Please select a date.";
    } else {
      const selectedDate = new Date(form.date);
      const today = new Date();

      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.date = "Please select a future date.";
      }
    }

    /* Time */
    if (!form.time) {
      newErrors.time = "Please select a time.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    console.log("Scheduled demo:", form);

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setErrors({});

    setForm({
      name: "",
      email: "",
      phone: "",
      date: "",
      time: "",
    });

    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-slate-950/40
            px-4
            py-6
            backdrop-blur-md
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleClose();
            }
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.94,
              y: 20,
            }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              w-full
              max-w-lg
              overflow-hidden
              rounded-[28px]
              border
              border-white
              bg-white
              shadow-[0_30px_100px_rgba(15,23,42,0.25)]
            "
          >
            {/* =========================
                HEADER
            ========================= */}

            <div
              className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-sky-500
                via-blue-600
                to-indigo-600
                px-6
                py-6
                text-white
              "
            >
              {/* Background glow */}

              <div
                className="
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-white/10
                  blur-2xl
                "
              />

              <div
                className="
                  absolute
                  -bottom-20
                  -left-10
                  h-40
                  w-40
                  rounded-full
                  bg-cyan-300/20
                  blur-2xl
                "
              />

              {/* Close button */}

              <button
                type="button"
                onClick={handleClose}
                aria-label="Close scheduler"
                className="
                  absolute
                  right-4
                  top-4
                  z-10
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  text-white
                  transition
                  hover:bg-white/25
                "
              >
                <X size={20} />
              </button>

              <div className="relative">
                <div
                  className="
                    mb-3
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white/15
                  "
                >
                  <CalendarDays size={22} />
                </div>

                <h2 className="text-2xl font-bold">
                  Schedule a Demo
                </h2>

                <p className="mt-1 max-w-sm text-sm text-blue-100">
                  Choose a convenient time and let&apos;s explore
                  how we can help your business grow.
                </p>
              </div>
            </div>

            {/* =========================
                CONTENT
            ========================= */}

            <div className="p-6">
              {submitted ? (
                /* =========================
                    SUCCESS
                ========================= */

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    py-10
                    text-center
                  "
                >
                  <div
                    className="
                      flex
                      h-16
                      w-16
                      items-center
                      justify-center
                      rounded-full
                      bg-emerald-100
                      text-emerald-600
                    "
                  >
                    <svg
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path d="M5 12l4 4L19 6" />
                    </svg>
                  </div>

                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    Demo Request Submitted!
                  </h3>

                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                    Thank you for contacting us. Our team will
                    get back to you shortly to confirm your demo.
                  </p>

                  <button
                    type="button"
                    onClick={handleClose}
                    className="
                      mt-6
                      rounded-full
                      bg-gradient-to-r
                      from-sky-500
                      to-cyan-400
                      px-7
                      py-3
                      text-sm
                      font-semibold
                      text-white
                      shadow-[0_10px_30px_rgba(14,165,233,.25)]
                      transition
                      hover:-translate-y-0.5
                    "
                  >
                    Done
                  </button>
                </motion.div>
              ) : (
                /* =========================
                    FORM
                ========================= */

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  noValidate
                >
                  {/* Name */}

                  <div>
                    <label
                      htmlFor="scheduler-name"
                      className="
                        mb-1.5
                        block
                        text-sm
                        font-semibold
                        text-slate-700
                      "
                    >
                      Full Name
                    </label>

                    <div className="relative">
                      <User
                        size={17}
                        className="
                          absolute
                          left-3.5
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        id="scheduler-name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        autoComplete="name"
                        className={`
                          w-full
                          rounded-xl
                          border
                          bg-slate-50
                          py-3
                          pl-10
                          pr-4
                          text-sm
                          text-slate-900
                          outline-none
                          transition
                          placeholder:text-slate-400
                          focus:bg-white
                          focus:ring-2
                          ${
                            errors.name
                              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                              : "border-slate-200 focus:border-sky-400 focus:ring-sky-100"
                          }
                        `}
                      />
                    </div>

                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}

                  <div>
                    <label
                      htmlFor="scheduler-email"
                      className="
                        mb-1.5
                        block
                        text-sm
                        font-semibold
                        text-slate-700
                      "
                    >
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="
                          absolute
                          left-3.5
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        id="scheduler-email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="you@company.com"
                        autoComplete="email"
                        className={`
                          w-full
                          rounded-xl
                          border
                          bg-slate-50
                          py-3
                          pl-10
                          pr-4
                          text-sm
                          text-slate-900
                          outline-none
                          transition
                          placeholder:text-slate-400
                          focus:bg-white
                          focus:ring-2
                          ${
                            errors.email
                              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                              : "border-slate-200 focus:border-sky-400 focus:ring-sky-100"
                          }
                        `}
                      />
                    </div>

                    {errors.email && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone */}

                  <div>
                    <label
                      htmlFor="scheduler-phone"
                      className="
                        mb-1.5
                        block
                        text-sm
                        font-semibold
                        text-slate-700
                      "
                    >
                      Phone Number
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="
                          absolute
                          left-3.5
                          top-1/2
                          -translate-y-1/2
                          text-slate-400
                        "
                      />

                      <input
                        id="scheduler-phone"
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        autoComplete="tel"
                        className={`
                          w-full
                          rounded-xl
                          border
                          bg-slate-50
                          py-3
                          pl-10
                          pr-4
                          text-sm
                          text-slate-900
                          outline-none
                          transition
                          placeholder:text-slate-400
                          focus:bg-white
                          focus:ring-2
                          ${
                            errors.phone
                              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                              : "border-slate-200 focus:border-sky-400 focus:ring-sky-100"
                          }
                        `}
                      />
                    </div>

                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Date + Time */}

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Date */}

                    <div>
                      <label
                        htmlFor="scheduler-date"
                        className="
                          mb-1.5
                          block
                          text-sm
                          font-semibold
                          text-slate-700
                        "
                      >
                        Preferred Date
                      </label>

                      <div className="relative">
                        <CalendarDays
                          size={17}
                          className="
                            absolute
                            left-3.5
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                          "
                        />

                        <input
                          id="scheduler-date"
                          name="date"
                          type="date"
                          value={form.date}
                          onChange={handleChange}
                          min={
                            new Date()
                              .toISOString()
                              .split("T")[0]
                          }
                          className={`
                            w-full
                            rounded-xl
                            border
                            bg-slate-50
                            py-3
                            pl-10
                            pr-3
                            text-sm
                            text-slate-900
                            outline-none
                            transition
                            focus:bg-white
                            focus:ring-2
                            ${
                              errors.date
                                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                : "border-slate-200 focus:border-sky-400 focus:ring-sky-100"
                            }
                          `}
                        />
                      </div>

                      {errors.date && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.date}
                        </p>
                      )}
                    </div>

                    {/* Time */}

                    <div>
                      <label
                        htmlFor="scheduler-time"
                        className="
                          mb-1.5
                          block
                          text-sm
                          font-semibold
                          text-slate-700
                        "
                      >
                        Preferred Time
                      </label>

                      <div className="relative">
                        <Clock
                          size={17}
                          className="
                            absolute
                            left-3.5
                            top-1/2
                            -translate-y-1/2
                            text-slate-400
                          "
                        />

                        <input
                          id="scheduler-time"
                          name="time"
                          type="time"
                          value={form.time}
                          onChange={handleChange}
                          className={`
                            w-full
                            rounded-xl
                            border
                            bg-slate-50
                            py-3
                            pl-10
                            pr-3
                            text-sm
                            text-slate-900
                            outline-none
                            transition
                            focus:bg-white
                            focus:ring-2
                            ${
                              errors.time
                                ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                                : "border-slate-200 focus:border-sky-400 focus:ring-sky-100"
                            }
                          `}
                        />
                      </div>

                      {errors.time && (
                        <p className="mt-1 text-xs text-red-500">
                          {errors.time}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Submit */}

                  <button
                    type="submit"
                    className="
                      group
                      mt-2
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      bg-gradient-to-r
                      from-sky-500
                      to-cyan-400
                      px-5
                      py-3.5
                      text-sm
                      font-bold
                      text-white
                      shadow-[0_12px_30px_rgba(14,165,233,.25)]
                      transition-all
                      duration-300
                      hover:-translate-y-0.5
                      hover:shadow-[0_16px_35px_rgba(14,165,233,.35)]
                    "
                  >
                    Confirm Demo

                    <ArrowRight
                      size={17}
                      className="
                        transition-transform
                        duration-300
                        group-hover:translate-x-1
                      "
                    />
                  </button>

                  <p className="text-center text-[11px] text-slate-400">
                    We&apos;ll use your information only to contact
                    you regarding your demo request.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}