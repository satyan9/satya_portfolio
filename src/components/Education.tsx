import { GraduationCap, MapPin } from 'lucide-react';

export function Education() {
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
