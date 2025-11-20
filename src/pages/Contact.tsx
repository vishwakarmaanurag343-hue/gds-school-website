
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, MessageCircle, Send, CheckCircle, ChevronDown, Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { SCHOOL_NAME } from '../constants';

export const Contact = () => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    grade: '',
    message: '',
    contactMethod: 'Email'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (method: string) => {
    setFormData({ ...formData, contactMethod: method });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
        const response = await fetch('http://localhost:5000/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                parentName: formData.parentName,
                email: formData.email,
                phone: formData.phone,
                classInterested: formData.grade,
                message: formData.message,
                contactMethod: formData.contactMethod,
                source: 'Contact Page'
            })
        });

        if (response.ok) {
            setFormStatus('success');
            setFormData({ parentName: '', email: '', phone: '', grade: '', message: '', contactMethod: 'Email' });
        } else {
            setFormStatus('error');
        }
    } catch (error) {
        console.error("Error submitting form:", error);
        setFormStatus('error');
    }
  };

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* SVG Gradients for Icons */}
      <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <linearGradient id="contact-whatsapp-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="contact-call-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0A6CFF" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Hero Section */}
      <section className="bg-deep text-white pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-2/3 h-full bg-royal/10 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-sky/5 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-sky-300 text-[10px] font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                Contact Us
              </span>
              <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6 leading-tight">
                Get in Touch
              </h1>
              <p className="text-slate-300 text-lg font-light max-w-xl leading-relaxed">
                We're here to help — reach out for admission inquiries, campus visits, or general questions.
              </p>
            </motion.div>

            <motion.div 
               initial={{ opacity: 0, x: 20 }}
               animate={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
               className="flex flex-col sm:flex-row gap-6 w-full md:w-auto"
            >
               <ContactHeroButton 
                  icon={<Phone size={24} className="text-white" />}
                  label="Call School"
                  sub="8:30 AM — 5:30 PM"
                  href="tel:+15551234567"
                  gradientId="contact-call-gradient"
                  glowColor="rgba(10,108,255,0.5)"
               />
               <ContactHeroButton 
                  icon={<MessageCircle size={24} className="text-white" />}
                  label="WhatsApp"
                  sub="Chat with us"
                  href="https://wa.me/15551234567"
                  gradientId="contact-whatsapp-gradient"
                  glowColor="rgba(34,197,94,0.5)"
               />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-12 relative z-20">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column - Form & Quick Info */}
          <div className="lg:col-span-7 space-y-8">
             
             {/* Contact Form */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="apple-glass p-8 md:p-10 rounded-[2.5rem] bg-white/80 border border-white/60 shadow-xl"
             >
               <h2 className="text-2xl font-bold text-deep font-heading mb-6">Send a Message</h2>
               
               {formStatus === 'success' ? (
                 <div className="py-20 text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-inner"
                    >
                       <CheckCircle size={40} strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-deep mb-2">Message Sent!</h3>
                    <p className="text-slate-500 max-w-xs mx-auto mb-8">Thank you for contacting us. Our team will get back to you within 24 hours.</p>
                    <button 
                      onClick={() => setFormStatus('idle')}
                      className="text-royal font-bold text-sm hover:underline"
                    >
                      Send another message
                    </button>
                 </div>
               ) : (
                 <form onSubmit={handleFormSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                       <InputGroup label="Parent Name" name="parentName" value={formData.parentName} onChange={handleChange} required placeholder="Full Name" />
                       <InputGroup label="Email Address" name="email" value={formData.email} onChange={handleChange} type="email" required placeholder="name@example.com" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                       <InputGroup label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} type="tel" required placeholder="+1 (555) 000-0000" />
                       <div>
                          <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider ml-1">Interested Class</label>
                          <div className="relative">
                             <select 
                                name="grade"
                                value={formData.grade}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 rounded-xl bg-white/50 border border-slate-200 focus:bg-white focus:border-royal/50 focus:ring-2 focus:ring-royal/20 outline-none transition-all appearance-none text-slate-700 text-sm font-medium cursor-pointer hover:bg-white"
                             >
                                <option value="" disabled>Select Grade</option>
                                <option value="Nursery">Nursery</option>
                                <option value="Kindergarten">Kindergarten</option>
                                <option value="Primary">Primary (1-5)</option>
                                <option value="Secondary">Secondary (6-10)</option>
                                <option value="Senior">Senior Secondary (11-12)</option>
                             </select>
                             <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                          </div>
                       </div>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider ml-1">Your Message</label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-5 py-4 rounded-xl bg-white/50 border border-slate-200 focus:bg-white focus:border-royal/50 focus:ring-2 focus:ring-royal/20 outline-none transition-all text-slate-700 text-sm font-medium placeholder:text-slate-400 resize-none"
                        placeholder="How can we help you?"
                      />
                    </div>

                    <div className="pt-2">
                       <label className="block text-xs font-bold text-slate-500 mb-3 uppercase tracking-wider ml-1">Preferred Contact Method</label>
                       <div className="flex gap-4">
                          {['Call', 'WhatsApp', 'Email'].map(method => (
                             <label key={method} className="flex items-center gap-2 cursor-pointer">
                                <input 
                                    type="radio" 
                                    name="contact_method" 
                                    checked={formData.contactMethod === method}
                                    onChange={() => handleRadioChange(method)}
                                    className="accent-royal w-4 h-4" 
                                />
                                <span className="text-sm text-slate-600">{method}</span>
                             </label>
                          ))}
                       </div>
                    </div>

                    <div className="flex items-start gap-3 pt-2">
                       <input type="checkbox" required className="mt-1 accent-royal w-4 h-4" />
                       <p className="text-xs text-slate-500 leading-relaxed">
                         I agree to allow {SCHOOL_NAME} to contact me regarding my enquiry. 
                         <a href="#" className="text-royal hover:underline ml-1">Privacy Policy</a>
                       </p>
                    </div>

                    <button 
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="apple-button w-full py-4 rounded-xl font-bold text-sm shadow-lg flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {formStatus === 'submitting' ? (
                        'Sending...' 
                      ) : (
                        <>Send Message <Send size={16} /></>
                      )}
                    </button>
                    {formStatus === 'error' && (
                        <p className="text-red-500 text-xs text-center mt-2">Something went wrong. Please try again later.</p>
                    )}
                 </form>
               )}
             </motion.div>

             {/* Quick Info Grid */}
             <div className="grid sm:grid-cols-2 gap-4">
                <QuickInfoCard 
                  icon={<MapPin size={20} />} 
                  title="Visit Campus" 
                  text="123 Education Lane, Green Valley, NY" 
                  action="Get Directions" 
                  color="text-rose-500"
                  bg="bg-rose-50"
                />
                <QuickInfoCard 
                  icon={<Mail size={20} />} 
                  title="Email Us" 
                  text="admissions@gds.edu" 
                  action="Copy Email" 
                  color="text-purple-500"
                  bg="bg-purple-50"
                />
             </div>
          </div>

          {/* Right Column - Map & Staff */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Map Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="apple-glass p-3 rounded-[2.5rem] bg-white border border-white/60 shadow-xl"
            >
               <div className="h-64 w-full rounded-[2rem] overflow-hidden relative bg-slate-200 mb-6">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184162002968!2d-73.98823492404069!3d40.75797467138682!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae0bd7!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1696425627899!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="School Location"
                  ></iframe>
               </div>
               <div className="px-5 pb-5">
                  <h3 className="font-bold text-deep text-lg mb-4 font-heading">Visiting Information</h3>
                  <div className="space-y-4">
                     <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                           <Clock size={14} />
                        </div>
                        <div>
                           <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Office Hours</span>
                           <p className="text-sm font-medium text-slate-700">Mon - Fri: 8:30 AM — 4:30 PM</p>
                           <p className="text-sm font-medium text-slate-700">Sat: 9:00 AM — 1:00 PM</p>
                        </div>
                     </div>
                     <div className="flex items-start gap-4">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
                           <MapPin size={14} />
                        </div>
                        <div>
                           <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Parking</span>
                           <p className="text-sm font-medium text-slate-700">Visitor parking available at Gate 2.</p>
                        </div>
                     </div>
                  </div>
                  <button className="w-full mt-6 py-3 rounded-xl border border-slate-200 hover:border-royal/50 hover:text-royal text-slate-600 font-bold text-sm transition-colors flex items-center justify-center gap-2">
                     Book a Campus Tour
                  </button>
               </div>
            </motion.div>

            {/* Key Contacts Accordion */}
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.5 }}
               className="apple-glass p-6 rounded-[2rem] bg-white/60 border border-white/60 shadow-lg"
            >
               <h3 className="font-bold text-deep text-lg mb-6 px-2 font-heading">Department Contacts</h3>
               <div className="space-y-3">
                  <ContactAccordionItem 
                     id="admissions" 
                     active={activeAccordion === 'admissions'} 
                     toggle={() => toggleAccordion('admissions')}
                     title="Admissions Office"
                     person="Ms. Jennifer Winget"
                     role="Admissions Head"
                     email="admissions@gds.edu"
                     phone="+1 (555) 123-4567"
                  />
                  <ContactAccordionItem 
                     id="transport" 
                     active={activeAccordion === 'transport'} 
                     toggle={() => toggleAccordion('transport')}
                     title="Transport Department"
                     person="Mr. Robert Fox"
                     role="Transport Manager"
                     email="transport@gds.edu"
                     phone="+1 (555) 987-6543"
                  />
                  <ContactAccordionItem 
                     id="accounts" 
                     active={activeAccordion === 'accounts'} 
                     toggle={() => toggleAccordion('accounts')}
                     title="Accounts & Billing"
                     person="Mrs. Linda Lee"
                     role="Senior Accountant"
                     email="accounts@gds.edu"
                     phone="+1 (555) 456-7890"
                  />
               </div>
            </motion.div>

            {/* Social Links */}
            <div className="flex gap-4 justify-center">
               {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-12 h-12 rounded-full bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-400 hover:text-royal hover:scale-110 transition-all hover:shadow-lg hover:shadow-royal/10">
                     <Icon size={20} />
                  </a>
               ))}
            </div>

          </div>
        </div>

        {/* Mini FAQ */}
        <div className="max-w-4xl mx-auto mt-24 pt-12 border-t border-slate-200">
           <div className="text-center mb-10">
              <h3 className="text-2xl font-bold text-deep font-heading">Quick Answers</h3>
           </div>
           <div className="grid md:grid-cols-3 gap-6">
              {['When do admissions open?', 'Is there a cafeteria?', 'How to apply for scholarship?'].map((q, i) => (
                 <div key={i} className="apple-glass p-6 rounded-2xl bg-white/60 hover:bg-white transition-colors cursor-default group">
                    <h4 className="font-bold text-deep text-sm mb-2 group-hover:text-royal transition-colors">{q}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">Please contact the admissions office for the latest detailed information regarding this query.</p>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, name, value, onChange, type = "text", placeholder, required }: any) => (
  <div>
    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider ml-1">{label}</label>
    <input 
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      type={type} 
      className="w-full px-5 py-3.5 rounded-xl bg-white/50 border border-slate-200 focus:bg-white focus:border-royal/50 focus:ring-2 focus:ring-royal/20 outline-none transition-all text-slate-700 text-sm font-medium placeholder:text-slate-400 hover:bg-white" 
      placeholder={placeholder} 
    />
  </div>
);

const QuickInfoCard = ({ icon, title, text, action, color, bg }: any) => (
  <div className="apple-glass p-5 rounded-2xl bg-white/70 border border-white/60 hover:shadow-lg transition-all flex flex-col items-start group">
     <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
     </div>
     <h3 className="font-bold text-deep text-sm mb-1">{title}</h3>
     <p className="text-xs text-slate-500 mb-4 leading-relaxed">{text}</p>
     <button className={`text-xs font-bold ${color} hover:underline uppercase tracking-wide mt-auto`}>
        {action}
     </button>
  </div>
);

const ContactHeroButton = ({ icon, label, sub, href, gradientId, glowColor }: any) => {
   return (
      <a 
        href={href}
        className="group relative w-full sm:w-64 p-1 rounded-[1.5rem] transition-transform hover:-translate-y-1 active:scale-95"
      >
         {/* Glow */}
         <div className="absolute inset-0 rounded-[1.5rem] opacity-40 blur-xl transition-opacity group-hover:opacity-70" style={{ background: glowColor }} />
         
         {/* Border Gradient */}
         <div className="absolute inset-0 rounded-[1.5rem] border-2 border-transparent" style={{ mask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)' }} />
         
         {/* Button Body */}
         <div className="relative h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[1.3rem] p-4 flex items-center gap-4 overflow-hidden group-hover:bg-white/15 transition-colors">
             {/* Icon Ring */}
             <div className="relative w-12 h-12 flex items-center justify-center shrink-0">
                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
                   <circle cx="24" cy="24" r="23" fill="none" stroke={`url(#${gradientId})`} strokeWidth="2" />
                </svg>
                <div className="absolute inset-0 bg-white/10 rounded-full blur-sm" />
                {icon}
             </div>
             
             <div className="text-left">
                <span className="block text-white font-bold text-lg leading-none mb-1">{label}</span>
                <span className="block text-white/60 text-xs font-medium">{sub}</span>
             </div>
         </div>
      </a>
   );
};

const ContactAccordionItem = ({ id, active, toggle, title, person, role, email, phone }: any) => (
   <div className="border border-slate-100 rounded-xl overflow-hidden transition-all duration-300 bg-white/40 hover:bg-white/60">
      <button 
         onClick={toggle}
         className="w-full flex items-center justify-between p-4 text-left"
      >
         <span className={`font-bold text-sm transition-colors ${active ? 'text-royal' : 'text-slate-700'}`}>{title}</span>
         <ChevronDown size={16} className={`text-slate-400 transition-transform duration-300 ${active ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
         {active && (
            <motion.div 
               initial={{ height: 0, opacity: 0 }}
               animate={{ height: 'auto', opacity: 1 }}
               exit={{ height: 0, opacity: 0 }}
               className="overflow-hidden"
            >
               <div className="px-4 pb-5 pt-0">
                  <div className="h-px w-full bg-slate-100 mb-4" />
                  <div className="flex items-center gap-3 mb-3">
                     <div className="w-10 h-10 rounded-full bg-slate-200" /> {/* Placeholder Avatar */}
                     <div>
                        <p className="text-sm font-bold text-deep">{person}</p>
                        <p className="text-[10px] text-slate-500 uppercase tracking-wider">{role}</p>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <a href={`mailto:${email}`} className="flex items-center gap-2 text-xs text-slate-600 hover:text-royal transition-colors">
                        <Mail size={12} /> {email}
                     </a>
                     <a href={`tel:${phone}`} className="flex items-center gap-2 text-xs text-slate-600 hover:text-royal transition-colors">
                        <Phone size={12} /> {phone}
                     </a>
                  </div>
               </div>
            </motion.div>
         )}
      </AnimatePresence>
   </div>
);
