import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight, Mail, Calendar } from 'lucide-react';

interface ContactBarProps {
  lang?: 'en' | 'tr';
}

export default function ContactBar({ lang = 'en' }: ContactBarProps) {
  const [copied, setCopied] = useState(false);
  const email = 'hexa.octabin@outlook.com';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const t = {
    en: {
      tag: 'COLLABORATION & INQUIRIES',
      headline: 'Architecting resilient software, together.',
      desc: 'Available for high-stakes Native iOS systems, desktop enterprise architectures (JavaFX / Supabase), and technical advisory.',
      copyBtn: 'Copy Email',
      copiedBtn: 'Copied to Clipboard!',
      scheduleBtn: 'Direct Mail',
      status: 'AVAILABLE FOR Q4 / 2026 ENGAGEMENTS',
      verifiedAccounts: 'VERIFIED CREDENTIALS',
    },
    tr: {
      tag: 'İŞ BİRLİĞİ & İLETİŞİM',
      headline: 'Dayanıklı ve yüksek performanslı yazılımları birlikte inşa edelim.',
      desc: 'Native iOS uygulamaları, kurumsal masaüstü mimarileri (JavaFX / Supabase) ve teknik danışmanlık projeleri için uygunum.',
      copyBtn: 'E-postayı Kopyala',
      copiedBtn: 'Panoya Kopyalandı!',
      scheduleBtn: 'Doğrudan E-posta',
      status: '2026 PROJELERİ İÇİN UYGUN',
      verifiedAccounts: 'DOĞRULANMIŞ HESAPLAR & PROFİLLER',
    },
  }[lang];

  return (
    <section id="contact" class="py-24 px-6 md:px-12 hairline-t relative bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-zinc-500 uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              {t.status}
            </div>
            <h2 className="text-4xl md:text-6xl font-editorial tracking-tight text-white max-w-2xl leading-none">
              {t.headline}
            </h2>
          </div>
          <p className="text-sm text-zinc-400 max-w-md font-light leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* Primary Interactive CTA Card */}
        <div className="p-8 md:p-12 rounded-3xl hairline bg-[#08080a] flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl hairline flex items-center justify-center bg-zinc-900/80 text-white shrink-0">
              <Mail className="w-5 h-5 text-zinc-300" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                Direct Engineering Inbox
              </span>
              <span className="text-xl md:text-2xl font-mono text-white tracking-tight font-medium">
                {email}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={copyEmail}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider bg-white text-black hover:bg-zinc-200 transition-all font-semibold active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>{t.copiedBtn}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>{t.copyBtn}</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${email}`}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider hairline text-zinc-300 hover:text-white hover:border-white/30 transition-all font-medium"
            >
              <ArrowUpRight className="w-4 h-4" />
              <span>{t.scheduleBtn}</span>
            </a>
          </div>
        </div>

        {/* Verified Profile Links Matrix */}
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-600 block mb-6">
            {t.verifiedAccounts}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stack Overflow */}
            <a
              href="https://stackoverflow.com/users/coder-acjhp"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl hairline bg-zinc-950/60 hover:bg-zinc-900/60 transition-all group flex flex-col justify-between h-36"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-zinc-400">STACK OVERFLOW</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-lg font-mono font-bold text-white group-hover:text-amber-400 transition-colors">
                  Coder ACJHP
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-mono">
                  ~2,254 Rep • 1 Gold • 24 Silver
                </div>
              </div>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/Coder-ACJHP"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl hairline bg-zinc-950/60 hover:bg-zinc-900/60 transition-all group flex flex-col justify-between h-36"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-zinc-400">GITHUB</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-lg font-mono font-bold text-white group-hover:text-zinc-200 transition-colors">
                  Coder-ACJHP
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-mono">
                  Open Source & Flagships
                </div>
              </div>
            </a>

            {/* Bionluk */}
            <a
              href="https://bionluk.com/coderacjhp"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl hairline bg-zinc-950/60 hover:bg-zinc-900/60 transition-all group flex flex-col justify-between h-36"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-zinc-400">BIONLUK</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-lg font-mono font-bold text-white group-hover:text-blue-400 transition-colors">
                  Onur Işık
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-mono">
                  Senior Software Engineer
                </div>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/bilal-khalid-mohammed-ameen-70663212b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl hairline bg-zinc-950/60 hover:bg-zinc-900/60 transition-all group flex flex-col justify-between h-36"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-zinc-400">LINKEDIN</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
              </div>
              <div>
                <div className="text-lg font-mono font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Bilal Khalid
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-mono">
                  Senior Mobile & Systems
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

