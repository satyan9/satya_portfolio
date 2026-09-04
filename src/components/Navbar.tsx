import { useState } from 'react';
import { Database, Download, Menu, X } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { LinkedinIcon } from './LinkedinIcon';

interface NavbarProps {
  scrolled: boolean;
  activeNav: string;
}

export function Navbar({ scrolled, activeNav }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'education', label: 'Academics' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass-nav py-3 shadow-2xl backdrop-blur-xl' : 'bg-transparent py-5'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
            <Database className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-white text-base sm:text-lg block leading-none group-hover:text-cyan-300 transition-colors">
              SATYANARAYANA REDDY
            </span>
            <span className="text-[10px] font-mono text-cyan-400 font-semibold tracking-wider block mt-1 uppercase">
              GCP Data Engineer
            </span>
          </div>
        </a>

        {/* Desktop Links Pill */}
        <div className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeNav === item.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <a
            href="https://github.com/satyan9"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300 shadow-md group"
            title="GitHub Profile"
          >
            <GithubIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">GitHub</span>
          </a>

          <a
            href="https://www.linkedin.com/in/satyanarayana-reddy-kolagatla-data-engineer/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-slate-900/90 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300 shadow-md group"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span className="hidden md:inline">LinkedIn</span>
          </a>

          <a
            href="/Satyanarayana_Reddy_Kolagatla_Data_Engineer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 group"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            <span>Resume CV</span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="lg:hidden p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-cyan-400 hover:bg-slate-800 transition-colors shadow-lg shadow-cyan-500/10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-[72px] left-4 right-4 z-50 glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-2xl bg-slate-950/95 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col gap-2">
            {navItems.map(item => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-5 py-3 rounded-2xl text-sm font-semibold tracking-wide transition-all ${
                  activeNav === item.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-cyan-400'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href="https://github.com/satyan9"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center gap-2 shadow-lg"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub Profile</span>
            </a>
            <a
              href="https://www.linkedin.com/in/satyanarayana-reddy-kolagatla-data-engineer/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center gap-2 shadow-lg"
            >
              <LinkedinIcon className="w-4 h-4" />
              <span>LinkedIn Profile</span>
            </a>
            <a
              href="/Satyanarayana_Reddy_Kolagatla_Data_Engineer.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-2xl text-sm font-bold bg-cyan-500 text-slate-950 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20"
            >
              <Download className="w-4 h-4" />
              <span>Download Resume PDF</span>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
