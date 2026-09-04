import { Cloud, Cpu, Code, Star, Award, ExternalLink, CheckCircle2 } from 'lucide-react';

export function Certifications() {
  const certs = [
    {
      title: "Google Cloud Certified: Professional Data Engineer",
      issuer: "Google Cloud",
      status: "Certified",
      icon: <Cloud className="w-8 h-8 text-cyan-400" />,
      color: "border-cyan-500/40 bg-cyan-500/5",
      desc: "Validated proficiency in designing, building, securing, and operating machine learning and data processing systems on GCP.",
      link: "https://drive.google.com/file/d/1-_Ie7pSdhNvXU6yImDpm63Do1g6osHSc/view"
    },
    {
      title: "Microsoft Certified: Azure AI Fundamentals",
      issuer: "Microsoft Azure",
      status: "Certified",
      icon: <Cpu className="w-8 h-8 text-indigo-400" />,
      color: "border-indigo-500/40 bg-indigo-500/5",
      desc: "Demonstrates foundational knowledge of machine learning and artificial intelligence concepts on Microsoft Azure.",
      link: "https://www.credly.com/badges/c4ab843e-f5d1-4d27-892d-41614cfb81cb/linked_in_profile"
    },
    {
      title: "LeetCode Algorithmic Problem Solving",
      issuer: "LeetCode",
      status: "250+ Solved",
      icon: <Code className="w-8 h-8 text-amber-400" />,
      color: "border-amber-500/40 bg-amber-500/5",
      desc: "Solved 250+ algorithmic challenges focusing on dynamic programming, graph traversal, data structures, and query optimization.",
      link: "https://leetcode.com/u/solidersatya/"
    },
    {
      title: "HackerRank 6-Star Python Badge",
      issuer: "HackerRank",
      status: "6-Star Gold",
      icon: <Star className="w-8 h-8 text-emerald-400" />,
      color: "border-emerald-500/40 bg-emerald-500/5",
      desc: "Achieved maximum 6-star gold rank in Python programming proficiency, object-oriented design, and functional scripting.",
      link: "https://www.hackerrank.com/profile/satya_9"
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
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Certifications & Credentials</h2>
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
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between w-full text-cyan-400 hover:text-cyan-300 font-semibold transition-colors group/link"
                  >
                    <span className="group-hover/link:underline">Verify Credential</span>
                    <ExternalLink className="w-4 h-4 text-cyan-400 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <>
                    <span>Verified Recognition</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
