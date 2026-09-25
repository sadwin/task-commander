"use client";

import { useState } from "react";
import { supabase } from "./supabase";
// Твоя крутая картинка курьера в очках в папке app
import heroImage from './121212.jpg';

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("client");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { role: role } }
    });

    setLoading(false);
    if (error) {
      setMessage(`❌ Error: ${error.message}`);
    } else {
      setMessage("✅ Succes! Account is aangemaakt in Supabase.");
    }
  };
  return (
    <div className="min-h-screen text-white font-sans antialiased relative bg-slate-950 scroll-smooth">
      
      {/* ТОТ САМЫЙ КРУТОЙ СКВОЗНОЙ ФОН НА ВЕСЬ ЭКРАН */}
      <div className="fixed inset-0 z-0">
        <img 
          src={heroImage.src} 
          alt="TaskCommander Campaign" 
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        />
        <div className="absolute inset-0 bg-slate-950/45 pointer-events-none"></div>
      </div>

      {/* Оболочка контента поверх бэкграунда */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between">
        
        {/* МОДАЛКА РЕГИСТРАЦИИ */}
        {isOpen && (
          <div className="fixed inset-0 bg-slate-955/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
            <div className="bg-slate-900/95 border border-white/15 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 relative">
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold">✕</button>
              <div className="text-center">
                <h3 className="text-lg font-black text-white">TaskCommander.nl</h3>
                <p className="text-xs text-slate-400 mt-1">Maak binnen 1 minuut je beveiligde account aan</p>
              </div>
              <form onSubmit={handleSignUp} className="space-y-3 pt-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Email</label>
                  <input type="email" required placeholder="e.g. johan@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-indigo-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Wachtwoord</label>
                  <input type="password" required placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-semibold text-white focus:outline-indigo-500" />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Ik ben een:</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full bg-slate-950 border border-white/10 rounded-xl px-3 py-2.5 text-xs font-bold text-slate-300 focus:outline-indigo-500">
                    <option value="client">Opdrachtgever (Client)</option>
                    <option value="commander_runner">Task Runner (Courier / Cleaner)</option>
                  </select>
                </div>
                <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-xl text-xs font-bold shadow-lg transition-all mt-4">
                  {loading ? "Verwerken..." : "Registreren"}
                </button>
                {message && <p className="text-center text-[11px] font-bold mt-2 p-2 bg-slate-950 rounded-lg border border-white/5">{message}</p>}
              </form>
            </div>
          </div>
        )}

        {/* ХЕДЕР */}
        <header className="border-b border-white/10 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-xl font-black tracking-tight flex items-center gap-2 select-none">
              <span className="text-2xl drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">🇳🇱</span> 
              <span className="text-white font-extrabold">Task<span className="text-indigo-400">Commander</span><span className="text-slate-500 font-normal text-xs">.nl</span></span>
            </div>
            <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-300">
              <a href="#protocol" className="hover:text-white transition-colors">Hoe het werkt</a>
              <a href="#compliance" className="hover:text-white transition-colors">Betrouwbaarheid</a>
            </nav>
            <a href="/order" className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center">
  Plaats een Taak
</a>
          </div>
        </header>

        {/* ТЕ САМЫЕ ПРЕМИУМ ГРАФИТОВЫЕ ПЛАШКИ ПОВЕРХ ФОНА */}
        <main className="max-w-6xl w-full mx-auto px-6 pt-12 pb-20 grid lg:grid-cols-12 gap-8 items-center my-auto">
          
          {/* Левый блок с текстом */}
          <div className="lg:col-span-5 bg-slate-900/65 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-2xl space-y-6 text-left">
            <div className="inline-flex items-center gap-1.5 bg-white text-slate-950 px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-sm">
              📍 Actief in heel Nederland
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] text-white">
              Hulp nodig? <br /> <span className="text-indigo-400">Snel geregeld,</span> wanneer jij wilt.
            </h1>
            <p className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
              Sleutels vergeten midden in de nacht? Snel een document bezorgen via live GPS? Of zoek je een betrouwbare schoonmaker voor je huis? Plaats je taak, kies een gecontroleerde lokale helper en betaal veilig achteraf via iDEAL.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <button onClick={() => setIsOpen(true)} className="bg-white hover:bg-slate-100 text-slate-950 px-6 py-3.5 rounded-xl font-bold text-xs shadow-md transition-all">Account Aanmaken</button>
              <a href="#protocol" className="border border-white/10 bg-slate-955/40 hover:bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold text-center text-xs transition-all flex items-center justify-center">Meer Info</a>
            </div>
          </div>

          {/* Правая панель задач */}
          <div className="lg:col-span-7 bg-slate-900/65 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Actuele Aanvragen in de buurt</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 font-bold px-2 py-0.5 rounded shadow-xs">Live Pool</span>
            </div>
            
            <div className="bg-slate-950/70 border border-white/5 p-4 rounded-xl space-y-2 hover:border-indigo-500/40 transition-all shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded border border-indigo-500/20">Koerier (Spoed)</span>
                <span className="text-sm font-black text-emerald-400 tracking-tight">€ 25,00</span>
              </div>
              <p className="text-xs font-bold text-white leading-tight">Vergeten huissleutels ophalen in Amsterdam Oud-West en bezorgen in Zuid 🔑</p>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-1 border-t border-white/5 mt-2">
                <span>📍 Amsterdam-Oud West</span>
                <span className="text-emerald-400 font-bold">● Live tracking</span>
              </div>
            </div>
            <div className="bg-slate-950/70 border border-white/5 p-4 rounded-xl space-y-2 hover:border-indigo-500/40 transition-all shadow-md">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/20">Schoonmaak</span>
                <span className="text-sm font-black text-emerald-400 tracking-tight">€ 60,00</span>
              </div>
              <p className="text-xs font-bold text-white leading-tight">Woning bezemschoon opleveren (3 kamers) + ramen lappen 🧹</p>
              <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold pt-1 border-t border-white/5 mt-2">
                <span>📍 Rotterdam Centrum</span>
                <span className="text-indigo-400 font-bold">● 4 reacties</span>
              </div>
            </div>

            <div className="bg-indigo-600/20 border border-indigo-500/30 p-3 rounded-xl text-center mt-2 shadow-2xs">
              <p className="text-[11px] text-indigo-200 font-bold leading-tight">🤝 TaskCommander Garantie: De Runner krijgt pas betaald als jij 100% tevreden bent. Veilig vastgezet via iDEAL escrow.</p>
            </div>
          </div>
        </main>

        {/* СЕКЦИЯ 1: ДОРОГОЕ ОБЪЯСНЕНИЕ "HOE HET WERKT" (ПРОТОКОЛ ДЕЙСТВИЙ) */}
        <section id="protocol" className="max-w-6xl w-full mx-auto px-6 py-20 border-t border-white/10 bg-slate-900/65 backdrop-blur-md rounded-t-3xl mt-12 shadow-2xl">
          <div className="text-left max-w-xl space-y-2 mb-12">
            <div className="text-[10px] font-mono font-bold text-indigo-400 tracking-widest uppercase">OPERATIONAL PROTOCOL</div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Hoe TaskCommander werkt 🇳🇱</h2>
            <p className="text-xs text-slate-400">Een transparant и veilig platform, afgestemd op de Nederlandse standaard.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-slate-950/50 border border-white/5 p-6 rounded-xl space-y-3">
              <div className="text-[10px] font-mono text-slate-500 font-bold tracking-widest">01 // DISPATCH</div>
              <h4 className="font-bold text-sm text-white uppercase tracking-wide">Plaats & Financier</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Omschrijf je logistieke of huishoudelijke taak, stel een transparante prijs in EUR in, en zet het budget veilig vast via iDEAL escrow.</p>
            </div>
            <div className="bg-slate-950/50 border border-white/5 p-6 rounded-xl space-y-3">
              <div className="text-[10px] font-mono text-slate-500 font-bold tracking-widest">02 // SCORING</div>
              <h4 className="font-bold text-sm text-white uppercase tracking-wide">Geverifieerde Match</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Ons algoritme screent actieve Runners in de buurt. Alleen vooraf gecontroleerde operators die aan het profiel voldoen, kunnen de opdracht accepteren.</p>
            </div>
            <div className="bg-slate-950/50 border border-white/5 p-6 rounded-xl space-y-3">
              <div className="text-[10px] font-mono text-emerald-500 font-bold tracking-widest">03 // SETTLEMENT</div>
              <h4 className="font-bold text-sm text-white uppercase tracking-wide">Controleer & Betaal</h4>
              <p className="text-xs text-slate-300 leading-relaxed">Volg je Runner live via gecodeerde GPS-tracking. Het geld wordt pas overgemaakt naar de operator nadat jij de succesvolle afronding bevestigt.</p>
            </div>
          </div>
        </section>

        {/* СЕКЦИЯ 2: ЮРИДИЧЕСКАЯ БЕЗОПАСНОСТЬ (COMPLIANCE / BETROUWBAARHEID) */}
        <section id="compliance" className="max-w-6xl w-full mx-auto px-6 py-20 border-t border-white/10 bg-slate-900/65 backdrop-blur-md shadow-2xl">
          <div className="grid md:grid-cols-12 gap-12 items-center">
            <div className="md:col-span-5 space-y-4 text-left">
              <div className="text-[10px] font-mono font-bold text-indigo-400 tracking-widest uppercase">LEGAL & COMPLIANCE INFRASTRUCTURE</div>
              <h2 className="text-3xl font-black text-white uppercase tracking-tight">Gebouwd volgens Nederlandse wetgeving</h2>
              <p className="text-xs text-slate-300 leading-relaxed">TaskCommander opereert volledig conform de AVG/GDPR wetgeving en biedt maximale risicobeperking voor zowel opdrachtgevers als freelancers.</p>
            </div>
            <div className="md:col-span-7 bg-slate-950/50 border border-white/5 p-6 rounded-xl space-y-6 text-left">
              <div className="flex items-start gap-4">
                <span className="text-lg bg-slate-900 border border-white/10 p-2 rounded-lg select-none">🛡️</span>
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Biometrische ID & BSN Screening</h5>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Elke Runner ondergaat een automatische, realtime controle van het identiteitsbewijs en BSN-validatie voordat toegang tot het netwerk wordt verleend.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 border-t border-white/5 pt-6">
                <span className="text-lg bg-slate-900 border border-white/10 p-2 rounded-lg select-none">💼</span>
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-wider">Collectieve WA-Verzekering</h5>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">Ongelukken zijn uitgesloten van risico. Elke actieve levering, transport- of onderhoudstaak is automatisch gedekt door onze aansprakelijkheidsverzekering.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* СТРОГИЙ СИСТЕМНЫЙ ФУТЕР */}
        <footer className="bg-slate-950/80 backdrop-blur-md text-slate-500 text-[10px] font-mono py-6 text-center border-t border-white/10">
          <p>TASKCOMMANDER.NL // AUTOMATED LOGISTICS INFRASTRUCTURE // KVK REGISTERED ENTITY // GDPR AVG SECURED</p>
        </footer>

      </div>
    </div>
  );
}
