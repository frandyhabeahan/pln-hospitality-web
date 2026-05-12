import { useState } from 'react'

export default function PLNHospitalityWebsite() {
  const [formData, setFormData] = useState({
    nama: '', telepon: '', lokasi: '', daya: '',
    idPelanggan: '', dayaExisting: '', dayaDimohon: '', keterangan: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // LOGIKA SMOOTH SCROLL (Baru)
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Jarak aman agar judul tidak tertutup navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // LINK DOWNLOAD PLN MOBILE (Baru)
  const openPLNMobile = () => {
    // Deteksi OS sederhana untuk mengarahkan ke Store yang tepat
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isIOS) {
      window.open("https://apps.apple.com/id/app/pln-mobile/id1296717435", "_blank");
    } else {
      window.open("https://play.google.com/store/apps/details?id=com.icon.pln123", "_blank");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const sheetBestUrl = "https://api.sheetbest.com/sheets/19c0a01f-a275-46e9-b940-cdc8d8905aa6";

    try {
      const response = await fetch(sheetBestUrl, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([formData])
      });

      if (response.ok) {
        alert("Data berhasil dicatat ke Google Sheets!");
        setFormData({
          nama: '', telepon: '', lokasi: '', daya: '',
          idPelanggan: '', dayaExisting: '', dayaDimohon: '', keterangan: ''
        });
      } else {
        alert("Gagal mengirim data. Pastikan URL SheetBest benar.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan koneksi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* CSS Global untuk Smooth Scroll Browser */}
      <style dangerouslySetInnerHTML={{ __html: `
        html { scroll-behavior: smooth !important; }
        section { scroll-margin-top: 100px; }
      `}} />

      {/* 1. NAVBAR */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-yellow-400 text-blue-900 font-bold px-3 py-1 rounded text-xl">PLN</div>
            <div>
              <h1 className="text-blue-900 font-bold text-lg leading-none">Hospitality Partnership</h1>
              <p className="text-[10px] text-slate-500 uppercase tracking-widest">Smart Energy & EV Ecosystem</p>
            </div>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-blue-600">Beranda</a>
            <a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')} className="hover:text-blue-600">Pasang Baru</a>
            <a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')} className="hover:text-blue-600">Perubahan Daya</a>
            <a href="#spklu" onClick={(e) => scrollToSection(e, 'spklu')} className="hover:text-blue-600">SPKLU</a>
            <a href="#hotel" onClick={(e) => scrollToSection(e, 'hotel')} className="hover:text-blue-600">Hotel Mitra</a>
            <a href="#kontak" onClick={(e) => scrollToSection(e, 'kontak')} className="hover:text-blue-600">Partnership</a>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <header className="relative bg-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 via-blue-800 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2070" 
          alt="Resort" className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium mb-6 inline-block">⚡ EV Friendly Hospitality Ecosystem</span>
            <h1 className="text-5xl font-extrabold mb-6 leading-tight">Solusi Energi PLN untuk Bisnis, <span className="text-green-400">Hospitality</span>, dan <span className="text-yellow-400">Mobilitas EV</span></h1>
            <p className="text-lg text-blue-100 mb-8 leading-relaxed">Ajukan Pasang Baru, Perubahan Daya, konsultasi kelistrikan, hingga pembangunan SPKLU melalui kolaborasi resmi PLN.</p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')} className="bg-yellow-400 text-blue-900 font-bold px-8 py-4 rounded-xl shadow-lg hover:bg-yellow-300 transition">Ajukan Pasang Baru</a>
              <button onClick={(e) => scrollToSection(e, 'hotel')} className="bg-blue-800/50 backdrop-blur-sm border border-white/20 px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition">Cari Hotel EV Friendly</button>
            </div>
            
            {/* GRID NAVIGASI HERO (Diperbarui) */}
            <div className="grid grid-cols-4 gap-4">
               {/* Pasang Baru */}
               <div onClick={(e) => scrollToSection(e, 'layanan')} className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center shadow-lg cursor-pointer hover:bg-blue-50 transition">
                  <span className="text-orange-500 mb-1">⚡</span>
                  <span className="text-[10px] text-blue-900 font-bold text-center">Pasang Baru</span>
               </div>
               {/* Perubahan Daya */}
               <div onClick={(e) => scrollToSection(e, 'layanan')} className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center shadow-lg cursor-pointer hover:bg-blue-50 transition">
                  <span className="text-orange-500 mb-1">⚡</span>
                  <span className="text-[10px] text-blue-900 font-bold text-center">Perubahan Daya</span>
               </div>
               {/* SPKLU -> Ke Hotel Mitra */}
               <div onClick={(e) => scrollToSection(e, 'hotel')} className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center shadow-lg cursor-pointer hover:bg-blue-50 transition">
                  <span className="text-orange-500 mb-1">⚡</span>
                  <span className="text-[10px] text-blue-900 font-bold text-center">SPKLU</span>
               </div>
               {/* PLN Mobile -> Ke Store */}
               <div onClick={openPLNMobile} className="bg-white p-4 rounded-2xl flex flex-col items-center justify-center shadow-lg cursor-pointer hover:bg-blue-50 transition">
                  <span className="text-orange-500 mb-1">⚡</span>
                  <span className="text-[10px] text-blue-900 font-bold text-center">PLN Mobile</span>
               </div>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-green-400 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative bg-blue-800 p-3 rounded-[2.5rem] shadow-2xl">
              <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000" className="rounded-[2rem] w-full h-[400px] object-cover mb-4" alt="Hotel" />
              <div className="absolute bottom-10 left-10 right-10 bg-white p-6 rounded-2xl shadow-xl">
                  <h3 className="font-bold text-green-600 mb-3 flex items-center gap-2">🎁 Benefit Pengguna Website</h3>
                  <ul className="text-xs text-slate-600 space-y-2">
                    <li className="flex items-center gap-2">✅ Diskon charging SPKLU hotel mitra</li>
                    <li className="flex items-center gap-2">✅ Potongan harga kamar hotel</li>
                    <li className="flex items-center gap-2">✅ Promo F&B dan lounge hotel</li>
                    <li className="flex items-center gap-2">✅ Akses khusus via website partnership PLN</li>
                  </ul>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 3. STATS SECTION */}
      <section className="bg-[#1e293b] py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div><h4 className="text-4xl font-extrabold text-yellow-400">500+</h4><p className="text-slate-400 text-sm mt-2">Hotel Mitra EV Friendly</p></div>
          <div><h4 className="text-4xl font-extrabold text-yellow-400">1.200+</h4><p className="text-slate-400 text-sm mt-2">Lokasi SPKLU</p></div>
          <div><h4 className="text-4xl font-extrabold text-yellow-400">50.000+</h4><p className="text-slate-400 text-sm mt-2">Charging per Bulan</p></div>
          <div><h4 className="text-4xl font-extrabold text-yellow-400">1 Juta+</h4><p className="text-slate-400 text-sm mt-2">Pengguna PLN Mobile</p></div>
        </div>
      </section>

      {/* 4. FORM SECTION */}
      <section id="layanan" className="py-24 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12">
        {/* Pasang Baru */}
        <div>
          <h4 className="text-blue-600 font-bold mb-2">Layanan PLN</h4>
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Pengajuan Pasang Baru</h2>
          <form onSubmit={handleSubmit} className="bg-blue-50 p-8 rounded-[2rem] border border-blue-100 shadow-sm space-y-4">
              <input type="text" name="nama" placeholder="Nama Pelanggan" value={formData.nama} onChange={handleChange} className="w-full p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-400" required />
              <input type="text" name="telepon" placeholder="Nomor Telepon" value={formData.telepon} onChange={handleChange} className="w-full p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-400" required />
              <input type="text" name="lokasi" placeholder="Alamat Lokasi" value={formData.lokasi} onChange={handleChange} className="w-full p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-400" required />
              <select name="daya" value={formData.daya} onChange={handleChange} className="w-full p-4 rounded-xl border-none shadow-sm focus:ring-2 focus:ring-blue-400 text-slate-500">
                <option value="">Kebutuhan Daya</option>
                <option value="3500">3500 VA</option>
                <option value="4400">4400 VA</option>
                <option value="5500">5500 VA</option>
                <option value="6600">6600 VA</option>
                <option value="7700">7700 VA</option>
                <option value="11000">11000 VA</option>
                <option value="13200">13200 VA</option>
                <option value="16500">16500 VA</option>
                <option value="23000">23000 VA</option>
                <option value="33000">33000 VA</option>
                <option value="41500">41500 VA</option>
                <option value="53000">53000 VA</option>
                <option value="66000">66000 VA</option>
                <option value="82500">82500 VA</option>
                <option value="105000">105000 VA</option>
                <option value="131000">131000 VA</option>
                <option value="147000">147000 VA</option>
                <option value="164000">164000 VA</option>
                <option value="197000">197000 VA</option>
                <option value="240000">240000 VA</option>
                <option value="315000">315000 VA</option>
                <option value="345000">345000 VA</option>
                <option value="415000">415000 VA</option>
                <option value="555000">555000 VA</option>
                <option value="690000">690000 VA</option>
                <option value="865000">865000 VA</option>
                <option value="1110000">1110000 VA</option>
              </select>
              <div className="bg-yellow-100 p-4 rounded-xl text-[11px] text-yellow-800 leading-relaxed">
                💡 Informasi biaya Pasang Baru akan dikonsultasikan melalui WhatsApp atau PLN Mobile.
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button type="submit" disabled={isSubmitting} className="py-4 bg-blue-900 text-white font-bold rounded-xl shadow-lg hover:bg-blue-800 transition">
                  {isSubmitting ? "Mengirim..." : "Kirim Data"}
                </button>
                {/* AKSI KE STORE */}
                <button type="button" onClick={openPLNMobile} className="py-4 bg-white border border-blue-200 text-blue-900 font-bold rounded-xl hover:bg-slate-50 transition">Buka PLN Mobile</button>
              </div>
          </form>
        </div>

        {/* Perubahan Daya */}
        <div>
          <h4 className="text-blue-600 font-bold mb-2">Existing Customer</h4>
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Pengajuan Perubahan Daya</h2>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-xl mt-8 space-y-4">
              <input type="text" name="idPelanggan" placeholder="ID Pelanggan" value={formData.idPelanggan} onChange={handleChange} className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50" required />
              <input type="text" name="dayaExisting" placeholder="Daya Existing" value={formData.dayaExisting} onChange={handleChange} className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50" />
              <input type="text" name="dayaDimohon" placeholder="Daya yang Dimohonkan" value={formData.dayaDimohon} onChange={handleChange} className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50" />
              <textarea name="keterangan" placeholder="Keterangan kebutuhan tambahan daya" value={formData.keterangan} onChange={handleChange} className="w-full p-4 rounded-xl border border-slate-100 bg-slate-50 h-32"></textarea>
              <div className="bg-green-100 p-4 rounded-xl text-[11px] text-green-800 leading-relaxed">
                ⚡ Informasi biaya Perubahan Daya akan disesuaikan dengan daya existing dan daya permohonan.
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button type="submit" disabled={isSubmitting} className="py-4 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-500 transition">
                   {isSubmitting ? "Mengirim..." : "Kirim Data"}
                </button>
                {/* AKSI KE STORE */}
                <button type="button" onClick={openPLNMobile} className="py-4 bg-white border border-green-200 text-green-700 font-bold rounded-xl hover:bg-slate-50 transition">Akses PLN Mobile</button>
              </div>
          </form>
        </div>
      </section>

      {/* 5. HOTEL MITRA SECTION */}
      <section id="hotel" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h4 className="text-blue-600 font-bold mb-2">Hotel Mitra PLN</h4>
              <h2 className="text-4xl font-bold text-blue-900">Menginap Nyaman, Charging Lebih Hemat</h2>
            </div>
            <button className="bg-blue-900 text-white px-6 py-3 rounded-xl font-bold">Lihat Semua Hotel</button>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { nama: 'Green Hill Sibolangit', harga: '850.000', img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=500' },
              { nama: 'Hotel Sibayak International', harga: '1.250.000', img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500' },
              { nama: 'Mikie Holiday Resort', harga: '1.450.000', img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500' },
              { nama: 'Beristera Dairi Hotel', harga: '950.000', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500' },
            ].map((hotel) => (
              <div key={hotel.nama} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group hover:shadow-xl transition-all duration-300">
                <img src={hotel.img} className="w-full h-48 object-cover group-hover:scale-105 transition duration-500" alt={hotel.nama} />
                <div className="p-6">
                  <span className="bg-green-100 text-green-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">EV Friendly Hotel</span>
                  <h5 className="font-bold text-blue-900 mt-4 mb-3">{hotel.nama}</h5>
                  <ul className="text-[10px] text-slate-500 space-y-2 mb-6">
                    <li>⚡ Tersedia SPKLU PLN</li>
                    <li>🏨 Diskon kamar via website partnership</li>
                    <li>☕ Diskon F&B pengguna charging</li>
                    <li>📱 Integrasi PLN Mobile</li>
                  </ul>
                  <div className="flex justify-between items-center pt-4 border-t border-slate-50">
                    <div>
                       <p className="text-[10px] text-slate-400">Mulai dari</p>
                       <p className="font-bold text-blue-900">Rp{hotel.harga}</p>
                    </div>
                    <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm font-bold">Booking</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SPKLU SECTION */}
      <section id="spklu" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h4 className="text-blue-600 font-bold mb-2">Infrastruktur EV</h4>
          <h2 className="text-4xl font-bold text-blue-900 mb-4">Pembangunan SPKLU PLN</h2>
          <p className="text-slate-500 mb-16 max-w-2xl mx-auto">Kolaborasi pembangunan SPKLU di lokasi perhotelan untuk mendukung ekosistem kendaraan listrik nasional.</p>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-blue-50/50 p-10 rounded-3xl border border-blue-100">
              <h5 className="text-blue-600 font-bold mb-4 text-sm">Standard Charger</h5>
              <h3 className="text-4xl font-black text-blue-900 mb-8">7 KW</h3>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-xs text-slate-400 mb-1">Charging Fee</p>
                <p className="text-2xl font-bold text-blue-900">Rp2.466/kWh</p>
              </div>
            </div>
            <div className="bg-blue-50/50 p-10 rounded-3xl border border-blue-100">
              <h5 className="text-blue-600 font-bold mb-4 text-sm">Fast Charger</h5>
              <h3 className="text-4xl font-black text-blue-900 mb-8">{">"}22 - 50 KW</h3>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-xs text-slate-400 mb-1">Charging Fee</p>
                <p className="text-2xl font-bold text-blue-900">Rp3.400/kWh</p>
              </div>
            </div>
            <div className="bg-blue-50/50 p-10 rounded-3xl border border-blue-100">
              <h5 className="text-blue-600 font-bold mb-4 text-sm">Ultra Fast Charger</h5>
              <h3 className="text-4xl font-black text-blue-900 mb-8">{">"}100 KW</h3>
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <p className="text-xs text-slate-400 mb-1">Charging Fee</p>
                <p className="text-2xl font-bold text-blue-900">Rp3.600/kWh</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SKEMA KERJA SAMA */}
      <section className="py-24 bg-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h4 className="text-yellow-400 font-bold mb-2 text-sm uppercase tracking-widest">Partnership Scheme</h4>
          <h2 className="text-5xl font-black mb-6">Skema Kerja Sama SPKLU</h2>
          <p className="text-blue-300 mb-16">Fleksibilitas kolaborasi antara PLN dan Mitra Perhotelan dalam pengembangan SPKLU serta revenue sharing.</p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-left hover:bg-white/10 transition">
              <h5 className="text-yellow-400 font-bold mb-4">Skema 1</h5>
              <p className="text-blue-100 mb-8">Mitra menyediakan lahan, PLN menyediakan charger set.</p>
              <span className="bg-yellow-400 text-blue-950 px-6 py-3 rounded-xl font-bold">PLN {">"}75% | Mitra {"<"}25%</span>
            </div>
            <div className="bg-white/5 border border-white/10 p-10 rounded-3xl text-left hover:bg-white/10 transition">
              <h5 className="text-yellow-400 font-bold mb-4">Skema 2</h5>
              <p className="text-blue-100 mb-8">Mitra menyediakan lahan dan charger set.</p>
              <span className="bg-yellow-400 text-blue-950 px-6 py-3 rounded-xl font-bold">Mitra {">"}98% | PLN 2%</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer id="kontak" className="bg-[#0f172a] text-white pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white text-slate-900 p-12 rounded-[3rem] mb-20 flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="max-w-md">
              <h2 className="text-4xl font-black mb-4 leading-tight">Konsultasi Partnership SPKLU</h2>
              <p className="text-slate-500 mb-8">Bangun SPKLU di lokasi hotel Anda dan dapatkan potensi revenue tambahan dari ekosistem kendaraan listrik.</p>
              <div className="flex gap-4">
                <a href="https://wa.me/628116221288" target="_blank" rel="noreferrer" className="bg-green-600 text-white px-6 py-4 rounded-xl font-bold">WhatsApp 08116221288</a>
                <button onClick={openPLNMobile} className="bg-blue-900 text-white px-6 py-4 rounded-xl font-bold">Download PLN Mobile</button>
              </div>
            </div>
            <div className="w-full md:w-96 space-y-4">
               {['Pasang Baru', 'Perubahan Daya', 'SPKLU Partnership', 'Hotel Promotion'].map(label => (
                 <div key={label} className="bg-slate-50 p-4 rounded-xl flex justify-between items-center border border-slate-100">
                    <span className="font-bold text-slate-700">{label}</span>
                    <span className="text-[10px] font-bold text-blue-600 uppercase">Available</span>
                 </div>
               ))}
            </div>
          </div>
          
          <div className="grid md:grid-cols-4 gap-12 border-b border-white/10 pb-16">
            <div className="col-span-2">
              <h2 className="text-2xl font-bold text-yellow-400 mb-6">PLN Hospitality</h2>
              <p className="text-slate-400 leading-relaxed max-w-sm">Kolaborasi PLN dan sektor hospitality untuk mendukung layanan kelistrikan, kendaraan listrik, dan ekosistem EV Friendly Hotel di Indonesia.</p>
            </div>
            <div>
              <h4 className="font-bold mb-6">Layanan PLN</h4>
              <ul className="text-slate-400 space-y-3 text-sm">
                <li><a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')} className="hover:text-white">Pasang Baru</a></li>
                <li><a href="#layanan" onClick={(e) => scrollToSection(e, 'layanan')} className="hover:text-white">Perubahan Daya</a></li>
                <li><button onClick={openPLNMobile} className="hover:text-white text-left">PLN Mobile</button></li>
                <li><a href="#spklu" onClick={(e) => scrollToSection(e, 'spklu')} className="hover:text-white">SPKLU Partnership</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">Kontak</h4>
              <ul className="text-slate-400 space-y-3 text-sm">
                <li>WhatsApp: 08116221288</li>
                <li>Email: partnership@pln.co.id</li>
                <li>PLN Mobile Available</li>
              </ul>
            </div>
          </div>
          <p className="text-center text-slate-500 text-xs mt-12">©️ 2026 PT PLN (Persero). All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}