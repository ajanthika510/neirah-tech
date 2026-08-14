"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, ArrowUpRight } from "lucide-react";

export default function WhatsAppChat() {
  const [open, setOpen] = useState(false);

  // Replace with your WhatsApp number.
  // Country code only, without + or spaces.
  const phoneNumber = "0760041594";

  const message =
    "Hi Neirah Tech! I would like to know more about your services.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <>
      {/* =========================
          CHAT POPUP
      ========================= */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            transition={{
              duration: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              fixed
              bottom-24
              right-5
              z-[90]
              w-[calc(100vw-40px)]
              max-w-[360px]
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              bg-white
              shadow-[0_20px_70px_rgba(15,23,42,0.18)]
              sm:right-6
            "
          >
            {/* Header */}

            <div
              className="
                relative
                overflow-hidden
                bg-gradient-to-br
                from-[#25D366]
                via-[#20c964]
                to-[#128C7E]
                px-5
                py-5
                text-white
              "
            >
              {/* Glow */}

              <div
                className="
                  absolute
                  -right-10
                  -top-10
                  h-32
                  w-32
                  rounded-full
                  bg-white/10
                  blur-2xl
                "
              />

              <div className="relative flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-full
                      bg-white/15
                      backdrop-blur-sm
                    "
                  >
                    <MessageCircle size={23} />
                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Neirah Tech
                    </p>

                    <div className="mt-0.5 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-green-200" />

                      <span className="text-xs text-green-50">
                        Usually replies quickly
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close WhatsApp chat"
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-full
                    text-white/80
                    transition
                    hover:bg-white/15
                    hover:text-white
                  "
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Content */}

            <div className="bg-[#F7FAF8] p-5">
              <div
                className="
                  relative
                  rounded-2xl
                  rounded-tl-sm
                  bg-white
                  px-4
                  py-3
                  shadow-sm
                "
              >
                <p className="text-sm leading-6 text-slate-700">
                  👋 Hi there!
                  <br />
                  How can we help you today?
                </p>

                <p className="mt-2 text-right text-[10px] text-slate-400">
                  Now
                </p>
              </div>

              <p className="mt-4 text-center text-xs text-slate-400">
                Chat with us directly on WhatsApp
              </p>

              {/* WhatsApp Button */}

              <motion.a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{
                  y: -2,
                }}
                whileTap={{
                  scale: 0.97,
                }}
                className="
                  mt-4
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-[#25D366]
                  px-5
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_10px_25px_rgba(37,211,102,0.25)]
                  transition
                  hover:bg-[#20bd5a]
                "
              >
                <MessageCircle size={18} />

                Start WhatsApp Chat

                <ArrowUpRight size={16} />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          FLOATING BUTTON
      ========================= */}

      <div className="fixed bottom-5 right-5 z-[91] sm:bottom-6 sm:right-6">
        {/* Pulse */}

        <span
          className="
            absolute
            inset-0
            animate-ping
            rounded-full
            bg-[#25D366]/30
          "
        />

        <motion.button
          type="button"
          onClick={() => setOpen((previous) => !previous)}
          whileHover={{
            scale: 1.08,
          }}
          whileTap={{
            scale: 0.92,
          }}
          aria-label={
            open
              ? "Close WhatsApp chat"
              : "Open WhatsApp chat"
          }
          className="
            relative
            flex
            h-14
            w-14
            items-center
            justify-center
            rounded-full
            bg-[#25D366]
            text-white
            shadow-[0_10px_35px_rgba(37,211,102,0.35)]
            transition-all
            duration-300
            hover:bg-[#20bd5a]
            sm:h-16
            sm:w-16
          "
        >
          {open ? (
            <X size={25} />
          ) : (
            <MessageCircle size={27} />
          )}
        </motion.button>
      </div>
    </>
  );
}