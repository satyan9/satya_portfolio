import { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

export function TypewriterText() {
  const titles = [
    "Data Engineer | GCP & BigQuery Specialist",
    "Cloud Composer (Airflow) DAG Developer",
    "Python ETL & Metadata Pipeline Engineer",
    "AI Enterprise Search & Ingestion Specialist"
  ];

  const [tIdx, setTIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentTitle = titles[tIdx];

    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      if (displayedText.length < currentTitle.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentTitle.slice(0, displayedText.length + 1));
        }, 70);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentTitle.slice(0, displayedText.length - 1));
        }, 35);
      } else {
        setIsDeleting(false);
        setTIdx((prev) => (prev + 1) % titles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, tIdx]);

  return (
    <div className="h-12 mb-6 flex items-center gap-3 text-base sm:text-2xl font-mono text-slate-300">
      <Terminal className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400 shrink-0 animate-pulse" />
      <span className="text-cyan-400 font-semibold border-r-2 border-cyan-400 pr-1 animate-pulse tracking-wide truncate">
        {displayedText}
      </span>
    </div>
  );
}
