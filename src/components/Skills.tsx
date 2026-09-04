import { useState, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Cloud, Search, Code, Server, Terminal, BarChart3, Database, Shield, Zap, Layers, Cpu, Activity
} from 'lucide-react';

function SkillLogo({ name }: { name: string }) {
  const n = name.toLowerCase();

  // GCP Services & BigQuery
  if (n.includes('bigquery')) {
    return (
      <svg className="w-5 h-5 text-cyan-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 12v7H5v-7h14m2-2H3v11h18V10zm-2-6v4H5V4h14m2-2H3v8h18V2z"/>
      </svg>
    );
  }
  if (n.includes('airflow') || n.includes('composer')) {
    return (
      <svg className="w-5 h-5 text-cyan-300 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
      </svg>
    );
  }
  if (n.includes('storage') || n.includes('gcs')) {
    return (
      <svg className="w-5 h-5 text-blue-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
      </svg>
    );
  }
  if (n.includes('fusion') || n.includes('dataproc') || n.includes('dataflow')) {
    return <Zap className="w-5 h-5 text-amber-400 shrink-0" />;
  }
  if (n.includes('discovery engine') || n.includes('search')) {
    return <Search className="w-5 h-5 text-indigo-400 shrink-0" />;
  }
  if (n.includes('kms') || n.includes('iam') || n.includes('governance') || n.includes('security')) {
    return <Shield className="w-5 h-5 text-emerald-400 shrink-0" />;
  }
  if (n.includes('build') || n.includes('ci / cd') || n.includes('ci/cd')) {
    return <Layers className="w-5 h-5 text-blue-400 shrink-0" />;
  }
  if (n.includes('run') || n.includes('serverless')) {
    return <Cpu className="w-5 h-5 text-cyan-400 shrink-0" />;
  }
  if (n.includes('pub/sub') || n.includes('messaging')) {
    return <Activity className="w-5 h-5 text-purple-400 shrink-0" />;
  }

  // Languages & Databases
  if (n.includes('python')) {
    return (
      <svg className="w-5 h-5 text-amber-300 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c-4.97 0-5 2.16-5 4.13V8h6v1H6.1c-1.95 0-3.6 1.25-3.6 3.5 0 2.25 1.5 3.5 3.5 3.5h1.5v-2.08c0-1.8 1.48-3.42 3.5-3.42h5c1.4 0 2.5-1.1 2.5-2.5V6.13C18.5 4.16 16.97 2 12 2zm-2.2 2.3c.5 0 .9.4.9.9s-.4.9-.9.9-.9-.4-.9-.9.4-.9.9-.9zm7.3 7.2h-1.5v2.08c0 1.8-1.48 3.42-3.5 3.42h-5c-1.4 0-2.5 1.1-2.5 2.5v2.37c0 1.97 1.53 4.13 6.5 4.13 4.97 0 5-2.16 5-4.13V20h-6v-1h6.9c1.95 0 3.6-1.25 3.6-3.5 0-2.25-1.5-3.5-3.5-3.5zm-5.1 7.2c-.5 0-.9-.4-.9-.9s.4-.9.9-.9.9.4.9.9-.4.9-.9.9z"/>
      </svg>
    );
  }
  if (n.includes('pyspark') || n.includes('spark')) {
    return (
      <svg className="w-5 h-5 text-orange-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.5 2s-3 3-3 6.5C9.5 12 12 13 12 13s.5-3 2.5-4c0 0-1 4.5.5 6.5 1.5 2 4.5 1.5 4.5 1.5s-2-2-1.5-4c.5-2 3.5-4 3.5-4s-3 6-1 8c2 2 3.5 0 3.5 0s-2.5 4-6 5-6-2-8-5.5C8 9 12.5 2 12.5 2z"/>
      </svg>
    );
  }
  if (n.includes('sql') || n.includes('postgres') || n.includes('oracle') || n.includes('mysql')) {
    return <Database className="w-5 h-5 text-cyan-400 shrink-0" />;
  }
  if (n.includes('databricks')) {
    return (
      <svg className="w-5 h-5 text-rose-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 9L2 16l10 5 10-5-10-5z"/>
      </svg>
    );
  }
  if (n.includes('docker')) {
    return (
      <svg className="w-5 h-5 text-sky-400 shrink-0" viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.98 11.08h-2.14v-2.1h2.14v2.1zm-2.58 0h-2.13v-2.1h2.13v2.1zm-2.58 0H6.68v-2.1h2.14v2.1zm7.74 0h-2.14v-2.1h2.14v2.1zm-7.74-2.54H6.68V6.44h2.14v2.1zm2.58 0h-2.13V6.44h2.13v2.1zm2.58 0h-2.14V6.44h2.14v2.1zm2.58 0h-2.14V6.44h2.14v2.1zm-5.16-2.55h-2.13V3.9h2.13v2.09zM.35 12.82c.4 2.8 2.8 5.68 6.7 5.68 6.2 0 10.3-4.1 11.2-8.5.8.1 1.7-.1 2.3-.6.4-.4.8-1 1-1.6-1 .2-2.1.2-3-.3 1-.7 1.8-1.7 2-2.9-1.2.7-2.5 1-3.8.9-1.5-1.5-3.8-2-5.7-1.1V6.44h.02c-.5-1.2-1.7-2-3-2v.03C7.2 4.47 6.1 5.67 6.1 7.17v1.81H4.1c-2.3 0-3.9 1.7-3.75 3.84z"/>
      </svg>
    );
  }
  if (n.includes('git') || n.includes('bitbucket')) {
    return <Terminal className="w-5 h-5 text-orange-400 shrink-0" />;
  }
  if (n.includes('linux')) {
    return <Terminal className="w-5 h-5 text-emerald-400 shrink-0" />;
  }
  if (n.includes('tableau') || n.includes('power bi') || n.includes('looker')) {
    return <BarChart3 className="w-5 h-5 text-purple-400 shrink-0" />;
  }
  if (n.includes('etl') || n.includes('pipeline') || n.includes('cdc') || n.includes('loading')) {
    return <Layers className="w-5 h-5 text-cyan-400 shrink-0" />;
  }
  if (n.includes('partitioning') || n.includes('clustering') || n.includes('modeling')) {
    return <Cpu className="w-5 h-5 text-indigo-400 shrink-0" />;
  }

  // Fallback
  return <Code className="w-5 h-5 text-cyan-400 shrink-0" />;
}

export function Skills() {
  const skillCategories = [
    {
      id: "cloud",
      name: "Cloud (GCP)",
      icon: <Cloud className="w-5 h-5 text-cyan-400" />,
      skills: [
        { name: "BigQuery", level: "Expert", desc: "Partitioning, Clustering, SQL Tuning", tag: "Enterprise Core" },
        { name: "Cloud Composer (Airflow)", level: "Advanced", desc: "Custom Python DAG Orchestration", tag: "Production DAGs" },
        { name: "Cloud Storage (GCS)", level: "Advanced", desc: "Multi-tier Bucket Staging", tag: "GCP Storage" },
        { name: "Cloud Data Fusion", level: "Advanced", desc: "ETL Ingestion Pipelines", tag: "Banking ODS" },
        { name: "Dataproc", level: "Proficient", desc: "Managed Spark Clusters", tag: "Spark Processing" },
        { name: "Dataflow", level: "Proficient", desc: "Apache Beam Streaming/Batch", tag: "Beam Pipelines" },
        { name: "Pub/Sub", level: "Proficient", desc: "Real-time Messaging Ingestion", tag: "Event Streaming" },
        { name: "Dataplex", level: "Advanced", desc: "Data Governance & Quality Rules", tag: "Governance" },
        { name: "Cloud KMS & IAM", level: "Advanced", desc: "Role Access & Data Encryption", tag: "Security" },
        { name: "Cloud Run", level: "Proficient", desc: "Serverless Container Deployments", tag: "Serverless" },
        { name: "Cloud Scheduler & Monitoring", level: "Advanced", desc: "Operational Triggers & Alerts", tag: "Ops Monitoring" },
        { name: "Discovery Engine", level: "Advanced", desc: "Vertex AI Search Integration", tag: "AI Search" }
      ]
    },
    {
      id: "de",
      name: "Data Engineering",
      icon: <Server className="w-5 h-5 text-amber-400" />,
      skills: [
        { name: "ETL / ELT Pipelines", level: "Expert", desc: "End-to-End Pipeline Architecture", tag: "Enterprise Core" },
        { name: "Metadata-Driven ETL", level: "Advanced", desc: "Config-based Python Generators", tag: "600+ Tasks" },
        { name: "Partitioning & Clustering", level: "Advanced", desc: "BigQuery Query & Storage Tuning", tag: "85% Speedup" },
        { name: "Incremental Loading (CDC)", level: "Advanced", desc: "Change Data Capture Patterns", tag: "CDC Patterns" },
        { name: "Data Modeling", level: "Advanced", desc: "Star Schema & ODS Data Layers", tag: "ODS Layers" },
        { name: "Databricks", level: "Proficient", desc: "Lakehouse Processing Basics", tag: "Spark/Lakehouse" }
      ]
    },
    {
      id: "languages",
      name: "Languages & Databases",
      icon: <Code className="w-5 h-5 text-emerald-400" />,
      skills: [
        { name: "Python", level: "Expert", desc: "Data Structures & ETL Frameworks", tag: "Primary Language" },
        { name: "SQL", level: "Expert", desc: "Complex Analytical Queries & Tuning", tag: "Primary Querying" },
        { name: "PySpark", level: "Advanced", desc: "Distributed Data Transformations", tag: "Spark Processing" },
        { name: "PostgreSQL", level: "Advanced", desc: "Relational Source Integration", tag: "DB Ingestion" },
        { name: "Oracle DB", level: "Advanced", desc: "Enterprise Database Connectors", tag: "Banking Source" },
        { name: "MySQL & SQL Server", level: "Advanced", desc: "On-Prem Database Extraction", tag: "On-Prem Connectors" }
      ]
    },
    {
      id: "ai",
      name: "AI Search & Cataloging",
      icon: <Search className="w-5 h-5 text-indigo-400" />,
      skills: [
        { name: "Google Cloud Discovery Engine", level: "Advanced", desc: "AI Enterprise Search Platform", tag: "Telecom Project" },
        { name: "Automated Catalog Indexing", level: "Advanced", desc: "Document & Schema Syncing", tag: "Catalog Index" },
        { name: "JSON Telecom Standardizer", level: "Advanced", desc: "Nested JSON Pipeline Normalization", tag: "Python Framework" },
        { name: "Search Performance Analytics", level: "Proficient", desc: "BigQuery Log Analysis & Metrics", tag: "Analytics" }
      ]
    },
    {
      id: "devops",
      name: "Tools & DevOps",
      icon: <Terminal className="w-5 h-5 text-blue-400" />,
      skills: [
        { name: "Git & Bitbucket", level: "Advanced", desc: "Branching, PRs, Version Control", tag: "Version Control" },
        { name: "Docker", level: "Proficient", desc: "Containerized Execution", tag: "Containerization" },
        { name: "Cloud Build (CI/CD)", level: "Proficient", desc: "Automated Pipeline Deployment", tag: "CI/CD" },
        { name: "Linux / Bash", level: "Advanced", desc: "Shell Automation & Scripts", tag: "Shell Scripting" }
      ]
    },
    {
      id: "bi",
      name: "BI & Dashboards",
      icon: <BarChart3 className="w-5 h-5 text-purple-400" />,
      skills: [
        { name: "Tableau", level: "Advanced", desc: "ETL & DAG Monitoring Dashboards", tag: "Banking ODS" },
        { name: "Looker Studio", level: "Advanced", desc: "Operational BigQuery Reporting", tag: "GCP Dashboards" },
        { name: "Power BI", level: "Proficient", desc: "Business Reporting & Analytics", tag: "BI Reports" }
      ]
    }
  ];

  const [activeTab, setActiveTab] = useState("cloud");

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 120);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const currentCategory = skillCategories.find(c => c.id === activeTab);

  return (
    <section id="skills" className="py-24 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Technical Capabilities</h2>
          </div>
          <p className="text-slate-400 max-w-lg text-base">
            Honest, realistic technical stack based on enterprise deployments, certifications, and daily pipeline operations.
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

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentCategory?.skills.map((skill, idx) => (
            <div
              key={`${activeTab}-${idx}`}
              className="glass-panel p-5 rounded-2xl glass-panel-hover flex flex-col justify-between h-[145px] group transition-all duration-300 animate-in fade-in zoom-in-95"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:border-cyan-500/40 transition-all">
                      <SkillLogo name={skill.name} />
                    </div>
                    <h3 className="font-bold text-white text-sm group-hover:text-cyan-300 transition-colors leading-tight">
                      {skill.name}
                    </h3>
                  </div>
                  
                  {/* Calibrated Level Badge */}
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded ${
                    skill.level === 'Expert'
                      ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                      : skill.level === 'Advanced'
                      ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/20'
                      : 'bg-slate-800 text-slate-300'
                  }`}>
                    {skill.level}
                  </span>
                </div>
                
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mt-1">{skill.desc}</p>
              </div>

              {/* Context Label Footer (Replaced Deceptive Verified Checkmark) */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span className="text-slate-400">Application Context:</span>
                <span className="text-cyan-400/90 font-semibold">{skill.tag}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
