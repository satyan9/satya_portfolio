import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Loader } from './components/Loader';
import { CustomCursor } from './components/CustomCursor';
import { ParticleCanvas } from './components/ParticleCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { BackToTop } from './components/BackToTop';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loading, setLoading] = useState(true);
  const [activeNav, setActiveNav] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  // Initial scroll position
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Track active section and scroll state
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

  // Global GSAP Scroll Reveals (run after preloader completes)
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

      {/* Navigation Header */}
      <Navbar scrolled={scrolled} activeNav={activeNav} />

      {/* Main Content Sections */}
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

      {/* Footer & Floating Controls */}
      <Footer />
      <BackToTop />
    </div>
  );
}
