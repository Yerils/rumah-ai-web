"use client";

import { useState, useEffect } from "react";

export default function Home() {
  // State Tema (Light/Dark)
  const [theme, setTheme] = useState("dark");

  // State untuk form simulasi
  const [income, setIncome] = useState("");
  const [dp, setDp] = useState("");
  const [tenor, setTenor] = useState(15);
  const [bunga, setBunga] = useState(9);
  const [hasil, setHasil] = useState(null);

  // State untuk UI
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Toggle Tema
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Format Rupiah
  const fmtRp = (n) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(Math.round(n));
  };

  // Logika Kalkulator KPR (Anuitas)
  const hitungPokok = (c, b, t) => {
    const r = b / 100 / 12;
    const n = t * 12;
    if (r === 0) return c * n;
    return (c * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
  };

  const hitung = () => {
    const numIncome = Number(income);
    const numDp = Number(dp);

    if (!numIncome || !numDp) {
      setHasil("Data belum lengkap. Isi penghasilan dan DP terlebih dahulu.");
      return;
    }

    const cicilan = numIncome * 0.3; // Asumsi batas aman 30%
    const pokok = hitungPokok(cicilan, bunga, tenor);
    const totalHarga = pokok + numDp;
    const totalBunga = Math.max(0, cicilan * tenor * 12 - pokok);

    setHasil({
      cicilan,
      pokok,
      totalHarga,
      totalBunga,
      dp: numDp,
    });
  };

  // Efek Animasi
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    document.querySelectorAll(".r").forEach((el) => obs.observe(el));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      obs.disconnect();
    };
  }, []);

  return (
    <div className={theme}>
      <style dangerouslySetInnerHTML={{ __html: `
        .dark {
          --bg:#0D0D0D;--bg2:#161616;--bg3:#1E1E1E;
          --gold:#D4A843;--gold2:#F2CB6B;--gold3:#8A6A1F;
          --text:#F0EBE0;--text2:#9A9080;--text3:#5C5650;
          --border:rgba(212,168,67,.18);--border2:rgba(240,235,224,.08);
          --green:#25D366;--green2:#1DB954;
        }
        .light {
          --bg:#F9F9F9;--bg2:#FFFFFF;--bg3:#F0F0F0;
          --gold:#D4A843;--gold2:#B8860B;--gold3:#8A6A1F;
          --text:#1A1A1A;--text2:#4A4A4A;--text3:#7A7A7A;
          --border:rgba(212,168,67,.4);--border2:rgba(0,0,0,.1);
          --green:#25D366;--green2:#1DB954;
        }
        
        :root {
          --font-d:'Playfair Display',Georgia,serif;
          --font-b:'Plus Jakarta Sans','Segoe UI',sans-serif;
          --r:12px;--r2:20px;
        }
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth;font-size:16px}
        body{font-family:var(--font-b);background:var(--bg);color:var(--text);overflow-x:hidden;line-height:1.6; transition: background 0.4s, color 0.4s;}
        a{text-decoration:none;color:inherit}
        img{display:block;max-width:100%}

        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:var(--bg)}
        ::-webkit-scrollbar-thumb{background:var(--gold3);border-radius:99px}

        #nav{position:fixed;top:0;left:0;right:0;z-index:500;padding:0 60px;height:72px;
          display:flex;align-items:center;justify-content:space-between;
          transition:background .4s,border-color .4s;border-bottom:1px solid transparent}
        #nav.scrolled{background:var(--bg);border-color:var(--border2);backdrop-filter:blur(12px)}
        .nav-logo{font-family:var(--font-d);font-size:22px;font-weight:800;color:var(--text);letter-spacing:-.3px; text-transform:uppercase;}
        .nav-logo span{color:var(--gold)}
        .nav-links{display:flex;align-items:center;gap:36px}
        .nav-links a{font-size:14px;font-weight:500;color:var(--text2);transition:color .2s}
        .nav-links a:hover{color:var(--text)}
        
        .theme-btn {
          background: var(--bg2); border: 1px solid var(--border2); color: var(--text);
          padding: 8px 12px; border-radius: 8px; cursor: pointer; display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s; font-size: 16px;
        }
        .theme-btn:hover { transform: scale(1.05); }

        .nav-btn{background:var(--gold);color:#0D0D0D!important;padding:10px 24px;border-radius:8px;
          font-weight:700;font-size:14px;transition:opacity .2s,transform .2s}
        .nav-btn:hover{opacity:.9;transform:translateY(-1px)}
        .hamburger{display:none;flex-direction:column;gap:5px;background:none;border:none;
          cursor:pointer;padding:6px;color:var(--text)}
        .hamburger span{display:block;width:22px;height:1.5px;background:currentColor;
          border-radius:2px;transition:transform .3s,opacity .3s}
        .hamburger.open span:nth-child(1){transform:rotate(45deg) translate(4.5px,4.5px)}
        .hamburger.open span:nth-child(2){opacity:0}
        .hamburger.open span:nth-child(3){transform:rotate(-45deg) translate(4.5px,-4.5px)}
        
        #mobile-menu{position:fixed;top:72px;left:0;right:0;z-index:490;
          background:var(--bg);backdrop-filter:blur(16px);
          border-bottom:1px solid var(--border2);
          max-height:0;overflow:hidden;transition:max-height .35s ease,opacity .3s}
        #mobile-menu.open{max-height:400px;opacity:1}
        #mobile-menu a{display:block;padding:16px 28px;font-size:15px;font-weight:500;
          color:var(--text2);border-bottom:1px solid var(--border2);transition:color .2s}
        #mobile-menu a:hover{color:var(--text)}

        #hero{position:relative;min-height:100svh;display:flex;flex-direction:column;
          justify-content:center;align-items:center;overflow:hidden;padding-top:72px}
        .hero-bg{position:absolute;inset:0}
        .hero-bg img{width:100%;height:100%;object-fit:cover;filter:brightness(.45)}
        .hero-noise{position:absolute;inset:0;
          background:repeating-linear-gradient(0deg,rgba(0,0,0,.03) 0px,rgba(0,0,0,.03) 1px,transparent 1px,transparent 2px);
          pointer-events:none}
        .hero-vignette{position:absolute;inset:0;
          background:radial-gradient(ellipse at center,transparent 40%,rgba(0,0,0,.7) 100%);
          pointer-events:none}
        .hero-inner{position:relative;z-index:2;text-align:center;max-width:820px;padding:0 24px}
        .hero-pill{display:inline-flex;align-items:center;gap:8px;
          border:1px solid rgba(212,168,67,.4);border-radius:99px;
          padding:6px 18px;font-size:12px;font-weight:600;
          color:#F2CB6B;letter-spacing:1px;text-transform:uppercase;
          margin-bottom:28px;opacity:0;animation:fadeUp .6s .2s ease forwards}
        .hero-pulse{width:6px;height:6px;border-radius:50%;background:var(--gold);
          animation:pulse 2s infinite}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.4;transform:scale(.8)}}
        .hero-h1{font-family:var(--font-d);font-size:64px;font-weight:800; color: #fff;
          line-height:1.02;letter-spacing:-1px;margin-bottom:24px; text-transform:uppercase;
          opacity:0;animation:fadeUp .8s .4s ease forwards}
        .hero-h1 em{color:var(--gold);font-style:italic}
        .hero-h1 .line2{display:block;font-size:.65em;font-weight:700;letter-spacing:0px;
          color:#ddd; margin-top: 8px;}
        .hero-sub{font-size:17px;color:#eee;line-height:1.7;margin-bottom:40px;
          max-width:600px;margin-left:auto;margin-right:auto; font-weight: 500;
          opacity:0;animation:fadeUp .6s .65s ease forwards}
        .hero-ctas{display:flex;gap:14px;justify-content:center;flex-wrap:wrap;
          opacity:0;animation:fadeUp .6s .85s ease forwards}
        .btn-primary{background:var(--gold);color:#0D0D0D;padding:15px 34px;
          border-radius:10px;font-weight:700;font-size:15px;
          transition:transform .2s,opacity .2s;display:inline-block;
          font-family:var(--font-b)}
        .btn-primary:hover{transform:translateY(-3px);opacity:.92}
        .btn-outline{background:transparent;color:#fff;padding:15px 34px;
          border-radius:10px;font-weight:600;font-size:15px;
          border:1px solid rgba(255,255,255,.4);
          transition:background .2s,border-color .2s;display:inline-block}
        .btn-outline:hover{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.8)}

        @keyframes fadeUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}

        .r{opacity:0;transform:translateY(30px);transition:opacity .7s ease,transform .7s ease}
        .r.show{opacity:1;transform:translateY(0)}
        .r.d1{transition-delay:.05s}.r.d2{transition-delay:.15s}
        .r.d3{transition-delay:.25s}.r.d4{transition-delay:.35s}

        .sec{padding:100px 60px}
        .inner{max-width:1140px;margin:0 auto}
        .eyebrow{font-size:11px;font-weight:700;color:var(--gold);letter-spacing:3px;
          text-transform:uppercase;margin-bottom:14px}
        .sec-title{font-family:var(--font-d);font-size:52px;font-weight:800;
          color:var(--text);line-height:1.1;letter-spacing:-1px}
        .sec-sub{font-size:15px;color:var(--text2);line-height:1.75;margin-top:14px}

        #tentang{background:var(--bg)}
        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:center;margin-top:0}
        .about-left{position:relative}
        .about-img-main{width:100%;height:auto;object-fit:contain;border-radius:var(--r2); border:1px solid var(--border2);}
        
        .feat-list{display:flex;flex-direction:column;gap:16px;margin-top:36px}
        .feat-item{display:flex;gap:16px;align-items:flex-start;
          padding:20px;background:var(--bg2);border-radius:var(--r);
          border:1px solid var(--border2);transition:border-color .25s}
        .feat-item:hover{border-color:var(--border)}
        .feat-ic{width:44px;height:44px;min-width:44px;border-radius:10px;
          background:rgba(212,168,67,.1);border:1px solid var(--border);
          display:flex;align-items:center;justify-content:center;font-size:18px}
        .feat-text h4{font-size:15px;font-weight:700;color:var(--text);margin-bottom:4px}
        .feat-text p{font-size:13px;color:var(--text2);line-height:1.6}

        #simulasi{background:var(--bg2)}
        .sim-wrap{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:start;margin-top:56px}
        .sim-form-card{background:var(--bg);border-radius:var(--r2);padding:36px;
          border:1px solid var(--border2)}
        .flabel{font-size:11px;font-weight:700;color:var(--text2);text-transform:uppercase;
          letter-spacing:1.2px;margin-bottom:10px;display:block}
        .fwrap{margin-bottom:24px}
        .inp-box{position:relative}
        .inp-pfx{position:absolute;left:16px;top:50%;transform:translateY(-50%);
          font-size:13px;color:var(--text2);font-weight:600;pointer-events:none}
        .inp{width:100%;background:var(--bg2);border:1.5px solid var(--border2);
          border-radius:10px;padding:14px 16px 14px 44px;
          font-size:15px;font-family:var(--font-b);color:var(--text);outline:none;
          transition:border-color .2s,box-shadow .2s}
        .inp:focus{border-color:var(--gold);box-shadow:0 0 0 3px rgba(212,168,67,.12)}
        .inp::placeholder{color:var(--text3)}
        .sld-row{display:flex;justify-content:space-between;font-size:11px;
          color:var(--text3);margin-top:6px}
        input[type=range]{width:100%;accent-color:var(--gold);cursor:pointer;height:4px}
        .btn-calc{width:100%;background:var(--gold);color:#0D0D0D;padding:16px;
          border:none;border-radius:12px;font-size:15px;font-weight:700;
          font-family:var(--font-b);cursor:pointer;transition:opacity .2s,transform .15s;
          letter-spacing:.2px}
        .btn-calc:hover{opacity:.9;transform:translateY(-1px)}
        .btn-calc:active{transform:scale(.98)}

        .res-empty{border:1.5px dashed var(--border2);border-radius:var(--r2);
          padding:60px 32px;text-align:center}
        .res-empty-ico{font-size:52px;margin-bottom:16px;display:block}
        .res-empty-ttl{font-size:17px;font-weight:700;color:var(--text);margin-bottom:8px}
        .res-empty-sub{font-size:13px;color:var(--text2);line-height:1.6}

        .res-hero{background:linear-gradient(135deg,var(--gold3) 0%,#6B4F10 100%);
          border-radius:var(--r2);padding:28px 28px 24px;margin-bottom:16px;
          border:1px solid var(--gold)}
        .res-tag{font-size:11px;font-weight:700;color:rgba(255,255,255,.7);
          text-transform:uppercase;letter-spacing:1.5px;margin-bottom:8px}
        .res-big{font-family:var(--font-d);font-size:42px;font-weight:800;
          color:var(--gold2);letter-spacing:-1px;line-height:1}
        .res-note{font-size:13px;color:rgba(255,255,255,.7);margin-top:8px}
        .res-cards{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-bottom:16px}
        .rcard{background:var(--bg);border-radius:var(--r);padding:18px;
          border:1px solid var(--border2)}
        .rcard-lbl{font-size:11px;color:var(--text2);font-weight:600;text-transform:uppercase;
          letter-spacing:.8px;margin-bottom:8px}
        .rcard-val{font-size:20px;font-weight:800;color:var(--text)}
        .rcard-sub{font-size:11px;color:var(--text2);margin-top:4px}
        .prog-box{background:rgba(37,211,102,.1);border:1px solid rgba(37,211,102,.3);
          border-radius:var(--r);padding:18px;margin-bottom:14px}
        .prog-top{display:flex;justify-content:space-between;margin-bottom:10px}
        .prog-lbl{font-size:13px;color:var(--green);font-weight:600}
        .prog-pct{font-size:14px;font-weight:800;color:var(--green)}
        .prog-track{height:6px;background:rgba(37,211,102,.2);border-radius:99px;overflow:hidden}
        .prog-fill{height:100%;border-radius:99px;background:var(--green);transition:width .9s ease}
        .prog-note{font-size:12px;color:var(--green);margin-top:7px}
        .res-disc{font-size:12px;color:var(--text2);line-height:1.65;
          padding-top:14px;border-top:1px solid var(--border2)}

        #properti{background:var(--bg3)}
        .prop-header{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:52px}
        .see-all{font-size:14px;font-weight:600;color:var(--gold);
          border-bottom:1px solid var(--border);padding-bottom:3px;
          transition:border-color .2s}
        .see-all:hover{border-color:var(--gold)}
        .prop-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px}
        
        .pcard{background:var(--bg2);border-radius:var(--r2);overflow:hidden;
          border:1px solid var(--border2);transition:transform .35s,border-color .35s}
        .pcard:hover{transform:translateY(-8px);border-color:var(--border)}
        .pcard-img{position:relative;height:280px;overflow:hidden; background: var(--bg);}
        .pcard-img img{width:100%;height:100%;object-fit:cover;transition:transform .6s}
        .pcard:hover .pcard-img img{transform:scale(1.07)}
        .pcard-badge{position:absolute;top:16px;left:16px;color:#0D0D0D;
          font-size:11px;font-weight:800;padding:5px 14px;border-radius:99px;letter-spacing:.3px}
        .pcard-type{position:absolute;top:16px;right:16px;
          background:rgba(0,0,0,.85);color:#fff;
          font-size:11px;font-weight:600;padding:5px 11px;border-radius:6px}
        .pcard-body{padding:24px}
        .pcard-name{font-family:var(--font-d);font-size:22px;font-weight:800;
          color:var(--text);margin-bottom:8px}
        .pcard-desc{font-size:13px;color:var(--text2);line-height:1.65;margin-bottom:16px}
        .pcard-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
        .ptag{background:var(--bg3);color:var(--text2);font-size:12px;font-weight:600;
          padding:5px 12px;border-radius:6px;border:1px solid var(--border2)}
        .pcard-foot{display:flex;justify-content:space-between;align-items:flex-end;
          padding-top:18px;border-top:1px solid var(--border2)}
        .pcard-harga{font-family:var(--font-d);font-size:22px;font-weight:800;color:var(--gold)}
        .pcard-cicilan{font-size:12px;color:var(--text2);margin-top:3px}
        .btn-det{background:transparent;color:var(--gold);border:1px solid var(--border);
          padding:9px 18px;border-radius:8px;font-size:13px;font-weight:600;
          font-family:var(--font-b);cursor:pointer;transition:background .2s,border-color .2s}
        .btn-det:hover{background:rgba(212,168,67,.08);border-color:var(--gold)}

        .pcard.soon { opacity: 0.6; filter: grayscale(80%); pointer-events: none; }
        .pcard.soon .pcard-badge { background: var(--text3); color: #fff; }

        #siteplan{background:var(--bg)}
        .sp-head { text-align: center; margin-bottom: 40px; }
        .sp-wrap { padding: 12px; background: var(--bg2); border: 1px solid var(--border2); border-radius: var(--r2); transition: transform 0.3s ease; cursor: pointer; }
        .sp-wrap img { width: 100%; height: auto; border-radius: var(--r); }
        .sp-wrap:hover { transform: scale(1.02); border-color: var(--gold); }

        #lokasi{background:var(--bg2)}
        .loc-grid{display:grid;grid-template-columns:1fr 1.5fr;gap:60px;align-items:center}
        .loc-acc{display:flex;flex-direction:column;gap:10px;margin:28px 0}
        .loc-row{display:flex;justify-content:space-between;align-items:center;
          padding:12px 18px;background:var(--bg);border-radius:var(--r);
          border:1px solid var(--border2)}
        .loc-row span{font-size:14px;color:var(--text2)}
        .loc-row strong{font-size:14px;color:var(--gold);font-weight:700}
        .btn-wa{display:inline-flex;align-items:center;gap:10px;
          background:var(--green);color:#fff;padding:14px 26px;border-radius:10px;
          font-weight:700;font-size:14px;font-family:var(--font-b);transition:background .2s; border:none;}
        .btn-wa:hover{background:var(--green2)}
        .map-wrap{border-radius:var(--r2);overflow:hidden;height:460px;
          border:1px solid var(--border2)}
        .map-wrap iframe{width:100%;height:100%;border:none;display:block}

        #cta{background:var(--bg);border-top:1px solid var(--border2);padding:90px 60px;text-align:center}
        .cta-label{font-size:11px;font-weight:700;color:var(--gold);
          letter-spacing:3px;text-transform:uppercase;margin-bottom:16px}
        .cta-title{font-family:var(--font-d);font-size:56px;font-weight:800;
          color:var(--text);letter-spacing:-2px;line-height:1.05;margin-bottom:16px}
        .cta-sub{font-size:16px;color:var(--text2);margin-bottom:36px;max-width:460px;margin-left:auto;margin-right:auto}

        footer{background:var(--bg2);border-top:1px solid var(--border2);
          padding:28px 60px;display:flex;justify-content:space-between;
          align-items:center;flex-wrap:wrap;gap:16px}
        .f-logo{font-family:var(--font-d);font-size:20px;font-weight:800;color:var(--text); text-transform:uppercase;}
        .f-logo span{color:var(--gold)}
        .f-copy{font-size:13px;color:var(--text3)}
        .f-links{display:flex;gap:24px}
        .f-links a{font-size:13px;color:var(--text3);transition:color .2s}
        .f-links a:hover{color:var(--text2)}

        .fab{position:fixed;bottom:28px;right:28px;z-index:600;width:60px;height:60px;
          background:var(--green);border-radius:50%;display:flex;align-items:center;
          justify-content:center;box-shadow:0 10px 30px rgba(37,211,102,.35);
          transition:transform .25s,box-shadow .25s}
        .fab:hover{transform:scale(1.1) translateY(-2px);box-shadow:0 16px 40px rgba(37,211,102,.45)}

        @media(max-width:1024px){
          .hero-h1{font-size:48px}
          .sec-title{font-size:42px}
          .about-grid{grid-template-columns:1fr}
          .about-img-main{aspect-ratio:16/9; object-fit:cover;}
          .prop-grid{grid-template-columns:1fr 1fr}
          .loc-grid{grid-template-columns:1fr}
          .map-wrap{height:340px}
          .cta-title{font-size:44px}
        }
        @media(max-width:768px){
          #nav{padding:0 20px}
          .nav-links{display:none}
          .hamburger{display:flex}
          .hero-h1{font-size:36px;letter-spacing:-1px}
          .hero-h1 .line2{font-size:.9em}
          .hero-sub{font-size:15px}
          .btn-primary,.btn-outline{width:100%;text-align:center;max-width:320px;padding:14px 28px}
          .sec{padding:64px 20px}
          .sec-title{font-size:32px}
          .sim-wrap{grid-template-columns:1fr}
          .prop-grid{grid-template-columns:1fr}
          .prop-header{flex-direction:column;align-items:flex-start;gap:14px}
          .loc-acc{display:grid;grid-template-columns:1fr 1fr}
          .cta-title{font-size:32px}
          footer{flex-direction:column;text-align:center;padding:24px 20px}
          .f-links{justify-content:center;flex-wrap:wrap}
          .fab{bottom:20px;right:20px;width:54px;height:54px}
        }
        @media(max-width:480px){
          .hero-h1{font-size:28px}
          .hero-pill{font-size:11px;padding:5px 14px}
          .res-cards{grid-template-columns:1fr}
          .loc-acc{grid-template-columns:1fr}
        }
      `}} />

      {/* NAV */}
      <nav id="nav" className={scrolled ? "scrolled" : ""}>
        <div className="nav-logo">
          GOLDEN <span>PHINISI</span>
        </div>
        <div className="nav-links">
          <button onClick={toggleTheme} className="theme-btn" aria-label="Toggle Theme">
            {theme === "dark" ? "☀️ Mode Pagi" : "🌙 Mode Malam"}
          </button>
          <a href="#tentang">Tentang</a>
          <a href="#simulasi">Simulasi</a>
          <a href="#properti">Properti</a>
          <a href="#siteplan">Site Plan</a>
          <a href="#lokasi">Lokasi</a>
        </div>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button onClick={toggleTheme} className="theme-btn md:hidden" aria-label="Toggle Theme" style={{ padding: '6px' }}>
            {theme === "dark" ? "☀️" : "🌙"}
          </button>
          <button
            className={`hamburger ${menuOpen ? "open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div id="mobile-menu" className={menuOpen ? "open" : ""}>
        <a href="#tentang" onClick={() => setMenuOpen(false)}>Tentang</a>
        <a href="#simulasi" onClick={() => setMenuOpen(false)}>Simulasi</a>
        <a href="#properti" onClick={() => setMenuOpen(false)}>Properti</a>
        <a href="#siteplan" onClick={() => setMenuOpen(false)}>Site Plan</a>
        <a href="#lokasi" onClick={() => setMenuOpen(false)}>Lokasi</a>
      </div>

      {/* HERO */}
      <section id="hero">
        <div className="hero-bg">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=80"
            alt="Hero"
          />
          <div className="hero-noise"></div>
          <div className="hero-vignette"></div>
        </div>
        <div className="hero-inner">
          <div className="hero-pill">
            <span className="hero-pulse"></span>
            Perumahan Pilihan 2026
          </div>
          <h1 className="hero-h1">
            HUNIAN NYAMAN<br />
            <em>INVESTASI AMAN</em>
            <span className="line2">Nyaman Di Huni Hari Ini, Menguntungkan Di Masa Depan</span>
          </h1>
          <p className="hero-sub">
            Simulasi KPR akurat berbasis formula bank, rekomendasi properti terpercaya, dan kemudahan proses dari satu tempat.
          </p>
          <div className="hero-ctas">
            <a href="#simulasi" className="btn-primary">Hitung Kemampuan Saya</a>
            <a href="#properti" className="btn-outline">Lihat Properti</a>
          </div>
        </div>
      </section>

      {/* TENTANG */}
      <section id="tentang" className="sec">
        <div className="inner">
          <div className="about-grid">
            <div className="about-left r d1">
              <img
                className="about-img-main"
                src="/promo-2.jpg"
                alt="Promo Golden Phinisi - Keluarga Bahagia"
              />
            </div>
            <div className="about-right">
              <p className="eyebrow r d1">Mengapa Pilih Kami?</p>
              <h2 className="sec-title r d2">
                Hunian yang tepat,<br />di tangan yang tepat.
              </h2>
              <p className="sec-sub r d3">
                Kami hadir untuk memberikan kenyamanan dan keamanan bagi Anda dan keluarga, memastikan investasi masa depan Anda terjaga dengan baik.
              </p>
              <div className="feat-list">
                <div className="feat-item r d2">
                  <div className="feat-ic">💧</div>
                  <div className="feat-text">
                    <h4>Bebas Banjir</h4>
                    <p>Kawasan dibangun dengan sistem resapan air dan drainase yang sangat baik, menjamin hunian Anda aman di segala cuaca.</p>
                  </div>
                </div>
                <div className="feat-item r d3">
                  <div className="feat-ic">🏡</div>
                  <div className="feat-text">
                    <h4>Lingkungan Ramah Anak</h4>
                    <p>Area kawasan yang dirancang secara khusus untuk keamanan dan kenyamanan tumbuh kembang buah hati Anda.</p>
                  </div>
                </div>
                <div className="feat-item r d4">
                  <div className="feat-ic">🍃</div>
                  <div className="feat-text">
                    <h4>Udara Sejuk & Hijau</h4>
                    <p>Nikmati lingkungan yang asri dengan banyak pepohonan, memberikan sirkulasi udara bersih dan sehat setiap harinya.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SIMULASI */}
      <section id="simulasi" className="sec">
        <div className="inner">
          <div className="r d1">
            <p className="eyebrow">Kalkulator KPR</p>
          </div>
          <h2 className="sec-title r d2">
            Hitung kemampuan<br />finansial kamu
          </h2>
          <p className="sec-sub r d3" style={{ maxWidth: "500px" }}>
            Formula anuitas standar bank — bukan perhitungan cicilan flat yang tidak mencerminkan kondisi nyata.
          </p>
          <div className="sim-wrap">
            <div className="sim-form-card r d2">
              <div className="fwrap">
                <label className="flabel">Penghasilan bersih / bulan</label>
                <div className="inp-box">
                  <span className="inp-pfx">Rp</span>
                  <input className="inp" type="number" placeholder="8000000" value={income} onChange={(e) => setIncome(e.target.value)} />
                </div>
              </div>
              <div className="fwrap">
                <label className="flabel">Down payment (DP) tersedia</label>
                <div className="inp-box">
                  <span className="inp-pfx">Rp</span>
                  <input className="inp" type="number" placeholder="50000000" value={dp} onChange={(e) => setDp(e.target.value)} />
                </div>
              </div>
              <div className="fwrap">
                <label className="flabel">
                  Tenor: <span style={{ color: "var(--gold)" }}>{tenor} tahun</span>
                </label>
                <input type="range" min="5" max="30" step="5" value={tenor} onChange={(e) => setTenor(Number(e.target.value))} />
                <div className="sld-row">
                  <span>5th</span><span>10th</span><span>15th</span><span>20th</span><span>25th</span><span>30th</span>
                </div>
              </div>
              <div className="fwrap">
                <label className="flabel">
                  Suku bunga / tahun: <span style={{ color: "var(--gold)" }}>{bunga}%</span>
                </label>
                <input type="range" min="6" max="14" step="0.5" value={bunga} onChange={(e) => setBunga(Number(e.target.value))} />
                <div className="sld-row">
                  <span>6%</span><span style={{ color: "var(--gold)" }}>rata-rata ~9–11%</span><span>14%</span>
                </div>
              </div>
              <button className="btn-calc" onClick={hitung}>Hitung Estimasi KPR</button>
            </div>

            <div id="hasil-wrap" className="r d3">
              {hasil === null && (
                <div className="res-empty">
                  <span className="res-empty-ico">🏡</span>
                  <div className="res-empty-ttl">Hasil simulasi muncul di sini</div>
                  <div className="res-empty-sub">
                    Isi data penghasilan dan DP kamu di sebelah kiri, lalu klik <strong>Hitung Estimasi KPR</strong>.
                  </div>
                </div>
              )}

              {typeof hasil === "string" && (
                <div className="res-empty" style={{ borderColor: "#ff4444" }}>
                  <span className="res-empty-ico">⚠️</span>
                  <div className="res-empty-ttl">Terjadi Kesalahan</div>
                  <div className="res-empty-sub">{hasil}</div>
                </div>
              )}

              {typeof hasil === "object" && hasil !== null && (
                <>
                  <div className="res-hero">
                    <div className="res-tag">Estimasi harga rumah yang bisa kamu beli</div>
                    <div className="res-big">{fmtRp(hasil.totalHarga)}</div>
                    <div className="res-note">DP {fmtRp(hasil.dp)} + Pinjaman bank {fmtRp(hasil.pokok)}</div>
                  </div>
                  <div className="res-cards">
                    <div className="rcard">
                      <div className="rcard-lbl">Cicilan / bulan</div>
                      <div className="rcard-val">{fmtRp(hasil.cicilan)}</div>
                      <div className="rcard-sub">30% dari penghasilan</div>
                    </div>
                    <div className="rcard">
                      <div className="rcard-lbl">Total bunga {tenor} th</div>
                      <div className="rcard-val">{fmtRp(hasil.totalBunga)}</div>
                      <div className="rcard-sub">Bunga {bunga}%/tahun</div>
                    </div>
                  </div>
                  <div className="prog-box">
                    <div className="prog-top">
                      <span className="prog-lbl">Porsi cicilan dari penghasilan</span>
                      <span className="prog-pct">30%</span>
                    </div>
                    <div className="prog-track">
                      <div className="prog-fill" style={{ width: "30%" }}></div>
                    </div>
                    <div className="prog-note">Kondisi aman — tepat di batas aman 30% penghasilan</div>
                  </div>
                  <div className="res-disc">
                    Dihitung dengan <strong>formula anuitas KPR</strong>. Hasil aktual bergantung pada kebijakan bank dan riwayat kredit kamu.
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTI */}
      <section id="properti" className="sec">
        <div className="inner">
          <div className="prop-header">
            <div>
              <p className="eyebrow r d1">Katalog Unit</p>
              <h2 className="sec-title r d2">
                Properti pilihan<br />untuk kamu
              </h2>
            </div>
            <a href="#properti" className="see-all r d3">Katalog Lengkap →</a>
          </div>
          <div className="prop-grid">
            
            {/* TIPE 36/73 (AKTIF) */}
            <div className="pcard r d1">
              <div className="pcard-img">
                <img src="/promo-1.jpg" alt="Tipe 36/73" />
                <span className="pcard-badge" style={{ background: "#D4A843" }}>
                  Penawaran Perdana
                </span>
                <span className="pcard-type">Tipe 36/73</span>
              </div>
              <div className="pcard-body">
                <div className="pcard-name">Tipe 36/73</div>
                <div className="pcard-desc">
                  Hunian modern, aman, dan nyaman yang didesain khusus untuk Anda yang mencari keseimbangan investasi di masa depan.
                </div>
                <div className="pcard-tags">
                  <span className="ptag">36 / 73 m²</span>
                  <span className="ptag">Bebas Banjir</span>
                  <span className="ptag">Lingkungan Hijau</span>
                </div>
                <div className="pcard-foot">
                  <div>
                    <div className="pcard-harga">Rp 173 Juta</div>
                    <div className="pcard-cicilan">Cicilan Ringan</div>
                  </div>
                  <a href="https://wa.me/6285299002010" target="_blank" rel="noopener noreferrer">
                    <button className="btn-det">Detail Unit</button>
                  </a>
                </div>
              </div>
            </div>

            {/* PLACEHOLDER 2 (COMING SOON) */}
            <div className="pcard soon r d2">
              <div className="pcard-img">
                <img src="https://images.unsplash.com/photo-1560184897-502a475f7a0d?auto=format&fit=crop&w=700&q=80" alt="Segera Hadir" />
                <span className="pcard-badge">Segera Hadir</span>
                <span className="pcard-type">Tipe Menengah</span>
              </div>
              <div className="pcard-body">
                <div className="pcard-name">Tahap Pengembangan</div>
                <div className="pcard-desc">Unit dengan luasan dan spesifikasi yang lebih besar sedang dalam tahap perancangan arsitektur.</div>
                <div className="pcard-tags">
                  <span className="ptag">??? m²</span><span className="ptag">Tunggu Info Lanjut</span>
                </div>
                <div className="pcard-foot">
                  <div><div className="pcard-harga">-</div><div className="pcard-cicilan">-</div></div>
                  <button className="btn-det">Dikunci</button>
                </div>
              </div>
            </div>

            {/* PLACEHOLDER 3 (COMING SOON) */}
            <div className="pcard soon r d3">
              <div className="pcard-img">
                <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=700&q=80" alt="Segera Hadir" />
                <span className="pcard-badge">Segera Hadir</span>
                <span className="pcard-type">Tipe Premium</span>
              </div>
              <div className="pcard-body">
                <div className="pcard-name">Tahap Pengembangan</div>
                <div className="pcard-desc">Kawasan premium kami di Golden Phinisi sedang dipersiapkan untuk keluarga besar Anda.</div>
                <div className="pcard-tags">
                  <span className="ptag">??? m²</span><span className="ptag">Tunggu Info Lanjut</span>
                </div>
                <div className="pcard-foot">
                  <div><div className="pcard-harga">-</div><div className="pcard-cicilan">-</div></div>
                  <button className="btn-det">Dikunci</button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* MASTER PLAN / SITE PLAN BARU */}
      <section id="siteplan" className="sec">
        <div className="inner">
          <div className="sp-head r d1">
            <p className="eyebrow">Master Plan Kawasan</p>
            <h2 className="sec-title">Pilih posisi<br/>kavling terbaikmu</h2>
          </div>
          <div className="sp-wrap r d2">
            <img src="/siteplan.jpg" alt="Denah Kavling Golden Phinisi" />
          </div>
        </div>
      </section>

      {/* LOKASI */}
      <section id="lokasi" className="sec">
        <div className="inner">
          <div className="loc-grid">
            <div>
              <p className="eyebrow r d1">Lokasi Strategis</p>
              <h2 className="sec-title r d2">
                Kawasan yang<br />terus bertumbuh
              </h2>
              <p className="sec-sub r d3">
                Terletak di titik strategis Moncongloe. Memberikan Anda kemudahan akses ke berbagai fasilitas umum tanpa mengorbankan kualitas hunian.
              </p>
              <div className="loc-acc r d3">
                <div className="loc-row">
                  <span>📍 Alamat Lengkap</span><strong>Jalan Poros Moncongloe</strong>
                </div>
                <div className="loc-row">
                  <span>🕒 Jam Operasional</span><strong>Buka (09.00 - 17.00 WITA)</strong>
                </div>
                <div className="loc-row">
                  <span>💧 Lingkungan</span><strong>Bebas Banjir</strong>
                </div>
                <div className="loc-row">
                  <span>🍃 Nuansa</span><strong>Hijau & Ramah Anak</strong>
                </div>
              </div>
              <div className="r d4">
                <a href="https://wa.me/6285299002010" target="_blank" rel="noopener noreferrer" className="btn-wa">
                  <svg width="18" height="18" viewBox="0 0 32 32" fill="white">
                    <path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2 7.7L.4 32l8.5-2.2c2.2 1.2 4.7 1.9 7.3 1.9 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zM16 29.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-5 1.3 1.3-4.9-.3-.5c-1.4-2.1-2.1-4.6-2.1-7.2 0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2S23.3 29.3 16 29.3z" />
                  </svg>
                  Hubungi Sales via WhatsApp
                </a>
              </div>
            </div>
            <div className="map-wrap r d3">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63574.75089102016!2d119.5883316075195!3d-5.196178091913192!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee5b75a248af5%3A0x8bc3a7d3c3f478e!2sHenny_Land!5e0!3m2!1sid!2sid!4v1776448952783!5m2!1sid!2sid"
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Peta Lokasi Moncongloe">
              </iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta">
        <div className="inner">
          <p className="cta-label r d1">Mulai Sekarang</p>
          <h2 className="cta-title r d2">
            Rumah impian kamu<br />menunggu di sini.
          </h2>
          <p className="cta-sub r d3">
            Konsultasi gratis dengan tim Golden Phinisi — tanpa komitmen, tanpa biaya tersembunyi.
          </p>
          <div className="r d4">
            <a href="https://wa.me/6285299002010" target="_blank" rel="noopener noreferrer" className="btn-primary">
              Konsultasi Gratis Sekarang
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="f-logo">
          GOLDEN <span>PHINISI</span>
        </div>
        <div className="f-copy">© 2026 PT.ARTAUTAMA MEGAH SENTOSA. All rights reserved.</div>
        <div className="f-links">
          <a href="#">Syarat & Ketentuan</a>
          <a href="#">Kebijakan Privasi</a>
          <a href="https://wa.me/6285299002010">Kontak</a>
        </div>
      </footer>

      {/* FAB */}
      <a href="https://wa.me/6285299002010" target="_blank" rel="noopener noreferrer" className="fab" aria-label="WhatsApp">
        <svg width="28" height="28" viewBox="0 0 32 32" fill="white">
          <path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2 7.7L.4 32l8.5-2.2c2.2 1.2 4.7 1.9 7.3 1.9 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zM16 29.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-5 1.3 1.3-4.9-.3-.5c-1.4-2.1-2.1-4.6-2.1-7.2 0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2S23.3 29.3 16 29.3z" />
        </svg>
      </a>
    </div>
  );
}