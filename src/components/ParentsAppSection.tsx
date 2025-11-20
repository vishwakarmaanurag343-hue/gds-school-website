import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, BookOpen, FileBarChart, MessageSquare, Clock, Bell, CheckCircle } from 'lucide-react';

const FEATURES = [
  {
    id: 0,
    icon: Calendar,
    title: "Calendar & Syllabus",
    desc: "Track your child’s yearly academic plan instantly.",
    color: "text-sky-300"
  },
  {
    id: 1,
    icon: BookOpen,
    title: "Online Diary",
    desc: "Never miss circulars, notices, or classroom updates.",
    color: "text-purple-300"
  },
  {
    id: 2,
    icon: FileBarChart,
    title: "Assessment Reports",
    desc: "View your child’s academic progress anytime.",
    color: "text-emerald-300"
  },
  {
    id: 3,
    icon: MessageSquare,
    title: "Feedback & Complaints",
    desc: "Easily communicate with school through secure channels.",
    color: "text-amber-300"
  },
  {
    id: 4,
    icon: Clock,
    title: "Leave Requests",
    desc: "Submit leave requests in just one tap.",
    color: "text-rose-300"
  }
];

export const ParentsAppSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="bg-deep py-24 relative overflow-hidden">
      {/* Ambient Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-royal/10 rounded-full blur-3xl translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky/5 rounded-full blur-3xl -translate-x-1/4" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Column: Text & Features */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mb-12"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/10 text-sky-300 text-[10px] font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                Parent Connect
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight">
                Smart Parenting, <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-white">Simplified.</span>
              </h2>
              <p className="text-slate-400 text-lg font-light max-w-md">
                Stay connected with your child's campus life.
              </p>
            </motion.div>

            <div className="space-y-4 relative">
              {FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`relative group cursor-default transition-all duration-300 rounded-2xl border p-4 flex items-center gap-5 
                    ${hoveredIndex === index
                      ? 'bg-white/10 border-royal/50 shadow-[0_0_30px_rgba(10,108,255,0.15)] translate-x-2'
                      : 'bg-white/5 border-white/5 hover:bg-white/10'
                    }`}
                >
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-deep border border-white/10 flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                    <feature.icon size={24} strokeWidth={1.5} />
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className={`text-base font-bold transition-colors ${hoveredIndex === index ? 'text-white' : 'text-slate-200'}`}>
                      {feature.title}
                    </h3>
                    <p className="text-xs text-slate-400 font-light mt-0.5">
                      {feature.desc}
                    </p>
                  </div>

                  {/* Mobile/Tablet active indicator (Right Chevron equivalent) */}
                  <div className={`ml-auto w-1.5 h-1.5 rounded-full transition-all duration-500 ${hoveredIndex === index ? 'bg-sky-400 shadow-[0_0_10px_#38bdf8]' : 'bg-white/10'}`} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Column: Phone Mockup & Connectors */}
          <div className="relative h-[600px] hidden lg:flex items-center justify-center">

            {/* Connector Lines SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible">
              {FEATURES.map((_, index) => {
                const isActive = hoveredIndex === index;
                // Simple approximation of positions based on layout
                // Row height ~88px (icon 48 + padding 32 + border approx)
                // Start Y: Top offset (~160px) + index * spacing (~92px)
                // End Y: Phone screen connection points

                const startY = 60 + (index * 96);
                const endY = 150 + (index * 60); // Compress slightly to fit phone screen

                return (
                  <g key={index}>
                    <path
                      d={`M 0 ${startY} C 100 ${startY}, 150 ${endY}, 300 ${endY}`}
                      fill="none"
                      stroke={isActive ? "url(#lineGradient)" : "rgba(255,255,255,0.05)"}
                      strokeWidth={isActive ? 2 : 1}
                      className="transition-all duration-500"
                    />
                    {isActive && (
                      <circle r="3" fill="#38BDF8">
                        <animateMotion
                          dur="1s"
                          repeatCount="indefinite"
                          path={`M 0 ${startY} C 100 ${startY}, 150 ${endY}, 300 ${endY}`}
                          keyPoints="0;1"
                          keyTimes="0;1"
                        />
                      </circle>
                    )}
                  </g>
                )
              })}
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0A6CFF" stopOpacity="0" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="1" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>

            {/* Phone Mockup */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-10 w-[300px] h-[580px] bg-deep border-8 border-slate-800 rounded-[3rem] shadow-2xl ml-auto mr-10 overflow-hidden ring-1 ring-white/20"
            >
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-2xl z-30" />

              {/* Screen Content */}
              <div className="w-full h-full bg-slate-900 relative flex flex-col">

                {/* Header */}
                <div className="pt-12 pb-6 px-6 bg-gradient-to-b from-slate-800 to-slate-900 border-b border-white/5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-xs text-slate-400">Good Morning,</div>
                      <div className="text-lg font-bold text-white">Mr. Anderson</div>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-royal/20 flex items-center justify-center relative">
                      <Bell size={18} className="text-sky-300" />
                      <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-slate-900" />
                    </div>
                  </div>
                </div>

                {/* App Grid Body */}
                <div className="p-6 flex-1 relative">
                  {/* Dynamic Highlights based on hover */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className={`col-span-2 p-4 rounded-2xl transition-all duration-500 border ${hoveredIndex === 0 ? 'bg-sky-500/20 border-sky-500/50 shadow-[0_0_20px_rgba(56,189,248,0.2)]' : 'bg-white/5 border-white/5'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar size={16} className="text-sky-300" />
                        <span className="text-xs font-bold text-white uppercase tracking-wider">Schedule</span>
                      </div>
                      <div className="h-2 w-2/3 bg-white/10 rounded mb-2" />
                      <div className="h-2 w-1/2 bg-white/10 rounded" />
                    </div>

                    <div className={`col-span-1 aspect-square p-4 rounded-2xl transition-all duration-500 border flex flex-col justify-between ${hoveredIndex === 1 ? 'bg-purple-500/20 border-purple-500/50' : 'bg-white/5 border-white/5'}`}>
                      <BookOpen size={20} className="text-purple-300" />
                      <div className="h-2 w-full bg-white/10 rounded" />
                    </div>

                    <div className={`col-span-1 aspect-square p-4 rounded-2xl transition-all duration-500 border flex flex-col justify-between ${hoveredIndex === 2 ? 'bg-emerald-500/20 border-emerald-500/50' : 'bg-white/5 border-white/5'}`}>
                      <FileBarChart size={20} className="text-emerald-300" />
                      <div className="h-2 w-full bg-white/10 rounded" />
                    </div>

                    <div className={`col-span-2 p-4 rounded-2xl transition-all duration-500 border flex items-center justify-between ${hoveredIndex === 3 ? 'bg-amber-500/20 border-amber-500/50' : 'bg-white/5 border-white/5'}`}>
                      <div className="flex items-center gap-3">
                        <MessageSquare size={16} className="text-amber-300" />
                        <span className="text-xs font-bold text-white">Messages</span>
                      </div>
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center">3</div>
                    </div>

                    <div className={`col-span-2 p-4 rounded-2xl transition-all duration-500 border flex items-center gap-4 ${hoveredIndex === 4 ? 'bg-rose-500/20 border-rose-500/50' : 'bg-white/5 border-white/5'}`}>
                      <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-300">
                        <Clock size={14} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Leave Status</div>
                        <div className="text-[10px] text-green-400 flex items-center gap-1"><CheckCircle size={8} /> Approved</div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Nav Mockup */}
                  <div className="absolute bottom-6 left-6 right-6 h-14 bg-slate-800 rounded-full flex items-center justify-around px-2 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-royal flex items-center justify-center shadow-lg shadow-royal/40 text-white">
                      <div className="w-4 h-4 border-2 border-white rounded-sm" />
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500">
                      <div className="w-4 h-4 border-2 border-current rounded-full" />
                    </div>
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500">
                      <div className="w-4 h-4 bg-current rounded-sm" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Reflection/Gloss */}
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};