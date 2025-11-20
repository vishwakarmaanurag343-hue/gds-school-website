import React, { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { Users, GraduationCap, Award, BookOpen } from 'lucide-react';

const stats = [
  { 
    id: 1, 
    label: 'Students', 
    value: 4200, 
    suffix: '+', 
    sub: 'Enrolled this year', 
    icon: Users 
  },
  { 
    id: 2, 
    label: 'Pan India Footprint', 
    value: 29, 
    suffix: '+', 
    sub: 'Qualified Educators', 
    icon: GraduationCap 
  },
  { 
    id: 3, 
    label: 'Discovery Packets Deployed', 
    value: 4000, 
    suffix: '+', 
    sub: 'National Recognition', 
    icon: Award 
  },
  { 
    id: 4, 
    label: 'RTMD Evaluation Done', 
    value: 4200, 
    suffix: '+', 
    sub: 'Diverse Pathways', 
    icon: BookOpen 
  },
];

export const StatsSection = () => {
  return (
    <section className="container mx-auto px-4 relative z-20 -mt-8 mb-24">
       <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
         {stats.map((stat, i) => (
           <StatCard key={stat.id} stat={stat} index={i} />
         ))}
       </div>
    </section>
  );
};

const StatCard = ({ stat, index }: { stat: any, index: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, stat.value, { duration: 2.5, ease: "circOut" });
      return controls.stop;
    }
  }, [isInView, stat.value]);

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="apple-glass p-6 md:p-8 rounded-[1.5rem] text-center transition-all duration-500 group hover:-translate-y-2 hover:bg-white/80 hover:shadow-xl hover:shadow-royal/5 cursor-default"
    >
      {/* Icon with subtle glow background */}
      <div className="w-12 h-12 mx-auto bg-royal/5 rounded-full flex items-center justify-center text-royal mb-5 group-hover:scale-110 transition-transform duration-500 group-hover:bg-royal/10">
        <stat.icon size={22} strokeWidth={1.5} />
      </div>
      
      {/* Number Counter */}
      <div className="text-3xl md:text-4xl font-heading font-bold text-deep mb-2 flex justify-center items-baseline tracking-tight">
        <motion.span>{rounded}</motion.span>
        <span className="text-royal ml-0.5">{stat.suffix}</span>
      </div>
      
      {/* Labels */}
      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">{stat.label}</div>
      <div className="text-[11px] text-slate-400 font-light">{stat.sub}</div>
      
      {/* Subtle bottom gradient line on hover */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-royal/30 transition-all duration-500 group-hover:w-1/3 rounded-full opacity-0 group-hover:opacity-100" />
    </motion.div>
  )
}