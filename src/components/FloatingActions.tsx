import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";

/**
 * Update these to your real contact values (E.164 format for phone)
 */
const PHONE_NUMBER = "+919978974248"; // example: +911234567890
const WHATSAPP_NUMBER = "+919978974248"; // example: +911234567890
const WHATSAPP_MESSAGE =
  "Hello GDS  I’d like details about admissions for my child. Please contact me";

export const FloatingActions: React.FC = () => {
  const location = useLocation();
  const [toast, setToast] = useState<{ show: boolean; msg: string }>({
    show: false,
    msg: "",
  });

  // Only render on Home page
  if (location.pathname !== "/") return null;

  const handleAction = (label: string) => {
    setToast({ show: true, msg: label });
    window.setTimeout(() => setToast({ show: false, msg: "" }), 2500);
  };

  return (
    <>
      {/* SVG Gradient Definitions (invisible) */}
      <svg width="0" height="0" className="absolute pointer-events-none" aria-hidden>
        <defs>
          <linearGradient id="whatsapp-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84CC16" /> {/* Lime Green */}
            <stop offset="50%" stopColor="#22C55E" /> {/* WhatsApp Green */}
            <stop offset="100%" stopColor="#10B981" /> {/* Emerald */}
          </linearGradient>

          <linearGradient id="call-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A6CFF" /> {/* Electric Blue */}
            <stop offset="50%" stopColor="#06B6D4" /> {/* Cyan */}
            <stop offset="100%" stopColor="#38BDF8" /> {/* Sky Blue */}
          </linearGradient>
        </defs>
      </svg>

      <motion.div
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0, transition: { duration: 0.45, ease: "easeOut" } }}
        exit={{ opacity: 0, x: 60, transition: { duration: 0.25 } }}
        className="fixed z-[60] right-6 bottom-8 md:bottom-10 flex flex-col gap-4 items-end pointer-events-none"
        aria-hidden={false}
      >
        {/* WhatsApp Button */}
        <FloatButton
          href={`https://wa.me/${WHATSAPP_NUMBER.replace(/\D/g, "")}?text=${encodeURIComponent(
            WHATSAPP_MESSAGE
          )}`}
          label="Message GDS on WhatsApp"
          onClick={() => handleAction("Opening WhatsApp...")}
          gradientId="whatsapp-gradient"
          glowColor="rgba(34,197,94,0.64)" // greenish glow
          icon={<MessageCircle size={22} strokeWidth={1.8} className="text-white" />}
        />

        {/* Call Button */}
        <FloatButton
          href={`tel:${PHONE_NUMBER}`}
          label="Call GDS"
          onClick={() => handleAction("Opening Dialer...")}
          gradientId="call-gradient"
          glowColor="rgba(10,108,255,0.64)" // blue glow
          icon={<Phone size={22} strokeWidth={1.8} className="text-white" />}
        />
      </motion.div>

      {/* Feedback Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 8, x: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1, transition: { duration: 0.28 } }}
            exit={{ opacity: 0, y: 8, scale: 0.98, transition: { duration: 0.2 } }}
            className="fixed bottom-24 md:bottom-14 right-6 md:right-28 z-[70] apple-glass px-4 py-3 rounded-2xl text-sm font-medium text-white shadow-2xl backdrop-blur-md flex items-center gap-3 border border-white/20 pointer-events-auto"
            role="status"
            aria-live="polite"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "linear-gradient(90deg,#06B6D4,#0A6CFF)" }}
            />
            {toast.msg}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

interface FloatButtonProps {
  href: string;
  label: string;
  onClick: () => void;
  gradientId: string;
  glowColor: string;
  icon: React.ReactNode;
}

const FloatButton: React.FC<FloatButtonProps> = ({ href, label, onClick, gradientId, glowColor, icon }) => {
  const isTel = href.startsWith("tel:");
  const prefersReduced = useReducedMotion();

  // pointer-events: auto ensures buttons are clickable even though parent has pointer-events-none
  return (
    <motion.a
      href={href}
      target={isTel ? undefined : "_blank"}
      rel={isTel ? undefined : "noopener noreferrer"}
      aria-label={label}
      onClick={onClick}
      className="relative w-16 h-16 flex items-center justify-center group pointer-events-auto"
      whileHover={prefersReduced ? undefined : { y: -6, scale: 1.03 }}
      whileTap={prefersReduced ? undefined : { scale: 0.96 }}
      initial="idle"
      // small accessible focus style via keyboard (framer-motion won't handle focus ring)
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          // allow default behavior (follow link) — keep toast handled in onClick
        }
      }}
    >
      {/* Soft neon bloom / pulse (behind ring) */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          backgroundColor: glowColor,
          filter: "blur(18px)",
          transformOrigin: "center",
        }}
        aria-hidden
        animate={
          prefersReduced
            ? {}
            : {
              scale: [1, 1.18, 1],
              opacity: [0.35, 0.8, 0.35],
            }
        }
        transition={prefersReduced ? undefined : { duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Gradient stroke ring (SVG circle) */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <svg className="w-full h-full -rotate-90 overflow-visible" viewBox="0 0 64 64" aria-hidden>
          <defs />
          <motion.circle
            cx="32"
            cy="32"
            r="28"
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.8"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 4px 10px ${glowColor})` }}
            initial={false}
            animate={prefersReduced ? {} : { rotate: [0, 360] }}
            transition={prefersReduced ? undefined : { repeat: Infinity, duration: 12, ease: "linear" }}
          />
        </svg>
      </div>

      {/* Frosted Glass Inner Background + Icon */}
      <div className="absolute inset-[6px] bg-white/8 backdrop-blur-sm rounded-full border border-white/12 flex items-center justify-center shadow-sm z-30 transition-all duration-250 group-hover:bg-white/12">
        <motion.div
          whileHover={prefersReduced ? undefined : { scale: 1.06 }}
          whileTap={prefersReduced ? undefined : { scale: 0.95 }}
          aria-hidden
        >
          {icon}
        </motion.div>
      </div>

      {/* Invisible accessible label element for screen readers (if needed) */}
      <span className="sr-only">{label}</span>
    </motion.a>
  );
};
