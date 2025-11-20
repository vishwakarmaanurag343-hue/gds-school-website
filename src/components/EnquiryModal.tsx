
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Send, ArrowRight } from 'lucide-react';

interface Props {
  forceOpen?: boolean;
  onClose: () => void;
}

export const EnquiryModal: React.FC<Props> = ({ forceOpen, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    grade: ''
  });

  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true);
      return;
    }

    const hasSeen = sessionStorage.getItem('hasSeenEnquiryModal');
    if (!hasSeen) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('hasSeenEnquiryModal', 'true');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [forceOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          classInterested: formData.grade,
          contactMethod: 'Phone',
          message: 'Popup Enquiry',
          source: 'Popup'
        })
      });

      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error("Error submitting popup:", error);
      setError('Network error. Please check your connection.');
    }
  };

  const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            onClick={() => { setIsOpen(false); onClose(); }}
          />
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative apple-glass w-full max-w-md rounded-3xl shadow-2xl overflow-hidden z-10"
          >
            {/* Close Button */}
            <button
              onClick={() => { setIsOpen(false); onClose(); }}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors z-20"
            >
              <X size={16} />
            </button>

            <div className="p-8 md:p-10">
              {!submitted ? (
                <>
                  <div className="mb-8">
                    <span className="inline-block px-3 py-1 rounded-full bg-royal/10 text-royal text-[10px] font-bold uppercase tracking-wider mb-3">Admissions 2024</span>
                    <h2 className="text-2xl font-bold font-heading text-deep mb-2">Get Information</h2>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      Enter your details below and our admissions office will reach out with the prospectus and fee structure.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-4">
                      <Input
                        name="parentName"
                        value={formData.parentName}
                        onChange={handleChange}
                        placeholder="Parent Full Name"
                        required
                      />

                      <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        type="tel"
                        required
                      />
                      <div className="relative">
                        <select
                          name="grade"
                          value={formData.grade}
                          onChange={handleChange}
                          className="w-full px-5 py-3.5 rounded-xl bg-white/60 border border-white/50 focus:bg-white text-slate-700 text-sm outline-none focus:ring-2 focus:ring-royal/20 transition-all appearance-none cursor-pointer"
                          required
                        >
                          <option value="" disabled>Select Grade Interested</option>
                          <option>Nursery - Kindergarten</option>
                          <option>Primary (Grades 1-5)</option>
                          <option>Middle School (Grades 6-8)</option>
                          <option>High School (Grades 9-12)</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                          <ArrowRight size={14} className="rotate-90" />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="apple-button w-full py-3.5 rounded-xl font-medium shadow-lg flex items-center justify-center gap-2 mt-2 group"
                    >
                      Request Info <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    {error && <p className="text-red-500 text-xs text-center mt-2">{error}</p>}
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-20 h-20 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-6 shadow-inner"
                  >
                    <CheckCircle size={40} strokeWidth={2} />
                  </motion.div>
                  <h3 className="text-xl font-bold text-deep mb-2 font-heading">Request Received</h3>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto">We will be in touch shortly.</p>
                </div>
              )}
            </div>

            {/* Decorative Bottom Gradient */}
            <div className="h-1.5 w-full bg-gradient-to-r from-royal to-sky-400" />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full px-5 py-3.5 rounded-xl bg-white/60 border border-white/50 focus:bg-white text-slate-700 text-sm outline-none focus:ring-2 focus:ring-royal/20 transition-all placeholder:text-slate-400"
  />
)
