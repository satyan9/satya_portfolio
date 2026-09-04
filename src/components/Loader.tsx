import { useState, useEffect } from 'react';
import { Database } from 'lucide-react';

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
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
      currentProgress += 3;
      if (currentProgress > 100) currentProgress = 100;
      setProgress(currentProgress);

      const statusIdx = Math.min(
        statuses.length - 1,
        Math.floor((currentProgress / 100) * statuses.length)
      );
      setStatusText(statuses[statusIdx]);

      if (currentProgress >= 100) {
        clearInterval(interval);
        setFadeOut(true);
        setTimeout(onComplete, 400);
      }
    }, 30);

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
