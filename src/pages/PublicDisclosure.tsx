
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, FileText, Eye, Download, ChevronRight, Home } from 'lucide-react';
import { PUBLIC_DISCLOSURE_DOCS } from '../constants';
import { SchoolDocument } from '../types';
import { PDFViewerModal } from '../components/PDFViewerModal';

export const PublicDisclosure = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('All');
   const [selectedDoc, setSelectedDoc] = useState<SchoolDocument | null>(null);

   // Get unique categories
   const categories = ['All', ...Array.from(new Set(PUBLIC_DISCLOSURE_DOCS.map(d => d.category)))];

   // Filter logic
   const filteredDocs = PUBLIC_DISCLOSURE_DOCS.filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || doc.category === selectedCategory;
      return matchesSearch && matchesCategory;
   });

   // Group by category if showing "All", otherwise just list
   const groupedDocs = selectedCategory === 'All'
      ? categories.slice(1).map(cat => ({
         category: cat,
         docs: filteredDocs.filter(d => d.category === cat)
      })).filter(g => g.docs.length > 0)
      : [{ category: selectedCategory, docs: filteredDocs }];

   return (
      <div className="min-h-screen bg-slate-50">
         {/* PDF Modal */}
         <PDFViewerModal document={selectedDoc} onClose={() => setSelectedDoc(null)} />

         {/* Header */}
         <div className="bg-deep text-white py-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/2 h-full bg-royal/10 blur-3xl" />
            <div className="container mx-auto px-4 relative z-10">
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                  <div>
                     {/* Breadcrumbs */}
                     <div className="flex items-center gap-2 text-xs text-slate-400 mb-4 font-medium uppercase tracking-wide">
                        <Link to="/" className="hover:text-white flex items-center gap-1"><Home size={12} /> Home</Link>
                        <ChevronRight size={10} />
                        <span className="text-white">Public Disclosure</span>
                     </div>
                     <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">Public Disclosure</h1>
                     <p className="text-slate-400 text-lg font-light max-w-2xl">
                        Mandatory disclosure documents and certificates as per regulatory guidelines.
                     </p>
                  </div>
                  <div>
                     <button className="apple-button px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 shadow-xl shadow-royal/20">
                        <Download size={16} /> Download Full Pack
                     </button>
                  </div>
               </div>
            </div>
         </div>

         {/* Main Content */}
         <div className="container mx-auto px-4 py-12 -mt-8">

            {/* Search & Filter Bar */}
            <div className="apple-glass p-4 rounded-2xl mb-12 flex flex-col md:flex-row gap-4 items-center shadow-lg relative z-20">
               <div className="relative w-full md:flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                  <input
                     type="text"
                     placeholder="Search documents..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/50 border border-slate-200 focus:bg-white focus:border-royal/50 focus:ring-2 focus:ring-royal/20 outline-none transition-all text-sm"
                  />
               </div>
               <div className="flex gap-4 w-full md:w-auto overflow-x-auto no-scrollbar pb-2 md:pb-0">
                  <div className="relative min-w-[200px]">
                     <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                     <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full pl-10 pr-8 py-3 rounded-xl bg-white/50 border border-slate-200 focus:bg-white focus:border-royal/50 focus:ring-2 focus:ring-royal/20 outline-none transition-all text-sm appearance-none cursor-pointer"
                     >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                     </select>
                     <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 rotate-90 pointer-events-none" size={14} />
                  </div>
               </div>
            </div>

            {/* Documents List */}
            <div className="space-y-16">
               {groupedDocs.map((group) => (
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     key={group.category}
                  >
                     <div className="flex items-center gap-4 mb-6">
                        <h2 className="text-2xl font-bold text-deep font-heading">{group.category}</h2>
                        <div className="h-px flex-1 bg-slate-200" />
                     </div>

                     <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {group.docs.map((doc) => (
                           <DocumentCard
                              key={doc.id}
                              doc={doc}
                              onPreview={() => setSelectedDoc(doc)}
                           />
                        ))}
                     </div>
                  </motion.div>
               ))}

               {filteredDocs.length === 0 && (
                  <div className="text-center py-20 text-slate-400">
                     <p>No documents found matching your search.</p>
                  </div>
               )}
            </div>

            {/* Helper Text */}
            <div className="mt-20 pt-10 border-t border-slate-200 text-center">
               <p className="text-sm text-slate-500 mb-4">
                  All documents are official and uploaded by school administration. If you need an alternate format, please contact the office.
               </p>
               <Link to="/contact" className="text-royal text-sm font-bold hover:underline">
                  Request Physical Copy
               </Link>
            </div>
         </div>
      </div>
   );
};

const DocumentCard = ({ doc, onPreview }: { doc: SchoolDocument, onPreview: () => void }) => {
   return (
      <div className="apple-glass p-5 rounded-2xl group hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white/80 border border-white/60">
         <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0 shadow-sm border border-red-100 group-hover:scale-105 transition-transform">
               <FileText size={24} />
            </div>
            <div className="flex-1 min-w-0">
               <h3 className="font-bold text-deep text-sm leading-tight mb-1 group-hover:text-royal transition-colors line-clamp-2" title={doc.title}>
                  {doc.title}
               </h3>
               <p className="text-[11px] text-slate-500 font-medium mb-4">
                  {doc.uploadDate} • {doc.size}
               </p>

               <div className="flex gap-2">
                  <button
                     onClick={onPreview}
                     className="flex-1 py-2 rounded-lg bg-slate-100 hover:bg-royal hover:text-white text-slate-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                     <Eye size={14} /> Preview
                  </button>
                  <button
                     className="px-3 py-2 rounded-lg border border-slate-200 hover:border-royal hover:text-royal text-slate-500 transition-colors"
                     title="Download"
                  >
                     <Download size={14} />
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};
