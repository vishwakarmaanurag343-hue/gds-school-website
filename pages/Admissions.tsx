import React from 'react';
import { AdmissionForm } from '../components/AdmissionForm';
import { Admissions3D } from '../components/Admissions3D';
import { FileText, Phone, Download, Mail } from 'lucide-react';

export const Admissions = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Area */}
      <div className="bg-deep text-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-royal/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-sky/5 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16">
             <div className="md:w-1/2">
               <div className="inline-block px-3 py-1 rounded-full border border-white/20 bg-white/5 text-xs font-bold uppercase tracking-widest mb-6 text-sky-200">
                 Academic Year 2025-2026
               </div>
               <h1 className="text-5xl md:text-6xl font-bold font-heading mb-6 leading-tight">
                 Begin Your <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 to-white">Journey</span> at GDS
               </h1>
               <p className="text-slate-300 text-lg leading-relaxed font-light max-w-lg">
                 We welcome applications from families who value academic excellence and character development. Apply online today.
               </p>
             </div>
             <div className="md:w-1/2 flex justify-center">
                <div className="apple-glass-dark rounded-full p-12">
                   <Admissions3D />
                </div>
             </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-12 gap-10">
          
          {/* Main Form Column */}
          <div className="lg:col-span-8">
             <div className="mb-10">
               <h2 className="text-3xl font-bold text-deep font-heading mb-3">Application Form</h2>
               <p className="text-slate-500 font-light">Please complete all sections accurately. You can save and resume later.</p>
             </div>
             <AdmissionForm />
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Steps */}
            <div className="apple-glass p-8 rounded-[2rem]">
              <h3 className="font-bold text-deep mb-6 text-lg font-heading">Admissions Process</h3>
              <div className="space-y-8 relative">
                <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200/50 -z-10" />
                {[
                  { step: 1, title: 'Submit Application', desc: 'Fill details online & upload docs.' },
                  { step: 2, title: 'Assessment', desc: 'Grade-level readiness check.' },
                  { step: 3, title: 'Enrollment', desc: 'Pay fees to secure the seat.' }
                ].map((item) => (
                  <div key={item.step} className="flex gap-5">
                    <div className="w-10 h-10 rounded-full bg-white border border-white/50 shadow-sm text-royal flex items-center justify-center font-bold text-sm shrink-0 z-10">
                      {item.step}
                    </div>
                    <div className="pt-1">
                      <h4 className="font-bold text-deep text-sm">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-1 font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="apple-glass p-8 rounded-[2rem]">
              <h3 className="font-bold text-deep mb-5 font-heading">Downloads</h3>
              <div className="space-y-3">
                <button className="flex items-center w-full p-4 rounded-2xl bg-white/40 hover:bg-white transition-colors text-left gap-4 border border-white/50 group">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-royal shadow-sm group-hover:scale-110 transition-transform">
                    <Download size={18} />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-deep">Fee Structure</span>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">PDF • 1.2 MB</span>
                  </div>
                </button>
                <button className="flex items-center w-full p-4 rounded-2xl bg-white/40 hover:bg-white transition-colors text-left gap-4 border border-white/50 group">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-royal shadow-sm group-hover:scale-110 transition-transform">
                    <FileText size={18} />
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-deep">Prospectus</span>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider">PDF • 3.5 MB</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Support Contact */}
            <div className="bg-gradient-to-br from-royal to-sky-600 text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-16 bg-white/10 rounded-full -mr-8 -mt-8 blur-xl" />
              <h3 className="font-bold text-xl font-heading mb-2 relative z-10">Need Help?</h3>
              <p className="text-sm text-white/80 mb-8 relative z-10 font-light">Our admissions team is available Mon-Fri, 8:30 AM - 4:00 PM.</p>
              <div className="space-y-3 relative z-10">
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                   <Phone size={16} />
                   <span className="font-medium text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                   <Mail size={16} />
                   <span className="font-medium text-sm">admissions@gds.edu</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};