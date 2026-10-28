import React, { useState } from 'react';
import { Copy, Check, ArrowUpRight, Mail } from 'lucide-react';

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
      headline: 'Ready to build scalable, reliable software together?',
      desc: 'Available for high-stakes Mobile (iOS/Android), Desktop (macOS/Windows), and Web engineering projects.',
      copyBtn: 'Copy Email',
      copiedBtn: 'Copied to Clipboard!',
      scheduleBtn: 'Send Email',
      status: 'AVAILABLE FOR CONTRACT & FREELANCE PROJECTS',
      verifiedAccounts: 'VERIFIED CREDENTIALS & PROFILES',
    },
    tr: {
      headline: 'Fikirlerinizi güvenilir yazılım çözümlerine dönüştürelim.',
      desc: 'Mobil (iOS/Android), Masaüstü (macOS/Windows) ve Web projeleri için freelance ve danışmanlık iş birliklerine açığım.',
      copyBtn: 'E-postayı Kopyala',
      copiedBtn: 'Panoya Kopyalandı!',
      scheduleBtn: 'E-posta Gönder',
      status: 'YENİ PROJELER & İŞ BİRLİKLERİ İÇİN UYGUN',
      verifiedAccounts: 'DOĞRULANMIŞ HESAPLAR & PROFİLLER',
    },
  }[lang];

  return (
    <section id="contact" className="py-24 px-6 md:px-12 border-t border-blue-500/15 relative bg-[#07090e]">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-blue-400 uppercase mb-4 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {t.status}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white max-w-2xl leading-tight">
              {t.headline}
            </h2>
          </div>
          <p className="text-sm text-zinc-300 max-w-md font-normal leading-relaxed">
            {t.desc}
          </p>
        </div>

        {/* Primary Interactive CTA Card */}
        <div className="p-8 md:p-12 rounded-3xl border border-blue-500/30 bg-gradient-to-r from-[#0d1627] via-[#0b101d] to-[#080c16] flex flex-col md:flex-row items-center justify-between gap-8 mb-16 shadow-2xl shadow-blue-500/10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl border border-blue-500/30 flex items-center justify-center bg-blue-600/10 text-blue-400 shrink-0 shadow-inner">
              <Mail className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold block mb-1">
                Direct Engineering Inbox
              </span>
              <span className="text-xl sm:text-2xl font-mono text-white tracking-tight font-bold">
                {email}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={copyEmail}
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all font-bold active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-300" />
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
              className="flex-1 md:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-wider border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 hover:text-white transition-all font-medium"
            >
              <ArrowUpRight className="w-4 h-4 text-zinc-400" />
              <span>{t.scheduleBtn}</span>
            </a>
          </div>
        </div>

        {/* Unified Accounts (All Named "Coder ACJHP") */}
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold block mb-6">
            {t.verifiedAccounts}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stack Overflow */}
            <a
              href="https://stackoverflow.com/users/coder-acjhp"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-zinc-800 bg-[#0a0e18] hover:border-amber-500/50 transition-all group flex flex-col justify-between h-36 glow-card"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-zinc-400">STACK OVERFLOW</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-amber-400 transition-colors" />
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
              className="p-5 rounded-2xl border border-zinc-800 bg-[#0a0e18] hover:border-blue-500/50 transition-all group flex flex-col justify-between h-36 glow-card"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-zinc-400">GITHUB</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-blue-400 transition-colors" />
              </div>
              <div>
                <div className="text-lg font-mono font-bold text-white group-hover:text-blue-400 transition-colors">
                  Coder ACJHP
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-mono">
                  Open Source & Projeler
                </div>
              </div>
            </a>

            {/* Bionluk */}
            <a
              href="https://bionluk.com/coderacjhp"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-zinc-800 bg-[#0a0e18] hover:border-cyan-500/50 transition-all group flex flex-col justify-between h-36 glow-card"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-zinc-400">BIONLUK</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <div>
                <div className="text-lg font-mono font-bold text-white group-hover:text-cyan-400 transition-colors">
                  Coder ACJHP
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-mono">
                  Kıdemli Yazılım Mühendisi
                </div>
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/bilal-khalid-mohammed-ameen-70663212b/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-zinc-800 bg-[#0a0e18] hover:border-indigo-500/50 transition-all group flex flex-col justify-between h-36 glow-card"
            >
              <div className="flex justify-between items-start">
                <span className="text-xs font-mono text-zinc-400">LINKEDIN</span>
                <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-indigo-400 transition-colors" />
              </div>
              <div>
                <div className="text-lg font-mono font-bold text-white group-hover:text-indigo-400 transition-colors">
                  Coder ACJHP
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-mono">
                  Senior Software Engineer
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
