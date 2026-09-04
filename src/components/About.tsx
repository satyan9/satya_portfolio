import { Database, Zap, Search, Layers, MapPin, Briefcase, Award, ExternalLink } from 'lucide-react';

export function About() {
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
                Prior to my role at <strong className="text-white font-semibold">FISClouds Pvt. Ltd.</strong>, I built my core software engineering foundation as a <strong className="text-cyan-300 font-semibold">MERN Stack Developer</strong> at <strong className="text-white font-semibold">Vector India Institute</strong>, engineering full-stack web platforms, backend services, and RESTful APIs using MongoDB, Express.js, React, and Node.js.
              </p>
              <p>
                Currently at <strong className="text-white font-semibold">FISClouds Pvt. Ltd.</strong>, I spearhead data engineering initiatives for tier-1 Banking and Telecom clients. My core focus centers on modernizing massive, heterogeneous on-premises data sources (Oracle, PostgreSQL, MySQL, SQL Server) into unified, query-optimized Google BigQuery enterprise data warehouses.
              </p>
              <p>
                Whether orchestrating mission-critical DAGs with <strong className="text-cyan-300 font-semibold">Cloud Composer (Apache Airflow)</strong>, ingesting data seamlessly via <strong className="text-cyan-300 font-semibold">Cloud Data Fusion</strong>, or standardizing nested JSON telecom catalogs for AI search indexing using <strong className="text-indigo-300 font-semibold">Discovery Engine</strong>, I strictly prioritize operational reliability, zero data loss, and execution performance.
              </p>
              <p>
                As a certified <a href="https://drive.google.com/file/d/1-_Ie7pSdhNvXU6yImDpm63Do1g6osHSc/view" target="_blank" rel="noopener noreferrer" className="text-emerald-400 font-semibold hover:underline inline-flex items-center gap-1">Google Cloud Certified Professional Data Engineer <ExternalLink className="w-3.5 h-3.5" /></a> and <a href="https://www.credly.com/badges/c4ab843e-f5d1-4d27-892d-41614cfb81cb/linked_in_profile" target="_blank" rel="noopener noreferrer" className="text-indigo-300 font-semibold hover:underline inline-flex items-center gap-1">Microsoft Azure AI Fundamentals <ExternalLink className="w-3.5 h-3.5" /></a> credential holder, I bridge raw operational complexity with executive BI dashboarding in Tableau, Looker Studio, and Power BI.
              </p>
            </div>

            <div className="pt-8 mt-8 border-t border-slate-800 flex flex-wrap gap-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" /> Hyderabad, India
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
