import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Book, FlaskConical, Atom } from 'lucide-react';

export const LearningModel3D = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center perspective-1000 group cursor-pointer">
      {/* Outer Glass Container - Stylized as a futuristic containment field */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-72 h-80 md:w-80 md:h-96 apple-glass-dark rounded-[3rem] border border-white/10 shadow-[0_0_50px_rgba(10,108,255,0.15)] flex items-center justify-center overflow-hidden"
      >
        {/* Internal Glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-royal/10 to-transparent opacity-50" />
        
        {/* Rotating Core (Globe) */}
        <motion.div
          animate={{ 
            rotateY: 360,
            rotateX: [10, -10, 10]
          }}
          transition={{ 
            rotateY: { duration: 20, repeat: Infinity, ease: "linear" },
            rotateX: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border border-sky-400/30 flex items-center justify-center shadow-[0_0_30px_rgba(56,189,248,0.2)] preserve-3d"
        >
           <div className="absolute inset-2 rounded-full border border-dashed border-white/20" />
           <Globe size={80} className="text-sky-300 drop-shadow-[0_0_10px_rgba(56,189,248,0.5)]" strokeWidth={0.8} />
           
           {/* Orbital Rings */}
           <div className="absolute inset-[-20px] rounded-full border border-royal/30 rotate-45" />
        </motion.div>

        {/* Floating Elements */}
        <FloatingItem 
           icon={<Book size={24} />} 
           delay={0} 
           x={80} y={-80} 
           color="text-purple-300" 
           label="Research"
        />
        <FloatingItem 
           icon={<FlaskConical size={24} />} 
           delay={1.5} 
           x={-80} y={60} 
           color="text-emerald-300" 
           label="Discovery"
        />
        <FloatingItem 
           icon={<Atom size={24} />} 
           delay={3} 
           x={70} y={80} 
           color="text-amber-300" 
           label="Innovation"
        />

        {/* Emissive Rim Glow (Animated) */}
        <motion.div 
           animate={{ opacity: [0.3, 0.6, 0.3] }}
           transition={{ duration: 3, repeat: Infinity }}
           className="absolute inset-0 rounded-[3rem] border-2 border-sky-500/20 pointer-events-none"
        />
      </motion.div>

      {/* Pedestal / Shadow */}
      <div className="absolute bottom-10 w-48 h-12 bg-black/40 blur-xl rounded-full" />
    </div>
  );
};

const FloatingItem = ({ icon, delay, x, y, color, label }: any) => (
  <motion.div
    className={`absolute bg-white/10 backdrop-blur-md p-3 rounded-xl border border-white/20 shadow-lg ${color} flex items-center gap-2`}
    initial={{ x, y, opacity: 0 }}
    animate={{ 
      x, 
      y: [y - 5, y + 5, y - 5],
      opacity: 1
    }}
    transition={{
      y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
      opacity: { duration: 0.5, delay }
    }}
  >
    {icon}
    <span className="text-[10px] font-bold uppercase tracking-wider text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-0 group-hover:w-auto overflow-hidden whitespace-nowrap">
      {label}
    </span>
  </motion.div>
);