import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { STAFF_DATA } from '../constants';
import { X, Users, BookOpen, Activity, ChevronDown } from 'lucide-react';
import { LearningSpaces } from '../components/LearningSpaces';
import { EducationPhilosophy } from '../components/EducationPhilosophy';

export const About = () => {
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

  const activeStaff = STAFF_DATA.find(s => s.id === selectedStaff);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-deep text-white py-24 md:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-royal/10" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F8FAFC] to-transparent" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight">Our Story</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Established in 1995, GDS has been a beacon of educational excellence, fostering a community of lifelong learners.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        {/* Mission / Vision */}
        <div className="grid md:grid-cols-2 gap-16 mb-32 items-center">
          <div>
            <span className="text-royal font-bold text-xs uppercase tracking-widest mb-3 block">Philosophy</span>
            <h2 className="text-3xl font-bold text-deep font-heading mb-10">Mission & Values</h2>
            <div className="space-y-8">
              {[
                { icon: BookOpen, title: "Academic Excellence", desc: "We strive for the highest standards in teaching and learning." },
                { icon: Users, title: "Community", desc: "Fostering a supportive environment where respect and integrity are paramount." },
                { icon: Activity, title: "Holistic Growth", desc: "Developing character and physical well-being through diverse programs." }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-14 h-14 apple-glass rounded-2xl flex items-center justify-center shrink-0 text-royal shadow-sm">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-deep mb-2">{item.title}</h3>
                    <p className="text-slate-500 leading-relaxed font-light text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-royal/5 rounded-[2.5rem] transform rotate-3 -z-10" />
            <div className="apple-glass p-3 rounded-[2.5rem]">
              <img src="https://picsum.photos/600/500?random=5" className="rounded-[2rem] w-full object-cover shadow-inner" alt="School Building" />
            </div>
          </div>
        </div>
      </div>

      {/* Learning Spaces & Technology Section (New) */}
      <LearningSpaces />
      <EducationPhilosophy />
      <div className="container mx-auto px-4 py-20">
        {/* Principal Message - Glass Card */}
        <div className="apple-glass rounded-[3rem] p-10 md:p-16 mb-32 flex flex-col md:flex-row gap-12 items-center relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-royal/50 to-transparent" />
          <div className="shrink-0 relative">
            <div className="absolute inset-0 bg-royal/10 rounded-full blur-xl transform translate-y-4" />
            <img src="https://picsum.photos/300/300?random=1" className="w-48 h-48 rounded-full object-cover shadow-2xl border-4 border-white relative z-10" alt="Principal" />
          </div>
          <div className="text-center md:text-left">
            <div className="w-10 h-1 bg-royal mb-6 mx-auto md:mx-0 rounded-full" />
            <h2 className="text-3xl font-bold text-deep font-heading mb-2">Dr. Sarah Jenkins</h2>
            <p className="text-royal font-medium mb-6 uppercase tracking-widest text-xs">Principal</p>
            <p className="text-slate-600 leading-relaxed max-w-2xl text-lg font-light italic">
              "At GDS, we believe that education is not merely the filling of a pail, but the lighting of a fire. We are committed to guiding every student to discover their unique potential."
            </p>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-deep font-heading">Our Faculty</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {STAFF_DATA.map((staff) => (
              <div key={staff.id} className="apple-glass p-4 rounded-3xl hover-lift group">
                <div className="h-72 overflow-hidden rounded-2xl mb-6 relative">
                  <img src={staff.image} alt={staff.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="text-center px-4 pb-4">
                  <h3 className="text-xl font-bold text-deep mb-1">{staff.name}</h3>
                  <p className="text-xs text-royal font-bold uppercase tracking-wider mb-4">{staff.role}</p>
                  <button
                    onClick={() => setSelectedStaff(staff.id)}
                    className="text-slate-400 text-xs hover:text-deep transition-colors inline-flex items-center gap-1 mx-auto uppercase tracking-widest font-semibold"
                  >
                    Read Bio <ChevronDown size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Facilities */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-deep font-heading">Campus Infrastructure</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <FacilityCard title="Modern Libraries" img="https://picsum.photos/400/300?random=20" desc="Thousands of books and digital resources." />
            <FacilityCard title="Science Labs" img="https://picsum.photos/400/300?random=21" desc="State-of-the-art physics, chemistry, and biology labs." />
            <FacilityCard title="Sports Complex" img="https://picsum.photos/400/300?random=22" desc="Fields for football, cricket, and athletics tracks." />
          </div>
        </div>
      </div>

      {/* Staff Modal */}
      <AnimatePresence>
        {selectedStaff && activeStaff && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" onClick={() => setSelectedStaff(null)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="apple-glass rounded-[2rem] max-w-lg w-full p-10 relative shadow-2xl z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelectedStaff(null)} className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors"><X size={16} /></button>
              <div className="flex items-center gap-6 mb-8">
                <img src={activeStaff.image} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" alt={activeStaff.name} />
                <div>
                  <h3 className="text-2xl font-bold text-deep font-heading">{activeStaff.name}</h3>
                  <p className="text-royal text-xs font-bold uppercase tracking-widest mt-1">{activeStaff.role}</p>
                </div>
              </div>
              <p className="text-slate-600 leading-relaxed mb-8 font-light">{activeStaff.bio}</p>
              <div className="pt-6 border-t border-slate-200/50 text-sm text-slate-500 flex justify-between items-center">
                <span className="font-semibold text-deep">Qualifications</span>
                <span>M.Ed, Ph.D. in Education</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FacilityCard = ({ title, img, desc }: { title: string, img: string, desc: string }) => (
  <div className="apple-glass p-3 rounded-3xl hover:shadow-xl transition-shadow duration-300 group">
    <div className="h-56 overflow-hidden rounded-2xl mb-5">
      <img src={img} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
    </div>
    <div className="px-4 pb-4">
      <h3 className="font-bold text-deep text-lg mb-2 font-heading">{title}</h3>
      <p className="text-slate-500 text-sm font-light leading-relaxed">{desc}</p>
    </div>
  </div>
);