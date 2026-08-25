"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface ApplyModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: string;
}

export default function ApplyModal({ isOpen, onClose, role }: ApplyModalProps) {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cvInfo = cvFile ? `\nCV: ${cvFile.name}` : "";
    const text = `Hello, I'm interested in the *${role}* position.\nName: ${name}\nEmail: ${email}\nMessage: ${message}${cvInfo}`;
    const encoded = encodeURIComponent(text);
    const url = `https://wa.me/94760041594?text=${encoded}`;
    window.open(url, "_blank", "noopener,noreferrer");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-lg rounded-xl bg-white p-6 shadow-lg"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
            <h2 className="mb-4 text-xl font-semibold text-[#172033]">
              Apply for {role}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#172033]">Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full rounded border border-[#E2E8F0] bg-[#F7FAFF] px-3 py-2 text-sm text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#172033]">Email</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full rounded border border-[#E2E8F0] bg-[#F7FAFF] px-3 py-2 text-sm text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#172033]">Message (optional)</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full rounded border border-[#E2E8F0] bg-[#F7FAFF] px-3 py-2 text-sm text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium text-[#172033]">Upload CV (optional)</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => setCvFile(e.target.files ? e.target.files[0] : null)}
                  className="mt-1 w-full rounded border border-[#E2E8F0] bg-[#F7FAFF] px-3 py-2 text-sm text-[#172033] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]"
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-[#0EA5E9] px-4 py-2 text-sm font-medium text-white hover:bg-[#0284c7]"
                >
                  Send via WhatsApp
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
