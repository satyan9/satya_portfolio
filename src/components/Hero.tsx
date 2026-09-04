import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Cloud, ChevronRight, Download } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { LinkedinIcon } from './LinkedinIcon';
import { TypewriterText } from './TypewriterText';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-badge',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.7, delay: 0.1 }
      );
      gsap.fromTo(
        '.hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.2, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-typewriter',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.4 }
      );
      gsap.fromTo(
        '.hero-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5 }
      );
      gsap.fromTo(
        '.hero-buttons',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6 }
      );
      gsap.fromTo(
        '.hero-stats',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, delay: 0.7, stagger: 0.15 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="min-h-screen pt-32 pb-20 flex flex-col justify-center relative overflow-hidden">
      {/* Dynamic Glow Aura Blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[48rem] h-[48rem] bg-gradient-to-br from-cyan-500/15 via-indigo-500/10 to-transparent rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        {/* Certification Badge */}
        <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-cyan-500/30 backdrop-blur-md mb-8 shadow-lg shadow-cyan-500/10 hover:border-cyan-400 transition-colors">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)] shrink-0" />
          <Cloud className="w-4 h-4 text-cyan-400 shrink-0" />
          <span className="text-xs font-semibold tracking-wide text-cyan-300">
            Google Cloud Certified Professional Data Engineer
          </span>
        </div>

        {/* Main Title */}
        <h1 className="hero-title text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-4 leading-[1.15]">
          Architecting Enterprise <br className="hidden sm:inline" />
          <span className="text-gradient-cyan">BigQuery Pipelines</span> & <span className="text-gradient-violet">AI Search Systems</span>
        </h1>

        {/* Animated Character Typewriter Rotator */}
        <div className="hero-typewriter">
          <TypewriterText />
        </div>

        {/* Executive Summary */}
        <p className="hero-desc text-slate-400 text-base sm:text-xl max-w-3xl mb-10 leading-relaxed font-normal">
          Specialized in building scalable configuration-driven ETL/ELT pipelines, enterprise ODS architectures, BigQuery performance tuning, and AI-powered enterprise search platforms on Google Cloud.
        </p>

        {/* Action Buttons with Outbound Links */}
        <div className="hero-buttons flex flex-wrap items-center gap-4 mb-14">
          <a
            href="#experience"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Explore Projects & Experience</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          
          <a
            href="https://github.com/satyan9"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-xl glass-panel glass-panel-hover text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 group border border-slate-700/80"
          >
            <GithubIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>GitHub Profile</span>
          </a>

          <a
            href="https://www.linkedin.com/in/satyanarayana-reddy-kolagatla-data-engineer/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-xl glass-panel glass-panel-hover text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 group border border-slate-700/80"
          >
            <LinkedinIcon className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
            <span>LinkedIn Profile</span>
          </a>

          <a
            href="/Satyanarayana_Reddy_Kolagatla_Data_Engineer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-xl glass-panel glass-panel-hover text-slate-300 hover:text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 group"
          >
            <Download className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
            <span>Resume PDF</span>
          </a>
        </div>

        {/* Stats Highlight Grid with Clear Methodology & Baseline Context */}
        <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-800/80 glass-panel-hover group">
            <div className="text-2xl sm:text-4xl font-extrabold text-cyan-400 mb-1 font-mono group-hover:scale-105 transition-transform">85%</div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Query Speedup</div>
            <div className="text-[11px] text-slate-400 leading-tight">Via BigQuery date partitioning & clustering</div>
          </div>
          
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-800/80 glass-panel-hover group">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-400 mb-1 font-mono group-hover:scale-105 transition-transform">99.9%</div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Bytes Scanned Cut</div>
            <div className="text-[11px] text-slate-400 leading-tight">Pruned full scans via explicit column projections</div>
          </div>
          
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-800/80 glass-panel-hover group">
            <div className="text-2xl sm:text-4xl font-extrabold text-indigo-400 mb-1 font-mono group-hover:scale-105 transition-transform">600+</div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Pipeline Tasks</div>
            <div className="text-[11px] text-slate-400 leading-tight">Generated via 1 metadata ETL framework</div>
          </div>
          
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-800/80 glass-panel-hover group">
            <div className="text-2xl sm:text-4xl font-extrabold text-amber-400 mb-1 font-mono group-hover:scale-105 transition-transform">GCP PDE</div>
            <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">Professional Cert</div>
            <div className="text-[11px] text-slate-400 leading-tight">Google Certified Data Engineer</div>
          </div>
        </div>
      </div>
    </section>
  );
}
