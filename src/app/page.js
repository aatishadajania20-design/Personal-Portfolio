"use client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ═══════════════════════════════════════════════════════
   DATA
═══════════════════════════════════════════════════════ */
const TYPED_PHRASES = [
  "MBA (Business Analytics) – SVNIT",
  "Full-Stack Developer",
  "Ex-Digital Marketing Analyst",
  "Data-Driven Growth Strategist",
  "Oracle Certified AI Professional",
];
const NAV_ITEMS = ["about", "projects", "achievements", "skills", "contact"];
const PROJECTS = [
  {
    num: "01", featured: true,
    title: "Freelancing Platform",
    sub: "Full-Stack Two-Sided Marketplace",
    desc: "A fully featured marketplace connecting freelancers with clients. Built with React, Node.js & Express — complete with real-time messaging, Stripe payments, and a polished dashboard.",
    tags: ["React", "Node.js", "Express", "Stripe", "Real-time Chat"],
    url: "https://drive.google.com/file/d/1beJlCN6ae6wH4MQM9Qzc4fy1zRGwZzvz/view",
  },
  {
    num: "02", featured: false,
    title: "Elinor Jewels",
    sub: "Performance Marketing Campaign",
    desc: "End-to-end Meta + Google ad funnels with iterative A/B creative testing, driving measurable ROAS improvements for the jewellery brand.",
    tags: ["Meta Ads", "Google Ads", "A/B Testing", "Growth"],
    url: null,
  },
  {
    num: "03", featured: false,
    title: "Churn Prediction",
    sub: "Machine Learning Web App",
    desc: "Streamlit app using Random Forest models to predict customer churn with 80% accuracy. Features interactive visualizations and real-time predictions.",
    tags: ["Python", "Random Forest", "Streamlit", "ML"],
    url: "https://telco-churn-prediction1.streamlit.app/",
  },
];
const ACHIEVEMENTS = [
  {
    title: "Oracle Foundation Associate",
    sub: "Oracle Cloud Infrastructure",
    desc: "Certified in foundational OCI concepts — compute, storage, networking, and cloud security fundamentals.",
    tags: ["Cloud Computing", "OCI", "Infrastructure"],
    badgeUrl: "https://drive.google.com/file/d/1Sr56ExIHr_XFCZNiiGbJFxzOxuxx1JmA/view?usp=sharing",
    certUrl: "https://drive.google.com/file/d/1jfuAN19Fr_PGQjEI_qqqdiW59fusjg-1/view?usp=sharing",
  },
  {
    title: "Oracle Generative AI Professional",
    sub: "Generative AI & Machine Learning",
    desc: "Professional certification covering LLMs, vector databases, prompt engineering, and AI application development on Oracle Cloud.",
    tags: ["Generative AI", "LLMs", "Oracle AI"],
    badgeUrl: "https://drive.google.com/file/d/1iltuT3w44U3exgQeI4y4YeCT9tz3XMnu/view?usp=sharing",
    certUrl: "https://drive.google.com/file/d/1BualeqQU2Gq0rFkyKbRokPisZoeaS2a8/view?usp=sharing",
  },
];
const SKILLS = [
  { name: "Strategy & Growth",     cat: "Business",     pct: 0.90 },
  { name: "Business Analytics",    cat: "Analytics",    pct: 0.88 },
  { name: "Performance Marketing", cat: "Marketing",    pct: 0.85 },
  { name: "React & Node.js",       cat: "Engineering",  pct: 0.82 },
  { name: "Python & ML",           cat: "Data Science", pct: 0.80 },
  { name: "SQL",                   cat: "Data",         pct: 0.83 },
  { name: "Next.js",               cat: "Engineering",  pct: 0.78 },
  { name: "A/B Testing",           cat: "Growth",       pct: 0.86 },
  { name: "Financial Modelling",   cat: "Finance",      pct: 0.75 },
];
const STATS = [
  { num: 80, suffix: "%", label: "ML Model Accuracy" },
  { num: 3,  suffix: "+", label: "Major Projects" },
  { num: 2,  suffix: "",  label: "Oracle Certifications" },
  { num: 9,  suffix: "+", label: "Core Competencies" },
];
const TICKER = [
  "Strategy & Growth","Business Analytics","Next.js","SQL","Python",
  "React & Node","Performance Marketing","A/B Testing","Financial Modelling",
  "Machine Learning","Data Visualization","Oracle Cloud AI",
];

/* ═══════════════════════════════════════════════════════
   INLINE SVG ICONS
═══════════════════════════════════════════════════════ */
const Ico = {
  Download: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
    </svg>
  ),
  Up: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/>
    </svg>
  ),
  Send: () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
    </svg>
  ),
  Li: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Gh: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
    </svg>
  ),
  Mail: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
      <polyline points="22,6 12,13 2,6"/>
    </svg>
  ),
  Diag: () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M7 17L17 7M17 7H7M17 7v10"/>
    </svg>
  ),
  Menu: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
    </svg>
  ),
  Close: () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ),
};

/* ═══════════════════════════════════════════════════════
   HOOKS
═══════════════════════════════════════════════════════ */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVis(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

const KONAMI = [38,38,40,40,37,39,37,39,66,65];
function useKonami(cb) {
  const buf = useRef([]);
  useEffect(() => {
    const h = e => {
      buf.current = [...buf.current, e.keyCode].slice(-10);
      if (buf.current.join() === KONAMI.join()) cb();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [cb]);
}

/* ═══════════════════════════════════════════════════════
   SMALL COMPONENTS
═══════════════════════════════════════════════════════ */
function Reveal({ children, delay = 0, y = 38, style = {} }) {
  const [ref, vis] = useInView();
  return (
    <div ref={ref} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}s,
                   transform .8s cubic-bezier(.16,1,.3,1) ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function HR({ border, mobile }) {
  return (
    <div style={{
      height: 1,
      background: `linear-gradient(90deg, transparent, ${border}, transparent)`,
      position: "relative", zIndex: 10,
      margin: mobile ? "0 1.5rem" : "0 4rem",
    }} />
  );
}

function SectionLabel({ children, gold }) {
  return (
    <p style={{
      fontFamily: "'DM Mono', monospace", fontSize: ".68rem",
      letterSpacing: ".32em", color: gold, textTransform: "uppercase",
      marginBottom: ".9rem", display: "flex", alignItems: "center", gap: ".8rem",
    }}>
      <span style={{ display: "inline-block", width: 28, height: 1, background: gold, flexShrink: 0 }} />
      {children}
    </p>
  );
}

function SectionTitle({ children, color }) {
  return (
    <h2 style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(2.8rem, 6vw, 5.5rem)",
      lineHeight: .93, color, marginBottom: "2.4rem",
    }}>
      {children}
    </h2>
  );
}

function Tag({ label, border, muted }) {
  return (
    <span style={{
      fontFamily: "'DM Mono', monospace", fontSize: ".58rem",
      letterSpacing: ".06em", padding: ".18rem .5rem",
      border: `1px solid ${border}`, color: muted, textTransform: "uppercase",
    }}>
      {label}
    </span>
  );
}

function FormField({ name, label, placeholder, type, T }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
      <label style={{ fontSize: ".65rem", textTransform: "uppercase", letterSpacing: ".15em", color: T.muted }}>
        {label}
      </label>
      <input
        type={type} name={name} required placeholder={placeholder}
        style={{
          background: T.input, border: `1px solid ${T.border}`,
          color: T.text, padding: ".78rem 1rem",
          fontFamily: "'DM Sans', sans-serif", fontSize: ".88rem",
          outline: "none", width: "100%", transition: "border-color .3s",
        }}
        onFocus={e => e.currentTarget.style.borderColor = "#C9A84C"}
        onBlur={e  => e.currentTarget.style.borderColor = T.border}
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════════════════ */
export default function Page() {
  /* ── STATE ── */
  const [mounted,   setMounted]   = useState(false);
  const [light,     setLight]     = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop,   setShowTop]   = useState(false);
  const [compact,   setCompact]   = useState(false);
  const [mobile,    setMobile]    = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  const [cPos,   setCPos]   = useState({ x: -100, y: -100 });
  const [rPos,   setRPos]   = useState({ x: -100, y: -100 });
  const [cHover, setCHover] = useState(false);
  const ringXY  = useRef({ x: -100, y: -100 });
  const mouseXY = useRef({ x: -100, y: -100 });
  const rafCur  = useRef(null);

  const [typed,  setTyped]  = useState("");
  const ts = useRef({ pIdx: 0, cIdx: 0, typing: true, timer: null });

  const [skillsVis, setSkillsVis] = useState(false);
  const skillsRef = useRef(null);

  const [counts,  setCounts]  = useState(STATS.map(() => 0));
  const [counted, setCounted] = useState(false);
  const statsRef = useRef(null);

  const [copyLbl,  setCopyLbl]  = useState("Copy Email");
  const [sending,  setSending]  = useState(false);
  const [formDone, setFormDone] = useState(false);

  // Easter eggs
  const [rainMode,    setRainMode]    = useState(false);
  const [logoClicks,  setLogoClicks]  = useState(0);
  const [eggMsg,      setEggMsg]      = useState("");
  const canvasRef = useRef(null);

  /* ── MOUNT ── */
  useEffect(() => {
    setMounted(true);
    const isMob = window.innerWidth < 768;
    setMobile(isMob);
    try { const s = localStorage.getItem("aa-theme"); if (s) setLight(JSON.parse(s)); } catch {}
    const onResize = () => setMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try { localStorage.setItem("aa-theme", JSON.stringify(light)); } catch {}
  }, [light, mounted]);

  /* ── SCROLL ── */
  useEffect(() => {
    const fn = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? (window.scrollY / max) * 100 : 0);
      setShowTop(window.scrollY > 500);
      setCompact(window.scrollY > 60);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* ── CURSOR ── */
  useEffect(() => {
    if (mobile) return;
    const mv = e => {
      mouseXY.current = { x: e.clientX, y: e.clientY };
      setCPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", mv);

    const loop = () => {
      ringXY.current.x += (mouseXY.current.x - ringXY.current.x) * 0.13;
      ringXY.current.y += (mouseXY.current.y - ringXY.current.y) * 0.13;
      setRPos({ x: ringXY.current.x, y: ringXY.current.y });
      rafCur.current = requestAnimationFrame(loop);
    };
    rafCur.current = requestAnimationFrame(loop);

    const enter = () => setCHover(true);
    const leave = () => setCHover(false);
    const attach = () => {
      document.querySelectorAll("a, button").forEach(el => {
        el.addEventListener("mouseenter", enter);
        el.addEventListener("mouseleave", leave);
      });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", mv);
      cancelAnimationFrame(rafCur.current);
      mo.disconnect();
      document.querySelectorAll("a, button").forEach(el => {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      });
    };
  }, [mobile, mounted]);

  /* ── TYPED ── */
  useEffect(() => {
    const s = ts.current;
    function loop() {
      clearTimeout(s.timer);
      const phrase = TYPED_PHRASES[s.pIdx];
      if (s.typing) {
        s.cIdx++;
        setTyped(phrase.slice(0, s.cIdx));
        if (s.cIdx >= phrase.length) { s.typing = false; s.timer = setTimeout(loop, 2400); return; }
      } else {
        s.cIdx--;
        setTyped(phrase.slice(0, s.cIdx));
        if (s.cIdx <= 0) {
          s.typing = true;
          s.pIdx = (s.pIdx + 1) % TYPED_PHRASES.length;
          s.timer = setTimeout(loop, 500);
          return;
        }
      }
      s.timer = setTimeout(loop, s.typing ? 72 : 42);
    }
    s.timer = setTimeout(loop, 800);
    return () => clearTimeout(s.timer);
  }, []);

  /* ── SKILLS OBSERVER ── */
  useEffect(() => {
    if (!skillsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSkillsVis(true); },
      { threshold: 0.2 }
    );
    obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, [mounted]);

  /* ── COUNTER OBSERVER ── */
  useEffect(() => {
    if (!statsRef.current || counted) return;
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      setCounted(true);
      STATS.forEach((s, i) => {
        let cur = 0;
        const t = setInterval(() => {
          cur += s.num / 40;
          if (cur >= s.num) {
            clearInterval(t);
            setCounts(p => { const n = [...p]; n[i] = s.num; return n; });
          } else {
            setCounts(p => { const n = [...p]; n[i] = Math.round(cur); return n; });
          }
        }, 28);
      });
    }, { threshold: 0.5 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [mounted, counted]);

  /* ── PARTICLES CANVAS ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, pts = [], animId;
    const mouse = { x: -1000, y: -1000 };
    const N = mobile ? 32 : 72;
    const GOLD = "rgba(201,168,76,";

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < N; i++) pts.push(makePt(W, H));
    function makePt(W, H) {
      return { x: Math.random()*W, y: Math.random()*H, vx:(Math.random()-.5)*.28, vy:(Math.random()-.5)*.28, r:Math.random()*1.4+.4, a:Math.random()*.55+.15 };
    }

    const mv = e => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", mv);

    let isRain = false;
    canvas._setRain = v => { isRain = v; };

    function draw() {
      ctx.clearRect(0, 0, W, H);
      if (isRain) {
        ctx.font = "13px 'DM Mono', monospace";
        pts.forEach(p => {
          p.y += 1.4;
          if (p.y > H) { p.y = 0; p.x = Math.random() * W; }
          ctx.fillStyle = GOLD + p.a + ")";
          ctx.fillText(String.fromCharCode(0x30A0 + Math.floor(Math.random() * 96)), p.x, p.y);
        });
        animId = requestAnimationFrame(draw);
        return;
      }
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const d = Math.sqrt(dx*dx + dy*dy);
        if (d < 90 && d > 0) { p.vx += (dx/d)*.045; p.vy += (dy/d)*.045; }
        const spd = Math.sqrt(p.vx*p.vx + p.vy*p.vy);
        if (spd > .9) { p.vx /= spd*1.1; p.vy /= spd*1.1; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = GOLD + p.a + ")"; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++) {
        for (let j = i+1; j < pts.length; j++) {
          const dx = pts[i].x-pts[j].x, dy = pts[i].y-pts[j].y;
          const d = Math.sqrt(dx*dx+dy*dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.strokeStyle = GOLD + ((1-d/110)*.12) + ")";
            ctx.lineWidth = .5;
            ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    }
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", mv);
    };
  }, [mounted, mobile]);

  useEffect(() => {
    if (canvasRef.current?._setRain) canvasRef.current._setRain(rainMode);
  }, [rainMode]);

  /* ── EASTER EGGS ── */
  useKonami(useCallback(() => {
    const next = !rainMode;
    setRainMode(next);
    setEggMsg(next ? "🎮 KONAMI CODE! Gold Rain activated!" : "Rain deactivated.");
    setTimeout(() => setEggMsg(""), 3200);
  }, [rainMode]));

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next >= 3) {
      setEggMsg("✨ Secret unlocked! Built with love & ☕ in Surat, India.");
      setTimeout(() => { setEggMsg(""); setLogoClicks(0); }, 3500);
    }
    setTimeout(() => setLogoClicks(c => c > 0 ? c - 1 : 0), 900);
  };

  /* ── HELPERS ── */
  const goTo = id => {
    setMenuOpen(false);
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }), 50);
  };

  const copyEmail = async () => {
    const EMAIL = "aatishadajania20@gmail.com";
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const el = document.createElement("textarea");
      el.value = EMAIL;
      document.body.appendChild(el); el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopyLbl("✓ Copied!");
    setTimeout(() => setCopyLbl("Copy Email"), 2200);
  };

  const handleSubmit = () => { setSending(true); setTimeout(() => { setSending(false); setFormDone(true); setTimeout(() => setFormDone(false), 5000); }, 1800); };

  if (!mounted) return null;

  /* ── THEME TOKENS ── */
  const G   = "#C9A84C";
  const GL  = "#F0D080";
  const T = {
    bg:      light ? "#f7f4ee" : "#060606",
    bg2:     light ? "#eeead9" : "#0d0d0d",
    surface: light ? "rgba(255,255,255,.65)" : "rgba(255,255,255,.025)",
    text:    light ? "#1a1a18" : "#e6e1d6",
    muted:   light ? "#6b6660" : "#7a756d",
    white:   light ? "#0d0d0b" : "#f4f0e8",
    border:  light ? "rgba(130,100,20,.18)" : "rgba(201,168,76,.18)",
    borderH: light ? "rgba(130,100,20,.5)"  : "rgba(201,168,76,.5)",
    input:   light ? "#fff" : "#0a0a0a",
    navBg:   light ? "rgba(247,244,238,.95)" : "rgba(6,6,6,.95)",
    shadow:  light ? "0 2px 28px rgba(0,0,0,.07)" : "0 2px 28px rgba(0,0,0,.5)",
  };
  const pad  = mobile ? "5rem 1.5rem" : "8rem 4rem";
  const cols2 = mobile ? "1fr" : "1fr 1fr";

  /* ── JSX ── */
  return (
    <>
      {/* ──────────────────── GLOBAL STYLES ──────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=DM+Mono:wght@400;500&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}
        body{overflow-x:hidden;cursor:none;}
        @media(max-width:767px){body{cursor:auto;}.aa-cur,.aa-ring{display:none!important;}}
        @media(prefers-reduced-motion:reduce){*,*::before,*::after{animation:none!important;transition:none!important;}html{scroll-behavior:auto!important;}}
        ::selection{background:${G};color:#000;}
        ::-webkit-scrollbar{width:3px;}
        ::-webkit-scrollbar-track{background:transparent;}
        ::-webkit-scrollbar-thumb{background:${G};border-radius:2px;}
        button:focus-visible,a:focus-visible{outline:2px solid ${G};outline-offset:3px;}
        input::placeholder,textarea::placeholder{color:${light?"#aaa":"#444"};}

        @keyframes fadeUp   {from{opacity:0;transform:translateY(26px)}to{opacity:1;transform:translateY(0)}}
        @keyframes orbFloat {0%,100%{transform:translate(0,0)}50%{transform:translate(22px,18px)}}
        @keyframes ticker   {from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes blink    {0%,100%{opacity:1}50%{opacity:0}}
        @keyframes lineDown {0%{transform:scaleY(0);transform-origin:top}49%{transform:scaleY(1);transform-origin:top}51%{transform:scaleY(1);transform-origin:bottom}100%{transform:scaleY(0);transform-origin:bottom}}
        @keyframes g1       {0%{transform:translate(-2px,1px)}50%{transform:translate(2px,-1px)}100%{transform:translate(0)}}
        @keyframes g2       {0%{transform:translate(2px,-1px)}50%{transform:translate(-1px,1px)}100%{transform:translate(0)}}
        @keyframes shimmer  {0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes eggPop   {0%{opacity:0;transform:translateX(-50%) translateY(-10px)}20%{opacity:1;transform:translateX(-50%) translateY(0)}80%{opacity:1}100%{opacity:0;transform:translateX(-50%) translateY(-8px)}}
        @keyframes menuIn   {from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}

        /* Glitch — hover only */
        .aa-glitch{position:relative;}
        .aa-glitch::before,.aa-glitch::after{content:attr(data-text);position:absolute;top:0;left:0;font-family:'Bebas Neue',sans-serif;font-size:inherit;line-height:inherit;width:100%;opacity:0;pointer-events:none;transition:opacity .15s;}
        .aa-glitch:hover::before{opacity:1;color:${G};animation:g1 .35s steps(2) infinite;clip-path:polygon(0 0,100% 0,100% 38%,0 38%);}
        .aa-glitch:hover::after {opacity:1;color:#f4f0e8;animation:g2 .35s steps(2) infinite;clip-path:polygon(0 62%,100% 62%,100% 100%,0 100%);}

        /* Ticker */
        .aa-ticker{display:inline-block;animation:ticker 24s linear infinite;white-space:nowrap;}
        .aa-ticker:hover{animation-play-state:paused;}

        /* Skill fill */
        .aa-sfill{height:100%;background:linear-gradient(90deg,${G},${GL});transform-origin:left;transition:transform .95s cubic-bezier(.77,0,.18,1);}

        /* Card underline sweep */
        .aa-card-wrap{transition:transform .42s cubic-bezier(.34,1.56,.64,1),border-color .3s,box-shadow .3s;}
        .aa-card-wrap:hover{transform:translateY(-6px);}
        .aa-sweep{position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(90deg,${G},${GL});transform:scaleX(0);transform-origin:left;transition:transform .4s cubic-bezier(.4,0,.2,1);}
        .aa-card-wrap:hover .aa-sweep{transform:scaleX(1);}

        /* Stat shimmer */
        .aa-stat-num{background:linear-gradient(90deg,${G} 0%,${GL} 40%,${G} 80%);background-size:200% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .aa-stat:hover .aa-stat-num{animation:shimmer 1.6s linear infinite;}

        /* Mobile menu */
        .aa-mmenu{animation:menuIn .25s ease;}

        /* Nav link */
        .aa-nl{position:relative;}
        .aa-nl::after{content:'';position:absolute;bottom:-3px;left:0;width:0;height:1px;background:${G};transition:width .3s;}
        .aa-nl:hover::after{width:100%;}
      `}</style>

      {/* ──────────────────── ROOT ──────────────────── */}
      <div style={{ background: T.bg, color: T.text, fontFamily: "'DM Sans',sans-serif", fontWeight: 300, minHeight: "100vh", transition: "background .5s,color .5s", position: "relative" }}>

        {/* Canvas bg */}
        <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, opacity: light ? .12 : .6, pointerEvents: "none" }} />

        {/* Noise texture */}
        <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: .22,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.05'/%3E%3C/svg%3E")`,
          backgroundSize: "200px" }} />

        {/* Custom cursor */}
        <div className="aa-cur" style={{
          position: "fixed", zIndex: 9999, pointerEvents: "none",
          width: cHover ? 5 : 11, height: cHover ? 5 : 11,
          background: G, borderRadius: "50%",
          mixBlendMode: light ? "normal" : "difference",
          transform: "translate(-50%,-50%)", left: cPos.x, top: cPos.y,
          transition: "width .2s,height .2s",
        }} />
        <div className="aa-ring" style={{
          position: "fixed", zIndex: 9998, pointerEvents: "none",
          width: cHover ? 56 : 36, height: cHover ? 56 : 36,
          border: `1px solid rgba(201,168,76,${cHover ? .5 : .3})`,
          borderRadius: "50%",
          transform: "translate(-50%,-50%)", left: rPos.x, top: rPos.y,
          opacity: cHover ? .65 : 1,
          transition: "width .3s,height .3s,opacity .3s,border-color .3s",
        }} />

        {/* Scroll bar */}
        <div style={{ position: "fixed", top: 0, left: 0, zIndex: 1000, height: 2, width: `${scrollPct}%`, background: `linear-gradient(90deg,${G},${GL})`, transition: "width .08s" }} />

        {/* Easter egg toast */}
        {eggMsg && (
          <div style={{
            position: "fixed", top: "4.5rem", left: "50%",
            zIndex: 3000, background: G, color: "#000",
            padding: ".6rem 1.3rem", fontFamily: "'DM Mono',monospace", fontSize: ".75rem",
            letterSpacing: ".08em", whiteSpace: "nowrap",
            boxShadow: `0 8px 32px rgba(201,168,76,.35)`,
            clipPath: "polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))",
            animation: "eggPop 3.5s ease forwards",
          }}>{eggMsg}</div>
        )}

        {/* ════════ NAV ════════ */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          padding: compact ? ".75rem 2rem" : "1.35rem 2rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          backdropFilter: "blur(24px) saturate(1.5)",
          background: compact ? T.navBg : "transparent",
          borderBottom: compact ? `1px solid ${T.border}` : "1px solid transparent",
          boxShadow: compact ? T.shadow : "none",
          transition: "padding .35s,background .35s,border-color .35s,box-shadow .35s",
        }}>
          {/* Logo — triple-click Easter egg */}
          <button onClick={handleLogoClick} title="Click me 3× 🤫"
            style={{ background: "none", border: "none", cursor: "none", fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.3rem", letterSpacing: ".12em", color: G, padding: 0, lineHeight: 1 }}>
            AA
          </button>

          {/* Desktop links */}
          {!mobile && (
            <ul style={{ display: "flex", gap: "1.8rem", listStyle: "none" }}>
              {NAV_ITEMS.map(id => (
                <li key={id}>
                  <button onClick={() => goTo(id)} className="aa-nl"
                    style={{ background: "none", border: "none", cursor: "none", color: T.muted, fontSize: ".73rem", letterSpacing: ".18em", textTransform: "uppercase", fontFamily: "'DM Mono',monospace", padding: 0, transition: "color .3s" }}
                    onMouseEnter={e => e.currentTarget.style.color = G}
                    onMouseLeave={e => e.currentTarget.style.color = T.muted}>
                    {id}
                  </button>
                </li>
              ))}
            </ul>
          )}

          {/* Right */}
          <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
            <button onClick={() => setLight(v => !v)}
              style={{ background: "none", border: `1px solid ${T.border}`, color: T.muted, padding: ".32rem .7rem", cursor: "none", fontSize: ".68rem", letterSpacing: ".12em", textTransform: "uppercase", fontFamily: "'DM Mono',monospace", transition: "all .3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}>
              {light ? "☾ Dark" : "☀ Light"}
            </button>
            {mobile && (
              <button onClick={() => setMenuOpen(v => !v)}
                style={{ background: "none", border: `1px solid ${T.border}`, color: T.text, padding: ".38rem", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; }}>
                {menuOpen ? <Ico.Close /> : <Ico.Menu />}
              </button>
            )}
          </div>
        </nav>

        {/* Mobile dropdown menu */}
        {mobile && menuOpen && (
          <div className="aa-mmenu" style={{
            position: "fixed", top: compact ? "3rem" : "4rem", left: 0, right: 0, zIndex: 498,
            background: T.navBg, backdropFilter: "blur(24px)",
            borderBottom: `1px solid ${T.border}`, padding: "1rem 1.5rem 1.4rem",
            display: "flex", flexDirection: "column", gap: 0,
          }}>
            {NAV_ITEMS.map(id => (
              <button key={id} onClick={() => goTo(id)}
                style={{ background: "none", border: "none", borderBottom: `1px solid ${T.border}`, cursor: "pointer", color: T.muted, fontSize: ".82rem", letterSpacing: ".15em", textTransform: "uppercase", fontFamily: "'DM Mono',monospace", padding: ".7rem 0", textAlign: "left", transition: "color .2s" }}
                onMouseEnter={e => e.currentTarget.style.color = G}
                onMouseLeave={e => e.currentTarget.style.color = T.muted}>
                {id}
              </button>
            ))}
            <div style={{ display: "flex", gap: ".65rem", marginTop: ".9rem" }}>
              {[
                { icon: <Ico.Li />, href: "https://www.linkedin.com/in/aatish-adajania-694566268" },
                { icon: <Ico.Gh />, href: "https://github.com/aatishadajania" },
                { icon: <Ico.Mail />, href: "mailto:aatishadajania20@gmail.com" },
              ].map(({ icon, href }, i) => (
                <a key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                  style={{ width: 36, height: 36, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: T.muted, textDecoration: "none", transition: "all .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════
            HERO
        ════════════════════════════════════════════ */}
        <section id="hero" style={{ position: "relative", zIndex: 10, minHeight: "100vh", display: "flex", alignItems: "center", padding: mobile ? "0 1.5rem" : "0 4rem", overflow: "hidden" }}>
          {/* Orbs */}
          {[
            { w: 340, top: "5%",  left: "-12%", d: "0s"   },
            { w: 420, bottom:"6%",right: "-15%", d: "-5s"  },
            { w: 180, top: "55%", left:  "42%",  d: "-2.5s"},
          ].map((o, i) => (
            <div key={i} style={{
              position: "absolute", borderRadius: "50%", pointerEvents: "none", filter: "blur(100px)",
              width: o.w, height: o.w, top: o.top, bottom: o.bottom, left: o.left, right: o.right,
              background: `radial-gradient(circle, rgba(201,168,76,${light ? .07 : .09}) 0%, transparent 70%)`,
              animation: `orbFloat ${7+i*2}s ease-in-out ${o.d} infinite`,
            }} />
          ))}
          {/* Ghost letters */}
          <div style={{ position: "absolute", right: mobile ? 0 : "2rem", top: "50%", transform: "translateY(-50%)", fontFamily: "'Bebas Neue',sans-serif", fontSize: mobile ? "42vw" : "18vw", color: `rgba(201,168,76,${light ? .033 : .02})`, userSelect: "none", pointerEvents: "none", lineHeight: 1 }}>AA</div>

          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", paddingTop: "5.5rem" }}>
            <div style={{ animation: "fadeUp .7s .2s both" }}>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", letterSpacing: ".35em", color: G, textTransform: "uppercase" }}>Portfolio · 2025</span>
            </div>

            <h1 className="aa-glitch" data-text="AATISH ADAJANIA"
              style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: mobile ? "clamp(3.8rem,17vw,6.5rem)" : "clamp(5rem,11vw,12.5rem)", lineHeight: .87, color: T.white, animation: "fadeUp .7s .4s both", marginTop: ".55rem" }}>
              AATISH<br />
              <span style={{ color: "transparent", WebkitTextStroke: `1px ${G}` }}>ADAJANIA</span>
            </h1>

            <div style={{ marginTop: "1.35rem", fontFamily: "'Cormorant Garamond',serif", fontSize: mobile ? "clamp(1rem,4.5vw,1.35rem)" : "clamp(1.1rem,2vw,1.7rem)", fontStyle: "italic", color: T.muted, minHeight: "2.2rem", animation: "fadeUp .7s .6s both" }}>
              {typed}<span style={{ animation: "blink 1s infinite", color: G }}>|</span>
            </div>

            <p style={{ maxWidth: 500, marginTop: "1.35rem", lineHeight: 1.87, color: T.muted, fontSize: ".9rem", animation: "fadeUp .7s .78s both" }}>
              MBA (Business Analytics) candidate at SVNIT · IT Graduate · Building digital products at the intersection of engineering, data &amp; growth strategy.
            </p>

            <div style={{ marginTop: "2rem", display: "flex", gap: ".8rem", flexWrap: "wrap", animation: "fadeUp .7s .95s both" }}>
              <a href="https://drive.google.com/file/d/1cRh7ABQS21k08r-0wrBy02lQH24Qn1MG/view?usp=sharing" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: ".45rem", padding: ".8rem 1.7rem", background: G, color: "#000", fontWeight: 500, fontSize: ".8rem", letterSpacing: ".1em", textTransform: "uppercase", textDecoration: "none", clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))", transition: "background .3s,transform .2s" }}
                onMouseEnter={e => { e.currentTarget.style.background = GL; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = G; e.currentTarget.style.transform = ""; }}>
                <Ico.Download />{mobile ? " Résumé" : " Download Résumé"}
              </a>
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/aatish-adajania-694566268", icon: <Ico.Li /> },
                { label: "GitHub",   href: "https://github.com/aatishadajania",                     icon: <Ico.Gh /> },
              ].map(({ label, href, icon }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ display: "inline-flex", alignItems: "center", gap: ".45rem", padding: ".8rem 1.4rem", background: "transparent", color: T.text, fontSize: ".8rem", letterSpacing: ".1em", textTransform: "uppercase", textDecoration: "none", border: `1px solid ${T.border}`, transition: "border-color .3s,color .3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; }}>
                  {icon}{!mobile && ` ${label}`}
                </a>
              ))}
            </div>

            {/* Mobile social row */}
            {mobile && (
              <div style={{ marginTop: "1.4rem", display: "flex", gap: ".65rem", animation: "fadeUp .7s 1.1s both" }}>
                {[
                  { icon: <Ico.Li  />, href: "https://www.linkedin.com/in/aatish-adajania-694566268" },
                  { icon: <Ico.Gh  />, href: "https://github.com/aatishadajania" },
                  { icon: <Ico.Mail/>, href: "mailto:aatishadajania20@gmail.com" },
                ].map(({ icon, href }, i) => (
                  <a key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer"
                    style={{ width: 38, height: 38, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: T.muted, textDecoration: "none", transition: "all .3s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}>
                    {icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Scroll hint */}
          <div style={{ position: "absolute", bottom: "2.2rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: ".4rem", color: T.muted, fontSize: ".62rem", letterSpacing: ".25em", textTransform: "uppercase", animation: "fadeUp .7s 1.6s both" }}>
            <span>Scroll</span>
            <div style={{ width: 1, height: 48, background: `linear-gradient(180deg,${G},transparent)`, animation: "lineDown 2s infinite" }} />
          </div>
        </section>

        <HR border={T.border} mobile={mobile} />

        {/* ════════════════════════════════════════════
            ABOUT
        ════════════════════════════════════════════ */}
        <section id="about" style={{ position: "relative", zIndex: 10, padding: pad }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal><SectionLabel gold={G}>About</SectionLabel></Reveal>
            <div style={{ display: "grid", gridTemplateColumns: cols2, gap: mobile ? "2.8rem" : "5rem", alignItems: "start" }}>
              <div>
                <Reveal delay={.1}><SectionTitle color={T.white}>WHO I<br />AM</SectionTitle></Reveal>
                {[
                  <><strong style={{ color: T.text, fontWeight: 500 }}>MBA (Business Analytics) candidate at SVNIT</strong> and an IT graduate operating at the intersection of technology, data, and business strategy.</>,
                  <>With hands-on experience as a <strong style={{ color: T.text, fontWeight: 500 }}>Digital Marketing Analyst</strong>, I&apos;ve executed end-to-end performance campaigns, designed data pipelines, and shipped full-stack products using React, Node.js &amp; Python.</>,
                  <>I believe the best digital products are both beautifully engineered and commercially minded — and that&apos;s exactly the kind of work I create.</>,
                ].map((txt, i) => (
                  <Reveal key={i} delay={i * .1 + .2}>
                    <p style={{ marginBottom: "1.1rem", lineHeight: 1.88, color: T.muted, fontSize: ".91rem" }}>{txt}</p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={.2}>
                <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".9rem" }}>
                  {STATS.map((s, i) => (
                    <div key={i} className="aa-stat"
                      style={{ padding: mobile ? "1.3rem 1.1rem" : "1.6rem 1.4rem", border: `1px solid ${T.border}`, background: T.surface, backdropFilter: "blur(8px)", position: "relative", overflow: "hidden", transition: "border-color .3s,transform .3s" }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.transform = "translateY(-4px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = ""; }}>
                      <div className="aa-stat-num" style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: mobile ? "2.4rem" : "3rem", lineHeight: 1 }}>
                        {counts[i]}{s.suffix}
                      </div>
                      <div style={{ fontSize: ".64rem", color: T.muted, letterSpacing: ".1em", textTransform: "uppercase", marginTop: ".3rem" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* TICKER */}
        <div style={{ overflow: "hidden", whiteSpace: "nowrap", padding: "1.7rem 0", borderTop: `1px solid ${T.border}`, borderBottom: `1px solid ${T.border}`, position: "relative", zIndex: 10 }}>
          <div className="aa-ticker">
            {[...TICKER, ...TICKER].map((item, i) => (
              <span key={i}>
                <span style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mobile ? "1.05rem" : "1.3rem", fontStyle: "italic", color: T.muted, margin: mobile ? "0 1.2rem" : "0 1.8rem" }}>{item}</span>
                <span style={{ display: "inline-block", width: 4, height: 4, background: G, borderRadius: "50%", verticalAlign: "middle" }} />
              </span>
            ))}
          </div>
        </div>

        <HR border={T.border} mobile={mobile} />

        {/* ════════════════════════════════════════════
            PROJECTS
        ════════════════════════════════════════════ */}
        <section id="projects" style={{ position: "relative", zIndex: 10, padding: pad }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal><SectionLabel gold={G}>Selected Work</SectionLabel></Reveal>
            <Reveal delay={.1}><SectionTitle color={T.white}>PROJECT<br />WORK</SectionTitle></Reveal>

            {/* Featured */}
            <Reveal delay={.12}>
              <div className="aa-card-wrap" style={{ background: T.surface, backdropFilter: "blur(8px)", border: `1px solid ${T.border}`, padding: mobile ? "1.8rem 1.5rem" : "2.4rem", position: "relative", overflow: "hidden", marginBottom: "1.1rem", display: "flex", flexDirection: mobile ? "column" : "row", gap: mobile ? "1rem" : "2.8rem", alignItems: "flex-start" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.boxShadow = "0 20px 60px rgba(201,168,76,.07)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; }}>
                <div className="aa-sweep" />
                <div style={{ flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: mobile ? "3.5rem" : "5rem", color: `rgba(201,168,76,${light?.1:.06})`, lineHeight: 1 }}>01</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap", marginBottom: ".7rem" }}>
                    <div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mobile ? "1.5rem" : "1.9rem", fontWeight: 400, color: T.white }}>{PROJECTS[0].title}</h3>
                      <p style={{ fontSize: ".68rem", color: G, textTransform: "uppercase", letterSpacing: ".1em", marginTop: ".3rem" }}>{PROJECTS[0].sub}</p>
                    </div>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".56rem", letterSpacing: ".18em", color: G, textTransform: "uppercase", border: `1px solid ${T.border}`, padding: ".18rem .55rem", flexShrink: 0 }}>Featured</span>
                  </div>
                  <p style={{ fontSize: ".88rem", color: T.muted, lineHeight: 1.8, marginBottom: "1.1rem" }}>{PROJECTS[0].desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".32rem", marginBottom: "1.3rem" }}>
                    {PROJECTS[0].tags.map(t => <Tag key={t} label={t} border={T.border} muted={T.muted} />)}
                  </div>
                  <a href={PROJECTS[0].url} target="_blank" rel="noopener noreferrer"
                    style={{ display: "inline-flex", alignItems: "center", gap: ".45rem", fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: G, textDecoration: "none", transition: "gap .3s" }}
                    onMouseEnter={e => e.currentTarget.style.gap = ".8rem"}
                    onMouseLeave={e => e.currentTarget.style.gap = ".45rem"}>
                    View Project <Ico.Diag />
                  </a>
                </div>
              </div>
            </Reveal>

            {/* Grid */}
            <div style={{ display: "grid", gridTemplateColumns: cols2, gap: "1.1rem" }}>
              {PROJECTS.slice(1).map((p, i) => (
                <Reveal key={p.num} delay={i * .1 + .2}>
                  <div className="aa-card-wrap" style={{ background: T.surface, backdropFilter: "blur(8px)", border: `1px solid ${T.border}`, padding: mobile ? "1.8rem 1.5rem" : "2rem", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", height: "100%" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.boxShadow = "0 16px 48px rgba(201,168,76,.06)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.boxShadow = "none"; }}>
                    <div className="aa-sweep" />
                    <div style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "3.2rem", color: `rgba(201,168,76,${light?.1:.06})`, lineHeight: 1, marginBottom: ".7rem" }}>{p.num}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".32rem", marginBottom: ".85rem" }}>
                      {p.tags.map(t => <Tag key={t} label={t} border={T.border} muted={T.muted} />)}
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: "1.45rem", fontWeight: 400, color: T.white, marginBottom: ".3rem" }}>{p.title}</h3>
                    <p style={{ fontSize: ".68rem", color: G, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".85rem" }}>{p.sub}</p>
                    <p style={{ fontSize: ".87rem", color: T.muted, lineHeight: 1.78, flex: 1 }}>{p.desc}</p>
                    {p.url && (
                      <a href={p.url} target="_blank" rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: ".45rem", marginTop: "1.2rem", fontSize: ".72rem", letterSpacing: ".1em", textTransform: "uppercase", color: G, textDecoration: "none", transition: "gap .3s" }}
                        onMouseEnter={e => e.currentTarget.style.gap = ".8rem"}
                        onMouseLeave={e => e.currentTarget.style.gap = ".45rem"}>
                        View Project <Ico.Diag />
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <HR border={T.border} mobile={mobile} />

        {/* ════════════════════════════════════════════
            ACHIEVEMENTS
        ════════════════════════════════════════════ */}
        <section id="achievements" style={{ position: "relative", zIndex: 10, padding: pad }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal><SectionLabel gold={G}>Recognition</SectionLabel></Reveal>
            <Reveal delay={.1}><SectionTitle color={T.white}>CERTIFI-<br />CATIONS</SectionTitle></Reveal>
            <div style={{ display: "grid", gridTemplateColumns: cols2, gap: "1.1rem" }}>
              {ACHIEVEMENTS.map((a, i) => (
                <Reveal key={a.title} delay={i * .12}>
                  <div style={{ background: T.surface, backdropFilter: "blur(8px)", border: `1px solid ${T.border}`, padding: mobile ? "1.8rem 1.5rem" : "2.4rem", position: "relative", overflow: "hidden", height: "100%", transition: "border-color .3s,transform .3s,box-shadow .3s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = T.borderH; e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(201,168,76,.07)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "none"; }}>
                    {/* Top accent */}
                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${G},transparent)`, opacity: 0, transition: "opacity .3s" }}
                      ref={el => { if (!el) return; const p = el.parentElement; const sh = () => el.style.opacity = "1"; const hl = () => el.style.opacity = "0"; p.addEventListener("mouseenter", sh); p.addEventListener("mouseleave", hl); }} />
                    <svg width="38" height="38" viewBox="0 0 48 48" fill="none" stroke={G} strokeWidth="1.2" style={{ marginBottom: "1.3rem" }}>
                      {i === 0
                        ? <><circle cx="24" cy="24" r="17"/><path d="M24 14l2.5 7.5H34l-6 4.5 2.5 7.5L24 29l-6.5 4.5 2.5-7.5-6-4.5h7.5z"/></>
                        : <><rect x="8" y="8" width="32" height="32" rx="3"/><path d="M16 24h16M16 30h10M24 16l4 4-4 4"/></>}
                    </svg>
                    <h3 style={{ fontFamily: "'Cormorant Garamond',serif", fontSize: mobile ? "1.25rem" : "1.45rem", color: T.white, marginBottom: ".3rem" }}>{a.title}</h3>
                    <p style={{ fontSize: ".66rem", color: G, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".85rem" }}>{a.sub}</p>
                    <p style={{ fontSize: ".87rem", color: T.muted, lineHeight: 1.78, marginBottom: "1.2rem" }}>{a.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: ".32rem", marginBottom: "1.3rem" }}>
                      {a.tags.map(t => <Tag key={t} label={t} border={T.border} muted={T.muted} />)}
                    </div>
                    <div style={{ display: "flex", gap: "1.4rem" }}>
                      {[{ l: "View Badge", u: a.badgeUrl }, { l: "Certificate", u: a.certUrl }].map(({ l, u }) => (
                        <a key={l} href={u} target="_blank" rel="noopener noreferrer"
                          style={{ fontSize: ".68rem", letterSpacing: ".1em", textTransform: "uppercase", color: T.muted, textDecoration: "none", borderBottom: `1px solid ${T.border}`, paddingBottom: 2, transition: "color .3s,border-color .3s" }}
                          onMouseEnter={e => { e.currentTarget.style.color = G; e.currentTarget.style.borderColor = G; }}
                          onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.borderColor = T.border; }}>
                          {l} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <HR border={T.border} mobile={mobile} />

        {/* ════════════════════════════════════════════
            SKILLS
        ════════════════════════════════════════════ */}
        <section id="skills" style={{ position: "relative", zIndex: 10, padding: pad }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal><SectionLabel gold={G}>Expertise</SectionLabel></Reveal>
            <Reveal delay={.1}><SectionTitle color={T.white}>CORE<br />SKILLS</SectionTitle></Reveal>
            <Reveal delay={.18}>
              <div ref={skillsRef} style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: "1px", background: T.border }}>
                {SKILLS.map(s => (
                  <div key={s.name} style={{ background: T.bg2, padding: mobile ? "1.2rem 1.4rem" : "1.55rem 2rem", transition: "background .3s" }}
                    onMouseEnter={e => e.currentTarget.style.background = `rgba(201,168,76,${light?.05:.04})`}
                    onMouseLeave={e => e.currentTarget.style.background = T.bg2}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: ".22rem" }}>
                      <div style={{ fontSize: ".87rem", fontWeight: 500, color: T.text }}>{s.name}</div>
                      <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".58rem", color: G }}>{Math.round(s.pct*100)}%</div>
                    </div>
                    <div style={{ fontSize: ".63rem", color: T.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: ".65rem" }}>{s.cat}</div>
                    <div style={{ height: 2, background: T.border }}>
                      <div className="aa-sfill" style={{ transform: skillsVis ? `scaleX(${s.pct})` : "scaleX(0)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <HR border={T.border} mobile={mobile} />

        {/* ════════════════════════════════════════════
            CONTACT
        ════════════════════════════════════════════ */}
        <section id="contact" style={{ position: "relative", zIndex: 10, padding: pad }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal><SectionLabel gold={G}>Get In Touch</SectionLabel></Reveal>
            <Reveal delay={.1}><SectionTitle color={T.white}>LET&apos;S<br />TALK</SectionTitle></Reveal>
            <div style={{ display: "grid", gridTemplateColumns: cols2, gap: mobile ? "2.8rem" : "5rem", alignItems: "start" }}>
              {/* Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1.6rem" }}>
                <Reveal>
                  <p style={{ color: T.muted, lineHeight: 1.88, fontSize: ".91rem", maxWidth: 340 }}>
                    Interested in collaborating, have a project in mind, or just want to connect? I&apos;m always open to new conversations.
                  </p>
                </Reveal>
                {[
                  { icon: <Ico.Mail />, title: "Email",    val: "aatishadajania20@gmail.com",                         href: "mailto:aatishadajania20@gmail.com" },
                  { icon: <Ico.Li  />, title: "LinkedIn",  val: "aatish-adajania",                                    href: "https://www.linkedin.com/in/aatish-adajania-694566268" },
                  { icon: <Ico.Gh  />, title: "GitHub",    val: "aatishadajania",                                     href: "https://github.com/aatishadajania" },
                ].map(({ icon, title, val, href }, i) => (
                  <Reveal key={title} delay={i * .1 + .1}>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div style={{ flexShrink: 0, width: 40, height: 40, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: G, transition: "border-color .3s" }}>{icon}</div>
                      <div>
                        <div style={{ fontSize: ".62rem", textTransform: "uppercase", letterSpacing: ".15em", color: T.muted, marginBottom: ".18rem" }}>{title}</div>
                        <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                          style={{ color: T.text, textDecoration: "none", fontSize: ".87rem", transition: "color .3s" }}
                          onMouseEnter={e => e.currentTarget.style.color = G}
                          onMouseLeave={e => e.currentTarget.style.color = T.text}>{val}</a>
                      </div>
                    </div>
                  </Reveal>
                ))}
                {/* Konami hint */}
                <Reveal delay={.5}>
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: ".58rem", color: T.muted, opacity: .38, letterSpacing: ".07em" }}>
                    // try ↑↑↓↓←→←→BA on keyboard 🎮
                  </p>
                </Reveal>
              </div>

              {/* Form */}
              <Reveal delay={.2}>
                <form action="https://formsubmit.co/aatishadajania20@gmail.com" method="POST" onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: ".95rem" }}>
                  <input type="hidden" name="_subject" value="New Message from Portfolio" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_next" value="./" />

                  <div style={{ display: "grid", gridTemplateColumns: mobile ? "1fr" : "1fr 1fr", gap: ".95rem" }}>
                    <FormField name="name"  label="Name"  placeholder="Your name"        type="text"  T={T} />
                    <FormField name="email" label="Email" placeholder="your@email.com"   type="email" T={T} />
                  </div>
                  <FormField name="subject" label="Subject" placeholder="What's this about?" type="text" T={T} />
                  <div style={{ display: "flex", flexDirection: "column", gap: ".35rem" }}>
                    <label style={{ fontSize: ".65rem", textTransform: "uppercase", letterSpacing: ".15em", color: T.muted }}>Message</label>
                    <textarea name="message" required rows={5} placeholder="Tell me about your project..."
                      style={{ background: T.input, border: `1px solid ${T.border}`, color: T.text, padding: ".78rem 1rem", fontFamily: "'DM Sans',sans-serif", fontSize: ".88rem", outline: "none", resize: "none", width: "100%", transition: "border-color .3s" }}
                      onFocus={e => e.currentTarget.style.borderColor = G}
                      onBlur={e  => e.currentTarget.style.borderColor = T.border} />
                  </div>

                  {formDone && (
                    <div style={{ padding: ".75rem 1rem", background: "rgba(74,222,128,.06)", border: "1px solid rgba(74,222,128,.2)", color: "#4ade80", fontSize: ".8rem", fontFamily: "'DM Mono',monospace" }}>
                      ✓ Message sent successfully — I&apos;ll get back to you soon.
                    </div>
                  )}

                  <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap" }}>
                    <button type="submit" disabled={sending}
                      style={{ display: "inline-flex", alignItems: "center", gap: ".45rem", background: G, color: "#000", border: "none", padding: ".85rem 1.7rem", fontFamily: "'DM Sans',sans-serif", fontWeight: 500, fontSize: ".8rem", letterSpacing: ".1em", textTransform: "uppercase", cursor: "none", transition: "background .3s,opacity .3s", opacity: sending ? .65 : 1 }}
                      onMouseEnter={e => !sending && (e.currentTarget.style.background = GL)}
                      onMouseLeave={e => e.currentTarget.style.background = G}>
                      <Ico.Send />{sending ? " Sending…" : " Send Message"}
                    </button>
                    <button type="button" onClick={copyEmail}
                      style={{ background: "transparent", border: `1px solid ${copyLbl.includes("✓") ? G : T.border}`, color: copyLbl.includes("✓") ? G : T.muted, padding: ".85rem 1.3rem", cursor: "none", fontFamily: "'DM Sans',sans-serif", fontSize: ".76rem", letterSpacing: ".1em", textTransform: "uppercase", transition: "all .3s" }}
                      onMouseEnter={e => { if (!copyLbl.includes("✓")) { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G; } }}
                      onMouseLeave={e => { if (!copyLbl.includes("✓")) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; } }}>
                      {copyLbl}
                    </button>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ════════ FOOTER ════════ */}
        <footer style={{ position: "relative", zIndex: 10, padding: mobile ? "2.2rem 1.5rem" : "2.8rem 4rem", borderTop: `1px solid ${T.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
          <span style={{ fontFamily: "'Bebas Neue',sans-serif", fontSize: "1.1rem", color: G, letterSpacing: ".12em" }}>Aatish Adajania</span>
          <span style={{ fontSize: ".65rem", color: T.muted, letterSpacing: ".04em" }}>
            © 2025 · Designed &amp; built with passion{mobile ? "" : " in Surat, India"}
          </span>
          <div style={{ display: "flex", gap: ".6rem" }}>
            {[
              { icon: <Ico.Li  />, href: "https://www.linkedin.com/in/aatish-adajania-694566268" },
              { icon: <Ico.Gh  />, href: "https://github.com/aatishadajania" },
              { icon: <Ico.Mail/>, href: "mailto:aatishadajania20@gmail.com" },
            ].map(({ icon, href }, i) => (
              <a key={i} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                style={{ width: 34, height: 34, border: `1px solid ${T.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: T.muted, textDecoration: "none", transition: "all .3s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = G; e.currentTarget.style.color = G; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}>
                {icon}
              </a>
            ))}
          </div>
        </footer>

        {/* BACK TO TOP */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{ position: "fixed", bottom: "1.6rem", right: "1.6rem", zIndex: 500, width: 42, height: 42, background: G, color: "#000", border: "none", cursor: "none", display: "flex", alignItems: "center", justifyContent: "center", clipPath: "polygon(0 0,calc(100% - 7px) 0,100% 7px,100% 100%,7px 100%,0 calc(100% - 7px))", opacity: showTop ? 1 : 0, transform: showTop ? "translateY(0)" : "translateY(14px)", transition: "opacity .3s,transform .3s,background .3s", pointerEvents: showTop ? "auto" : "none" }}
          onMouseEnter={e => e.currentTarget.style.background = GL}
          onMouseLeave={e => e.currentTarget.style.background = G}>
          <Ico.Up />
        </button>
      </div>
    </>
  );
}