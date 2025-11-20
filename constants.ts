
import { FAQItem, StaffMember, EventItem, Testimonial, SchoolDocument } from './types';

export const SCHOOL_NAME = "GDS";
export const SCHOOL_TAGLINE = "Nurturing curious minds";

export const NAV_LINKS = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Virtual Tour", path: "/tour" },
  { name: "Admissions", path: "/admissions" },
  { name: "Public Disclosure", path: "/public-disclosure" },
  { name: "Contact", path: "/contact" },
];

export const HOME_FAQS: FAQItem[] = [
  { q: "What age groups do you accept?", a: "We accept students from Nursery to Grade 12." },
  { q: "What curriculum do you follow?", a: "GDS follows a modern, holistic curriculum blending academics and life skills." },
  { q: "How can I apply?", a: "Click 'Apply' or submit the quick enquiry pop-up — we’ll call you within 24 hours." },
  { q: "What are your school timings?", a: "8:30 AM — 3:30 PM on weekdays." },
  { q: "Do you provide transport?", a: "Yes, safe and insured bus service is available on selected routes." },
  { q: "Can parents meet teachers?", a: "Yes — regular parent-teacher meetings are held every term." },
];

export const STAFF_DATA: StaffMember[] = [
  { id: '1', name: 'Dr. Sarah Jenkins', role: 'Principal', bio: '20+ years in educational leadership and curriculum development.', image: 'https://picsum.photos/300/300?random=1' },
  { id: '2', name: 'Mr. David Chen', role: 'Head of Sciences', bio: 'Award-winning physics educator passionate about STEM.', image: 'https://picsum.photos/300/300?random=2' },
  { id: '3', name: 'Mrs. Amara Singh', role: 'Head of Arts', bio: 'Fostering creativity through mixed media and history.', image: 'https://picsum.photos/300/300?random=3' },
];

export const EVENTS_DATA: EventItem[] = [
  { id: '1', title: 'Annual Science Fair', date: 'Oct 12, 2023', category: 'Academic', image: 'https://picsum.photos/800/600?random=10' },
  { id: '2', title: 'Interschool Football Cup', date: 'Nov 05, 2023', category: 'Sports', image: 'https://picsum.photos/800/600?random=11' },
  { id: '3', title: 'Winter Concert', date: 'Dec 15, 2023', category: 'Events', image: 'https://picsum.photos/800/600?random=12' },
  { id: '4', title: 'Robotics Workshop', date: 'Jan 20, 2024', category: 'Academic', image: 'https://picsum.photos/800/600?random=13' },
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Priya Sharma',
    relation: 'Mother of Aarav – Grade 5',
    quote: 'The holistic approach at GDS has transformed my son. He is more confident, curious, and loves going to school every day.',
    image: 'https://picsum.photos/100/100?random=40'
  },
  {
    id: '2',
    name: 'James Wilson',
    relation: 'Father of Emma – Grade 8',
    quote: 'The facilities are world-class, but it is the teachers who truly make the difference. They genuinely care about every child.',
    image: 'https://picsum.photos/100/100?random=41'
  },
  {
    id: '3',
    name: 'Anita Desai',
    relation: 'Mother of Rohan – Grade 10',
    quote: 'Balancing academics with sports is tough, but GDS manages it beautifully. The support for student athletes is outstanding.',
    image: 'https://picsum.photos/100/100?random=42'
  },
  {
    id: '4',
    name: 'Michael Chang',
    relation: 'Father of Lily – Grade 2',
    quote: 'We moved here recently, and the admission process was seamless. The community welcomed us with open arms.',
    image: 'https://picsum.photos/100/100?random=43'
  },
  {
    id: '5',
    name: 'Sarah Thompson',
    relation: 'Mother of Jack – Kindergarten',
    quote: 'The early years program is fantastic. It is play-based yet structured enough to prepare them for the future.',
    image: 'https://picsum.photos/100/100?random=44'
  }
];

export const PUBLIC_DISCLOSURE_DOCS: SchoolDocument[] = [
  // Mandatory
  { id: '1', title: 'MANDATORY PUBLIC DISCLOSURE-2025', category: 'Mandatory Public Disclosure', uploadDate: 'Jan 15, 2024', size: '2.4 MB', type: 'PDF', downloads: 1240 },
  { id: '2', title: 'General Information', category: 'Mandatory Public Disclosure', uploadDate: 'Jan 10, 2024', size: '1.1 MB', type: 'PDF', downloads: 850 },

  // Affidavits
  { id: '3', title: 'Self Affidavit of School', category: 'Self-Affidavit & Certifications', uploadDate: 'Dec 05, 2023', size: '850 KB', type: 'PDF', downloads: 340 },
  { id: '4', title: 'Self-Certification Proforma', category: 'Self-Affidavit & Certifications', uploadDate: 'Dec 05, 2023', size: '600 KB', type: 'PDF', downloads: 210 },
  { id: '5', title: 'No Objection Certificate (NOC)', category: 'Self-Affidavit & Certifications', uploadDate: 'Nov 20, 2023', size: '1.5 MB', type: 'PDF', downloads: 405 },

  // Infrastructure
  { id: '6', title: 'Building Safety Certificate', category: 'Details of Infrastructure', uploadDate: 'Jan 02, 2024', size: '3.2 MB', type: 'PDF', downloads: 150 },
  { id: '7', title: 'Fire Safety Certificate', category: 'Details of Infrastructure', uploadDate: 'Jan 02, 2024', size: '1.8 MB', type: 'PDF', downloads: 180 },
  { id: '8', title: 'Water & Sanitation Certificate', category: 'Details of Infrastructure', uploadDate: 'Jan 02, 2024', size: '1.2 MB', type: 'PDF', downloads: 90 },
  { id: '9', title: 'Land Certificate', category: 'Details of Infrastructure', uploadDate: 'Dec 15, 2023', size: '4.5 MB', type: 'PDF', downloads: 60 },

  // Committee
  { id: '10', title: 'List of SMC Members', category: 'School Managing Committee', uploadDate: 'Feb 01, 2024', size: '500 KB', type: 'PDF', downloads: 520 },
  { id: '11', title: 'PTA Members List', category: 'School Managing Committee', uploadDate: 'Feb 01, 2024', size: '450 KB', type: 'PDF', downloads: 310 },

  // Calendar
  { id: '12', title: 'Academic Calendar 2024-25', category: 'Academic Calendar', uploadDate: 'Mar 01, 2024', size: '1.8 MB', type: 'PDF', downloads: 2100 },
  { id: '13', title: 'Holiday List 2024', category: 'Academic Calendar', uploadDate: 'Mar 01, 2024', size: '800 KB', type: 'PDF', downloads: 1800 },
];

// Credentials moved to database
