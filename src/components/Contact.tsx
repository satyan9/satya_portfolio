import { useState } from 'react';
import { Mail, Phone, MapPin, Download, Send, Loader2, CheckCircle2, Copy, Check } from 'lucide-react';
import { GithubIcon } from './GithubIcon';
import { LinkedinIcon } from './LinkedinIcon';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'success' | 'copied'>('idle');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('satyanarayanareddykolagatla@gmail.com');
    setFormStatus('copied');
    setTimeout(() => setFormStatus('idle'), 3000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const name = formData.get('name')?.toString() || '';
    const email = formData.get('email')?.toString() || '';
    const subject = formData.get('_subject')?.toString() || '';
    const message = formData.get('message')?.toString() || '';

    try {
      const res = await fetch('https://formsubmit.co/ajax/satyanarayanareddykolagatla@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        setFormStatus('success');
        formEl.reset();
      } else {
        // Direct Mailto Fallback
        const mailtoUrl = `mailto:satyanarayanareddykolagatla@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
        window.location.href = mailtoUrl;
        setFormStatus('success');
        formEl.reset();
      }
    } catch {
      // Fallback on network/cors issue
      const mailtoUrl = `mailto:satyanarayanareddykolagatla@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
      window.location.href = mailtoUrl;
      setFormStatus('success');
      formEl.reset();
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setFormStatus('idle'), 6000);
    }
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Get In Touch</h2>
          </div>
          <p className="text-slate-400 max-w-md text-base">
            Open to discussing GCP data architecture engagements, BigQuery performance tuning projects, or Data Engineering roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Contact Details */}
          <div className="reveal-left lg:col-span-5 space-y-6">
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border-slate-800/80 space-y-4">
              <a
                href="https://github.com/satyan9"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <GithubIcon className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">GitHub</div>
                  <div className="text-white text-xs sm:text-sm font-mono truncate font-medium group-hover:text-cyan-300 transition-colors">
                    github.com/satyan9
                  </div>
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/satyanarayana-reddy-kolagatla-data-engineer/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <LinkedinIcon className="w-5 h-5 text-cyan-400" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">LinkedIn</div>
                  <div className="text-white text-xs sm:text-sm font-mono truncate font-medium group-hover:text-cyan-300 transition-colors">
                    linkedin.com/in/satyanarayana-reddy-kolagatla-data-engineer
                  </div>
                </div>
              </a>

              <div
                onClick={handleCopyEmail}
                className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-cyan-500/50 transition-all group cursor-pointer"
                title="Click to copy email address"
              >
                <div className="flex items-center gap-5 overflow-hidden">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Email Address (Click to Copy)</div>
                    <div className="text-white text-xs sm:text-sm font-mono truncate font-medium group-hover:text-cyan-300 transition-colors">
                      satyanarayanareddykolagatla@gmail.com
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  aria-label="Copy Email Address"
                  className="p-2 rounded-lg bg-slate-800 text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0 ml-2"
                >
                  {formStatus === 'copied' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <a
                href="tel:+918639822170"
                className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80 hover:border-emerald-500/50 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Direct Phone</div>
                  <div className="text-white text-base font-mono font-medium group-hover:text-emerald-300 transition-colors">
                    +91 8639822170
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-5 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-semibold">Location</div>
                  <div className="text-white text-base font-mono font-medium">
                    Hyderabad, India
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 rounded-3xl border-slate-800/80 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 font-semibold">Resume Document</span>
              <a
                href="/Satyanarayana_Reddy_Kolagatla_Data_Engineer.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center gap-2 hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
              >
                <Download className="w-3.5 h-3.5" /> Download PDF
              </a>
            </div>
          </div>

          {/* Clean Contact Form */}
          <div className="reveal-right lg:col-span-7 glass-panel p-6 sm:p-10 rounded-3xl border-slate-800/80">
            <form
              action="https://formsubmit.co/Satyanarayanareddykolagatla@gmail.com"
              method="POST"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 font-sans"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Subject</label>
                <input
                  type="text"
                  name="_subject"
                  required
                  placeholder="Data Engineering Project or Role Discussion"
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">Your Message</label>
                <textarea
                  rows={4}
                  name="message"
                  required
                  placeholder="Describe your project, data architecture needs, or role opportunity..."
                  className="w-full bg-slate-900/80 border border-slate-800 rounded-xl p-4 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-600 resize-none font-sans"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-bold text-sm tracking-wider uppercase shadow-xl transition-all flex items-center justify-center gap-2 ${
                  formStatus === 'success'
                    ? 'bg-emerald-500 text-slate-950 shadow-emerald-500/20'
                    : 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:scale-[1.01]'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : formStatus === 'success' ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Message Sent Successfully! ✓</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
