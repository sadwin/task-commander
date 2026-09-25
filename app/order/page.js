"use client";

import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function OrderPage() {
  // Состояния для полей формы
  const [title, setTitle] = useState("");
  const [taskType, setTaskType] = useState("courier_express");
  const [basePrice, setTaskPrice] = useState("");
  const [address, setTaskAddress] = useState("");
  
  // Финтех-расчет стоимости в реальном времени
  const [fee, setFee] = useState(0);
  const [insurance, setInsurance] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Магический калькулятор: пересчитывает косты при каждом изменении базовой цены или типа таска
  useEffect(() => {
    const price = parseFloat(basePrice) || 0;
    
    // Серьезные прозрачные голландские тарифы:
    // Фиксированная комиссия платформы за безопасный iDEAL split-payment
    const platformFee = price > 0 ? 3.50 : 0; 
    // Страховой взнос WA-verzekering (зависит от типа операции)
    const insuranceFee = price > 0 ? (taskType === "courier_express" ? 1.50 : 2.50) : 0;
    
    setFee(platformFee);
    setInsurance(insuranceFee);
    setTotalPrice(price + platformFee + insuranceFee);
  }, [basePrice, taskType]);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Проверяем авторизацию
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setMessage("❌ Ошибка: Авторизуйтесь в системе, чтобы разместить заказ.");
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.from("tasks").insert([
      {
        title: title,
        description: title,
        task_type: taskType,
        price_euro: totalPrice, // Записываем в базу полную честную стоимость с комиссиями
        address_text: address,
        client_id: user.id
      }
    ]);

    setLoading(false);
    if (error) {
      setMessage(`❌ Ошибка базы данных: ${error.message}`);
    } else {
      setMessage("✅ Systeem: Операция успешна. Задача добавлена в пул!");
      setTitle("");
      setTaskPrice("");
      setTaskAddress("");
    }
  };
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased flex flex-col justify-between relative">
      
      {/* Тонкая сетка на фоне для финтех-эстетики */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:32px_32px] opacity-10 pointer-events-none"></div>

      {/* Верхняя панель навигации */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xs font-mono font-bold text-slate-400 hover:text-white transition-colors">
            ← BACK TO SYSTEM GRID
          </a>
          <div className="text-xs font-mono text-slate-500 tracking-wider">
            SECURE NODE // TASK_PROVISIONING
          </div>
        </div>
      </header>

      {/* Основной двухколоночный калькулятор стоимости */}
      <main className="max-w-4xl w-full mx-auto px-6 py-12 grid md:grid-cols-12 gap-8 items-start relative z-10 my-auto">
        
        {/* Левая колонка: Форма ввода параметров */}
        <form onSubmit={handleCreateTask} className="md:col-span-7 bg-slate-900/40 border border-slate-900 p-6 rounded-xl space-y-4 shadow-2xl backdrop-blur-sm">
          <div className="space-y-1">
            <h2 className="text-md font-black uppercase tracking-wider text-white">Nieuwe Taak Plaatsen</h2>
            <p className="text-[11px] text-slate-400">Введите параметры для мгновенного расчета стоимости инфраструктуры</p>
          </div>

          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Omschrijving (What needs to be done?)</label>
            <input type="text" required placeholder="e.g. Deliver urgent documents to Zuidas or Clean 3-room appt" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs font-semibold text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Type Service</label>
              <select value={taskType} onChange={(e) => setTaskType(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs font-bold text-slate-300 focus:border-indigo-500 focus:outline-none cursor-pointer">
                <option value="courier_express">Koerier (Express Courier)</option>
                <option value="cleaning">Schoonmaak (Emergency Cleaning)</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Bounty (Uw Aanbod в EUR)</label>
              <input type="number" required placeholder="50.00" value={basePrice} onChange={(e) => setTaskPrice(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs font-mono font-bold text-white focus:border-indigo-500 focus:outline-none transition-colors" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-widest">Adres (Netherlands Location)</label>
            <input type="text" required placeholder="e.g. Overtoom 12, Amsterdam" value={address} onChange={(e) => setTaskAddress(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-xs font-semibold text-white focus:border-indigo-500 focus:outline-none transition-colors" />
          </div>

          <button type="submit" disabled={loading} className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-white py-3 rounded-lg text-xs font-bold tracking-wider uppercase shadow-[0_0_20px_rgba(79,70,229,0.2)] transition-all disabled:opacity-50">
            {loading ? "Verwerken..." : "Bevestig & Publiceer via iDEAL"}
          </button>
          
          {message && <p className="text-center text-[10px] font-mono p-2.5 bg-slate-950 rounded-lg border border-slate-800 text-indigo-300">{message}</p>}
        </form>

        {/* Правая колонка: Прозрачный Финтех Чек (Тут высвечивается стоимость!) */}
        <div className="md:col-span-5 bg-slate-900/20 border border-slate-900 p-6 rounded-xl space-y-4 backdrop-blur-sm">
          <span className="text-[9px] font-mono font-bold text-slate-500 tracking-widest uppercase block">Kostenoverzicht // COST BREAKDOWN</span>
          
          <div className="space-y-2.5 text-xs font-mono border-b border-slate-900 pb-4">
            <div className="flex justify-between text-slate-400">
              <span>Basistarief Runner:</span>
              <span className="text-white font-bold">EUR {(parseFloat(basePrice) || 0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>iDEAL Escrow Fee:</span>
              <span className="text-white font-bold">EUR {fee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>WA-Verzekering (Insurance):</span>
              <span className="text-white font-bold">EUR {insurance.toFixed(2)}</span>
            </div>
          </div>

          {/* Итоговая жирная стоимость */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-[10px] font-black tracking-wider text-slate-400 uppercase">Totale Kosten:</span>
            <span className="text-xl font-black text-emerald-400 font-mono tracking-tight">
              EUR {totalPrice.toFixed(2)}
            </span>
          </div>

          <div className="text-[10px] text-slate-500 font-mono leading-relaxed bg-slate-950/40 p-3 rounded-lg border border-slate-900/40">
            🤝 TaskCommander Veiligheid: Расчет произведен автоматически согласно тарифам KvK. Сумма резервируется на эскроу-счете и списывается только после подтверждения.
          </div>
        </div>

      </main>

      <footer className="bg-slate-950 text-slate-600 text-[10px] font-mono py-4 text-center border-t border-slate-900">
        TASKCOMMANDER // ESCROW SECURE PAYMENT PROTOCOL
      </footer>

    </div>
  );
}
