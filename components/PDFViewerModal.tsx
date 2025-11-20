
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Printer, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Share2, FileText } from 'lucide-react';
import { SchoolDocument } from '../types';

interface Props {
  document: SchoolDocument | null;
  onClose: () => void;
}

export const PDFViewerModal: React.FC<Props> = ({ document, onClose }) => {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);

  if (!document) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-6xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col relative"
        >
          {/* Toolbar */}
          <div className="h-16 bg-slate-900 text-white flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-sky-400">
                <FileText size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight line-clamp-1 max-w-[200px] md:max-w-xs" title={document.title}>
                  {document.title}
                </h3>
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                  {document.category} • {document.size}
                </p>
              </div>
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:flex items-center gap-4">
               <div className="flex items-center bg-slate-800 rounded-lg p-1">
                  <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white"><ZoomOut size={16}/></button>
                  <span className="w-12 text-center text-xs font-mono text-slate-300">{zoom}%</span>
                  <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="p-1.5 hover:bg-slate-700 rounded text-slate-400 hover:text-white"><ZoomIn size={16}/></button>
               </div>
               <div className="h-6 w-px bg-slate-700" />
               <button className="p-2 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors" title="Print">
                  <Printer size={18} />
               </button>
               <button className="p-2 hover:bg-slate-800 rounded-full text-slate-300 hover:text-white transition-colors" title="Download">
                  <Download size={18} />
               </button>
            </div>

            {/* Mobile Close */}
            <button onClick={onClose} className="md:hidden p-2 bg-slate-800 rounded-full text-slate-400">
              <X size={20} />
            </button>
          </div>

          {/* Main Viewer Area */}
          <div className="flex-1 bg-slate-100 relative overflow-hidden flex flex-col">
             {/* Mock PDF Content */}
             <div className="flex-1 overflow-auto p-8 flex justify-center">
                <motion.div 
                  style={{ scale: zoom / 100 }}
                  className="w-full max-w-3xl bg-white shadow-lg min-h-[800px] origin-top transition-transform duration-200 p-12 md:p-20 text-slate-800"
                >
                   {/* Mock Document Content */}
                   <div className="border-b-2 border-slate-900 pb-8 mb-12 flex justify-between items-end">
                      <div>
                         <h1 className="text-3xl font-bold font-heading text-slate-900 mb-2">GDS School</h1>
                         <p className="text-sm text-slate-500 uppercase tracking-widest font-bold">Official Document</p>
                      </div>
                      <div className="text-right">
                         <p className="text-xs text-slate-400">Generated on</p>
                         <p className="text-sm font-bold">{document.uploadDate}</p>
                      </div>
                   </div>
                   
                   <div className="space-y-6">
                      <div className="h-4 bg-slate-100 rounded w-3/4" />
                      <div className="h-4 bg-slate-100 rounded w-full" />
                      <div className="h-4 bg-slate-100 rounded w-5/6" />
                      <div className="h-4 bg-slate-100 rounded w-full" />
                      <div className="h-32 bg-slate-50 rounded border border-slate-100 w-full my-8 flex items-center justify-center text-slate-300 text-sm">
                         [Document Preview Placeholder]
                      </div>
                      <div className="h-4 bg-slate-100 rounded w-full" />
                      <div className="h-4 bg-slate-100 rounded w-4/5" />
                   </div>

                   <div className="mt-20 pt-8 border-t border-slate-200 flex justify-between items-center">
                      <p className="text-xs text-slate-400 font-mono">ID: {document.id}-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                      <p className="text-xs text-slate-400">Page {page} of 4</p>
                   </div>
                </motion.div>
             </div>

             {/* Floating Page Controls */}
             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur text-white px-4 py-2 rounded-full flex items-center gap-4 shadow-xl border border-slate-700">
                <button 
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="p-1 hover:text-sky-400 disabled:opacity-30"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="text-xs font-mono">Page {page} / 4</span>
                <button 
                  onClick={() => setPage(Math.min(4, page + 1))}
                  disabled={page === 4}
                  className="p-1 hover:text-sky-400 disabled:opacity-30"
                >
                  <ChevronRight size={20} />
                </button>
             </div>
          </div>

          {/* Sidebar (Metadata) - Desktop Only */}
          <div className="hidden lg:block w-80 bg-white border-l border-slate-200 p-6 absolute right-0 top-16 bottom-0 overflow-y-auto">
             <div className="flex justify-between items-center mb-6">
                <h4 className="font-bold text-slate-900">Details</h4>
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                  <X size={20} className="text-slate-500" />
                </button>
             </div>
             
             <div className="space-y-6">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">File Type</span>
                   <div className="flex items-center gap-2 font-bold text-slate-700">
                      <FileText size={16} className="text-red-500" /> {document.type}
                   </div>
                </div>

                <div>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Category</span>
                   <p className="text-sm font-medium text-slate-700">{document.category}</p>
                </div>

                <div>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Uploaded</span>
                   <p className="text-sm font-medium text-slate-700">{document.uploadDate}</p>
                </div>

                <div>
                   <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Downloads</span>
                   <p className="text-sm font-medium text-slate-700">{document.downloads.toLocaleString()} times</p>
                </div>

                <hr className="border-slate-100" />

                <button className="w-full py-3 bg-royal hover:bg-deep text-white rounded-xl font-bold text-sm transition-colors shadow-lg shadow-royal/20 flex items-center justify-center gap-2">
                   <Download size={16} /> Download File
                </button>
                <button className="w-full py-3 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
                   <Share2 size={16} /> Share Link
                </button>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
