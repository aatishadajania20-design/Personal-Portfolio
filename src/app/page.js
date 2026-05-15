"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/* ─────────────────────────────────────────────
   SCROLL REVEAL HOOK
───────────────────────────────────────────── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─────────────────────────────────────────────
   REVEAL WRAPPER COMPONENT
───────────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const TYPED_PHRASES = [
  "MBA (Business Analytics) – SVNIT",
  "Ex-Digital Marketing Analyst",
  "Full-Stack Developer",
  "Data-Driven Growth Strategist",
  "Oracle Certified AI Professional",
];

const PROJECTS = [
  {
    num: "01",
    title: "Freelancing Platform",
    sub: "Full-stack two-sided marketplace",
    desc: "A fully featured two-sided marketplace connecting freelancers with clients. Built with React, Node.js and Express — complete with real-time messaging, Stripe payments, and a clean dashboard experience.",
    tags: ["React", "Node.js", "Express", "Stripe", "Real-time Chat"],
    url: "https://drive.google.com/file/d/1beJlCN6ae6wH4MQM9Qzc4fy1zRGwZzvz/view",
    featured: true,
  },
  {
    num: "02",
    title: "Elinor Jewels Campaign",
    sub: "Performance Marketing",
    desc: "Planned and executed end-to-end Meta + Google ad funnels with iterative A/B creative testing, driving measurable ROAS improvements for the jewellery brand.",
    tags: ["Meta Ads", "Google Ads", "A/B Testing", "Growth Marketing"],
    url: null,
  },
  {
    num: "03",
    title: "Churn Prediction",
    sub: "Machine Learning Web App",
    desc: "Streamlit app using Random Forest models to predict customer churn with 80% accuracy. Features interactive visualizations and real-time predictions on telco data.",
    tags: ["Python", "Random Forest", "Streamlit", "Machine Learning"],
    url: "https://telco-churn-prediction1.streamlit.app/",
  },
];

const ACHIEVEMENTS = [
  {
    title: "Oracle Foundation Associate",
    sub: "Oracle Cloud Infrastructure",
    desc: "Certified in foundational Oracle Cloud Infrastructure concepts, covering compute, storage, networking, and cloud security fundamentals.",
    tags: ["Cloud Computing", "OCI", "Infrastructure"],
    badgeUrl: "https://drive.google.com/file/d/1Sr56ExIHr_XFCZNiiGbJFxzOxuxx1JmA/view?usp=sharing",
    certUrl: "https://drive.google.com/file/d/1jfuAN19Fr_PGQjEI_qqqdiW59fusjg-1/view?usp=sharing",
  },
  {
    title: "Oracle Generative AI Professional",
    sub: "Generative AI & Machine Learning",
    desc: "Professional-level certification in Generative AI technologies, covering large language models, vector databases, prompt engineering, and AI application development on Oracle Cloud.",
    tags: ["Generative AI", "Machine Learning", "Oracle AI"],
    badgeUrl: "https://drive.google.com/file/d/1iltuT3w44U3exgQeI4y4YeCT9tz3XMnu/view?usp=sharing",
    certUrl: "https://drive.google.com/file/d/1BualeqQU2Gq0rFkyKbRokPisZoeaS2a8/view?usp=sharing",
  },
];

const SKILLS = [
  { name: "Strategy & Growth", cat: "Business", pct: 0.90 },
  { name: "Business Analytics", cat: "Analytics", pct: 0.88 },
  { name: "Performance Marketing", cat: "Marketing", pct: 0.85 },
  { name: "React & Node.js", cat: "Engineering", pct: 0.82 },
  { name: "Python & ML", cat: "Data Science", pct: 0.80 },
  { name: "SQL", cat: "Data", pct: 0.83 },
  { name: "Next.js", cat: "Engineering", pct: 0.78 },
  { name: "A/B Testing", cat: "Growth", pct: 0.86 },
  { name: "Financial Modelling", cat: "Finance", pct: 0.75 },
];

const TICKER_ITEMS = [
  "Strategy & Growth", "Business Analytics", "Next.js", "SQL", "Python",
  "React & Node", "Performance Marketing", "A/B Testing", "Financial Modelling",
  "Machine Learning", "Data Visualization", "Oracle Cloud AI",
];

const STATS = [
  { num: 80, label: "ML Model Accuracy %" },
  { num: 3, label: "Major Projects" },
  { num: 2, label: "Oracle Certifications" },
  { num: 9, label: "Core Competencies" },
];

/* ─────────────────────────────────────────────
   SVG ICONS (inline — no external dep)
───────────────────────────────────────────── */
const IconDownload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
  </svg>
);
const IconArrowUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="19" x2="12" y2="5" /><polyline points="5 12 12 5 19 12" />
  </svg>
);
const IconSend = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const IconLinkedin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);
const IconGithub = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />
  </svg>
);
const IconMail = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);
const IconArrowDiag = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M7 17L17 7M17 7H7M17 7v10" />
  </svg>
);

/* ─────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────── */
export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [showTop, setShowTop] = useState(false);
  const [navCompact, setNavCompact] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Cursor state
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [ringPos, setRingPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const ringRef = useRef({ x: -100, y: -100 });
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef(null);

  // Typed
  const [typedText, setTypedText] = useState("");
  const typedState = useRef({ pIdx: 0, cIdx: 0, typing: true, timer: null });

  // Skills revealed
  const [skillsVisible, setSkillsVisible] = useState(false);
  const skillsRef = useRef(null);

  // Counters
  const [counters, setCounters] = useState(STATS.map(() => 0));
  const [countersTriggered, setCountersTriggered] = useState(false);
  const statsRef = useRef(null);

  // Form
  const [copyLabel, setCopyLabel] = useState("Copy Email");
  const [formSending, setFormSending] = useState(false);

  /* ── MOUNT ── */
  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const saved = localStorage.getItem("aa-light");
    if (saved) setLightMode(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (mounted) localStorage.setItem("aa-light", JSON.stringify(lightMode));
  }, [lightMode, mounted]);

  /* ── SCROLL HANDLER ── */
  useEffect(() => {
    const onScroll = () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setScrollPct(pct);
      setShowTop(window.scrollY > 400);
      setNavCompact(window.scrollY > 80);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── CURSOR (desktop only) ── */
  useEffect(() => {
    if (isMobile) return;
    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMove);

    const animate = () => {
      ringRef.current.x += (mouseRef.current.x - ringRef.current.x) * 0.15;
      ringRef.current.y += (mouseRef.current.y - ringRef.current.y) * 0.15;
      setRingPos({ x: ringRef.current.x, y: ringRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    // FIX #1: JS-based cursor hover — no :has() CSS
    const els = document.querySelectorAll("a, button");
    const enter = () => setCursorHover(true);
    const leave = () => setCursorHover(false);
    els.forEach(el => { el.addEventListener("mouseenter", enter); el.addEventListener("mouseleave", leave); });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
      els.forEach(el => { el.removeEventListener("mouseenter", enter); el.removeEventListener("mouseleave", leave); });
    };
  }, [isMobile, mounted]);

  /* ── TYPED ANIMATION — FIX #7: clearTimeout to prevent timer leak ── */
  useEffect(() => {
    const state = typedState.current;
    function typeLoop() {
      clearTimeout(state.timer); // FIX #7
      const phrase = TYPED_PHRASES[state.pIdx];
      if (state.typing) {
        state.cIdx++;
        setTypedText(phrase.slice(0, state.cIdx));
        if (state.cIdx >= phrase.length) {
          state.typing = false;
          state.timer = setTimeout(typeLoop, 2200);
          return;
        }
      } else {
        state.cIdx--;
        setTypedText(phrase.slice(0, state.cIdx));
        if (state.cIdx <= 0) {
          state.typing = true;
          state.pIdx = (state.pIdx + 1) % TYPED_PHRASES.length;
          state.timer = setTimeout(typeLoop, 400);
          return;
        }
      }
      state.timer = setTimeout(typeLoop, state.typing ? 75 : 45);
    }
    state.timer = setTimeout(typeLoop, 600);
    return () => clearTimeout(state.timer);
  }, []);

  /* ── SKILLS INTERSECTION ── */
  useEffect(() => {
    if (!skillsRef.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSkillsVisible(true); },
      { threshold: 0.3 }
    );
    obs.observe(skillsRef.current);
    return () => obs.disconnect();
  }, [mounted]);

  /* ── COUNTERS INTERSECTION ── */
  useEffect(() => {
    if (!statsRef.current || countersTriggered) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setCountersTriggered(true);
          STATS.forEach((stat, i) => {
            let cur = 0;
            const step = stat.num / 40;
            const t = setInterval(() => {
              cur += step;
              if (cur >= stat.num) {
                clearInterval(t);
                setCounters(prev => { const n = [...prev]; n[i] = stat.num; return n; });
              } else {
                setCounters(prev => { const n = [...prev]; n[i] = Math.round(cur); return n; });
              }
            }, 30);
          });
        }
      },
      { threshold: 0.5 }
    );
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, [mounted, countersTriggered]);

  /* ── CANVAS PARTICLES ── */
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [], animId;
    const mousePos = { x: -1000, y: -1000 };

    // FIX #5: reduce N on mobile
    const N = window.innerWidth < 768 ? 40 : 80;
    const GOLD = "rgba(201,168,76,";

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function Particle() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.r = Math.random() * 1.5 + 0.5;
      this.a = Math.random() * 0.6 + 0.2;
    }
    for (let i = 0; i < N; i++) particles.push(new Particle());

    const onMouseMove = (e) => { mousePos.x = e.clientX; mousePos.y = e.clientY; };
    window.addEventListener("mousemove", onMouseMove);

    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        const dx = p.x - mousePos.x, dy = p.y - mousePos.y;
        const d = Math.sqrt(dx * dx + dy * dy);
        // FIX #10: guard d > 0 to prevent NaN
        if (d < 100 && d > 0) { p.vx += (dx / d) * 0.05; p.vy += (dy / d) * 0.05; }
        const spd = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (spd > 1) { p.vx /= spd; p.vy /= spd; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = GOLD + p.a + ")";
        ctx.fill();
      });
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.strokeStyle = GOLD + ((1 - d / 120) * 0.15) + ")";
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
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
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [mounted]);

  /* ── HELPERS ── */
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // FIX #6: clipboard with fallback
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("aatishadajania20@gmail.com");
      setCopyLabel("✓ Copied!");
      setTimeout(() => setCopyLabel("Copy Email"), 2000);
    } catch {
      // Fallback for HTTP
      const el = document.createElement("textarea");
      el.value = "aatishadajania20@gmail.com";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopyLabel("✓ Copied!");
      setTimeout(() => setCopyLabel("Copy Email"), 2000);
    }
  };

  // FIX #4: form submit preserves SVG icon
  const handleFormSubmit = (e) => {
    setFormSending(true);
  };

  if (!mounted) return null;

  /* ── THEME TOKENS ── */
  const T = {
    bg: lightMode ? "#f5f2eb" : "#080808",
    bg2: lightMode ? "#ede8dc" : "#0f0f0f",
    bg3: lightMode ? "#e5e0d4" : "#161616",
    text: lightMode ? "#1a1a1a" : "#e8e3d8",
    muted: lightMode ? "#666" : "#888",
    white: lightMode ? "#111" : "#f5f2eb",
    border: lightMode ? "rgba(100,80,20,0.2)" : "rgba(201,168,76,0.2)",
    gold: "#C9A84C",
    goldLight: "#F0D080",
    goldDim: lightMode ? "rgba(160,120,30,0.08)" : "rgba(201,168,76,0.12)",
    inputBg: lightMode ? "#fff" : "#0f0f0f",
  };

  return (
    <>
      {/* ── GLOBAL STYLES ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Mono:wght@400;500&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        /* FIX #2: hide cursor on mobile */
        body { cursor: none; overflow-x: hidden; }
        @media (max-width: 768px) {
          body { cursor: auto; }
          .aa-cursor, .aa-ring { display: none !important; }
          .nav-links { display: none !important; }
        }

        /* FIX #8: reduced motion */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation: none !important;
            transition: none !important;
          }
          html { scroll-behavior: auto !important; }
        }

        ::selection { background: #C9A84C; color: #000; }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, 30px); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scrollDown {
          0% { transform: scaleY(0); transform-origin: top; }
          50% { transform: scaleY(1); transform-origin: top; }
          51% { transform: scaleY(1); transform-origin: bottom; }
          100% { transform: scaleY(0); transform-origin: bottom; }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        /* FIX #12: glitch only on hover */
        .aa-glitch { position: relative; }
        .aa-glitch::before, .aa-glitch::after {
          content: attr(data-text);
          position: absolute; top: 0; left: 0;
          font-family: 'Bebas Neue', sans-serif;
          font-size: inherit; line-height: inherit;
          width: 100%;
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .aa-glitch:hover::before { opacity: 1; color: #C9A84C; animation: g1 0.4s steps(2) infinite; clip-path: polygon(0 0, 100% 0, 100% 40%, 0 40%); }
        .aa-glitch:hover::after  { opacity: 1; color: #f5f2eb;  animation: g2 0.4s steps(2) infinite; clip-path: polygon(0 60%, 100% 60%, 100% 100%, 0 100%); }
        @keyframes g1 { 0%{transform:translate(-3px, 2px)} 50%{transform:translate(3px,-2px)} 100%{transform:translate(0)} }
        @keyframes g2 { 0%{transform:translate(3px,-2px)} 50%{transform:translate(-2px,1px)} 100%{transform:translate(0)} }

        .ticker-track { display: inline-block; animation: ticker 22s linear infinite; white-space: nowrap; }
        .ticker-track:hover { animation-play-state: paused; }

        .scroll-line { width: 1px; height: 60px; background: linear-gradient(180deg, #C9A84C, transparent); animation: scrollDown 2s infinite; }
        .blink { animation: blink 1s infinite; }

        .skill-bar-fill {
          height: 100%;
          background: linear-gradient(90deg, #C9A84C, #F0D080);
          transform-origin: left;
          transition: transform 0.9s cubic-bezier(.77,0,.18,1);
        }

        .project-card-hover {
          transition: border-color 0.3s, transform 0.4s cubic-bezier(.34,1.56,.64,1);
        }
        .project-card-hover:hover { transform: translateY(-8px); }

        .stat-card-hover {
          transition: border-color 0.3s, transform 0.3s;
          position: relative; overflow: hidden;
        }
        .stat-card-hover::before {
          content: '';
          position: absolute; inset: 0;
          background: rgba(201,168,76,0.12);
          transform: translateX(-100%);
          transition: transform 0.4s;
          pointer-events: none;
        }
        .stat-card-hover:hover::before { transform: translateX(0); }

        .ach-card-hover { transition: border-color 0.3s, transform 0.3s; }
        .ach-card-hover::before {
          content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent, #C9A84C, transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .ach-card-hover:hover::before { opacity: 1; }
        .ach-card-hover:hover { transform: translateY(-4px); }

        .skill-grid-item:hover { background: rgba(201,168,76,0.06) !important; }
      `}</style>

      {/* ── WRAPPER ── */}
      <div
        style={{
          background: T.bg,
          color: T.text,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 300,
          minHeight: "100vh",
          transition: "background 0.5s, color 0.5s",
          position: "relative",
        }}
      >
        {/* Canvas */}
        <canvas
          ref={canvasRef}
          style={{ position: "fixed", inset: 0, zIndex: 0, opacity: lightMode ? 0.15 : 0.7, pointerEvents: "none" }}
        />

        {/* Noise overlay */}
        <div style={{
          position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundSize: "256px 256px",
          opacity: 0.3,
        }} />

        {/* FIX #1 + #2: Cursor via JS state, hidden on mobile via CSS class */}
        <div
          className="aa-cursor"
          style={{
            position: "fixed", zIndex: 9999, pointerEvents: "none",
            width: cursorHover ? 6 : 12,
            height: cursorHover ? 6 : 12,
            background: "#C9A84C",
            borderRadius: "50%",
            // FIX #14: no mix-blend-mode in light mode
            mixBlendMode: lightMode ? "normal" : "difference",
            transform: "translate(-50%, -50%)",
            left: cursorPos.x,
            top: cursorPos.y,
            transition: "width 0.2s, height 0.2s",
          }}
        />
        <div
          className="aa-ring"
          style={{
            position: "fixed", zIndex: 9998, pointerEvents: "none",
            width: cursorHover ? 60 : 40,
            height: cursorHover ? 60 : 40,
            border: "1px solid rgba(201,168,76,0.5)",
            borderRadius: "50%",
            transform: "translate(-50%, -50%)",
            left: ringPos.x,
            top: ringPos.y,
            opacity: cursorHover ? 0.6 : 1,
            transition: "width 0.3s, height 0.3s, opacity 0.3s",
          }}
        />

        {/* Scroll progress */}
        <div style={{
          position: "fixed", top: 0, left: 0, zIndex: 1000,
          height: 2,
          width: `${scrollPct}%`,
          background: "linear-gradient(90deg, #C9A84C, #F0D080)",
          transition: "width 0.1s",
        }} />

        {/* ── NAV ── */}
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 500,
          padding: navCompact ? "1rem 4rem" : "1.5rem 4rem",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          backdropFilter: "blur(20px)",
          background: lightMode
            ? `linear-gradient(180deg,rgba(245,242,235,${navCompact ? 0.97 : 0.9}) 0%,transparent 100%)`
            : `linear-gradient(180deg,rgba(8,8,8,${navCompact ? 0.97 : 0.9}) 0%,transparent 100%)`,
          transition: "padding 0.3s, background 0.3s",
          borderBottom: navCompact ? `1px solid ${T.border}` : "1px solid transparent",
        }}>
          <button
            onClick={() => scrollTo("hero")}
            style={{ background: "none", border: "none", cursor: "none", fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.1em", fontSize: "1.4rem", color: T.gold }}
          >AA</button>

          {/* FIX #9: nav-links hidden on mobile via CSS */}
          <ul className="nav-links" style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
            {["about", "projects", "achievements", "skills", "contact"].map(id => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  style={{
                    background: "none", border: "none", cursor: "none",
                    color: T.muted, fontSize: "0.78rem", letterSpacing: "0.15em",
                    textTransform: "uppercase", fontFamily: "'DM Mono', monospace",
                    transition: "color 0.3s", padding: "4px 0",
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = T.gold}
                  onMouseLeave={e => e.currentTarget.style.color = T.muted}
                >
                  {id}
                </button>
              </li>
            ))}
          </ul>

          {/* FIX #3: mode button text — clearly shows current mode action */}
          <button
            onClick={() => setLightMode(v => !v)}
            style={{
              background: "none", border: `1px solid ${T.border}`, color: T.muted,
              padding: "0.4rem 0.9rem", cursor: "none", fontSize: "0.75rem",
              letterSpacing: "0.1em", textTransform: "uppercase",
              fontFamily: "'DM Mono', monospace", transition: "all 0.3s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.gold; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}
          >
            {lightMode ? "☾ Dark Mode" : "☀ Light Mode"}
          </button>
        </nav>

        {/* ══════════ HERO ══════════ */}
        <section id="hero" style={{
          position: "relative", zIndex: 10,
          minHeight: "100vh", display: "flex", alignItems: "center",
          padding: "0 4rem", overflow: "hidden",
        }}>
          {/* Orbs */}
          {[
            { w: 400, t: "10%", l: "-10%", delay: "0s" },
            { w: 500, b: "10%", r: "-10%", delay: "-4s" },
          ].map((o, i) => (
            <div key={i} style={{
              position: "absolute", borderRadius: "50%", pointerEvents: "none",
              filter: "blur(120px)",
              width: o.w, height: o.w,
              top: o.t, bottom: o.b, left: o.l, right: o.r,
              background: `radial-gradient(circle, rgba(201,168,76,${lightMode ? 0.06 : 0.08}) 0%, transparent 70%)`,
              animation: `orbFloat 8s ease-in-out ${o.delay} infinite`,
            }} />
          ))}

          {/* Bg number */}
          <div style={{
            position: "absolute", right: "4rem", top: "50%",
            transform: "translateY(-50%)",
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: "20vw",
            color: `rgba(201,168,76,${lightMode ? 0.04 : 0.025})`,
            userSelect: "none", pointerEvents: "none", lineHeight: 1,
          }}>AA</div>

          <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>
            <p style={{
              fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", letterSpacing: "0.3em",
              color: T.gold, textTransform: "uppercase",
              animation: "fadeUp 0.8s 0.3s both",
            }}>Portfolio · 2025</p>

            <h1
              className="aa-glitch"
              data-text="AATISH ADAJANIA"
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: "clamp(5rem, 12vw, 13rem)",
                lineHeight: 0.9, letterSpacing: "-0.01em",
                color: T.white,
                animation: "fadeUp 0.8s 0.5s both",
                marginTop: "1rem",
              }}
            >
              AATISH<br />
              <span style={{ color: "transparent", WebkitTextStroke: `1px ${T.gold}` }}>ADAJANIA</span>
            </h1>

            <div style={{
              marginTop: "1.5rem",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)",
              fontStyle: "italic",
              color: T.muted,
              minHeight: "2.5rem",
              animation: "fadeUp 0.8s 0.7s both",
            }}>
              {typedText}<span className="blink" style={{ color: T.gold }}>|</span>
            </div>

            <p style={{
              maxWidth: 520, marginTop: "1.5rem",
              lineHeight: 1.9, color: T.muted, fontSize: "0.95rem",
              animation: "fadeUp 0.8s 0.9s both",
            }}>
              MBA (Business Analytics) candidate at SVNIT and an IT graduate who combines full-stack development with digital-marketing analytics to build and grow digital products.
            </p>

            <div style={{
              marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap",
              animation: "fadeUp 0.8s 1.1s both",
            }}>
              <a
                href="https://drive.google.com/file/d/1cRh7ABQS21k08r-0wrBy02lQH24Qn1MG/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer" /* FIX #13 */
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  padding: "0.9rem 2rem", background: T.gold, color: "#000",
                  fontWeight: 500, fontSize: "0.85rem", letterSpacing: "0.1em",
                  textTransform: "uppercase", textDecoration: "none",
                  clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))",
                  transition: "background 0.3s, transform 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = T.goldLight; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.background = T.gold; e.currentTarget.style.transform = ""; }}
              >
                <IconDownload /> Download Résumé
              </a>
              {[
                { label: "LinkedIn", href: "https://www.linkedin.com/in/aatish-adajania-694566268", icon: <IconLinkedin /> },
                { label: "GitHub", href: "https://github.com/aatishadajania", icon: <IconGithub /> },
              ].map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer" /* FIX #13 */
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "0.5rem",
                    padding: "0.9rem 2rem", background: "transparent",
                    color: T.text, fontSize: "0.85rem", letterSpacing: "0.1em",
                    textTransform: "uppercase", textDecoration: "none",
                    border: `1px solid ${T.border}`,
                    transition: "border-color 0.3s, color 0.3s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.gold; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.text; }}
                >
                  {icon} {label}
                </a>
              ))}
            </div>
          </div>

          <div style={{
            position: "absolute", bottom: "3rem", left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
            color: T.muted, fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase",
            animation: "fadeUp 0.8s 1.5s both",
          }}>
            <span>Scroll</span>
            <div className="scroll-line" />
          </div>
        </section>

        {/* ── DIVIDER ── */}
        <Divider color={T.border} />

        {/* ══════════ ABOUT ══════════ */}
        <section id="about" style={{ position: "relative", zIndex: 10, padding: "8rem 4rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal><SectionLabel color={T.gold}>About</SectionLabel></Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
              <div>
                <Reveal delay={0.1}>
                  <SectionTitle color={T.white}>WHO I<br />AM</SectionTitle>
                </Reveal>
                {[
                  <>I&apos;m an <strong style={{ color: T.text, fontWeight: 500 }}>MBA (Business Analytics) candidate at SVNIT</strong> and an IT graduate who operates at the intersection of technology, data, and business strategy.</>,
                  <>With hands-on experience as a <strong style={{ color: T.text, fontWeight: 500 }}>Digital Marketing Analyst</strong>, I&apos;ve planned and executed end-to-end performance campaigns, designed data pipelines, and built full-stack products from scratch using React, Node.js, and Python.</>,
                  <>I believe the best digital products are both beautifully engineered and commercially minded — and that&apos;s exactly the kind of work I create.</>,
                ].map((txt, i) => (
                  <Reveal key={i} delay={i * 0.1 + 0.2}>
                    <p style={{ marginBottom: "1.2rem", lineHeight: 1.9, color: T.muted, fontSize: "0.95rem" }}>{txt}</p>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.2}>
                <div ref={statsRef} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
                  {STATS.map((s, i) => (
                    <div
                      key={i}
                      className="stat-card-hover"
                      style={{
                        padding: "1.5rem",
                        border: `1px solid ${T.border}`,
                        background: T.bg2,
                      }}
                    >
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3rem", color: T.gold, lineHeight: 1, position: "relative" }}>
                        {counters[i]}{s.label.includes("%") ? "" : ""}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: T.muted, letterSpacing: "0.1em", textTransform: "uppercase", marginTop: "0.3rem", position: "relative" }}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── SKILLS TICKER ── */}
        <div style={{
          overflow: "hidden", whiteSpace: "nowrap",
          padding: "2rem 0",
          borderTop: `1px solid ${T.border}`,
          borderBottom: `1px solid ${T.border}`,
          position: "relative", zIndex: 10,
        }}>
          <div className="ticker-track">
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.4rem", fontStyle: "italic", color: T.muted, margin: "0 2rem" }}>{item}</span>
                <span style={{ display: "inline-block", width: 6, height: 6, background: T.gold, borderRadius: "50%", verticalAlign: "middle", margin: "0 2rem" }} />
              </span>
            ))}
          </div>
        </div>

        <Divider color={T.border} />

        {/* ══════════ PROJECTS ══════════ */}
        <section id="projects" style={{ position: "relative", zIndex: 10, padding: "8rem 4rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal><SectionLabel color={T.gold}>Selected Work</SectionLabel></Reveal>
            <Reveal delay={0.1}><SectionTitle color={T.white}>PROJECT<br />WORK</SectionTitle></Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.2rem" }}>
              {PROJECTS.map((p, i) => (
                <Reveal key={p.num} delay={i * 0.1}>
                  <div
                    className="project-card-hover"
                    style={{
                      background: T.bg2,
                      border: `1px solid ${T.border}`,
                      padding: "2rem",
                      position: "relative",
                      overflow: "hidden",
                      display: "flex", flexDirection: "column",
                      gridColumn: p.featured ? "span 2" : "span 1",
                    }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"}
                    onMouseLeave={e => e.currentTarget.style.borderColor = T.border}
                  >
                    {/* bottom accent line */}
                    <div style={{
                      position: "absolute", bottom: 0, left: 0, right: 0, height: 2,
                      background: "linear-gradient(90deg, #C9A84C, #F0D080)",
                      transform: "scaleX(0)", transformOrigin: "left",
                      transition: "transform 0.4s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.transform = "scaleX(1)"}
                    />
                    {p.featured && (
                      <span style={{
                        position: "absolute", top: "1.5rem", right: "1.5rem",
                        fontFamily: "'DM Mono', monospace", fontSize: "0.6rem",
                        letterSpacing: "0.2em", color: T.gold, textTransform: "uppercase",
                        border: `1px solid ${T.border}`, padding: "0.2rem 0.6rem",
                      }}>Featured</span>
                    )}
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "3.5rem", color: `rgba(201,168,76,${lightMode ? 0.08 : 0.06})`, lineHeight: 1, marginBottom: "1rem" }}>{p.num}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                      {p.tags.map(t => (
                        <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.05em", padding: "0.2rem 0.5rem", border: `1px solid ${T.border}`, color: T.muted, textTransform: "uppercase" }}>{t}</span>
                      ))}
                    </div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.6rem", fontWeight: 400, color: T.white, marginBottom: "0.4rem" }}>{p.title}</h3>
                    <p style={{ fontSize: "0.78rem", color: T.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>{p.sub}</p>
                    <p style={{ fontSize: "0.9rem", color: T.muted, lineHeight: 1.75, flex: 1 }}>{p.desc}</p>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noopener noreferrer" /* FIX #13 */
                        style={{
                          display: "inline-flex", alignItems: "center", gap: "0.5rem",
                          marginTop: "1.5rem", fontSize: "0.78rem", letterSpacing: "0.1em",
                          textTransform: "uppercase", color: T.gold, textDecoration: "none",
                          transition: "gap 0.3s",
                        }}
                        onMouseEnter={e => e.currentTarget.style.gap = "0.9rem"}
                        onMouseLeave={e => e.currentTarget.style.gap = "0.5rem"}
                      >
                        View Project <IconArrowDiag />
                      </a>
                    )}
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Divider color={T.border} />

        {/* ══════════ ACHIEVEMENTS ══════════ */}
        <section id="achievements" style={{ position: "relative", zIndex: 10, padding: "8rem 4rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal><SectionLabel color={T.gold}>Recognition</SectionLabel></Reveal>
            <Reveal delay={0.1}><SectionTitle color={T.white}>CERTIFI-<br />CATIONS</SectionTitle></Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
              {ACHIEVEMENTS.map((a, i) => (
                <Reveal key={a.title} delay={i * 0.1}>
                  <div
                    className="ach-card-hover"
                    style={{
                      background: T.bg2, border: `1px solid ${T.border}`,
                      padding: "2.5rem", position: "relative", overflow: "hidden",
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; }}
                  >
                    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" stroke={T.gold} strokeWidth="1.2" style={{ marginBottom: "1.5rem" }}>
                      {i === 0
                        ? <><circle cx="24" cy="24" r="18" /><path d="M24 14l2.5 7.5H34l-6 4.5 2.5 7.5L24 29l-6.5 4.5 2.5-7.5-6-4.5h7.5z" /></>
                        : <><rect x="8" y="8" width="32" height="32" rx="4" /><path d="M16 24h16M16 30h10M24 16l4 4-4 4" /></>
                      }
                    </svg>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: T.white, marginBottom: "0.4rem" }}>{a.title}</h3>
                    <p style={{ fontSize: "0.72rem", color: T.gold, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>{a.sub}</p>
                    <p style={{ fontSize: "0.9rem", color: T.muted, lineHeight: 1.75, marginBottom: "1.5rem" }}>{a.desc}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.5rem" }}>
                      {a.tags.map(t => (
                        <span key={t} style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.62rem", letterSpacing: "0.05em", padding: "0.2rem 0.5rem", border: `1px solid ${T.border}`, color: T.muted, textTransform: "uppercase" }}>{t}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: "1.5rem" }}>
                      {[{ label: "View Badge", url: a.badgeUrl }, { label: "Certificate", url: a.certUrl }].map(({ label, url }) => (
                        <a
                          key={label}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer" /* FIX #13 */
                          style={{
                            fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase",
                            color: T.muted, textDecoration: "none",
                            borderBottom: `1px solid ${T.border}`, paddingBottom: 2,
                            transition: "color 0.3s, border-color 0.3s",
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = T.gold; e.currentTarget.style.borderColor = T.gold; }}
                          onMouseLeave={e => { e.currentTarget.style.color = T.muted; e.currentTarget.style.borderColor = T.border; }}
                        >
                          {label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <Divider color={T.border} />

        {/* ══════════ SKILLS ══════════ */}
        <section id="skills" style={{ position: "relative", zIndex: 10, padding: "8rem 4rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal><SectionLabel color={T.gold}>Expertise</SectionLabel></Reveal>
            <Reveal delay={0.1}><SectionTitle color={T.white}>CORE<br />SKILLS</SectionTitle></Reveal>
            <Reveal delay={0.2}>
              <div
                ref={skillsRef}
                style={{
                  display: "grid", gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "1px", background: T.border,
                }}
              >
                {SKILLS.map((s) => (
                  <div
                    key={s.name}
                    className="skill-grid-item"
                    style={{ background: T.bg2, padding: "1.5rem 2rem", transition: "background 0.3s" }}
                  >
                    <div style={{ fontSize: "0.9rem", fontWeight: 500, color: T.text }}>{s.name}</div>
                    <div style={{ fontSize: "0.68rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.2rem" }}>{s.cat}</div>
                    <div style={{ height: 2, background: T.border, marginTop: "0.8rem" }}>
                      <div
                        className="skill-bar-fill"
                        style={{ transform: skillsVisible ? `scaleX(${s.pct})` : "scaleX(0)" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <Divider color={T.border} />

        {/* ══════════ CONTACT ══════════ */}
        <section id="contact" style={{ position: "relative", zIndex: 10, padding: "8rem 4rem" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto" }}>
            <Reveal><SectionLabel color={T.gold}>Get In Touch</SectionLabel></Reveal>
            <Reveal delay={0.1}><SectionTitle color={T.white}>LET&apos;S<br />TALK</SectionTitle></Reveal>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "5rem", alignItems: "start" }}>
              {/* Left info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
                <Reveal>
                  <p style={{ color: T.muted, lineHeight: 1.9, maxWidth: 360, fontSize: "0.95rem" }}>
                    Interested in collaborating, have a project in mind, or just want to connect? I&apos;m always open to new conversations.
                  </p>
                </Reveal>
                {[
                  { icon: <IconMail />, title: "Email", val: "aatishadajania20@gmail.com", href: "mailto:aatishadajania20@gmail.com" },
                  { icon: <IconLinkedin />, title: "LinkedIn", val: "aatish-adajania", href: "https://www.linkedin.com/in/aatish-adajania-694566268" },
                  { icon: <IconGithub />, title: "GitHub", val: "aatishadajania", href: "https://github.com/aatishadajania" },
                ].map(({ icon, title, val, href }, i) => (
                  <Reveal key={title} delay={i * 0.1 + 0.1}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: "1.2rem" }}>
                      <div style={{
                        flexShrink: 0, width: 44, height: 44,
                        border: `1px solid ${T.border}`,
                        display: "flex", alignItems: "center", justifyContent: "center",
                        color: T.gold,
                      }}>{icon}</div>
                      <div>
                        <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.15em", color: T.muted, marginBottom: "0.3rem" }}>{title}</div>
                        <a
                          href={href}
                          target={href.startsWith("http") ? "_blank" : undefined}
                          rel={href.startsWith("http") ? "noopener noreferrer" : undefined} /* FIX #13 */
                          style={{ color: T.text, textDecoration: "none", fontSize: "0.9rem", transition: "color 0.3s" }}
                          onMouseEnter={e => e.currentTarget.style.color = T.gold}
                          onMouseLeave={e => e.currentTarget.style.color = T.text}
                        >{val}</a>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>

              {/* Right form */}
              <Reveal delay={0.2}>
                {/* FIX #11: use relative _next */}
                <form
                  action="https://formsubmit.co/aatishadajania20@gmail.com"
                  method="POST"
                  onSubmit={handleFormSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
                >
                  <input type="hidden" name="_subject" value="New Message from Portfolio" />
                  <input type="hidden" name="_captcha" value="false" />
                  <input type="hidden" name="_template" value="table" />
                  {/* FIX #11: relative redirect */}
                  <input type="hidden" name="_next" value="./" />

                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                    {[{ name: "name", label: "Name", placeholder: "Your name", type: "text" }, { name: "email", label: "Email", placeholder: "your@email.com", type: "email" }].map(f => (
                      <FormField key={f.name} {...f} T={T} />
                    ))}
                  </div>
                  <FormField name="subject" label="Subject" placeholder="What&apos;s this about?" type="text" T={T} />
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                    <label style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.15em", color: T.muted }}>Message</label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      style={{
                        background: T.inputBg, border: `1px solid ${T.border}`,
                        color: T.text, padding: "0.8rem 1rem",
                        fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
                        outline: "none", resize: "none", transition: "border-color 0.3s",
                      }}
                      onFocus={e => e.currentTarget.style.borderColor = T.gold}
                      onBlur={e => e.currentTarget.style.borderColor = T.border}
                    />
                  </div>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {/* FIX #4: button preserves icon via children, not textContent */}
                    <button
                      type="submit"
                      disabled={formSending}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: "0.5rem",
                        background: T.gold, color: "#000", border: "none",
                        padding: "1rem 2rem", fontFamily: "'DM Sans', sans-serif",
                        fontWeight: 500, fontSize: "0.85rem", letterSpacing: "0.1em",
                        textTransform: "uppercase", cursor: "none",
                        transition: "background 0.3s",
                        opacity: formSending ? 0.7 : 1,
                      }}
                      onMouseEnter={e => !formSending && (e.currentTarget.style.background = T.goldLight)}
                      onMouseLeave={e => e.currentTarget.style.background = T.gold}
                    >
                      <IconSend />
                      {formSending ? "Sending…" : "Send Message"}
                    </button>
                    <button
                      type="button"
                      onClick={copyEmail}
                      style={{
                        background: "transparent", border: `1px solid ${T.border}`,
                        color: copyLabel.includes("✓") ? T.gold : T.muted,
                        borderColor: copyLabel.includes("✓") ? T.gold : T.border,
                        padding: "1rem 1.5rem", cursor: "none",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.8rem", letterSpacing: "0.1em",
                        textTransform: "uppercase", transition: "all 0.3s",
                      }}
                      onMouseEnter={e => { if (!copyLabel.includes("✓")) { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.gold; } }}
                      onMouseLeave={e => { if (!copyLabel.includes("✓")) { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; } }}
                    >
                      {copyLabel}
                    </button>
                  </div>
                </form>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{
          position: "relative", zIndex: 10,
          padding: "3rem 4rem",
          borderTop: `1px solid ${T.border}`,
          display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1.5rem",
        }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: "1.2rem", color: T.gold, letterSpacing: "0.1em" }}>Aatish Adajania</span>
          <span style={{ fontSize: "0.72rem", color: T.muted, letterSpacing: "0.05em" }}>© 2025 · Designed & built with passion</span>
          <div style={{ display: "flex", gap: "1rem" }}>
            {[
              { icon: <IconLinkedin />, href: "https://www.linkedin.com/in/aatish-adajania-694566268" },
              { icon: <IconGithub />, href: "https://github.com/aatishadajania" },
              { icon: <IconMail />, href: "mailto:aatishadajania20@gmail.com" },
            ].map(({ icon, href }, i) => (
              <a
                key={i}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined} /* FIX #13 */
                style={{
                  width: 40, height: 40, border: `1px solid ${T.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: T.muted, textDecoration: "none",
                  transition: "all 0.3s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.color = T.gold; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.color = T.muted; }}
              >
                {icon}
              </a>
            ))}
          </div>
        </footer>

        {/* ── BACK TO TOP ── */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            position: "fixed", bottom: "2rem", right: "2rem", zIndex: 500,
            width: 48, height: 48,
            background: T.gold, color: "#000", border: "none", cursor: "none",
            display: "flex", alignItems: "center", justifyContent: "center",
            clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            opacity: showTop ? 1 : 0,
            transform: showTop ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.3s, transform 0.3s, background 0.3s",
            pointerEvents: showTop ? "auto" : "none",
          }}
          onMouseEnter={e => e.currentTarget.style.background = T.goldLight}
          onMouseLeave={e => e.currentTarget.style.background = T.gold}
        >
          <IconArrowUp />
        </button>
      </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   SMALL REUSABLE PIECES
───────────────────────────────────────────── */
function Divider({ color }) {
  return (
    <div style={{
      height: 1,
      background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
      position: "relative", zIndex: 10, margin: "0 4rem",
    }} />
  );
}

function SectionLabel({ children, color }) {
  return (
    <p style={{
      fontFamily: "'DM Mono', monospace", fontSize: "0.7rem",
      letterSpacing: "0.3em", color, textTransform: "uppercase",
      marginBottom: "1rem", display: "flex", alignItems: "center", gap: "1rem",
    }}>
      <span style={{ display: "inline-block", width: 30, height: 1, background: color, flexShrink: 0 }} />
      {children}
    </p>
  );
}

function SectionTitle({ children, color }) {
  return (
    <h2 style={{
      fontFamily: "'Bebas Neue', sans-serif",
      fontSize: "clamp(3rem, 6vw, 6rem)",
      lineHeight: 0.95, color,
      marginBottom: "3rem",
    }}>
      {children}
    </h2>
  );
}

function FormField({ name, label, placeholder, type, T }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.15em", color: T.muted }}>{label}</label>
      <input
        type={type}
        name={name}
        required
        placeholder={placeholder}
        style={{
          background: T.inputBg, border: `1px solid ${T.border}`,
          color: T.text, padding: "0.8rem 1rem",
          fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem",
          outline: "none", width: "100%", transition: "border-color 0.3s",
        }}
        onFocus={e => e.currentTarget.style.borderColor = T.gold}
        onBlur={e => e.currentTarget.style.borderColor = T.border}
      />
    </div>
  );
}
//end