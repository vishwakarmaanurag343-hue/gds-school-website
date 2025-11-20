import React from 'react';
import { motion } from 'framer-motion';
import { Hero3D } from '../components/Hero3D';
import { StatsSection } from '../components/StatsSection';
import { DiscoveryHub } from '../components/DiscoveryHub';
import { ParentsAppSection } from '../components/ParentsAppSection';
import { TestimonialSection } from '../components/TestimonialSection';
import { HOME_FAQS, EVENTS_DATA } from '../constants';
import { ArrowRight, Star, Award, BookOpen, Monitor, Calendar, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  onEnquire: () => void;
}

export const Home: React.FC<Props> = ({ onEnquire }) => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden pb-12">
        {/* Background Blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-royal/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-sky/20 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full apple-glass text-royal text-[11px] font-bold uppercase tracking-widest mb-8 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-royal animate-pulse" /> Admissions Open 2026
              </div>

              <h1 className="text-5xl lg:text-7xl font-heading font-bold text-deep leading-[1.05] mb-8 tracking-tight">
                Nurturing <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-royal to-sky-500">Curious Minds.</span>
              </h1>

              <p className="text-lg text-slate-600 mb-10 max-w-lg leading-relaxed font-light">
                GDS blends traditional values with modern educational practices to empower students for a changing world.
              </p>

              <div className="flex flex-col sm:flex-row gap-5">
                <button
                  onClick={onEnquire}
                  className="apple-button px-10 py-4 rounded-full font-semibold text-sm tracking-wide shadow-xl shadow-royal/20"
                >
                  Enquire Now
                </button>
                <Link
                  to="/tour"
                  className="px-10 py-4 rounded-full font-semibold text-deep bg-white border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md text-sm"
                >
                  Virtual Tour
                </Link>
              </div>
            </motion.div>

            <div className="relative flex justify-center md:justify-end">
              <Hero3D />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Discovery Hub */}
      <DiscoveryHub />

      {/* Features / Programs */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl font-bold text-deep font-heading mb-4 tracking-tight">Academic Pathways</h2>
            <p className="text-slate-500 text-lg font-light">Comprehensive programs designed for every stage of development.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Preschool', desc: 'Play-based learning fostering creativity and social skills.', icon: Star },
              { title: 'Primary & Secondary', desc: 'Rigorous academics balanced with holistic development.', icon: BookOpen },
              { title: 'Co-Curricular', desc: 'Sports, arts, and technology for a well-rounded education.', icon: Award }
            ].map((program, i) => (
              <motion.div
                key={program.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                className="apple-glass p-10 rounded-[2rem] hover-lift group"
              >
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 text-royal shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
                  <program.icon size={26} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-deep mb-4 font-heading text-center">{program.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-8 text-center font-light">{program.desc}</p>
                <div className="text-center">
                  <Link to="/about" className="text-royal font-semibold text-xs uppercase tracking-widest inline-flex items-center gap-2 hover:gap-3 transition-all group-hover:text-deep">
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Parents App Section (New) */}
      <ParentsAppSection />

      {/* Modern Learning (Glass Overlay) */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-deep" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-0 right-0 w-2/3 h-full bg-royal/10 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2">
            <div className="flex items-center gap-3 mb-6 opacity-80">
              <div className="p-2 bg-white/10 rounded-lg"><Monitor size={20} className="text-sky-300" /></div>
              <span className="text-sm font-bold uppercase tracking-widest text-sky-200">Modern Facilities</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-heading text-white mb-8 leading-tight">Future-Ready <br />Learning</h2>
            <p className="text-slate-300 text-lg leading-relaxed mb-10 font-light">
              We integrate digital classrooms, interactive learning tools, and advanced laboratories to prepare students for the challenges of tomorrow, without losing sight of fundamental values.
            </p>
            <div className="flex gap-12 border-t border-white/10 pt-8">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white mb-1">25+</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">Smart Labs</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white mb-1">12:1</span>
                <span className="text-xs text-slate-400 uppercase tracking-wider">Student Ratio</span>
              </div>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="apple-glass-dark p-3 rounded-3xl inline-block transform rotate-2 hover:rotate-0 transition-transform duration-700">
              <img src="https://picsum.photos/600/400?random=1" alt="Modern Classroom" className="rounded-2xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - Glass Cards */}
      <section className="py-32">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-deep font-heading mb-4">Common Questions</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {HOME_FAQS.map((faq, idx) => (
              <div key={idx} className="apple-glass p-8 rounded-2xl hover:bg-white/80 transition-colors">
                <h4 className="font-bold text-deep text-sm mb-3 flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-royal/10 text-royal flex items-center justify-center text-[10px] shrink-0 mt-0.5 font-bold">Q</span>
                  {faq.q}
                </h4>
                <p className="text-slate-500 text-sm pl-9 font-light leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Admissions Snapshot - Large Glass Panel */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="apple-glass rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-b from-royal/10 to-transparent rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-16">
              <div className="md:w-1/2">
                <h2 className="text-4xl font-bold text-deep font-heading mb-10">Admissions Process</h2>
                <div className="space-y-10">
                  {[
                    { step: 1, title: 'Apply Online', desc: 'Submit the enquiry form.' },
                    { step: 2, title: 'Interaction', desc: 'Meet our academic coordinators.' },
                    { step: 3, title: 'Enrollment', desc: 'Complete documentation and join.' }
                  ].map((s) => (
                    <div key={s.step} className="flex gap-6 group">
                      <div className="w-12 h-12 rounded-2xl bg-white shadow-md text-royal flex items-center justify-center font-bold text-lg shrink-0 group-hover:scale-110 transition-transform duration-300">
                        {s.step}
                      </div>
                      <div>
                        <h4 className="font-bold text-deep text-lg mb-1">{s.title}</h4>
                        <p className="text-sm text-slate-500 font-light">{s.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-12 pl-2">
                  <Link to="/admissions" className="text-royal font-semibold hover:text-deep transition-colors inline-flex items-center gap-2 text-sm">
                    View Detailed Procedure <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              <div className="md:w-5/12 w-full">
                <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-100 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-royal to-sky-400" />
                  <h3 className="text-2xl font-bold text-deep mb-4 font-heading">Ready to join?</h3>
                  <p className="text-slate-500 mb-8 text-sm font-light px-4">Applications for the 2024-2025 academic year are closing soon.</p>
                  <Link
                    to="/admissions"
                    className="apple-button block w-full py-4 rounded-xl font-medium shadow-lg text-sm"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="py-32">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <span className="text-royal font-bold uppercase tracking-widest text-xs block mb-2">Updates</span>
              <h2 className="text-3xl font-bold text-deep font-heading">School Life</h2>
            </div>
            <Link to="/tour" className="text-slate-400 hover:text-royal transition-colors flex items-center gap-2 text-sm font-medium">
              View Gallery <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {EVENTS_DATA.slice(0, 3).map((evt) => (
              <Link to="/tour" key={evt.id} className="group apple-glass p-3 rounded-3xl hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="h-56 overflow-hidden rounded-2xl relative">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-deep shadow-sm flex items-center gap-1.5">
                    <Calendar size={10} /> {evt.date}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-deep mb-2 group-hover:text-royal transition-colors leading-tight">{evt.title}</h3>
                  <span className="text-[10px] font-bold text-royal/80 uppercase tracking-wider bg-royal/5 px-2 py-1 rounded">{evt.category}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section (New) */}
      <TestimonialSection />
    </div>
  );
};