"use client";

import { useState } from "react";

export default function Home() {
  const [budget, setBudget] = useState("");
  const [cicilan, setCicilan] = useState("");
  const [hasil, setHasil] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  // Format angka ke Rupiah yang lebih rapi
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(angka);
  };

  const hitung = () => {
    const numBudget = Number(budget);
    const numCicilan = Number(cicilan);

    if (!numBudget || !numCicilan) {
      setHasil("Harap isi semua data dengan angka yang valid.");
      return;
    }

    // Asumsi tenor KPR 15 tahun (180 bulan)
    const tenorBulan = 180;
    const hargaRumah = numBudget + numCicilan * tenorBulan;

    setHasil({ budget: numBudget, cicilan: numCicilan, hargaRumah });
  };

  return (
    <main className="bg-white text-gray-800 font-sans scroll-smooth">
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-6 md:px-12 py-4 bg-white/90 backdrop-blur-md shadow-sm sticky top-0 z-50">
        <h1 className="text-blue-700 font-extrabold text-2xl tracking-tight">
          RUMAH<span className="text-orange-500">AI</span>
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex space-x-8 text-gray-600 font-medium">
          <a href="#tentang" className="transition duration-300 hover:text-blue-600">
            Tentang
          </a>
          <a href="#simulator" className="transition duration-300 hover:text-blue-600">
            Simulasi
          </a>
          <a href="#produk" className="transition duration-300 hover:text-blue-600">
            Properti
          </a>
          <a href="#lokasi" className="transition duration-300 hover:text-blue-600">
            Lokasi
          </a>
        </div>

        {/* MOBILE BUTTON (Animated Hamburger) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle Menu"
        >
          <span
            className={`block w-6 h-0.5 bg-gray-800 transform transition duration-300 ease-in-out ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-800 transition duration-300 ease-in-out ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`block w-6 h-0.5 bg-gray-800 transform transition duration-300 ease-in-out ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          ></span>
        </button>

        {/* MOBILE MENU (Animated Slide Down & Fade) */}
        <div
          className={`absolute top-full left-0 w-full bg-white shadow-xl flex flex-col items-center py-6 space-y-5 md:hidden border-t origin-top transform transition-all duration-300 ease-in-out ${
            menuOpen
              ? "scale-y-100 opacity-100 visible"
              : "scale-y-0 opacity-0 invisible"
          }`}
        >
          <a
            href="#tentang"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center hover:text-blue-600 transition"
          >
            Tentang
          </a>
          <a
            href="#simulator"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center hover:text-blue-600 transition"
          >
            Simulasi
          </a>
          <a
            href="#produk"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center hover:text-blue-600 transition"
          >
            Properti
          </a>
          <a
            href="#lokasi"
            onClick={() => setMenuOpen(false)}
            className="w-full text-center hover:text-blue-600 transition"
          >
            Lokasi
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[85vh] flex items-center justify-center">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80"
          alt="Rumah impian modern"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30"></div>

        <div className="relative z-10 text-center text-white px-4 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-lg">
            Temukan Rumah <br className="hidden md:block" /> Sesuai Budget Kamu
          </h1>
          <p className="mb-8 text-lg md:text-xl text-gray-200 drop-shadow">
            Dari simulasi ke rekomendasi rumah masa depanmu hanya dalam 1 klik.
          </p>
          <a
            href="#simulator"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg transition duration-300 hover:bg-blue-700 hover:-translate-y-1"
          >
            Mulai Simulasi Sekarang
          </a>
        </div>
      </section>

      {/* SIMULATOR */}
      <section id="simulator" className="max-w-md md:max-w-xl mx-auto py-20 px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Simulasi Kemampuan</h2>
          <p className="text-gray-500 mt-2">Hitung harga rumah maksimal berdasarkan kemampuan cicilanmu (Asumsi Tenor 15 Tahun).</p>
        </div>

        <div className="bg-white shadow-2xl p-8 rounded-2xl border border-gray-100">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Uang Muka (DP) Anda</label>
            <input
              type="number"
              placeholder="Contoh: 50000000"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Kemampuan Cicilan / Bulan</label>
            <input
              type="number"
              placeholder="Contoh: 3000000"
              value={cicilan}
              onChange={(e) => setCicilan(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
          </div>

          <button
            onClick={hitung}
            className="w-full bg-blue-600 text-white font-semibold p-4 rounded-lg shadow-md transition duration-300 hover:bg-blue-700 active:scale-95"
          >
            Hitung Estimasi
          </button>

          {hasil && typeof hasil !== "string" && (
            <div className="mt-6 p-5 bg-blue-50 border border-blue-100 rounded-lg animate-fade-in">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Total DP:</span>
                <span className="font-semibold">{formatRupiah(hasil.budget)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Cicilan/bln:</span>
                <span className="font-semibold">{formatRupiah(hasil.cicilan)}</span>
              </div>
              <div className="pt-4 border-t border-blue-200">
                <p className="text-sm text-gray-600">Estimasi Harga Rumah Maksimal:</p>
                <p className="text-2xl font-bold text-blue-700 mt-1">
                  {formatRupiah(hasil.hargaRumah)}
                </p>
              </div>
            </div>
          )}

          {hasil && typeof hasil === "string" && (
            <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg text-sm border border-red-200">
              {hasil}
            </div>
          )}
        </div>
      </section>

      {/* INFO / TENTANG */}
      <section id="tentang" className="bg-gray-50 py-20 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="relative group">
            <div className="absolute -inset-2 bg-blue-200 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
            <img
              src="https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&q=80"
              alt="Interior rumah modern"
              className="relative rounded-2xl shadow-xl transition duration-500 group-hover:scale-[1.02]"
            />
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-5 text-gray-900">
              Hunian Nyaman & Strategis
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Temukan rumah yang tidak hanya sesuai dengan kemampuan finansialmu, 
              tetapi juga memberikan kenyamanan maksimal. Lokasi strategis, lingkungan asri, 
              dan nilai investasi yang terus meningkat di masa depan.
            </p>
            <ul className="space-y-3 mb-8 text-gray-600">
              <li className="flex items-center">✅ <span className="ml-2">Proses KPR dibantu hingga tuntas</span></li>
              <li className="flex items-center">✅ <span className="ml-2">Bebas biaya BPHTB & Notaris*</span></li>
              <li className="flex items-center">✅ <span className="ml-2">Keamanan 24 Jam terjamin</span></li>
            </ul>
            <a href="#produk" className="inline-block bg-gray-900 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition">
              Lihat Katalog
            </a>
          </div>
        </div>
      </section>

      {/* PRODUK */}
      <section id="produk" className="py-20 px-6 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Rekomendasi Properti</h2>
          <p className="text-gray-500">Pilihan unit terbaik sesuai dengan kebutuhan keluarga Anda.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="overflow-hidden h-56">
              <img src="https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&q=80" alt="Rumah Minimalis" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded mb-3 inline-block">Tipe 36/72</span>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Cluster Minimalis</h3>
              <p className="text-gray-500 text-sm mb-4">Mulai dari Rp 500 Juta</p>
              <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition">Detail Unit</button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="overflow-hidden h-56">
              <img src="https://images.unsplash.com/photo-1560184897-502a475f7a0d?auto=format&fit=crop&q=80" alt="Rumah Modern" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded mb-3 inline-block">Tipe 45/90</span>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Townhouse Modern</h3>
              <p className="text-gray-500 text-sm mb-4">Mulai dari Rp 800 Juta</p>
              <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition">Detail Unit</button>
            </div>
          </div>

          {/* Card 3 (Tambahan agar grid seimbang) */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition duration-300 hover:-translate-y-2 hover:shadow-xl group">
            <div className="overflow-hidden h-56">
              <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80" alt="Rumah Premium" className="w-full h-full object-cover group-hover:scale-110 transition duration-500" />
            </div>
            <div className="p-6">
              <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded mb-3 inline-block">Tipe 60/120</span>
              <h3 className="text-xl font-bold text-gray-900 mb-1">Premium Estate</h3>
              <p className="text-gray-500 text-sm mb-4">Mulai dari Rp 1.2 Miliar</p>
              <button className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg font-medium hover:bg-blue-50 transition">Detail Unit</button>
            </div>
          </div>
        </div>
      </section>

      {/* MAP / LOKASI */}
      <section id="lokasi" className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
          <div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              Lokasi Strategis
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Kunjungi marketing gallery kami. Terletak di pusat perkembangan kota baru dengan akses jalan tol, stasiun KRL, dan berbagai fasilitas publik seperti sekolah dan rumah sakit.
            </p>
          </div>

          <div className="h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-gray-200">
            {/* Menggunakan URL map yang valid (contoh embed Google Maps) */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63574.75089102016!2d119.5883316075195!3d-5.196178091913192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee5b75a248af5%3A0x8bc3a7d3c3f478e!2sHenny_Land!5e0!3m2!1sid!2sid!4v1776448952783!5m2!1sid!2sid"
              className="w-full h-full border-0"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Peta Lokasi"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-gray-900 text-gray-400 py-8 text-center text-sm">
        <p>© 2026 Rumah AI. All rights reserved.</p>
      </footer>

      {/* WHATSAPP FLOAT */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 group">
        <div className="bg-white shadow-lg px-4 py-2 rounded-full text-sm font-medium text-gray-700 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition duration-300">
          Tanya Sales Kami
        </div>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition duration-300 transform hover:scale-110 flex items-center justify-center"
          aria-label="Chat via WhatsApp"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            className="w-7 h-7 fill-white"
          >
            <path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2 7.7L.4 32l8.5-2.2c2.2 1.2 4.7 1.9 7.3 1.9 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zM16 29.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-5 1.3 1.3-4.9-.3-.5c-1.4-2.1-2.1-4.6-2.1-7.2 0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2S23.3 29.3 16 29.3z" />
          </svg>
        </a>
      </div>
    </main>
  );
}