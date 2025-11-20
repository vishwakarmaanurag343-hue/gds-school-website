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

const App = () => {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <Router>
      <EnquiryModal forceOpen={enquiryOpen} onClose={() => setEnquiryOpen(false)} />

      <Routes>
        {/* Admin route outside of standard layout if preferred, but using inside for simplicity here */}
        <Route path="/admin" element={<Admin />} />

        {/* Public Routes */}
        <Route path="*" element={
          <Layout onEnquire={() => setEnquiryOpen(true)}>
            <Routes>
              <Route path="/" element={<Home onEnquire={() => setEnquiryOpen(true)} />} />
              <Route path="/about" element={<About />} />
              <Route path="/tour" element={<VirtualTour />} />
              <Route path="/admissions" element={<Admissions />} />
              <Route path="/public-disclosure" element={<PublicDisclosure />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </Router>
  );
};

export default App;