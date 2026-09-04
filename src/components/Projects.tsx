import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from './GithubIcon';

export function Projects() {
  const projectsData = [
    {
      title: "Enterprise Banking ODS & Secure ETL Optimization",
      category: "Data Engineering",
      type: "Client Enterprise Project",
      client: "Tier-1 Banking Client",
      desc: "Re-engineered multi-tier banking data pipelines connecting heterogeneous databases (Oracle, Postgres, SQL Server) to BigQuery using Data Fusion & Airflow. Implemented Landing, Staging, and Curated data layers with Dataplex quality validation rules.",
      metrics: "85% Speedup | Date Partitioning & Clustering",
      tags: ["BigQuery", "Cloud Data Fusion", "Cloud Composer", "Dataplex", "Tableau", "SQL Tuning"],
      featured: true,
      github: "https://github.com/satyan9",
      note: "Enterprise Confidential (Architecture Patterns Published on GitHub)"
    },
    {
      title: "AI-Powered Enterprise Search & Telecom Catalog Platform",
      category: "AI & Search",
      type: "Client Enterprise Project",
      client: "Telecom Client",
      desc: "Python configuration-driven ETL framework standardizing complex JSON telecom catalogs. Integrated with Google Cloud Discovery Engine for AI-driven enterprise search indexing and search performance query analytics.",
      metrics: "AI Catalog Indexing | 600+ Config Tasks Generated",
      tags: ["Google Cloud Discovery Engine", "Python", "BigQuery", "GCS", "Search Analytics"],
      featured: true,
      github: "https://github.com/satyan9",
      note: "Enterprise Confidential (ETL Pipeline Framework on GitHub)"
    },
    {
      title: "Highway Traffic Stream & Heatmap Analytics Platform",
      category: "GCP Cloud",
      type: "Independent Cloud Project",
      client: "GCP Open Initiative",
      desc: "Real-time traffic monitoring solution deployed on GCP Cloud Run. Ingests high-velocity camera sensor telemetry data into BigQuery to stream dynamic congestion heatmaps and alert traffic dispatchers.",
      metrics: "Serverless Cloud Run | Live BigQuery Streaming",
      tags: ["BigQuery", "Cloud Run", "Python APIs", "Real-time Analytics"],
      featured: false,
      github: "https://github.com/satyan9"
    },
    {
      title: "SkillPilot AI Developer Assessment Suite",
      category: "Full Stack AI",
      type: "Independent AI Project",
      client: "Personal Project",
      desc: "Full-stack AI developer evaluation suite featuring a Monaco-powered browser IDE, AI automated code evaluation feedback loops, JWT authentication, and isolated execution sandboxing.",
      metrics: "Monaco IDE | OpenAI Code Evaluation",
      tags: ["React", "Node.js", "Express", "MongoDB", "OpenAI API"],
      featured: false,
      link: "https://skillpilot-seven.vercel.app/auth",
      github: "https://github.com/satyan9"
    }
  ];

  const [filter, setFilter] = useState("All");
  const categories = ["All", "Data Engineering", "AI & Search", "GCP Cloud", "Full Stack AI"];

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
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Key Initiatives & Projects</h2>
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
                  <span className="text-[10px] font-mono text-slate-400">
                    {proj.type}
                  </span>
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
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.tags.slice(0, 4).map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-mono text-slate-300 bg-slate-900 px-2.5 py-1 rounded-md border border-slate-800 hover:border-cyan-500/40 transition-colors">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {proj.github && (
                      <a
                        href={proj.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-cyan-500/40 transition-colors flex items-center gap-1.5 text-xs font-mono"
                        title="View GitHub Repository"
                      >
                        <GithubIcon className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Code</span>
                      </a>
                    )}
                    {proj.link && (
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950 transition-all flex items-center gap-1.5"
                      >
                        <span>Demo</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {proj.note && (
                  <div className="mt-2 text-[10px] font-mono text-slate-500 italic">
                    *{proj.note}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
