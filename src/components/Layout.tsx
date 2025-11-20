// src/components/Layout.tsx
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, Outlet } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Youtube, GraduationCap } from 'lucide-react';
import { NAV_LINKS, SCHOOL_NAME } from '../constants';
import { FloatingActions } from './FloatingActions';
import logo from '../assets/gds-logo.svg';

interface LayoutProps {
  onEnquire: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ onEnquire }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Sticky Floating Action Buttons */}
      <FloatingActions />

      {/* Top Bar - Solid Deep Blue */}
      <div className="bg-deep text-white py-2.5 text-xs hidden md:block z-50 relative">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6 opacity-80 font-medium tracking-wide">
            <span className="flex items-center gap-2"><Phone size={12} /> +1 (555) 123-4567</span>
            <span className="flex items-center gap-2"><Mail size={12} /> admissions@gds.edu</span>
          </div>
          <div className="flex items-center gap-5 opacity-80 font-medium">
            <a href="#" className="hover:text-white transition-colors">Students</a>
            <a href="#" className="hover:text-white transition-colors">Parents</a>
            <a href="#" className="hover:text-white transition-colors">Staff</a>
          </div>
        </div>
      </div>

      {/* Main Header - Glass Effect */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-500 ${scrolled
          ? 'bg-white/70 backdrop-blur-xl border-b border-white/40 shadow-sm py-3'
          : 'bg-transparent py-5'
          }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <NavLink to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt="GDS Logo"
              className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
            />
          </NavLink>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors py-1 relative hover:text-deep ${isActive ? 'text-royal font-semibold' : 'text-slate-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <button
              onClick={onEnquire}
              className="apple-button px-6 py-2.5 rounded-full text-sm font-medium"
            >
              Enquire Now
            </button>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-deep hover:bg-slate-100 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu - Glass Overlay */}
      <div className={`fixed inset-0 z-40 pt-24 px-6 transform transition-transform duration-500 lg:hidden ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-white/90 backdrop-blur-xl" />
        <nav className="relative flex flex-col gap-6 z-10">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className="text-2xl font-heading font-medium text-deep border-b border-slate-100 pb-4"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </NavLink>
          ))}
          <button
            onClick={() => { onEnquire(); setMobileMenuOpen(false); }}
            className="apple-button w-full py-4 rounded-xl font-medium text-lg mt-4"
          >
            Enquire Now
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Render nested route content here */}
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-deep text-slate-300 pt-20 pb-10 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 text-white font-heading text-2xl font-bold mb-6">
                <GraduationCap className="text-royal" /> {SCHOOL_NAME}
              </div>
              <p className="text-sm leading-relaxed opacity-70 mb-8 font-light">
                Nurturing curious minds through a blend of traditional values and modern educational practices. Excellence since 1995.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-royal hover:text-white hover:border-royal transition-all duration-300">
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-heading font-semibold mb-6 text-lg">Discover</h4>
              <ul className="space-y-3 text-sm font-light">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <NavLink to={link.path} className="hover:text-white transition-colors inline-block">
                      {link.name}
                    </NavLink>
                  </li>
                ))}
                <li><NavLink to="/admin" className="hover:text-white transition-colors inline-block">Admin Portal</NavLink></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-heading font-semibold mb-6 text-lg">Contact</h4>
              <ul className="space-y-5 text-sm font-light">
                <li className="flex items-start gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-royal/10 flex items-center justify-center text-royal shrink-0 mt-[-4px]">
                    <MapPin size={14} />
                  </div>
                  <span>123 Education Lane,<br />Green Valley, NY 10010</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-royal/10 flex items-center justify-center text-royal shrink-0">
                    <Phone size={14} />
                  </div>
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-4 group">
                  <div className="w-8 h-8 rounded-full bg-royal/10 flex items-center justify-center text-royal shrink-0">
                    <Mail size={14} />
                  </div>
                  <span>admissions@gds.edu</span>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-white font-heading font-semibold mb-6 text-lg">Newsletter</h4>
              <p className="text-xs mb-4 opacity-60">Stay updated with school news and events.</p>
              <div className="flex relative group">
                <input
                  type="email"
                  placeholder="Email address"
                  className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 w-full text-sm focus:outline-none focus:bg-white/10 focus:border-white/30 text-white placeholder-slate-500 transition-all"
                />
                <button className="absolute right-1 top-1 bottom-1 bg-royal/90 hover:bg-royal px-4 rounded-md text-white transition-colors font-medium text-xs shadow-lg">
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs opacity-50 font-light">
            <span>© {new Date().getFullYear()} GDS School. All Rights Reserved.</span>
            <div className="flex gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Use</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
