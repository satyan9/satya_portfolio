import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Terminal, Database, MapPin, Mail, Phone, ExternalLink, Download, 
  ChevronUp, Server, BarChart, Code2, GraduationCap, Award, Star, CloudSnow, Clock, Send
} from 'lucide-react';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll animations global setup
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Delay initialization so DOM completes
      setTimeout(() => {
        gsap.utils.toArray('.reveal').forEach((elem: any) => {
          gsap.fromTo(elem, 
            { y: 50, opacity: 0 }, 
            {
              y: 0, opacity: 1, duration: 1, ease: "power3.out",
              scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play none none reverse"
              }
            }
          );
        });
      }, 100);

    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="bg-[#050A0F] text-white min-h-screen relative font-mono overflow-x-hidden selection:bg-[#00E5FF] selection:text-[#050A0F]">
      <CustomCursor />
      <Navbar />
      <main>
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

function Loader() {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050A0F]">
      <div className="loader-icon mb-4 text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.8)]">
        <Database size={64} className="animate-pulse" />
      </div>
      <h2 className="font-syne text-2xl font-bold tracking-[0.3em] text-white mt-4 animate-bounce">
        PIPELINE STARTING...
      </h2>
    </div>
  );
}

function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.1 });
      gsap.to(trailRef.current, { x: e.clientX, y: e.clientY, duration: 0.5 });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div className="hidden lg:block">
      <div 
        ref={trailRef} 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-[#00E5FF]/40 pointer-events-none z-[999] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(0,229,255,0.2)]" 
      />
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#00E5FF] pointer-events-none z-[1000] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(0,229,255,0.8)]" 
      />
    </div>
  );
}

function Navbar() {
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const sections = ['about', 'skills', 'experience', 'projects', 'contact'];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      let current = 'hero';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 200) {
          current = section;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b",
      scrolled ? "bg-[#050A0F]/80 backdrop-blur-md border-white/10 py-4" : "bg-transparent border-transparent py-6"
    )}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#hero" className="font-syne text-xl font-bold tracking-wider text-white flex items-center gap-2 hover:text-[#00E5FF] transition-colors">
          <Terminal size={24} className="text-[#00E5FF]" /> SRK
        </a>
        <div className="hidden md:flex space-x-8">
          {sections.map(sec => (
            <a 
              key={sec} 
              href={`#${sec}`} 
              className={cn(
                "uppercase tracking-widest text-xs font-semibold transition-all hover:text-[#00E5FF] hover:drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]",
                active === sec ? "text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]" : "text-gray-400"
              )}
            >
              {sec}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titles = ["Data Engineer", "ETL Developer", "Cloud Architect"];
  const [titleIdx, setTitleIdx] = useState(0);

  useEffect(() => {
    // Particle background basic implementation using GSAP / DOM elements
    const ctx = gsap.context(() => {
       gsap.to(".glitch-text", {
         x: () => Math.random() * 4 - 2,
         y: () => Math.random() * 4 - 2,
         opacity: () => Math.random() * 0.5 + 0.5,
         duration: 0.1,
         repeat: -1,
         yoyo: true,
         delay: Math.random() * 2
       });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIdx((prev) => (prev + 1) % titles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-grid-pattern group">
      {/* Background glowing effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[40rem] h-[40rem] bg-[#00E5FF]/5 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#FFB700]/5 rounded-full blur-[100px] pointer-events-none mix-blend-screen" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto flex flex-col items-center">
        <h1 className="font-syne text-4xl md:text-7xl lg:text-8xl font-black text-white mb-6 tracking-tight relative glitch-text">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">SATYANARAYANA REDDY</span>
          <span className="block text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.5)]">KOLAGATLA</span>
        </h1>
        
        <div className="h-12 mb-8 flex items-center justify-center gap-3 text-xl md:text-3xl font-medium text-gray-300">
          <Terminal className="text-[#00E5FF] w-6 h-6 md:w-8 md:h-8 animate-pulse" />
          <span className="typing-text border-r-4 border-[#00E5FF] pr-2 animate-pulse transition-all duration-300">
            {titles[titleIdx]}
          </span>
        </div>

        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mb-12 italic tracking-wide">
          "Turning raw data into real-world decisions."
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full sm:w-auto">
          <a href="#contact" className="group relative px-8 py-4 bg-[#00E5FF]/10 border border-[#00E5FF] text-[#00E5FF] font-bold tracking-widest uppercase overflow-hidden transition-all hover:bg-[#00E5FF] hover:text-[#050A0F] hover:shadow-[0_0_30px_rgba(0,229,255,0.4)]">
            <span className="relative z-10 flex items-center gap-2">
              <Download size={18} /> Download Resume
            </span>
            <div className="absolute inset-0 h-full w-full bg-[#00E5FF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
          </a>
          <a href="#projects" className="px-8 py-4 border border-white/20 text-white font-bold tracking-widest uppercase hover:bg-white/5 hover:border-white/50 transition-all flex items-center justify-center gap-2">
            View My Work <ChevronUp className="rotate-180" size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-32 relative bg-grid-pattern relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-syne text-3xl md:text-5xl font-bold mb-16 text-white flex items-center gap-4 reveal">
          <span className="text-[#00E5FF]">/</span> ABOUT_ME
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00E5FF]/50 to-transparent ml-4" />
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-gray-300 space-y-6 text-lg leading-relaxed reveal">
            <p>
              I am a results-driven Data Engineer with over 2 years of experience specializing in crafting robust, scalable, and ultra-efficient data architectures. 
            </p>
            <p>
              Armed with a strong foundation in Cloud Platforms and advanced ETL paradigms, I specialize in navigating complex data landscapes to deliver actionable insights that power enterprise success.
            </p>
            <p>
              My passion lies in connecting the dots between unstructured chaos and intelligent, streamlined pipelines. Whether it's spinning up massive BigQuery datasets, orchestrating complex DAGs in Airflow, or automating deployments via Terraform.
            </p>
          </div>

          <div className="bg-[#050A0F] border border-white/10 p-8 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] relative group reveal overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFB700]/10 blur-[50px] rounded-full group-hover:bg-[#FFB700]/20 transition-all" />
            
            <h3 className="text-[#FFB700] font-syne text-xl font-bold mb-8 flex items-center gap-3">
              <BarChart /> OPERATIONAL STATS
            </h3>
            
            <div className="grid grid-cols-2 gap-8">
              <div>
                <div className="text-4xl font-black text-white mb-2 group-hover:text-[#00E5FF] transition-colors">2+</div>
                <div className="text-sm tracking-wider text-gray-400 uppercase">Years Experience</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-2 group-hover:text-[#00E5FF] transition-colors">600+</div>
                <div className="text-sm tracking-wider text-gray-400 uppercase">Pipelines Rebuilt</div>
              </div>
              <div>
                <div className="text-4xl font-black text-white mb-2 group-hover:text-[#00E5FF] transition-colors">99.9%</div>
                <div className="text-sm tracking-wider text-gray-400 uppercase">Uptime Achieved</div>
              </div>
              <div>
                <div className="text-xl font-black text-white mb-2 mt-2 flex items-center gap-2 group-hover:text-[#00E5FF] transition-colors">
                  <CloudSnow size={28} className="text-[#FFB700]" /> GCP
                </div>
                <div className="text-sm tracking-wider text-gray-400 uppercase">Certified Expert</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const skillsData = [
  { icon: <CloudSnow />, title: "☁️ Cloud", items: ["BigQuery", "Cloud Storage", "Composer", "Data Fusion", "Dataflow", "Dataproc", "Dataplex", "GCS", "Terraform"] },
  { icon: <Server />, title: "🔧 Engineering", items: ["ETL/ELT", "PySpark", "Data Modelling", "Star Schema", "Data Governance"] },
  { icon: <Code2 />, title: "💻 Languages", items: ["Python", "FastAPI", "SQL", "PL/SQL", "Java"] },
  { icon: <BarChart />, title: "📊 BI & Analytics", items: ["Looker Studio", "Tableau", "BigQuery BI Engine", "Materialized Views"] },
  { icon: <Terminal />, title: "🛠️ DevOps/Tools", items: ["Bitbucket", "GitLab", "CI/CD", "Cloud Build", "Cloud KMS"] }
];

function Skills() {
  return (
    <section id="skills" className="py-32 bg-[#050A0F] relative">
      <div className="absolute left-0 top-1/4 w-[20rem] h-[20rem] bg-[#00E5FF]/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <h2 className="font-syne text-3xl md:text-5xl font-bold mb-16 text-white flex items-center gap-4 reveal">
          <span className="text-[#00E5FF]">/</span> CORE_COMPETENCIES
          <div className="h-[1px] flex-1 bg-gradient-to-r from-[#00E5FF]/50 to-transparent ml-4" />
        </h2>

        <div className="space-y-12">
          {skillsData.map((category, idx) => (
            <div key={idx} className="reveal">
              <h3 className="text-xl font-bold text-gray-200 mb-6 flex items-center gap-3">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.items.map((skill, i) => (
                  <span 
                    key={i} 
                    className="skill-chip px-5 py-2.5 bg-white/5 border border-white/10 rounded-sm text-sm text-gray-300 
                               transition-all duration-300 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] hover:border-[#00E5FF]/50 hover:shadow-[0_0_15px_rgba(0,229,255,0.4)] cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const experienceData = [
  {
    role: "Data Engineer",
    company: "FARIZ INFO SOLUTIONS PVT. LTD",
    date: "Nov 2024 – Present",
    desc: [
      "Architected high-velocity ODS pipelines using Cloud Data Fusion + Dataplex.",
      "Engineered CI/CD frameworks via Bitbucket + Cloud Build.",
      "Leveraged Terraform for automated resource provisioning and Cloud Composer (Airflow) for reliable orchestration."
    ]
  },
  {
    role: "Associate Data Engineer",
    company: "FIS Cloud, Hyderabad",
    date: "Previous Role",
    desc: [
      "Led robust ETL pipeline development and maintenance ensuring zero data loss and high performance.",
      "Designed and optimized data warehousing solutions aligning with enterprise scaling requirements."
    ]
  }
];

function Experience() {
  return (
    <section id="experience" className="py-32 bg-grid-pattern relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="font-syne text-3xl md:text-5xl font-bold mb-20 text-center text-white reveal">
          <span className="text-[#00E5FF]">/</span> WORK_TIMELINE
        </h2>

        <div className="relative border-l-2 border-[#00E5FF]/30 ml-4 md:mx-auto md:w-full md:border-l-0">
          {/* Central Line for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#00E5FF]/20 -translate-x-1/2" />
          
          {experienceData.map((exp, idx) => (
            <div key={idx} className={cn(
              "mb-16 relative flex md:justify-between items-center w-full reveal",
              idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
            )}>
              <div className="hidden md:block w-5/12" />
              <div className="absolute left-[-29px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-[#00E5FF] border-4 border-[#050A0F] shadow-[0_0_10px_rgba(0,229,255,1)]" />
              <div className={cn(
                "w-full pl-8 md:pl-0 md:w-5/12 group perspective-1000",
                idx % 2 === 0 ? "md:text-left" : "md:text-right"
              )}>
                <div className="bg-[#050A0F]/80 backdrop-blur-sm border border-white/10 p-8 rounded-lg transition-all duration-300 hover:border-[#FFB700]/50 hover:shadow-[0_0_30px_rgba(255,183,0,0.15)] group-hover:-translate-y-2">
                  <div className={cn("text-[#00E5FF] text-sm font-bold tracking-wider mb-2 flex items-center gap-2", 
                    idx % 2 !== 0 && "md:justify-end"
                  )}>
                    <Clock size={16} /> {exp.date}
                  </div>
                  <h3 className="font-syne text-2xl font-bold text-white mb-2">{exp.role}</h3>
                  <h4 className="text-[#FFB700] font-medium tracking-wide text-sm uppercase mb-6">{exp.company}</h4>
                  <ul className={cn("space-y-3 text-gray-400 text-sm font-medium", 
                    idx % 2 !== 0 && "md:text-right"
                  )}>
                    {exp.desc.map((item, i) => (
                      <li key={i} className="flex gap-3">
                         <span className={cn("text-[#FFB700] shrink-0 mt-1", idx % 2 !== 0 && "md:hidden")}>▹</span>
                         <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const projectsData = [
  {
    title: "Enterprise ODS & Secure ETL",
    desc: "Re-engineered 600+ ETL pipelines with Dataflow & Data Fusion. 99.8% data accuracy. CI/CD with Cloud Build. Dashboards in Tableau + Looker Studio.",
    tags: ["Dataflow", "Data Fusion", "Cloud Build", "Tableau"]
  },
  {
    title: "Telecom Customer Data Migration",
    desc: "On-prem to GCP migration. Custom Python DAGs in Airflow. Incremental loads, multi-tier GCS staging. Achieved 99.9% data integrity.",
    tags: ["GCP", "Python", "Airflow", "GCS"]
  },
  {
    title: "Airline Booking Platform",
    desc: "Frontend web app with robust flight search, interactive seat selection, and reliable payment gateway integration.",
    tags: ["Web App", "Frontend", "API"]
  },
  {
    title: "Global Currency Converter",
    desc: "Real-time currency conversion using live exchange rate APIs with a highly responsive user interface.",
    tags: ["REST API", "Responsive"]
  },
  {
    title: "Country & Capital Explorer",
    desc: "REST Countries API integration with Bootstrap responsive design for seamless global exploration.",
    tags: ["Bootstrap", "REST API", "Frontend"]
  },
  {
    title: "Weather Report Application",
    desc: "React.js application featuring real-time weather data API integration and global location search functionality.",
    tags: ["React.js", "API", "Search"]
  },
  {
    title: "Stress Analysis Device",
    desc: "Arduino Uno + heartbeat sensor predicting stress levels using embedded C in a hardware-software bridge.",
    tags: ["Arduino", "Embedded C", "IoT"]
  }
];

function Projects() {
  return (
    <section id="projects" className="py-32 bg-[#050A0F] relative">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex justify-between items-end mb-16 reveal">
          <h2 className="font-syne text-3xl md:text-5xl font-bold text-white flex items-center gap-4">
            <span className="text-[#00E5FF]">/</span> INITIATIVES
            <div className="hidden md:block w-32 h-[1px] bg-gradient-to-r from-[#00E5FF]/50 to-transparent ml-4" />
          </h2>
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hidden md:flex items-center gap-2 text-gray-400 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
            View Github <ExternalLink size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((proj, idx) => (
            <div key={idx} className="group relative perspective-1000 reveal">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00E5FF] to-[#FFB700] rounded-xl opacity-0 group-hover:opacity-100 blur transition-opacity duration-500" />
              <div className="relative h-full bg-[#050A0F] border border-white/10 rounded-xl p-8 transition-transform duration-500 transform group-hover:-translate-y-2 group-hover:rotate-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6 text-[#00E5FF]">
                    <Database size={32} />
                    <ExternalLink size={20} className="text-gray-500 group-hover:text-white transition-colors cursor-pointer" />
                  </div>
                  <h3 className="font-syne text-xl font-bold text-white mb-4 group-hover:text-[#FFB700] transition-colors">{proj.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-8">{proj.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {proj.tags.map((tag, i) => (
                    <span key={i} className="text-[#00E5FF] text-xs font-bold tracking-wider hover:underline cursor-pointer">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center md:hidden reveal">
          <a href="https://github.com" className="inline-flex items-center gap-2 text-[#00E5FF] hover:text-white transition-colors uppercase tracking-widest text-sm font-bold">
            View Github <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section className="py-32 bg-grid-pattern relative border-y border-white/5">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="font-syne text-3xl md:text-4xl font-bold mb-16 text-center text-white reveal">
          <span className="text-[#00E5FF]">/</span> ACHIEVEMENTS_LOG
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-[#050A0F] border border-[#00E5FF]/20 p-8 flex items-start gap-6 hover:shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:border-[#00E5FF]/50 transition-all reveal group">
            <Award className="text-[#00E5FF] group-hover:scale-110 transition-transform shrink-0" size={40} />
            <div>
              <h3 className="font-syne font-bold text-lg text-white mb-2">Google Cloud Certified</h3>
              <p className="text-[#FFB700] text-sm uppercase tracking-wider">Professional Data Engineer</p>
            </div>
          </div>
          
          <div className="bg-[#050A0F] border border-white/10 p-8 flex items-start gap-6 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all reveal group">
            <Code2 className="text-gray-300 group-hover:text-white group-hover:scale-110 transition-all shrink-0" size={40} />
            <div>
              <h3 className="font-syne font-bold text-lg text-white mb-2">250+ LeetCode Problems</h3>
              <p className="text-gray-400 text-sm tracking-wide">Algorithmic Problem Solving Target</p>
            </div>
          </div>
          
          <div className="bg-[#050A0F] border border-white/10 p-8 flex items-start gap-6 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-all reveal group">
            <Star className="text-gray-300 group-hover:text-white group-hover:scale-110 transition-all shrink-0" size={40} />
            <div>
              <h3 className="font-syne font-bold text-lg text-white mb-2">HackerRank 6-Star</h3>
              <p className="text-gray-400 text-sm tracking-wide">Python Proficiency Badge</p>
            </div>
          </div>

          <div className="bg-[#050A0F] border border-[#FFB700]/20 p-8 flex items-start gap-6 hover:shadow-[0_0_20px_rgba(255,183,0,0.15)] hover:border-[#FFB700]/50 transition-all reveal group">
            <Award className="text-[#FFB700] group-hover:scale-110 transition-transform shrink-0" size={40} />
            <div>
              <h3 className="font-syne font-bold text-lg text-white mb-2">On-the-Spot Award</h3>
              <p className="text-gray-400 text-sm tracking-wide">For delivering massive project ahead of schedule.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section className="py-24 bg-[#050A0F] relative">
      <div className="container mx-auto px-6 max-w-4xl">
        <h2 className="font-syne text-3xl font-bold mb-12 text-center text-white reveal">
          <span className="text-[#FFB700]">/</span> ACADEMICS
        </h2>
        
        <div className="bg-gradient-to-r from-white/5 to-transparent border border-white/10 p-8 md:p-12 rounded-lg flex flex-col md:flex-row items-center gap-8 reveal hover:border-[#00E5FF]/30 transition-colors">
          <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center shrink-0 bg-[#050A0F]">
            <GraduationCap size={48} className="text-gray-400" />
          </div>
          <div className="text-center md:text-left">
            <h3 className="font-syne text-2xl font-bold text-white mb-2">KKR & KSR Institute of Technology and Sciences</h3>
            <p className="text-[#00E5FF] font-medium tracking-wide mb-4">B.Tech in Electronics & Communication Engineering</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400 font-bold uppercase tracking-wider">
              <span>GPA: 8.5</span>
              <span className="hidden sm:inline">•</span>
              <span>June 2020 – May 2024</span>
              <span className="hidden sm:inline">•</span>
              <span className="flex items-center gap-1"><MapPin size={14}/> Guntur, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-32 bg-grid-pattern relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <h2 className="font-syne text-4xl md:text-5xl font-bold mb-16 text-center text-white reveal border-b border-white/10 pb-8 uppercase">
          Transmission_Link
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="reveal">
            <h3 className="text-2xl font-syne font-bold text-white mb-8">INITIATE_HANDSHAKE</h3>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input 
                  type="text" 
                  placeholder="NAME_ID" 
                  className="w-full bg-[#050A0F] border border-white/20 p-4 text-white focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all font-mono placeholder:text-gray-600"
                />
              </div>
              <div>
                <input 
                  type="email" 
                  placeholder="EMAIL_ADDRESS" 
                  className="w-full bg-[#050A0F] border border-white/20 p-4 text-white focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all font-mono placeholder:text-gray-600"
                />
              </div>
              <div>
                <textarea 
                  placeholder="PAYLOAD_MESSAGE" 
                  rows={5}
                  className="w-full bg-[#050A0F] border border-white/20 p-4 text-white focus:outline-none focus:border-[#00E5FF] focus:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all font-mono placeholder:text-gray-600 resize-none"
                />
              </div>
              <button 
                type="submit" 
                className="group relative w-full p-4 bg-transparent border border-[#00E5FF] text-[#00E5FF] font-bold tracking-widest uppercase overflow-hidden transition-all hover:text-[#050A0F]"
              >
                <div className="absolute inset-0 h-full w-full bg-[#00E5FF] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out z-0" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  <Send size={18} /> transmit_data
                </span>
              </button>
            </form>
          </div>
          
          <div className="reveal flex flex-col justify-center">
            <h3 className="text-2xl font-syne font-bold text-white mb-8">NODE_DETAILS</h3>
            <div className="space-y-8">
              <a href="tel:+918639822170" className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#00E5FF] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all shrink-0">
                  <Phone className="text-gray-400 group-hover:text-[#00E5FF] transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Direct Line</div>
                  <div className="text-white font-mono text-lg">+91 8639822170</div>
                </div>
              </a>
              
              <a href="mailto:Satyanarayanareddykolagatla@gmail.com" className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#00E5FF] group-hover:shadow-[0_0_15px_rgba(0,229,255,0.3)] transition-all shrink-0">
                  <Mail className="text-gray-400 group-hover:text-[#00E5FF] transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Electronic Mail</div>
                  <div className="text-white font-mono md:text-lg text-sm truncate">Satyanarayanareddykolagatla@gmail.com</div>
                </div>
              </a>
              
              <div className="flex items-center gap-6 group">
                <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-full flex items-center justify-center group-hover:border-[#FFB700] group-hover:shadow-[0_0_15px_rgba(255,183,0,0.3)] transition-all shrink-0">
                  <MapPin className="text-gray-400 group-hover:text-[#FFB700] transition-colors" />
                </div>
                <div>
                  <div className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-1">Geographic Coordinates</div>
                  <div className="text-white font-mono text-lg">Markapur, Andhra Pradesh</div>
                </div>
              </div>
            </div>
            
            <div className="mt-12 flex gap-4">
              <a href="#" className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm hover:bg-[#00E5FF] hover:text-[#050A0F] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
              <a href="#" className="w-12 h-12 bg-white/5 flex items-center justify-center rounded-sm hover:bg-[#00E5FF] hover:text-[#050A0F] transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 bg-[#020508] border-t border-white/5 text-center px-6">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm font-bold tracking-widest">
          © 2025 SATYANARAYANA REDDY KOLAGATLA
        </p>
        <p className="text-[#FFB700] text-sm uppercase tracking-widest opacity-80 flex items-center gap-2">
          <Terminal size={14} /> "Built with passion for data."
        </p>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <button 
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className={cn(
        "fixed bottom-8 right-8 w-12 h-12 bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/30 backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:bg-[#00E5FF] hover:text-[#050A0F] hover:shadow-[0_0_15px_rgba(0,229,255,0.5)] z-[90]",
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      )}
    >
      <ChevronUp size={24} />
    </button>
  );
}
