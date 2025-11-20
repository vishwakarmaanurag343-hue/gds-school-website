import React from 'react';
import { motion } from 'framer-motion';
import { Globe, BookOpen, Cpu, Zap, Compass, Rocket, Microscope, Languages, Layers, Lightbulb } from 'lucide-react';

const PHILOSOPHY_POINTS = [
  {
    title: "Global Wisdom",
    desc: "Drawing inspiration from Reggio Emilia, Montessori, Waldorf, Rocketship, and our Gurukul system.",
    icon: Globe,
    color: "text-sky-300"
  },
  {
    title: "Research Backed",
    desc: "7+ years of global research, mapped to CBSE with 1600+ sources and 460 discovery packets.",
    icon: BookOpen,
    color: "text-purple-300"
  },
  {
    title: "Smart Tech",
    desc: "Advanced schedulers and live progress tracking for data-driven personalized teaching.",
    icon: Cpu,
    color: "text-emerald-300"
  },
  {
    title: "Experiential Labs",
    desc: "Gadgets for complex concepts, language labs, and neo-tech learning environments.",
    icon: Microscope,
    color: "text-amber-300"
  },
  {
    title: "Core Skills",
    desc: "Dedicated programs for Spoken English and Mental Math to build strong foundations.",
    icon: Languages,
    color: "text-rose-300"
  },
  {
    title: "Discovery Packet",
    desc: "A creative, joyful learning system designed for meaningful student engagement.",
    icon: Layers,
    color: "text-indigo-300"
  }
];

const HIGHLIGHTS = [
  {
    title: "Roadmap To My Dreams",
    desc: "A dedicated career walk-path platform helping students explore future possibilities early on.",
    icon: Compass,
    gradient: "from-sky-400 to-royal"
  },
  {
    title: "Discovery Launchpad",
    desc: "Our exclusive tech & entrepreneurship program that builds future-ready innovation skills.",
    icon: Rocket,
    gradient: "from-purple-400 to-pink-500"
  }
];

export const EducationPhilosophy = () => {
  return (
    <section className="relative py-24 overflow-hidden 
bg-gradient-to-br from-[#03172F] via-[#041A38] to-[#062A5C]">
  
  {/* Premium Blue Glow Atmosphere */}
  <div className="absolute inset-0 pointer-events-none">

     {/* Large electric-blue hazy orb */}
     <div className="absolute -top-40 -left-20 w-[900px] h-[900px] 
       bg-[radial-gradient(circle,_rgba(30,144,255,0.18)_0%,_transparent_60%)]
       blur-[160px]" />

     {/* Soft cyan secondary glow */}
     <div className="absolute bottom-0 right-0 w-[750px] h-[750px] 
       bg-[radial-gradient(circle,_rgba(56,189,248,0.12)_0%,_transparent_65%)]
       blur-[140px]" />

     {/* Subtle pattern overlay */}
     <div className="absolute inset-0 
       bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] 
       opacity-[0.025]" />
  </div>


      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sky-300 text-[10px] font-bold uppercase tracking-widest mb-4 backdrop-blur-sm"
          >
            Our Philosophy
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight"
          >
            The Education
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg font-light leading-relaxed"
          >
            We don't just teach; we curate learning experiences using global best practices, advanced technology, and deep personalization.
          </motion.p>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {PHILOSOPHY_POINTS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="apple-glass-dark p-8 rounded-3xl hover:bg-white/5 transition-colors group border border-white/5 hover:border-white/10 flex flex-col"
            >
              <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${item.color} border border-white/5`}>
                <item.icon size={24} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Highlights Section */}
        <div className="grid md:grid-cols-2 gap-8">
          {HIGHLIGHTS.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="relative overflow-hidden rounded-[2.5rem] p-10 group cursor-default"
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
              <div className="absolute inset-0 backdrop-blur-xl border border-white/10 rounded-[2.5rem]" />
              
              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-6">
                 <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white shadow-lg shrink-0 group-hover:rotate-12 transition-transform duration-500`}>
                    <item.icon size={32} strokeWidth={1.5} />
                 </div>
                 <div>
                    <h3 className="text-2xl font-bold text-white mb-2 font-heading">{item.title}</h3>
                    <p className="text-slate-300 font-light leading-relaxed text-sm md:text-base">
                      {item.desc}
                    </p>
                 </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};