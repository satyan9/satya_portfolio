import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Database, Cloud, Server, Cpu, Terminal, Shield, Award, GraduationCap,
  ExternalLink, Download, Mail, Phone, MapPin, CheckCircle2, ChevronRight,
  Search, BarChart3, Layers, Code, Sparkles, Send, ArrowUp, Star, Lock,
  Globe, Briefcase, Zap, Activity, Filter, Loader2, Menu, X
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  // Initial scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'certifications', 'education', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 250 && rect.bottom >= 200;
        }
        return false;
      });
      if (current) setActiveNav(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global GSAP Scroll Reveals (run after preloader completes & re-animates on section revisit)
  useEffect(() => {
    if (loading) return;

    const timer = setTimeout(() => {
      const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
      revealElements.forEach((elem) => {
        const directionY = elem.classList.contains('reveal') ? 35 : 0;
        const directionX = elem.classList.contains('reveal-left') ? -40 : elem.classList.contains('reveal-right') ? 40 : 0;

        gsap.fromTo(
          elem,
          { opacity: 0, y: directionY, x: directionX },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: elem,
              start: 'top 88%',
              end: 'bottom 12%',
              toggleActions: 'play reverse play reverse',
            },
          }
        );
      });

      ScrollTrigger.refresh();
    }, 150);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loading]);

  if (loading) {
    return <Loader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="bg-[#030712] text-slate-100 min-h-screen relative font-sans selection:bg-cyan-500/30 selection:text-cyan-200 bg-obsidian-grid overflow-x-hidden">
      {/* Interactive Particle Constellation Mesh */}
      <ParticleCanvas />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* Navigation Bar */}
      <Navbar scrolled={scrolled} activeNav={activeNav} />

      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Education />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

// ─── INITIAL PIPELINE COMPILING PRELOADER ──────────────────────────────────────
function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("INITIALIZING GCP DATA PIPELINES...");
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const statuses = [
      "INITIALIZING GCP DATA PIPELINES...",
      "AUTHENTICATING BIGQUERY DATASETS...",
      "MOUNTING CLOUD COMPOSER AIRFLOW DAGS...",
      "INDEXING ENTERPRISE SEARCH CATALOGS...",
      "PIPELINE COMPLETED ✓"
    ];

    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      const statusIdx = Math.min(
        statuses.length - 1,
        Math.floor((currentProgress / 100) * statuses.length)
      );
      setStatusText(statuses[statusIdx]);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setFadeOut(true);
        setTimeout(onComplete, 500);
      }
    }, 38);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-[#030712] text-white select-none px-4 transition-opacity duration-500 ${
      fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      <div className="relative mb-8">
        <div className="w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.3)] animate-pulse">
          <Database className="w-10 h-10 text-cyan-400" />
        </div>
        <div className="absolute -inset-2 rounded-3xl border border-cyan-500/20 animate-ping opacity-20 pointer-events-none" />
      </div>

      <h2 className="font-mono text-xl sm:text-2xl font-bold tracking-[0.25em] text-white mb-2 text-center">
        SATYANARAYANA REDDY KOLAGATLA
      </h2>

      <div className="font-mono text-xs text-cyan-400 tracking-widest mb-8 animate-pulse text-center h-5">
        {statusText}
      </div>

      {/* Progress Bar Container */}
      <div className="w-72 sm:w-80 h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800 relative shadow-inner">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-400 transition-all duration-75 ease-out shadow-[0_0_15px_rgba(6,182,212,0.8)]"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="font-mono text-xs text-slate-400 mt-3 font-semibold tracking-wider">
        {progress}% COMPLETED
      </div>
    </div>
  );
}

// ─── INTERACTIVE PARTICLE CANVAS CONSTELLATION MESH ────────────────────────────
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = -1000;
    let mouseY = -1000;

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      baseAlpha: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.4;
        this.vy = (Math.random() - 0.5) * 0.4;
        this.size = Math.random() * 1.8 + 0.6;
        this.alpha = Math.random() * 0.45 + 0.15;
        this.baseAlpha = this.alpha;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const force = (130 - dist) / 130;
          this.x -= dx * force * 0.04;
          this.y -= dy * force * 0.04;
          this.alpha = Math.min(0.9, this.baseAlpha + force * 0.5);
        } else {
          this.alpha = this.baseAlpha;
        }

        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(6, 182, 212, ${this.alpha})`;
        ctx.fill();
      }
    }

    const count = Math.min(110, Math.floor((width * height) / 12000));
    const particles: Particle[] = Array.from({ length: count }, () => new Particle());

    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${(1 - dist / 110) * 0.16})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawConnections();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-70"
    />
  );
}

// ─── CUSTOM CURSOR ─────────────────────────────────────────────────────────────
function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current && dotRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.25,
          ease: 'power2.out',
        });
        gsap.to(dotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.08,
        });
      }
    };

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, textarea, select, [role="button"]')) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHoverStart);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHoverStart);
    };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none fixed inset-0 z-[9999]">
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 pointer-events-none ${
          isHovered
            ? 'w-12 h-12 border-cyan-400 bg-cyan-400/10 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-110'
            : 'w-8 h-8 border-cyan-500/40 bg-cyan-500/5 shadow-[0_0_15px_rgba(6,182,212,0.2)]'
        }`}
      />
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-200 pointer-events-none ${
          isHovered ? 'w-3 h-3 bg-cyan-300 shadow-[0_0_12px_rgba(6,182,212,1)]' : 'w-2 h-2 bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]'
        }`}
      />
    </div>
  );
}

// ─── DYNAMIC CHARACTER TYPEWRITER ANIMATION ────────────────────────────────────
function TypewriterText() {
  const titles = [
    "Data Engineer | ETL/ELT Pipeline Architect",
    "BigQuery Query Performance & Tuning Specialist",
    "Cloud Composer (Airflow) DAG Developer",
    "Google Cloud Discovery Engine & AI Search Architect",
    "PySpark & Metadata-Driven Pipeline Engineer"
  ];

  const [tIdx, setTIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[tIdx];

    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentTitle.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
        }, 80);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2200);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentTitle.slice(0, displayedText.length - 1));
        }, 40);
      } else {
        setIsDeleting(false);
        setTIdx((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, tIdx]);

  return (
    <div className="h-12 mb-8 flex items-center gap-3 text-base sm:text-2xl font-mono text-slate-300">
      <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 shrink-0 animate-pulse" />
      <span className="text-cyan-400 font-semibold border-r-2 border-cyan-400 pr-1 animate-pulse tracking-wide truncate">
        {displayedText}
      </span>
    </div>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ scrolled, activeNav }: { scrolled: boolean; activeNav: string }) {
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
        <div className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/80 backdrop-blur-md">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                activeNav === item.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25 scale-105'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Desktop Resume Download Button */}
        <a
          href="/Satyanarayana_Reddy_Kolagatla_Data_Engineer.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all duration-300 shadow-lg shadow-cyan-500/10 hover:shadow-cyan-500/30 group"
        >
          <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
          <span>Resume CV</span>
        </a>

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          className="md:hidden p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 text-cyan-400 hover:bg-slate-800 transition-colors shadow-lg shadow-cyan-500/10"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed top-[72px] left-4 right-4 z-50 glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-2xl backdrop-blur-2xl bg-slate-950/95 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
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
          <div className="pt-4 border-t border-slate-800/80">
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

// ─── HERO SECTION ─────────────────────────────────────────────────────────────
function Hero() {
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
        { opacity: 1, y: 0, duration: 0.9, delay: 0.3, ease: 'power3.out' }
      );
      gsap.fromTo(
        '.hero-desc',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.6 }
      );
      gsap.fromTo(
        '.hero-buttons',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.8 }
      );
      gsap.fromTo(
        '.hero-stats',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, delay: 1.0, stagger: 0.15 }
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
        <h1 className="hero-title text-3xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white mb-6 leading-[1.15]">
          Architecting Enterprise <br className="hidden sm:inline" />
          <span className="text-gradient-cyan">BigQuery Pipelines</span> & <span className="text-gradient-violet">AI Search Systems</span>
        </h1>

        {/* Character Typewriter Rotator */}
        <TypewriterText />

        {/* Short Statement */}
        <p className="hero-desc text-slate-400 text-base sm:text-xl max-w-3xl mb-12 leading-relaxed font-normal">
          Specialized in building high-performance, configuration-driven ETL/ELT pipelines, enterprise ODS architectures, BigQuery cost/speed tuning, and AI-powered enterprise search platforms on Google Cloud Platform.
        </p>

        {/* Action Buttons */}
        <div className="hero-buttons flex flex-wrap items-center gap-4 mb-16">
          <a
            href="#experience"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm tracking-wide shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Explore Experience & Projects</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="/Satyanarayana_Reddy_Kolagatla_Data_Engineer.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-xl glass-panel glass-panel-hover text-white font-semibold text-sm tracking-wide flex items-center justify-center gap-2 group"
          >
            <Download className="w-4 h-4 text-cyan-400 group-hover:-translate-y-0.5 transition-transform" />
            <span>Download Resume PDF</span>
          </a>
        </div>

        {/* Stats Highlight Grid */}
        <div className="hero-stats grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-slate-800/80">
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-800/80 glass-panel-hover group">
            <div className="text-2xl sm:text-4xl font-extrabold text-cyan-400 mb-1 font-mono group-hover:scale-105 transition-transform">85%</div>
            <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">BigQuery Query Boost</div>
          </div>
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-800/80 glass-panel-hover group">
            <div className="text-2xl sm:text-4xl font-extrabold text-emerald-400 mb-1 font-mono group-hover:scale-105 transition-transform">99.9%</div>
            <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">Bytes Processed Cut</div>
          </div>
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-800/80 glass-panel-hover group">
            <div className="text-2xl sm:text-4xl font-extrabold text-indigo-400 mb-1 font-mono group-hover:scale-105 transition-transform">600+</div>
            <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">ETL Pipelines Rebuilt</div>
          </div>
          <div className="glass-panel p-5 sm:p-6 rounded-2xl border-slate-800/80 glass-panel-hover group">
            <div className="text-2xl sm:text-4xl font-extrabold text-amber-400 mb-1 font-mono group-hover:scale-105 transition-transform">2+ Yrs</div>
            <div className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider">GCP Data Engineering</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT SECTION ─────────────────────────────────────────────────────────────
function About() {
  const pillars = [
    {
      icon: <Database className="w-6 h-6 text-cyan-400" />,
      title: "Enterprise ODS & Data Layers",
      desc: "Architecting structured Landing, Raw, Staging, and Curated layers with automated Dataplex data quality validation and governance."
    },
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: "BigQuery Performance Tuning",
      desc: "Optimizing queries via partitioning, clustering, materialized views, and SQL tuning to yield up to 85% execution speedups and 99.9% cost reductions."
    },
    {
      icon: <Search className="w-6 h-6 text-indigo-400" />,
      title: "AI Search & Discovery Engine",
      desc: "Integrating BigQuery with Google Cloud Discovery Engine to enable AI-powered enterprise search across telecom catalog structures."
    },
    {
      icon: <Layers className="w-6 h-6 text-emerald-400" />,
      title: "Config-Driven Pipelines",
      desc: "Building metadata-driven Python transformation frameworks to normalize complex JSON structures into scalable, reusable loading utilities."
    }
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">About My Expertise</h2>
          </div>
          <p className="text-slate-400 max-w-xl text-base leading-relaxed">
            I am a Data Engineer with hands-on experience designing and operating enterprise-scale data platforms on Google Cloud Platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Bio Card */}
          <div className="reveal-left lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl border-slate-800/80 flex flex-col justify-between glass-panel-hover">
            <div className="space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p>
                At <strong className="text-white font-semibold">FISClouds Pvt. Ltd.</strong>, I spearhead data engineering initiatives for tier-1 Banking and Telecom clients. My core focus centers on transforming massive, heterogeneous, on-premises data sources (Oracle, PostgreSQL, MySQL, SQL Server) into unified, query-optimized Google BigQuery enterprise data warehouses.
              </p>
              <p>
                Whether orchestrating mission-critical DAGs with <strong className="text-cyan-300 font-semibold">Cloud Composer (Apache Airflow)</strong>, ingesting data seamlessly via <strong className="text-cyan-300 font-semibold">Cloud Data Fusion</strong>, or standardizing nested JSON telecom catalogs for AI search indexing using <strong className="text-indigo-300 font-semibold">Discovery Engine</strong>, I prioritize reliability, zero data loss, and maximum performance.
              </p>
              <p>
                Holding the <strong className="text-emerald-400 font-semibold">Google Cloud Certified Professional Data Engineer</strong> credential and Microsoft Azure AI Fundamentals, I bridge raw operational complexity with business intelligence dashboarding in Tableau, Looker Studio, and Power BI.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-800 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Based in Hyderabad, India
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <Briefcase className="w-3.5 h-3.5 text-emerald-400 shrink-0" /> FISClouds Pvt. Ltd.
              </span>
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" /> GCP Certified PDE
              </span>
            </div>
          </div>

          {/* Pillars Grid */}
          <div className="reveal-right lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {pillars.map((pillar, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-2xl glass-panel-hover flex flex-col justify-between group">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <h3 className="font-bold text-white text-base mb-2 group-hover:text-cyan-300 transition-colors">{pillar.title}</h3>
                  <p className="text-slate-400 text-xs leading-relaxed">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── TECHNICAL SKILLS SECTION ─────────────────────────────────────────────────
function Skills() {
  const skillCategories = [
    {
      id: "cloud",
      name: "Cloud (GCP)",
      icon: <Cloud className="w-5 h-5 text-cyan-400" />,
      skills: [
        { name: "BigQuery", level: "Expert", desc: "Partitioning, Clustering, SQL Tuning" },
        { name: "Cloud Composer (Airflow)", level: "Advanced", desc: "Custom Python DAG Orchestration" },
        { name: "Cloud Storage (GCS)", level: "Expert", desc: "Multi-tier Bucket Staging" },
        { name: "Cloud Data Fusion", level: "Advanced", desc: "ETL Ingestion Pipelines" },
        { name: "Cloud KMS", level: "Advanced", desc: "Secret & Encryption Management" },
        { name: "Dataproc", level: "Advanced", desc: "Managed Spark/Hadoop Clusters" },
        { name: "Dataflow", level: "Advanced", desc: "Apache Beam Streaming/Batch" },
        { name: "Pub/Sub", level: "Advanced", desc: "Real-time Messaging Ingestion" },
        { name: "Dataplex", level: "Advanced", desc: "Data Governance & Quality" },
        { name: "Cloud Build", level: "Intermediate", desc: "Automated CI/CD Pipelines" },
        { name: "Cloud Run", level: "Intermediate", desc: "Serverless Containerized Apps" },
        { name: "Cloud Scheduler", level: "Advanced", desc: "Scheduled Job Triggers" },
        { name: "Cloud Monitoring & Logging", level: "Advanced", desc: "Platform Operations Visibility" },
        { name: "Artifact Registry", level: "Intermediate", desc: "Container & Package Registry" },
        { name: "Cloud IAM", level: "Advanced", desc: "Role-based Access Governance" },
        { name: "Discovery Engine", level: "Advanced", desc: "Vertex AI Search Integration" }
      ]
    },
    {
      id: "ai",
      name: "AI Search & Analytics",
      icon: <Search className="w-5 h-5 text-indigo-400" />,
      skills: [
        { name: "Google Cloud Discovery Engine", level: "Advanced", desc: "AI Enterprise Search" },
        { name: "Enterprise Search", level: "Advanced", desc: "Automated Catalog Indexing" },
        { name: "Search Analytics", level: "Advanced", desc: "Search Performance Monitoring" },
        { name: "Catalog Indexing", level: "Advanced", desc: "Document & Schema Sync" },
        { name: "BigQuery Audit Logs", level: "Advanced", desc: "Compliance & Operation Logs" }
      ]
    },
    {
      id: "languages",
      name: "Languages & Databases",
      icon: <Code className="w-5 h-5 text-emerald-400" />,
      skills: [
        { name: "Python", level: "Expert", desc: "Data Structures & ETL Frameworks" },
        { name: "PySpark", level: "Advanced", desc: "Distributed Data Transformation" },
        { name: "SQL", level: "Expert", desc: "Complex Queries & Optimization" },
        { name: "Apache Spark", level: "Advanced", desc: "Large Scale Data Processing" },
        { name: "PostgreSQL", level: "Advanced", desc: "Relational Source Integration" },
        { name: "Oracle", level: "Advanced", desc: "Enterprise Database Ingestion" },
        { name: "MySQL", level: "Advanced", desc: "Database Connector Setup" },
        { name: "SQL Server", level: "Advanced", desc: "On-Prem Source Extraction" }
      ]
    },
    {
      id: "de",
      name: "Data Engineering",
      icon: <Server className="w-5 h-5 text-amber-400" />,
      skills: [
        { name: "ETL / ELT Pipelines", level: "Expert", desc: "End-to-End Pipeline Design" },
        { name: "Data Modeling", level: "Expert", desc: "Star Schema & Data Vault" },
        { name: "Databricks", level: "Advanced", desc: "Lakehouse Processing" },
        { name: "Data Validation", level: "Advanced", desc: "Automated Rule Checks" },
        { name: "Incremental Loading", level: "Expert", desc: "Change Data Capture (CDC)" },
        { name: "Metadata-Driven ETL", level: "Expert", desc: "Dynamic Config Architecture" },
        { name: "Configuration-Driven ETL", level: "Expert", desc: "Python Dynamic Pipeline Generator" },
        { name: "Partitioning & Clustering", level: "Expert", desc: "BigQuery Performance Tuning" },
        { name: "Data Governance", level: "Advanced", desc: "Dataplex Layer Validation" }
      ]
    },
    {
      id: "devops",
      name: "Infrastructure & DevOps",
      icon: <Terminal className="w-5 h-5 text-blue-400" />,
      skills: [
        { name: "Bitbucket", level: "Advanced", desc: "Source Version Control" },
        { name: "Git", level: "Advanced", desc: "Repository Workflow & Branching" },
        { name: "Docker", level: "Advanced", desc: "Containerized Execution" },
        { name: "CI / CD", level: "Advanced", desc: "Cloud Build & Pipeline Automation" },
        { name: "Linux", level: "Advanced", desc: "Shell Scripting & Server Admin" }
      ]
    },
    {
      id: "bi",
      name: "BI & Analytics",
      icon: <BarChart3 className="w-5 h-5 text-purple-400" />,
      skills: [
        { name: "Looker Studio", level: "Advanced", desc: "Interactive Operational Dashboards" },
        { name: "Tableau", level: "Advanced", desc: "ETL & DAG Monitoring Visualizations" },
        { name: "Power BI", level: "Advanced", desc: "Business Intelligence Reporting" }
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState("cloud");

  // Recalculate GSAP ScrollTrigger whenever activeTab changes so section positions update
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <section id="skills" className="py-24 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Technical Capabilities</h2>
          </div>
          <p className="text-slate-400 max-w-lg text-base">
            Categorized technical stack based on enterprise deployments, certifications, and daily pipeline operations.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="reveal flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-800 scrollbar-none">
          {skillCategories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                activeTab === cat.id
                  ? 'bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 shadow-lg shadow-cyan-500/10 scale-105'
                  : 'glass-panel text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
              <span className="ml-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-900 text-slate-400">
                {cat.skills.length}
              </span>
            </button>
          ))}
        </div>

        {/* Equalized Uniform Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillCategories.find(c => c.id === activeTab)?.skills.map((skill, idx) => (
            <div
              key={`${activeTab}-${idx}`}
              className="glass-panel p-5 rounded-2xl glass-panel-hover flex flex-col justify-between h-[145px] group transition-all duration-300 animate-in fade-in zoom-in-95"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-cyan-300 transition-colors leading-tight">
                    {skill.name}
                  </h3>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md shrink-0 ${
                    skill.level === 'Expert' 
                      ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30'
                      : 'bg-indigo-500/15 text-indigo-300 border border-indigo-500/30'
                  }`}>
                    {skill.level}
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2">{skill.desc}</p>
              </div>
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-500">
                <span>Verified Skill</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-500/70" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── WORK EXPERIENCE SECTION ──────────────────────────────────────────────────
function Experience() {
  const experiences = [
    {
      company: "FISClouds Pvt. Ltd.",
      role: "Data Engineer",
      period: "Nov 2024 – July 2026",
      location: "Hyderabad, India",
      projects: [
        {
          title: "Enterprise ODS & Secure ETL Optimization",
          client: "Banking Client – Financial Sector",
          timeline: "May 2025 – July 2026",
          badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
          highlights: [
            "Designed & implemented enterprise ODS ETL/ELT pipelines to integrate banking data into BigQuery using Cloud Data Fusion & Cloud Composer.",
            "Built Landing, Raw, Staging, and Curated data layers with Dataplex-based governance and automated data quality validation.",
            "Optimized BigQuery storage & query performance using partitioning, clustering, and SQL tuning, improving query execution by 85% and reducing bytes processed by up to 99.9%.",
            "Developed Tableau dashboards for ETL monitoring, Airflow DAG execution, and operational reporting, providing real-time platform visibility.",
            "Utilized Cloud Data Fusion to connect on-premises servers with diverse databases (Oracle, MySQL, SQL Server, PostgreSQL) to ingest data into BigQuery."
          ],
          tech: ["BigQuery", "Cloud Composer", "Cloud Data Fusion", "Dataplex", "Partitioning & Clustering", "Tableau", "Oracle", "PostgreSQL", "SQL Server"]
        },
        {
          title: "AI-Powered Enterprise Search & Catalog Data Platform",
          client: "Telecom Client",
          timeline: "Nov 2024 – April 2025",
          badgeColor: "bg-indigo-500/10 text-indigo-300 border-indigo-500/30",
          highlights: [
            "Designed & developed a configuration-driven ETL framework using Python to ingest, transform, and standardize telecom catalog data from multiple sources into BigQuery through scalable, reusable pipelines.",
            "Built metadata-driven Python transformation pipelines to normalize complex JSON data, implement business validation rules, and process nested structures while ensuring schema consistency across multiple catalog formats.",
            "Engineered BigQuery ingestion pipelines integrated with Cloud Storage, automated data refresh processes, and reusable loading utilities to support scalable, configuration-based data processing.",
            "Integrated BigQuery with Google Cloud Discovery Engine to enable AI-powered enterprise search through automated catalog indexing, synchronization, and reusable Python-based document ingestion.",
            "Developed BigQuery SQL analytics to monitor search performance and implemented telecom-specific transformation rules for prepaid, postpaid, broadband, roaming, and rewards catalogs."
          ],
          tech: ["BigQuery", "Google Cloud Discovery Engine", "Python ETL", "Metadata-Driven Architecture", "Cloud Storage", "Enterprise Search", "SQL Analytics"]
        }
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Work Experience</h2>
          </div>
          <p className="text-slate-400 max-w-lg text-base">
            Detailed breakdown of enterprise project deployments, data pipeline achievements, and platform architecture contributions.
          </p>
        </div>

        {experiences.map((exp, idx) => (
          <div key={idx} className="space-y-8">
            {/* Header Card */}
            <div className="reveal glass-panel p-6 sm:p-8 rounded-3xl border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 glass-panel-hover">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-1">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">{exp.company}</h3>
                  <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                    {exp.role}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> {exp.location}</span>
                </div>
              </div>
              <div className="text-xs sm:text-sm font-mono font-semibold text-cyan-400 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800 self-start sm:self-auto">
                {exp.period}
              </div>
            </div>

            {/* Project Deep-dives */}
            <div className="space-y-6">
              {exp.projects.map((proj, pIdx) => (
                <div key={pIdx} className="reveal-left glass-panel p-6 sm:p-10 rounded-3xl border-slate-800/80 glass-panel-hover">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                    <div>
                      <span className={`text-xs font-mono font-semibold px-3 py-1 rounded-md border inline-block mb-3 ${proj.badgeColor}`}>
                        {proj.client}
                      </span>
                      <h4 className="text-lg sm:text-2xl font-bold text-white">{proj.title}</h4>
                    </div>
                    <span className="text-xs font-mono text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-lg border border-slate-800 self-start lg:self-auto">
                      {proj.timeline}
                    </span>
                  </div>

                  {/* Highlights List */}
                  <ul className="space-y-4 mb-8 text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {proj.highlights.map((point, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 mt-0.5">
                          <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />
                        </div>
                        <span>
                          {point.split(/(85%|99\.9%|Cloud Data Fusion|Cloud Composer|Dataplex|BigQuery|Discovery Engine|Python|Tableau)/g).map((chunk, cIdx) => (
                            ['85%', '99.9%'].includes(chunk) ? (
                              <strong key={cIdx} className="text-emerald-400 font-extrabold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">{chunk}</strong>
                            ) : ['Cloud Data Fusion', 'Cloud Composer', 'Dataplex', 'BigQuery', 'Discovery Engine', 'Python', 'Tableau'].includes(chunk) ? (
                              <strong key={cIdx} className="text-white font-semibold">{chunk}</strong>
                            ) : (
                              chunk
                            )
                          ))}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Tags */}
                  <div className="pt-6 border-t border-slate-800/80 flex flex-wrap gap-2">
                    {proj.tech.map((t, tIdx) => (
                      <span key={tIdx} className="text-[11px] font-mono text-slate-300 bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 hover:border-cyan-500/40 transition-colors">
                        #{t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────
function Projects() {
  const projectsData = [
    {
      title: "Enterprise Banking ODS & Secure ETL Optimization",
      category: "Data Engineering",
      client: "Banking Client",
      desc: "Re-engineered 600+ ETL pipelines connecting multi-tier banking data sources (Oracle, Postgres, SQL Server) to BigQuery using Data Fusion & Airflow. Built Landing to Curated layers with Dataplex quality validation.",
      metrics: "85% Speedup | 99.9% Data Byte Cut",
      tags: ["BigQuery", "Data Fusion", "Airflow", "Dataplex", "Tableau", "SQL Tuning"],
      featured: true
    },
    {
      title: "AI-Powered Enterprise Search & Telecom Catalog Platform",
      category: "AI & Search",
      client: "Telecom Client",
      desc: "Python configuration-driven ETL framework standardizing complex JSON telecom catalogs. Integrated with Google Cloud Discovery Engine for AI-driven enterprise search indexing and query analytics.",
      metrics: "AI Catalog Indexing | Dynamic JSON ETL",
      tags: ["Google Cloud Discovery Engine", "Python", "BigQuery", "GCS", "Search Analytics"],
      featured: true
    },
    {
      title: "Highway Traffic Heatmap Analytics Platform",
      category: "GCP Cloud",
      client: "Cloud Initiative",
      desc: "Real-time traffic monitoring solution deployed on GCP Cloud Run. Ingests high-velocity camera sensor data into BigQuery to stream dynamic congestion heatmaps and alert dispatchers.",
      metrics: "Serverless Cloud Run | Live BigQuery Ingestion",
      tags: ["BigQuery", "Cloud Run", "Python APIs", "Real-time Analytics"],
      featured: false
    },
    {
      title: "SkillPilot AI Assessment Platform",
      category: "Full Stack AI",
      client: "Product",
      desc: "Full-stack AI assessment suite featuring a Monaco-powered browser IDE, AI feedback loops, JWT authentication, and real-time execution sandboxing built with React and Node.js.",
      metrics: "Monaco IDE | OpenAI Orchestration",
      tags: ["React", "Node.js", "Express", "MongoDB", "OpenAI API"],
      featured: false
    },
    {
      title: "Embedded Stress Analysis Hardware Device",
      category: "Hardware / IoT",
      client: "Engineering Project",
      desc: "Hardware & software embedded system utilizing Arduino Uno and PPG optical heartbeat sensors to compute real-time HRV (Heart Rate Variability) and calculate stress indices via embedded C.",
      metrics: "Sensor Processing | HRV Algorithmic Model",
      tags: ["Arduino Uno", "Embedded C", "Pulse Sensor", "HRV Analytics"],
      featured: false
    }
  ];

  const [filter, setFilter] = useState("All");
  const categories = ["All", "Data Engineering", "AI & Search", "GCP Cloud", "Full Stack AI"];

  // Recalculate GSAP ScrollTrigger whenever filter changes
  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [filter]);

  const filteredProjects = filter === "All"
    ? projectsData
    : projectsData.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Key Initiatives</h2>
          </div>
          
          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  filter === cat
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 scale-105'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((proj, idx) => (
            <div
              key={`${filter}-${idx}`}
              className={`glass-panel p-6 sm:p-8 rounded-3xl border-slate-800/80 glass-panel-hover flex flex-col justify-between relative group transition-all duration-300 animate-in fade-in zoom-in-95 ${
                proj.featured ? 'md:col-span-2 lg:col-span-1 border-cyan-500/30' : ''
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-wider font-semibold px-2.5 py-1 rounded-md bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                    {proj.category}
                  </span>
                  {proj.featured && (
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 animate-pulse">
                      Featured
                    </span>
                  )}
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {proj.title}
                </h3>

                <div className="text-xs font-mono text-emerald-400 mb-4 bg-emerald-500/5 px-3 py-1.5 rounded-lg border border-emerald-500/20 inline-block font-semibold">
                  ⚡ {proj.metrics}
                </div>

                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                  {proj.desc}
                </p>
              </div>

              <div>
                <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                  {proj.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 hover:border-cyan-500/40 transition-colors">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CERTIFICATIONS & ACHIEVEMENTS ─────────────────────────────────────────────
function Certifications() {
  const certs = [
    {
      title: "Google Cloud Certified: Professional Data Engineer",
      issuer: "Google Cloud",
      status: "Certified",
      icon: <Cloud className="w-8 h-8 text-cyan-400" />,
      color: "border-cyan-500/40 bg-cyan-500/5",
      desc: "Validated proficiency in designing, building, securing, and operating machine learning and data processing systems on GCP."
    },
    {
      title: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft Azure",
      status: "Certified",
      icon: <Cpu className="w-8 h-8 text-indigo-400" />,
      color: "border-indigo-500/40 bg-indigo-500/5",
      desc: "Demonstrates foundational knowledge of machine learning and artificial intelligence concepts on Microsoft Azure."
    },
    {
      title: "LeetCode Algorithmic Problem Solving",
      issuer: "LeetCode",
      status: "250+ Solved",
      icon: <Code className="w-8 h-8 text-amber-400" />,
      color: "border-amber-500/40 bg-amber-500/5",
      desc: "Solved 250+ algorithmic challenges focusing on dynamic programming, graph traversal, data structures, and optimized queries."
    },
    {
      title: "HackerRank 6-Star Python Badge",
      issuer: "HackerRank",
      status: "6-Star Gold",
      icon: <Star className="w-8 h-8 text-emerald-400" />,
      color: "border-emerald-500/40 bg-emerald-500/5",
      desc: "Achieved maximum 6-star gold rank in Python programming proficiency, object-oriented design, and functional scripting."
    },
    {
      title: "FISClouds On-The-Spot Award",
      issuer: "FISClouds Pvt. Ltd.",
      status: "Recognition",
      icon: <Award className="w-8 h-8 text-purple-400" />,
      color: "border-purple-500/40 bg-purple-500/5",
      desc: "Received prestigious On-the-Spot Recognition award for delivering critical enterprise data pipeline milestones ahead of schedule."
    }
  ];

  return (
    <section id="certifications" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Certifications & Awards</h2>
          </div>
          <p className="text-slate-400 max-w-md text-base">
            Industry-recognized credentials verifying cloud architecture, AI fundamentals, and algorithmic problem-solving excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certs.map((cert, idx) => (
            <div key={idx} className={`reveal glass-panel p-6 sm:p-8 rounded-3xl border glass-panel-hover flex flex-col justify-between group ${cert.color}`}>
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    {cert.icon}
                  </div>
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-900 text-white border border-slate-700">
                    {cert.status}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{cert.title}</h3>
                <span className="text-xs font-mono text-cyan-400 font-semibold block mb-4">{cert.issuer}</span>
                <p className="text-slate-400 text-xs leading-relaxed">{cert.desc}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Verified Credentials</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── EDUCATION SECTION ────────────────────────────────────────────────────────
function Education() {
  return (
    <section id="education" className="py-24 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Educational Background</h2>
          </div>
        </div>

        <div className="reveal glass-panel p-6 sm:p-12 rounded-3xl border-slate-800/80 max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8 glass-panel-hover group">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 border border-cyan-500/30 flex items-center justify-center shrink-0 shadow-xl shadow-cyan-500/10 group-hover:scale-110 transition-transform">
            <GraduationCap className="w-12 h-12 text-cyan-400" />
          </div>

          <div className="text-center md:text-left space-y-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider font-semibold block mb-1">Bachelor of Technology (B.Tech)</span>
              <h3 className="text-xl sm:text-3xl font-extrabold text-white">Electronics and Communication Engineering</h3>
            </div>

            <p className="text-sm sm:text-base text-slate-300 font-semibold">
              KKR & KSR Institute of Technology and Sciences, Guntur
            </p>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-mono text-slate-400 pt-2">
              <span className="bg-emerald-500/15 text-emerald-300 font-bold px-3 py-1 rounded-lg border border-emerald-500/30">
                GPA: 8.5 / 10
              </span>
              <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800">
                June 2020 – May 2024
              </span>
              <span className="bg-slate-900 px-3 py-1 rounded-lg border border-slate-800 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Guntur, India
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT SECTION ──────────────────────────────────────────────────────────
function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('idle');

    try {
      const formData = new FormData(e.currentTarget);
      const res = await fetch('https://formsubmit.co/ajax/satyanarayanareddykolagatla@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus('idle'), 6000);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Initiate Transmission</h2>
          </div>
          <p className="text-slate-400 max-w-md text-base">
            Open to discussing GCP data architecture engagements, BigQuery optimization projects, or senior engineering roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details */}
          <div className="reveal-left lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800/80 space-y-6">
              <a
                href="mailto:satyanarayanareddykolagatla@gmail.com"
                className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Email Address</div>
                  <div className="text-white text-xs sm:text-sm font-mono truncate font-medium group-hover:text-cyan-300 transition-colors">
                    satyanarayanareddykolagatla@gmail.com
                  </div>
                </div>
              </a>

              <a
                href="tel:+918639822170"
                className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Direct Phone</div>
                  <div className="text-white text-base font-mono font-medium group-hover:text-emerald-300 transition-colors">
                    +91 8639822170
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Location</div>
                  <div className="text-white text-base font-mono font-medium">
                    Hyderabad, India
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 font-semibold">Resume Document</span>
              <a
                href="/Satyanarayana_Reddy_Kolagatla_Data_Engineer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="reveal-right lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl border-slate-800/80">
            <form
              action="https://formsubmit.co/Satyanarayanareddykolagatla@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@enterprise.com"
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Subject</label>
                <input
                  type="text"
                  name="_subject"
                  required
                  placeholder="Data Engineering Project Inquiry"
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Message Payload</label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  placeholder="Describe your data pipeline requirements or engagement opportunity..."
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 resize-none font-mono"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-sm tracking-wider uppercase shadow-xl transition-all flex items-center justify-center gap-2 ${
                  formStatus === 'success'
                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                    : formStatus === 'error'
                    ? 'bg-rose-500 text-white shadow-rose-500/20'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.01]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Transmitting Data...</span>
                  </>
                ) : formStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Message Transmitted Successfully! ✓</span>
                  </>
                ) : formStatus === 'error' ? (
                  <span>Transmission Error! Direct Email: Satyanarayanareddykolagatla@gmail.com</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="py-12 border-t border-slate-800/80 bg-slate-950 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <div className="font-bold text-white text-base">Satyanarayana Reddy Kolagatla</div>
          <div className="text-xs font-mono text-slate-400 mt-1">Google Cloud Certified Professional Data Engineer</div>
        </div>

        <div className="text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} Satyanarayana Reddy Kolagatla. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// ─── BACK TO TOP BUTTON ───────────────────────────────────────────────────────
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={`fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl glass-panel text-cyan-400 flex items-center justify-center transition-all duration-300 hover:bg-cyan-500 hover:text-slate-950 shadow-xl shadow-cyan-500/10 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
}
