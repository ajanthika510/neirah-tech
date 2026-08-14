"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  Phone,
  Sparkles,
  User,
  X,
} from "lucide-react";

type SchedulerProps = {
  open: boolean;
  onClose: () => void;
};

type FormData = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const ease = [0.22, 1, 0.36, 1] as const;

const initialForm: FormData = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
};

export default function Scheduler({
  open,
  onClose,
}: SchedulerProps) {
  const [form, setForm] = useState<FormData>(initialForm);

  const [errors, setErrors] = useState<FormErrors>({});

  const [submitted, setSubmitted] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =========================================================
     TODAY
  ========================================================= */

  const today = new Date().toISOString().split("T")[0];

  /* =========================================================
     BODY SCROLL LOCK
  ========================================================= */

  useEffect(() => {
    if (!open) return;

    const originalOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  /* =========================================================
     ESCAPE KEY
  ========================================================= */

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  /* =========================================================
     HANDLE INPUT
  ========================================================= */

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  /* =========================================================
     PHONE FORMAT
  ========================================================= */

  const handlePhoneChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = event.target.value;

    // Allow only numbers, spaces, +, -, (, )
    value = value.replace(/[^\d+\-()\s]/g, "");

    // Only allow + at the beginning
    if (value.includes("+")) {
      value =
        "+" +
        value
          .slice(1)
          .replace(/\+/g, "");
    }

    setForm((prev) => ({
      ...prev,
      phone: value,
    }));

    setErrors((prev) => ({
      ...prev,
      phone: undefined,
    }));
  };

  /* =========================================================
     VALIDATE
  ========================================================= */

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    /* NAME */

    const cleanName = form.name.trim();

    if (!cleanName) {
      newErrors.name = "Please enter your name.";
    } else if (cleanName.length < 2) {
      newErrors.name =
        "Name must be at least 2 characters.";
    } else if (!/^[a-zA-ZÀ-ÿ\s.'-]+$/.test(cleanName)) {
      newErrors.name =
        "Please enter a valid name.";
    }

    /* EMAIL */

    const cleanEmail = form.email.trim();

    if (!cleanEmail) {
      newErrors.email =
        "Please enter your email address.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(
        cleanEmail
      )
    ) {
      newErrors.email =
        "Please enter a valid email address.";
    }

    /* PHONE */

    const phoneDigits = form.phone.replace(/\D/g, "");

    if (!form.phone.trim()) {
      newErrors.phone =
        "Please enter your phone number.";
    } else if (phoneDigits.length < 9) {
      newErrors.phone =
        "Phone number must contain at least 9 digits.";
    } else if (phoneDigits.length > 15) {
      newErrors.phone =
        "Phone number cannot exceed 15 digits.";
    }

    /* DATE */

    if (!form.date) {
      newErrors.date =
        "Please select a date.";
    } else if (form.date < today) {
      newErrors.date =
        "Please select a future date.";
    }

    /* TIME */

    if (!form.time) {
      newErrors.time =
        "Please select a preferred time.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  /* =========================================================
     SUBMIT
  ========================================================= */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const isValid = validate();

    if (!isValid) return;

    try {
      setIsSubmitting(true);

      /*
       * Backend integration will go here later.
       *
       * Example:
       *
       * await fetch("/api/demo-request", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   body: JSON.stringify(form),
       * });
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      console.log("Demo request:", form);

      setSubmitted(true);
    } catch (error) {
      console.error(
        "Demo request failed:",
        error
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  /* =========================================================
     CLOSE
  ========================================================= */

  const handleClose = () => {
    setSubmitted(false);
    setErrors({});
    setIsSubmitting(false);

    setForm(initialForm);

    onClose();
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-[#0F172A]/55
            p-4
            backdrop-blur-md
            sm:p-6
          "
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              handleClose();
            }
          }}
        >
          {/* =================================================
              MODAL
          ================================================= */}

          <motion.div
            initial={{
              opacity: 0,
              y: 35,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 25,
              scale: 0.97,
            }}
            transition={{
              duration: 0.45,
              ease,
            }}
            className="
              relative
              flex
              max-h-[92vh]
              w-full
              max-w-[650px]
              flex-col
              overflow-hidden
              rounded-[2rem]
              border
              border-[#D7E6ED]
              bg-[#F8FAFC]
              shadow-[0_40px_120px_rgba(15,23,42,0.25)]
            "
            onMouseDown={(event) =>
              event.stopPropagation()
            }
          >
            {/* =================================================
                CLOSE
            ================================================= */}

            <button
              type="button"
              onClick={handleClose}
              aria-label="Close demo scheduler"
              className="
                absolute
                right-5
                top-5
                z-50
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-[#D7E6ED]
                bg-white/90
                text-[#64748B]
                shadow-sm
                backdrop-blur-xl
                transition-all
                duration-300
                hover:rotate-90
                hover:border-[#7DD3FC]
                hover:bg-[#F0F9FF]
                hover:text-[#0EA5E9]
              "
            >
              <X size={18} />
            </button>

            {/* =================================================
                CONTENT
            ================================================= */}

            <div className="relative overflow-y-auto">

              {/* TOP GLOW */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-24
                  -top-24
                  h-64
                  w-64
                  rounded-full
                  bg-cyan-300/20
                  blur-[90px]
                "
              />

              {/* BOTTOM GLOW */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-24
                  -left-24
                  h-64
                  w-64
                  rounded-full
                  bg-indigo-300/15
                  blur-[90px]
                "
              />

              {/* GRID */}

              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-[0.18]
                  [background-image:linear-gradient(rgba(15,23,42,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.045)_1px,transparent_1px)]
                  [background-size:55px_55px]
                "
              />

              <div className="relative p-6 sm:p-9 lg:p-10">

                {!submitted ? (
                  <>
                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="mb-8 pr-12">

                      <div className="mb-5 flex items-center gap-3">

                        <motion.div
                          animate={{
                            rotate: [0, 5, -5, 0],
                            y: [0, -3, 0],
                          }}
                          transition={{
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="
                            flex
                            h-11
                            w-11
                            items-center
                            justify-center
                            rounded-2xl
                            border
                            border-[#BAE6FD]
                            bg-[#F0F9FF]
                            shadow-[0_10px_30px_rgba(14,165,233,0.10)]
                          "
                        >
                          <Sparkles
                            size={19}
                            className="text-[#0EA5E9]"
                          />
                        </motion.div>

                        <div>
                          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#0EA5E9]">
                            Demo request
                          </p>

                          <p className="mt-1 text-xs text-[#94A3B8]">
                            Let's build something together
                          </p>
                        </div>

                      </div>

                      <h2
                        className="
                          text-3xl
                          font-semibold
                          leading-[0.95]
                          tracking-[-0.055em]
                          text-[#0F172A]
                          sm:text-4xl
                        "
                      >
                        Schedule a{" "}
                        <span
                          className="
                            bg-gradient-to-r
                            from-[#22D3EE]
                            via-[#0EA5E9]
                            to-[#4F46E5]
                            bg-clip-text
                            text-transparent
                          "
                        >
                          demo.
                        </span>
                      </h2>

                      <p className="mt-4 max-w-md text-sm leading-6 text-[#64748B]">
                        Choose a convenient date and time.
                        Our team will walk you through our
                        solutions and answer your questions.
                      </p>

                    </div>

                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                      onSubmit={handleSubmit}
                      noValidate
                      className="space-y-5"
                    >

                      {/* NAME */}

                      <FormField
                        label="Full name"
                        icon={<User size={16} />}
                        error={errors.name}
                      >
                        <input
                          type="text"
                          name="name"
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Enter your name"
                          className={inputClass(
                            !!errors.name
                          )}
                        />
                      </FormField>


                      {/* EMAIL */}

                      <FormField
                        label="Email address"
                        icon={<Mail size={16} />}
                        error={errors.email}
                      >
                        <input
                          type="email"
                          name="email"
                          autoComplete="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={inputClass(
                            !!errors.email
                          )}
                        />
                      </FormField>


                      {/* PHONE */}

                      <FormField
                        label="Phone number"
                        icon={<Phone size={16} />}
                        error={errors.phone}
                      >
                        <input
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          inputMode="tel"
                          value={form.phone}
                          onChange={handlePhoneChange}
                          placeholder="+94 77 123 4567"
                          className={inputClass(
                            !!errors.phone
                          )}
                        />
                      </FormField>


                      {/* DATE / TIME */}

                      <div className="grid gap-5 sm:grid-cols-2">

                        {/* DATE */}

                        <FormField
                          label="Preferred date"
                          icon={
                            <CalendarDays size={16} />
                          }
                          error={errors.date}
                        >
                          <input
                            type="date"
                            name="date"
                            min={today}
                            value={form.date}
                            onChange={handleChange}
                            className={inputClass(
                              !!errors.date
                            )}
                          />
                        </FormField>


                        {/* TIME */}

                        <FormField
                          label="Preferred time"
                          icon={<Clock3 size={16} />}
                          error={errors.time}
                        >
                          <input
                            type="time"
                            name="time"
                            value={form.time}
                            onChange={handleChange}
                            className={inputClass(
                              !!errors.time
                            )}
                          />
                        </FormField>

                      </div>


                      {/* =================================================
                          SUBMIT
                      ================================================= */}

                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={
                          !isSubmitting
                            ? { y: -2 }
                            : {}
                        }
                        whileTap={
                          !isSubmitting
                            ? { scale: 0.98 }
                            : {}
                        }
                        className="
                          group
                          mt-2
                          flex
                          min-h-[54px]
                          w-full
                          items-center
                          justify-center
                          gap-3
                          rounded-full
                          bg-[#0F172A]
                          px-6
                          py-4
                          text-sm
                          font-bold
                          text-white
                          shadow-[0_20px_40px_rgba(15,23,42,0.12)]
                          transition-all
                          duration-300
                          hover:bg-[#0EA5E9]
                          hover:shadow-[0_20px_45px_rgba(14,165,233,0.25)]
                          disabled:cursor-not-allowed
                          disabled:opacity-60
                        "
                      >
                        {isSubmitting ? (
                          <>
                            <span
                              className="
                                h-5
                                w-5
                                animate-spin
                                rounded-full
                                border-2
                                border-white/30
                                border-t-white
                              "
                            />

                            Sending request...
                          </>
                        ) : (
                          <>
                            Confirm demo

                            <span
                              className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                bg-white/10
                                transition-transform
                                duration-300
                                group-hover:translate-x-1
                              "
                            >
                              <ArrowRight
                                size={16}
                              />
                            </span>
                          </>
                        )}
                      </motion.button>


                      {/* FOOTNOTE */}

                      <p className="text-center text-[10px] leading-5 text-[#94A3B8]">
                        We'll use your information only to
                        arrange your demo session.
                      </p>

                    </form>
                  </>
                ) : (
                  /* =================================================
                     SUCCESS STATE
                  ================================================= */

                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      duration: 0.6,
                      ease,
                    }}
                    className="
                      flex
                      min-h-[430px]
                      flex-col
                      items-center
                      justify-center
                      text-center
                    "
                  >

                    <motion.div
                      initial={{
                        scale: 0.5,
                        opacity: 0,
                      }}
                      animate={{
                        scale: 1,
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.15,
                        duration: 0.5,
                        ease,
                      }}
                      className="
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-[#BAE6FD]
                        bg-[#F0F9FF]
                        shadow-[0_20px_50px_rgba(14,165,233,0.15)]
                      "
                    >
                      <CheckCircle2
                        size={40}
                        className="text-[#0EA5E9]"
                      />
                    </motion.div>

                    <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.25em] text-[#0EA5E9]">
                      Request received
                    </p>

                    <h2
                      className="
                        mt-3
                        text-3xl
                        font-semibold
                        tracking-[-0.045em]
                        text-[#0F172A]
                        sm:text-4xl
                      "
                    >
                      Demo requested!
                    </h2>

                    <p className="mt-4 max-w-sm text-sm leading-7 text-[#64748B]">
                      Thanks,{" "}
                      <span className="font-semibold text-[#334155]">
                        {form.name}
                      </span>
                      . We've received your request and
                      will contact you at{" "}
                      <span className="font-semibold text-[#334155]">
                        {form.email}
                      </span>{" "}
                      to confirm your demo.
                    </p>

                    {/* REQUEST SUMMARY */}

                    <div
                      className="
                        mt-7
                        w-full
                        max-w-sm
                        rounded-2xl
                        border
                        border-[#D7E6ED]
                        bg-white
                        p-4
                        text-left
                      "
                    >

                      <div className="flex items-center gap-3">

                        <CalendarDays
                          size={16}
                          className="text-[#0EA5E9]"
                        />

                        <span className="text-xs font-semibold text-[#334155]">
                          {form.date}
                        </span>

                      </div>

                      <div className="mt-3 flex items-center gap-3">

                        <Clock3
                          size={16}
                          className="text-[#0EA5E9]"
                        />

                        <span className="text-xs font-semibold text-[#334155]">
                          {form.time}
                        </span>

                      </div>

                    </div>


                    <button
                      type="button"
                      onClick={handleClose}
                      className="
                        mt-8
                        rounded-full
                        bg-[#0F172A]
                        px-8
                        py-3.5
                        text-sm
                        font-semibold
                        text-white
                        transition-all
                        duration-300
                        hover:-translate-y-1
                        hover:bg-[#0EA5E9]
                      "
                    >
                      Done
                    </button>

                  </motion.div>
                )}

              </div>

            </div>

          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


/* =========================================================
   FORM FIELD
========================================================= */

function FormField({
  label,
  icon,
  error,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>

      <label className="mb-2 block text-xs font-semibold text-[#334155]">
        {label}
      </label>

      <div className="relative">

        <span
          className={`
            pointer-events-none
            absolute
            left-4
            top-1/2
            z-10
            -translate-y-1/2
            ${
              error
                ? "text-red-400"
                : "text-[#94A3B8]"
            }
          `}
        >
          {icon}
        </span>

        {children}

      </div>

      <AnimatePresence mode="wait">
        {error && (
          <motion.p
            initial={{
              opacity: 0,
              height: 0,
              y: -4,
            }}
            animate={{
              opacity: 1,
              height: "auto",
              y: 0,
            }}
            exit={{
              opacity: 0,
              height: 0,
              y: -4,
            }}
            className="mt-1.5 text-[10px] font-medium text-red-500"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

    </div>
  );
}


/* =========================================================
   INPUT STYLE
========================================================= */

function inputClass(hasError: boolean) {
  return `
    w-full
    rounded-xl
    border
    ${
      hasError
        ? "border-red-300 bg-red-50/50"
        : "border-[#D7E6ED] bg-white"
    }
    py-3.5
    pl-11
    pr-4
    text-sm
    text-[#0F172A]
    outline-none
    transition-all
    duration-300
    placeholder:text-[#94A3B8]
    ${
      hasError
        ? "focus:border-red-400 focus:ring-4 focus:ring-red-500/10"
        : "focus:border-[#38BDF8] focus:ring-4 focus:ring-[#0EA5E9]/10"
    }
  `;
}