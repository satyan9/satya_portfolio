import { GithubIcon } from './GithubIcon';
import { LinkedinIcon } from './LinkedinIcon';

export function Footer() {
  return (
    <footer className="py-12 border-t border-slate-800/80 bg-slate-950 relative z-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div>
          <div className="font-bold text-white text-base flex items-center justify-center md:justify-start gap-3">
            <span>Satyanarayana Reddy Kolagatla</span>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/satyan9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                title="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/satyanarayana-reddy-kolagatla-data-engineer/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                title="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="text-xs font-mono text-slate-400 mt-1">Google Cloud Certified Professional Data Engineer</div>
        </div>

        <div className="text-xs font-mono text-slate-500">
          © {new Date().getFullYear()} Satyanarayana Reddy Kolagatla. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
