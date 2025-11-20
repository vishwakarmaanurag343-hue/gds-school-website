import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { TESTIMONIALS_DATA } from '../constants';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-scroll logic using RequestAnimationFrame
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollAmount = 0;
    const speed = 0.8; // Pixels per frame

    const scroll = () => {
      if (!isHovered) {
        scrollAmount += speed;
        // Reset scroll when reaching the end of the first set of items (for infinite loop illusion)
        // We assume we duplicate content or just scroll back to 0 for simplicity in this MVP
        if (scrollContainer.scrollLeft >= (scrollContainer.scrollWidth - scrollContainer.clientWidth)) {
           scrollContainer.scrollLeft = 0;
           scrollAmount = 0;
        } else {
           scrollContainer.scrollLeft += speed;
        }
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const scrollManual = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 350; // Approx width + gap
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <span className="text-royal font-bold uppercase tracking-widest text-xs block mb-3">Parent Stories</span>
            <h2 className="text-4xl font-heading font-bold text-deep mb-4">What Our Parents Say</h2>
            <p className="text-slate-500 text-lg font-light">Real experiences from the families who make our community special.</p>
          </div>
          
          {/* Manual Controls */}
          <div className="flex gap-3 mt-6 md:mt-0">
            <button 
              onClick={() => scrollManual('left')}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-royal hover:text-white hover:border-royal transition-all flex items-center justify-center shadow-sm hover:shadow-lg"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={() => scrollManual('right')}
              className="w-12 h-12 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-royal hover:text-white hover:border-royal transition-all flex items-center justify-center shadow-sm hover:shadow-lg"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel Track */}
      <div 
        className="w-full overflow-x-auto no-scrollbar pb-12 px-4 md:px-0"
        ref={scrollRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ scrollBehavior: 'auto' }} // Disable CSS smooth scroll for JS animation to work efficiently
      >
        <div className="flex gap-8 w-max px-4 md:px-[max(1rem,calc((100vw-1200px)/2))]">
          {/* Render Items Twice for loop feel (basic implementation) */}
          {[...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA].map((item, index) => (
            <div 
              key={`${item.id}-${index}`}
              className="w-[85vw] md:w-[400px] apple-glass p-8 rounded-[2rem] relative group hover:-translate-y-2 transition-transform duration-500 flex-shrink-0 bg-white/60 backdrop-blur-xl border-white/50"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-royal/10 group-hover:text-royal/20 transition-colors">
                <Quote size={48} fill="currentColor" />
              </div>

              <div className="flex items-center gap-4 mb-6 relative z-10">
                <div className="relative">
                    <div className="absolute inset-0 bg-royal/20 rounded-full blur-md transform group-hover:scale-110 transition-transform" />
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm relative z-10"
                    />
                </div>
                <div>
                  <h4 className="font-bold text-deep text-lg leading-tight group-hover:text-royal transition-colors">{item.name}</h4>
                  <span className="text-xs text-slate-500 uppercase tracking-wide font-medium">{item.relation}</span>
                </div>
              </div>

              <p className="text-slate-600 leading-relaxed font-light text-sm md:text-base relative z-10 italic">
                "{item.quote}"
              </p>
              
              {/* Decorative Bottom Gradient */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-gradient-to-r from-royal/0 via-royal/40 to-royal/0 w-0 group-hover:w-1/2 transition-all duration-700 opacity-0 group-hover:opacity-100 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};