import React from 'react';
import { motion } from 'framer-motion';
import { Scroll, PenTool, Book } from 'lucide-react';

export const Admissions3D = () => {
  return (
    <div className="relative w-48 h-48 flex items-center justify-center">
      <motion.div 
        className="relative w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
      >
        {/* Decorative Circles */}
        <div className="absolute inset-0 border border-white/20 rounded-full" />
        <div className="absolute inset-4 border border-white/10 rounded-full border-dashed" />
      </motion.div>
      
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div 
           animate={{ y: [-5, 5, -5] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl"
        >
           <Scroll size={48} className="text-white" strokeWidth={1} />
        </motion.div>
      </div>

      {/* Floating Orbs */}
      <motion.div 
        className="absolute top-0 right-0 bg-royal text-white p-2 rounded-full shadow-lg"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      >
        <PenTool size={16} />
      </motion.div>

      <motion.div 
        className="absolute bottom-4 left-0 bg-white text-royal p-2 rounded-full shadow-lg"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
      >
        <Book size={16} />
      </motion.div>
    </div>
  );
};