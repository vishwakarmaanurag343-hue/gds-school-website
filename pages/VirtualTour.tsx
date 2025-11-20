import React, { useState } from 'react';
import { EVENTS_DATA } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { X, PlayCircle, Image } from 'lucide-react';

export const VirtualTour = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | 'Events' | 'Sports' | 'Academic'>('All');

  const filteredEvents = filter === 'All' ? EVENTS_DATA : EVENTS_DATA.filter(e => e.category === filter);

  return (
    <div>
      {/* Header */}
      <div className="bg-white/50 backdrop-blur-sm py-20 border-b border-white/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-deep font-heading mb-4 tracking-tight">Virtual Campus</h1>
          <p className="text-slate-500 max-w-2xl mx-auto font-light">Explore our classrooms, laboratories, and grounds from the comfort of your home.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Video / 360 Placeholder */}
        <div className="w-full h-[450px] md:h-[600px] rounded-[2.5rem] mb-20 relative overflow-hidden group shadow-2xl border-4 border-white">
          <img src="https://picsum.photos/1200/600?random=99" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" alt="360 view" />
          <div className="absolute inset-0 bg-deep/20 group-hover:bg-deep/10 transition-colors duration-500" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20">
            <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 cursor-pointer border border-white/30 shadow-lg">
              <PlayCircle size={40} className="text-white ml-1" strokeWidth={1.5} />
            </div>
            <p className="font-bold tracking-widest text-xs uppercase drop-shadow-md">Start 360° Tour</p>
          </div>
        </div>

        {/* Gallery Filters */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {['All', 'Events', 'Academic', 'Sports'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat as any)}
              className={`px-8 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${filter === cat
                  ? 'bg-deep text-white shadow-lg transform scale-105'
                  : 'apple-glass text-slate-600 hover:bg-white'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid md:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredEvents.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                key={item.id}
                className="apple-glass p-3 rounded-3xl hover-lift cursor-pointer group"
                onClick={() => setSelectedImage(item.image)}
              >
                <div className="h-64 overflow-hidden relative rounded-2xl">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white backdrop-blur-[2px]">
                    <Image size={32} strokeWidth={1.5} />
                  </div>
                </div>
                <div className="p-5">
                  <span className="text-[10px] font-bold text-royal uppercase tracking-widest block mb-2">{item.category}</span>
                  <h3 className="font-bold text-deep truncate text-lg">{item.title}</h3>
                  <p className="text-slate-400 text-xs mt-1 font-medium">{item.date}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setSelectedImage(null)}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/10 backdrop-blur-xl"
            />
            <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-deep transition-colors z-20"><X size={20} /></button>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative p-2 bg-white/50 backdrop-blur-md rounded-[2rem] border border-white/40 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                className="w-auto h-auto max-h-[80vh] max-w-full rounded-[1.8rem] shadow-inner"
                alt="Enlarged view"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};