import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BookOpen, Eye, HelpCircle, Rocket, Map, Calendar, ArrowRight } from 'lucide-react';

const features = [
  { id: 1, title: "Why GDS", sub: "Our Philosophy", icon: BookOpen, link: "/about" },
  { id: 2, title: "Visual Tour", sub: "Campus Life", icon: Eye, link: "/tour" },
  { id: 3, title: "Academics", sub: "The Roadmap", icon: Map, link: "/about" }, 
  { id: 4, title: "Admissions", sub: "Launchpad", icon: Rocket, link: "/admissions" },
  { id: 5, title: "Student Life", sub: "Everyday GDS", icon: Calendar, link: "/tour" },
  { id: 6, title: "Support", sub: "FAQs & Help", icon: HelpCircle, link: "/contact" },
];

export const DiscoveryHub = () => {
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);

  // Configuration for radial layout
  const radius = 300; // Distance from center to node center
  const centerHubRadius = 144; // w-72 = 18rem = 288px / 2 = 144px
  const nodeRadius = 40; // w-20 = 5rem = 80px / 2 = 40px
  
  // Line constraints (don't touch the glass, leave a gap)
  const lineStartOffset = centerHubRadius + 10; 
  const lineEndOffset = radius - nodeRadius - 10;

  return (
    <section className="bg-deep py-24 md:py-32 relative overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-royal/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Desktop Radial Layout */}
        <div className="hidden md:block relative h-[700px] w-full max-w-5xl mx-auto">
          
          {/* Network Lines Layer (Behind Nodes) */}
          <svg className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none z-0" style={{ overflow: 'visible' }}>
            {features.map((item, index) => {
              const angleDeg = -90 + (index * 60);
              const angleRad = (angleDeg * Math.PI) / 180;
              
              // Calculate start and end points for the lines
              const x1 = Math.cos(angleRad) * lineStartOffset;
              const y1 = Math.sin(angleRad) * lineStartOffset;
              const x2 = Math.cos(angleRad) * lineEndOffset;
              const y2 = Math.sin(angleRad) * lineEndOffset;

              const isHovered = hoveredNode === item.id;

              return (
                <g key={`line-${item.id}`}>
                   {/* Base Line */}
                   <line 
                      x1={x1 + 400} y1={y1 + 400} // Offset by SVG center (400,400)
                      x2={x2 + 400} y2={y2 + 400}
                      stroke="white"
                      strokeWidth={isHovered ? 1.5 : 0.5}
                      strokeOpacity={isHovered ? 0.5 : 0.1}
                      className="transition-all duration-500 ease-out"
                      style={{ filter: isHovered ? 'drop-shadow(0 0 4px rgba(135, 206, 250, 0.6))' : 'none' }}
                   />
                   {/* Moving particle effect on hover */}
                   {isHovered && (
                     <circle r="2" fill="#7DD3FC">
                       <animateMotion 
                         dur="1s" 
                         repeatCount="indefinite"
                         path={`M${x1 + 400},${y1 + 400} L${x2 + 400},${y2 + 400}`}
                       />
                     </circle>
                   )}
                </g>
              );
            })}
          </svg>

          {/* Central Hub */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
             <motion.div 
               initial={{ scale: 0.8, opacity: 0 }}
               whileInView={{ scale: 1, opacity: 1 }}
               viewport={{ once: true }}
               transition={{ duration: 1, ease: "easeOut" }}
               className="w-72 h-72 rounded-full apple-glass-dark border border-white/10 flex flex-col items-center justify-center text-center p-8 shadow-[0_0_60px_rgba(10,108,255,0.15)] relative group cursor-default"
             >
               <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-royal/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
               
               <span className="text-royal font-bold text-xs uppercase tracking-[0.2em] mb-4">Discover Your Path</span>
               <h2 className="text-4xl font-heading font-bold text-white leading-none mb-2">
                 I want <br/>to be <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-white">ME</span>.
               </h2>
               <p className="text-slate-400 text-xs font-light mt-4 max-w-[140px] leading-relaxed">
                 Explore the ecosystem designed for your growth.
               </p>
             </motion.div>
          </div>

          {/* Radial Nodes */}
          {features.map((item, index) => {
            // Distribute 6 items evenly (60 degrees apart)
            // Start from -90 degrees (Top)
            const angleDeg = -90 + (index * 60);
            const angleRad = (angleDeg * Math.PI) / 180;
            const x = Math.cos(angleRad) * radius;
            const y = Math.sin(angleRad) * radius;

            // Determine placement of the hover card based on angle
            const placement = getPlacementClasses(angleDeg);

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 0, y: 0 }}
                whileInView={{ opacity: 1, x, y }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.1 + 0.2, type: "spring", stiffness: 50 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 z-10 flex items-center justify-center group"
                onMouseEnter={() => setHoveredNode(item.id)}
                onMouseLeave={() => setHoveredNode(null)}
              >
                 <Link to={item.link} className="relative flex items-center justify-center w-full h-full">
                    {/* Icon Circle */}
                    <div className="w-20 h-20 rounded-full apple-glass-dark border border-white/10 flex items-center justify-center transition-all duration-300 shadow-lg shadow-black/20 group-hover:bg-white/10 group-hover:border-royal/50 group-hover:shadow-[0_0_30px_rgba(10,108,255,0.3)] group-hover:scale-110 z-20 relative">
                        <item.icon size={28} className="text-sky-300 group-hover:text-white transition-colors" strokeWidth={1.5} />
                    </div>

                    {/* Hover Card */}
                    <div className={`absolute ${placement} w-48 pointer-events-none z-30`}>
                        <div className="apple-glass-dark px-5 py-4 rounded-xl border border-white/10 shadow-2xl opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-300 ease-out flex flex-col items-start text-left backdrop-blur-xl bg-deep/90">
                            <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                            <p className="text-slate-300 text-xs font-light mb-2">{item.sub}</p>
                            <div className="text-royal text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                                Explore <ArrowRight size={10} />
                            </div>
                        </div>
                    </div>
                 </Link>
              </motion.div>
            );
          })}
          
          {/* Decorative Orbit Lines (Outer Ring) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-5 animate-spin-slow" style={{ animationDuration: '120s' }}>
             <circle cx="50%" cy="50%" r="300" fill="none" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
          </svg>
        </div>

        {/* Mobile Layout (Horizontal Scroll) */}
        <div className="md:hidden">
           <div className="text-center mb-12">
              <div className="inline-block p-8 rounded-full bg-deep border border-white/10 shadow-2xl relative overflow-hidden mb-8">
                 <div className="absolute inset-0 bg-royal/20 blur-xl" />
                 <h2 className="text-3xl font-heading font-bold text-white relative z-10">
                   I want to be <br/><span className="text-sky-300">ME.</span>
                 </h2>
              </div>
              <p className="text-slate-400 text-sm px-6 font-light">Tap a section to explore the GDS ecosystem.</p>
           </div>

           {/* Horizontal Scroll Container */}
           <div className="flex overflow-x-auto pb-8 gap-4 px-4 snap-x snap-mandatory no-scrollbar">
              {features.map((item) => (
                 <Link key={item.id} to={item.link} className="snap-center shrink-0 w-40 group">
                    <div className="apple-glass-dark rounded-[2rem] p-6 flex flex-col items-center text-center h-full border border-white/10 active:scale-95 transition-transform">
                       <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center mb-4 text-sky-300 group-hover:text-white group-hover:bg-royal/20 transition-colors">
                          <item.icon size={24} />
                       </div>
                       <h3 className="text-white font-bold text-sm mb-1">{item.title}</h3>
                       <p className="text-slate-400 text-xs font-light">{item.sub}</p>
                       <div className="mt-4 text-sky-300 opacity-80 group-active:opacity-100">
                          <ArrowRight size={14} />
                       </div>
                    </div>
                 </Link>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};

/**
 * Helper to determine CSS positioning classes based on the angle of the node.
 * Angles are in degrees, starting from -90 (Top) and moving clockwise.
 */
const getPlacementClasses = (angle: number) => {
    // Normalize angle to 0-360
    const normAngle = (angle + 360) % 360;

    if (normAngle >= 330 || normAngle <= 30) {
        // Top / Top Rightish -> Show Right
        return "left-full ml-6 top-1/2 -translate-y-1/2 origin-left";
    } else if (normAngle > 30 && normAngle < 150) {
        // Right / Bottom -> Show Bottom or Right
        // Specifically for layout:
        // 30 (Bottom Right), 90 (Bottom)
        if (normAngle === 90) return "top-full mt-6 left-1/2 -translate-x-1/2 origin-top"; // Bottom
        return "left-full ml-6 top-1/2 -translate-y-1/2 origin-left"; // Bottom Right -> Right
    } else if (normAngle >= 150 && normAngle <= 210) {
        // Bottom Left / Left -> Show Left
        if (normAngle === 150) return "right-full mr-6 top-1/2 -translate-y-1/2 origin-right"; // Bottom Left
        return "right-full mr-6 top-1/2 -translate-y-1/2 origin-right"; // Left
    } else {
        // Top Left / Top -> Show Left or Top
        if (normAngle === 270) return "bottom-full mb-6 left-1/2 -translate-x-1/2 origin-bottom"; // Top
        return "right-full mr-6 top-1/2 -translate-y-1/2 origin-right"; // Top Left -> Left
    }
};