
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ChevronRight, ChevronLeft, Upload, User, Calendar, MapPin, ChevronDown } from 'lucide-react';

export const AdmissionForm = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [refId, setRefId] = useState('');

  // Form Data State
  const [formData, setFormData] = useState({
    parentName: '',
    relationship: 'Father',
    email: '',
    phone: '',
    studentName: '',
    dob: '',
    grade: 'Nursery',
    gender: 'Male',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  const totalSteps = 4;

  const nextStep = () => setStep(s => Math.min(s + 1, totalSteps));
  const prevStep = () => setStep(s => Math.max(s - 1, 1));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < totalSteps) {
      nextStep();
    } else {
      setIsSubmitting(true);

      try {
        const response = await fetch('/api/admissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
          setRefId(data.refId);
          setIsSuccess(true);
        } else {
          alert('Submission failed. Please try again.');
        }
      } catch (error) {
        console.error("Submission Error:", error);
        alert('Error connecting to server.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="apple-glass p-12 rounded-3xl text-center">
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <Check size={48} strokeWidth={1.5} />
        </div>
        <h3 className="text-3xl font-bold text-deep mb-4 font-heading">Application Submitted</h3>
        <p className="text-slate-500 mb-10 max-w-md mx-auto text-lg">
          Thank you for applying to GDS. Your reference ID is <span className="font-bold text-deep">{refId}</span>.
        </p>
        <button onClick={() => window.location.reload()} className="text-royal hover:text-deep transition-colors text-sm font-semibold tracking-wide uppercase">Start Another Application</button>
      </div>
    );
  }

  return (
    <div className="apple-glass rounded-3xl overflow-hidden">
      {/* Header / Progress */}
      <div className="bg-white/40 backdrop-blur-sm px-8 py-8 border-b border-white/40">
        <div className="flex items-center justify-between max-w-xl mx-auto mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${step === s ? 'bg-royal text-white shadow-lg shadow-royal/30 scale-110' :
                  step > s ? 'bg-green-500 text-white' : 'bg-white border border-slate-200 text-slate-300'
                }`}>
                {step > s ? <Check size={16} /> : s}
              </div>
              {s < 4 && (
                <div className={`w-16 h-0.5 mx-3 transition-all duration-500 ${step > s ? 'bg-green-500/50' : 'bg-slate-200'}`} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <h2 className="text-xl font-heading font-bold text-deep">
            {step === 1 && 'Parent Details'}
            {step === 2 && 'Student Profile'}
            {step === 3 && 'Address Info'}
            {step === 4 && 'Documents'}
          </h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-8 md:p-12 min-h-[450px]">

        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <InputGroup label="Parent Full Name" name="parentName" value={formData.parentName} onChange={handleChange} placeholder="John Doe" icon={<User size={16} />} />
              <SelectGroup label="Relationship" name="relationship" value={formData.relationship} onChange={handleChange} options={['Father', 'Mother', 'Guardian']} />
              <InputGroup label="Email Address" name="email" value={formData.email} onChange={handleChange} type="email" placeholder="name@example.com" />
              <InputGroup label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} type="tel" placeholder="+91 1234567890" />
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <InputGroup label="Student Name" name="studentName" value={formData.studentName} onChange={handleChange} placeholder="Full Name" icon={<User size={16} />} />
              <InputGroup label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} type="date" icon={<Calendar size={16} />} />
              <SelectGroup
                label="Applying For Grade"
                name="grade"
                value={formData.grade}
                onChange={handleChange}
                options={['Nursery', 'Kindergarten', 'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5', 'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12']}
              />
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Gender</label>
                <div className="flex gap-4">
                  <label className={`flex items-center justify-center gap-2 cursor-pointer px-6 py-3.5 rounded-xl border transition-all shadow-sm flex-1 ${formData.gender === 'Male' ? 'bg-white border-royal text-royal' : 'bg-white/40 border-white/60 hover:bg-white'}`}>
                    <input
                      type="radio"
                      name="gender"
                      checked={formData.gender === 'Male'}
                      onChange={() => handleRadioChange('gender', 'Male')}
                      className="accent-royal w-4 h-4"
                    />
                    <span className="text-sm font-medium">Male</span>
                  </label>
                  <label className={`flex items-center justify-center gap-2 cursor-pointer px-6 py-3.5 rounded-xl border transition-all shadow-sm flex-1 ${formData.gender === 'Female' ? 'bg-white border-royal text-royal' : 'bg-white/40 border-white/60 hover:bg-white'}`}>
                    <input
                      type="radio"
                      name="gender"
                      checked={formData.gender === 'Female'}
                      onChange={() => handleRadioChange('gender', 'Female')}
                      className="accent-royal w-4 h-4"
                    />
                    <span className="text-sm font-medium">Female</span>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <InputGroup label="Street Address" name="address" value={formData.address} onChange={handleChange} icon={<MapPin size={16} />} />
            <div className="grid md:grid-cols-3 gap-8">
              <InputGroup label="City" name="city" value={formData.city} onChange={handleChange} />
              <InputGroup label="State" name="state" value={formData.state} onChange={handleChange} />
              <InputGroup label="Zip Code" name="zip" value={formData.zip} onChange={handleChange} />
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-royal hover:bg-royal/5 transition-all cursor-pointer group bg-white/40">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="text-slate-400 group-hover:text-royal transition-colors" size={20} />
                </div>
                <span className="text-sm font-bold text-slate-700 mb-1">Birth Certificate</span>
                <span className="text-xs text-slate-400">PDF or JPG (Max 2MB)</span>
              </div>
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:border-royal hover:bg-royal/5 transition-all cursor-pointer group bg-white/40">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="text-slate-400 group-hover:text-royal transition-colors" size={20} />
                </div>
                <span className="text-sm font-bold text-slate-700 mb-1">Previous Report Card</span>
                <span className="text-xs text-slate-400">Optional</span>
              </div>
            </div>
            <div className="flex items-center gap-4 mt-8 p-4 bg-white/50 rounded-xl border border-white/50">
              <input type="checkbox" required className="w-5 h-5 accent-royal rounded cursor-pointer" />
              <p className="text-sm text-slate-600 font-medium">
                I confirm that the information provided is accurate.
              </p>
            </div>
          </motion.div>
        )}

        <div className="flex justify-between mt-12 pt-8 border-t border-white/40">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-slate-500 hover:bg-white/50 hover:text-deep'
              }`}
          >
            <ChevronLeft size={16} /> Back
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className="apple-button px-10 py-3.5 rounded-full text-sm font-medium flex items-center gap-2"
          >
            {isSubmitting ? 'Processing...' : step === 4 ? 'Submit Application' : 'Continue'}
            {!isSubmitting && step < 4 && <ChevronRight size={16} />}
          </button>
        </div>
      </form>
    </div>
  );
};

const InputGroup = ({ label, name, value, onChange, type = "text", placeholder, icon }: any) => (
  <div>
    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider pl-1">{label}</label>
    <div className="relative">
      {icon && <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">{icon}</div>}
      <input
        required
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        className={`w-full rounded-xl bg-white/60 border border-white/50 focus:bg-white text-slate-800 focus:ring-2 focus:ring-royal/20 focus:border-royal/50 outline-none transition-all placeholder:text-slate-400 text-sm py-3.5 shadow-sm hover:shadow-md ${icon ? 'pl-11 pr-4' : 'px-5'}`}
        placeholder={placeholder}
      />
    </div>
  </div>
);

const SelectGroup = ({ label, name, value, onChange, options }: any) => (
  <div>
    <label className="block text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider pl-1">{label}</label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-5 py-3.5 rounded-xl bg-white/60 border border-white/50 focus:bg-white text-slate-800 focus:ring-2 focus:ring-royal/20 focus:border-royal/50 outline-none transition-all appearance-none text-sm shadow-sm hover:shadow-md cursor-pointer"
      >
        {options.map((o: string) => <option key={o} value={o}>{o}</option>)}
      </select>
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
    </div>
  </div>
);
