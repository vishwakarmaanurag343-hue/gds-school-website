
export interface FAQItem {
  q: string;
  a: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  category: 'Events' | 'Sports' | 'Academic';
  image: string;
}

export interface Lead {
  id: string;
  parentName: string;
  contact: string;
  classInterested: string;
  status: 'New' | 'Contacted';
  date: string;
}

export interface Testimonial {
  id: string;
  name: string;
  relation: string;
  quote: string;
  image: string;
}

export interface SchoolDocument {
  id: string;
  title: string;
  category: string;
  uploadDate: string;
  size: string;
  type: 'PDF' | 'DOCX' | 'XLSX';
  url?: string;
  downloads: number;
}

export enum FormStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}
