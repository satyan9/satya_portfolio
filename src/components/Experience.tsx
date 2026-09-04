import { MapPin, ChevronRight } from 'lucide-react';

export function Experience() {
  const experiences = [
    {
      company: "FISClouds Pvt. Ltd.",
      role: "Data Engineer",
      period: "Nov 2024 – Present",
      location: "Hyderabad, India",
      projects: [
        {
          title: "Enterprise ODS & Secure ETL Optimization",
          client: "Banking Client – Financial Sector",
          timeline: "May 2025 – Present",
          badgeColor: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
          highlights: [
            "Designed & implemented enterprise ODS ETL/ELT pipelines to integrate banking data into BigQuery using Cloud Data Fusion & Cloud Composer.",
            "Built Landing, Raw, Staging, and Curated data layers with Dataplex-based governance and automated data quality validation.",
            "Optimized BigQuery storage & query performance via date partitioning, clustering, and replacing SELECT * with explicit column projections — achieving up to 85% query speedups and 99.9% bytes scanned cuts.",
            "Developed Tableau dashboards for ETL monitoring, Airflow DAG execution tracking, and operational pipeline health reporting.",
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
            "Engineered 1 metadata & configuration-driven Python ETL framework that dynamically generated over 600+ standardized Airflow pipeline tasks for telecom catalog ingestion.",
            "Built metadata-driven Python transformation pipelines to normalize complex JSON data, implement business validation rules, and process nested structures while maintaining strict schema consistency.",
            "Engineered BigQuery ingestion pipelines integrated with Cloud Storage, automated data refresh processes, and reusable loading utilities to support scalable data processing.",
            "Integrated BigQuery with Google Cloud Discovery Engine to enable AI-powered enterprise search through automated catalog indexing, synchronization, and document ingestion.",
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
                          {point.split(/(85%|99\.9%|600\+|Cloud Data Fusion|Cloud Composer|Dataplex|BigQuery|Discovery Engine|Python|Tableau)/g).map((chunk, cIdx) => (
                            ['85%', '99.9%', '600+'].includes(chunk) ? (
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
