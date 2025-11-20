import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, User, BookOpen, Monitor, Rocket, Compass, Layout, ArrowRight, Download, ChevronRight } from 'lucide-react';
import { LearningModel3D } from './LearningModel3D';

const FEATURES = [
  { id: 1, icon: Globe, title: "Global Pedagogy", desc: "Reggio, Montessori & Waldorf influence." },
  { id: 2, icon: User, title: "Personalized Learning", desc: "Adaptive schedules for every child." },
  { id: 3, icon: BookOpen, title: "Research-Backed", desc: "7+ years of research, 1600+ sources." },
  { id: 4, icon: Monitor, title: "Tech-Enabled", desc: "Live tracking & data-driven instruction." },
  { id: 5, icon: Rocket, title: "Discovery Launchpad", desc: "Entrepreneurship & future skills." },
  { id: 6, icon: Compass, title: "Career Roadmap", desc: "Early guidance for future paths." },
];

export const LearningSpaces = () => {
  return (
    <section className="bg-deep py-24 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-b from-royal/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-sky/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: 3D Visual Anchor */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
             <LearningModel3D />
          </div>

          {/* Right: Content Area */}
          <div className="w-full lg:w-7/12">
            <div className="mb-12">
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-block py-1.5 px-3 rounded-full bg-white/5 border border-white/10 text-sky-300 text-[10px] font-bold uppercase tracking-widest mb-4"
              >
                Learning Spaces & Technology
              </motion.span>
              
              <motion.h2 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 leading-tight"
              >
                Built for <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-300 to-white">Future-Ready Learning</span>
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-slate-400 text-lg font-light max-w-xl leading-relaxed"
              >
                Innovative spaces, guided by research — powered by technology, designed for the unique potential of each child.
              </motion.p>
            </div>

            {/* Feature Grid */}
            <div className="grid sm:grid-cols-2 gap-4 mb-10">
              {FEATURES.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.05) }}
                  className="group apple-glass-dark p-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-all duration-300 flex items-start gap-4 hover:border-royal/30"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-sky-300 group-hover:scale-110 transition-transform shrink-0">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm mb-1 group-hover:text-sky-200 transition-colors">{item.title}</h4>
                    <p className="text-slate-400 text-xs font-light leading-snug">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Timeline Flow (Visual Indicator) */}
            <div className="flex items-center gap-4 mb-10 opacity-60">
               <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-sky-500" />
                  <div className="text-[10px] uppercase tracking-wider text-sky-300 font-bold">Design</div>
               </div>
               <div className="h-px w-16 bg-gradient-to-r from-sky-500/50 to-transparent" />
               <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Delivery</div>
               </div>
               <div className="h-px w-16 bg-gradient-to-r from-white/20 to-transparent" />
               <div className="flex flex-col items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-white/30" />
                  <div className="text-[10px] uppercase tracking-wider text-slate-400">Outcome</div>
               </div>
            </div>

            {/* Highlight Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl p-1 mb-10"
            >
               <div className="absolute inset-0 bg-gradient-to-r from-royal/40 to-sky-500/40 rounded-3xl blur-sm" />
               <div className="relative bg-deep rounded-[1.4rem] p-6 flex items-center gap-6 border border-white/10">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center shrink-0">
                     <Layout size={32} className="text-white" strokeWidth={1} />
                  </div>
                  <div className="flex-1">
                     <h3 className="text-lg font-bold text-white mb-1">Facilities as Third Teacher</h3>
                     <p className="text-slate-400 text-sm font-light">Our environment is designed to spark curiosity and facilitate independent learning.</p>
                  </div>
               </div>
            </motion.div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-6 items-center">
              <Link 
                to="/tour" 
                className="apple-button px-8 py-3.5 rounded-full font-medium text-sm flex items-center gap-2 group"
              >
                Explore Campus <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm font-medium group">
                <Download size={16} className="group-hover:-translate-y-1 transition-transform" /> Download Blueprint
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};