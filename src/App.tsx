// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { VirtualTour } from './pages/VirtualTour';
import { Admissions } from './pages/Admissions';
import { PublicDisclosure } from './pages/PublicDisclosure';
import { Contact } from './pages/Contact';
import { Admin } from './pages/Admin';
import { EnquiryModal } from './components/EnquiryModal';

const App: React.FC = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <Router>
      {/* global modal */}
      <EnquiryModal forceOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />

      <Routes>
        {/* admin route (standalone) */}
        <Route path="/admin" element={<Admin />} />

        {/* Public routes wrapped by Layout with nested children */}
        <Route path="/" element={<Layout onEnquire={() => setEnquiryOpen(true)} />}>
          <Route index element={<Home onEnquire={() => setEnquiryOpen(true)} />} />
          <Route path="about" element={<About />} />
          <Route path="tour" element={<VirtualTour />} />
          <Route path="admissions" element={<Admissions />} />
          <Route path="public-disclosure" element={<PublicDisclosure />} />
          <Route path="contact" element={<Contact />} />

          {/* fallback: redirect unknown paths to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
