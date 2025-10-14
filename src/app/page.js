"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  FaLinkedin,
  FaEnvelope,
  FaGithub,
  FaDownload,
  FaExternalLinkAlt,
  FaSun,
  FaMoon,
  FaArrowUp,
  FaPaperPlane,
} from "react-icons/fa";
import Typed from "typed.js";

/* --------------------------------------------------------
   Scroll reveal wrapper
---------------------------------------------------------- */
const Reveal = ({ children, delay = 0 }) => {
  const { ref, inView } = useInView({ threshold: 0.25, triggerOnce: true });
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  );
};

/* --------------------------------------------------------
   Main Component
---------------------------------------------------------- */
export default function Page() {
  const [mounted, setMounted] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");
  const typedRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const savedMode = localStorage.getItem("aatish-portfolio-dark");
    if (savedMode) setDarkMode(JSON.parse(savedMode));
  }, []);

  useEffect(() => {
    if (mounted)
      localStorage.setItem("aatish-portfolio-dark", JSON.stringify(darkMode));
  }, [darkMode, mounted]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = document.querySelector("#typed-role");
    if (!el) return;

    const typed = new Typed(el, {
      strings: [
        "MBA (Business Analytics) – SVNIT",
        "Ex-Digital Marketing Analyst",
        "Full-Stack Developer",
        "Data-Driven Growth Strategist",
      ],
      typeSpeed: 75,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("aatishadajania20@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
      
      // Reset status after 3 seconds
      setTimeout(() => setSubmitStatus(""), 3000);
    }, 1500);
  };

  if (!mounted) return null;

  const projects = [
    {
      title: "Freelancing Platform",
      subtitle: "Full-stack two-sided marketplace",
      desc: "Built with React, Node.js and Express.",
      url: "https://drive.google.com/file/d/1beJlCN6ae6wH4MQM9Qzc4fy1zRGwZzvz/view",
      tags: ["React", "Node.js", "Stripe", "Real-time Chat"],
      gradient: "from-indigo-600 to-purple-700"
    },
    {
      title: "Performance Marketing – Elinor Jewels",
      subtitle: "End-to-end ad-funnel design",
      desc: "Planned and executed Meta + Google campaigns and ran iterative A/B creative tests.",
      tags: ["Meta Ads", "Google Ads", "A/B Testing", "Growth Marketing"],
      gradient: "from-pink-500 to-rose-600"
    },
    {
      title: "Customer Churn Prediction",
      subtitle: "Machine Learning Web App",
      desc: "Built a Streamlit app using Random Forest models to predict customer churn with 80% accuracy. Features interactive visualizations and real-time predictions.",
      url: "https://telco-churn-prediction1.streamlit.app/",
      tags: ["Python", "Random Forest", "Streamlit", "Machine Learning"],
      gradient: "from-blue-600 to-cyan-600"
    },
  ];

  const skills = [
    "Strategy & Growth",
    "Business Analytics",
    "Next.js",
    "SQL",
    "Python",
    "React & Node",
    "Performance Marketing",
    "A/B Testing",
    "Financial Modelling",
  ];

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div
        className={`min-h-screen transition-colors duration-500 ${
          darkMode 
            ? "bg-gray-950 text-white" 
            : "bg-gray-50 text-gray-900"
        }`}
      >
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 text-black shadow-lg transition-all hover:scale-110 hover:shadow-xl"
            >
              <FaArrowUp />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode((v) => !v)}
          aria-label="Toggle theme"
          className={`fixed top-5 right-5 z-50 grid h-10 w-10 place-items-center rounded-full backdrop-blur-lg ring-1 transition-all hover:scale-110 hover:shadow-lg ${
            darkMode 
              ? "bg-white/10 ring-white/20" 
              : "bg-black/5 ring-gray-400/30"
          }`}
        >
          <AnimatePresence mode="wait">
            {darkMode ? (
              <motion.div
                key="sun"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaSun className="text-yellow-300" />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaMoon className="text-indigo-600" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>

        {/* Hero */}
        <header className={`relative flex min-h-screen items-center justify-center overflow-hidden px-6 ${
          darkMode ? "" : "bg-gray-50"
        }`}>
          {/* Animated gradient orbs for light mode */}
          {!darkMode && (
            <>
              <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-br from-yellow-200 to-indigo-200 opacity-40 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-purple-200 to-pink-200 opacity-40 blur-3xl" />
            </>
          )}

          <div className="relative z-10 text-center max-w-6xl mx-auto">
            <div className="flex justify-between items-baseline mb-12">
              <motion.h1 
                className="text-4xl md:text-6xl font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Aatish Adajania
              </motion.h1>
              <div className="hidden md:flex items-center gap-4 text-2xl">
                {[
                  { icon: FaLinkedin, href: "https://www.linkedin.com/in/aatish-adajania-694566268" },
                  { icon: FaEnvelope, href: "mailto:aatishadajania20@gmail.com" },
                  { icon: FaGithub, href: "https://github.com/aatishadajania" },
                ].map(({ icon: Icon, href }, index) => (
                  <motion.a
                    key={href}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className={`transition-transform hover:scale-110 ${
                      darkMode ? "hover:text-yellow-400" : "hover:text-indigo-600"
                    }`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.5 }}
                  >
                    <Icon />
                  </motion.a>
                ))}
              </div>
            </div>

            <p id="typed-role" className="mt-3 text-xl md:text-2xl min-h-[1.5em]" />

            <motion.p 
              className={`mt-6 max-w-3xl mx-auto leading-relaxed text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              I am an MBA (Business Analytics) candidate at SVNIT and an IT
              graduate who combines full-stack development with digital-marketing
              analytics to build and grow digital products.
            </motion.p>

            <motion.div 
              className="mt-8 flex flex-wrap gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="https://drive.google.com/file/d/1Qk8d29kG-30LfKpdEke4_Rqv0s1J3Npv/view?usp=sharing"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-semibold text-black shadow-lg transition-all hover:scale-105 hover:shadow-xl"
              >
                <FaDownload /> Download Résumé
              </a>
              <a
                href="https://www.linkedin.com/in/aatish-adajania-694566268"
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold transition-all hover:scale-105 hover:shadow-lg ${
                  darkMode 
                    ? "bg-white/10 ring-1 ring-white/20 backdrop-blur hover:bg-white/20 text-white" 
                    : "bg-white ring-1 ring-gray-200 shadow-lg hover:bg-gray-50 text-gray-900"
                }`}
              >
                <FaLinkedin className={darkMode ? "text-blue-300" : "text-blue-600"} /> Connect on LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className={`h-6 w-3 rounded-full border ${
              darkMode ? "border-white/40" : "border-gray-400"
            }`}>
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className={`mx-auto mt-1 h-2 w-1 rounded-full ${
                  darkMode ? "bg-white/60" : "bg-gray-600"
                }`}
              />
            </div>
          </div>
        </header>

        {/* Projects */}
        <section className="max-w-6xl mx-auto px-6 py-24">
          <Reveal>
            <h2 className={`text-4xl md:text-5xl font-bold text-center ${
              darkMode ? "" : "text-gray-800"
            }`}>
              Project Work
            </h2>
          </Reveal>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <motion.div 
                  className={`group relative overflow-hidden rounded-3xl p-8 text-white shadow-2xl h-full flex flex-col bg-gradient-to-br ${p.gradient}`}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold">{p.title}</h3>
                    <p className="text-sm font-medium mt-2 opacity-90">
                      {p.subtitle}
                    </p>
                    <p className="mt-4 leading-relaxed opacity-90">
                      {p.desc}
                    </p>
                    
                    {/* Project Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((tag, tagIndex) => (
                        <span 
                          key={tag}
                          className="text-xs px-3 py-1 rounded-full bg-white/20 backdrop-blur border border-white/30"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {p.url && (
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 text-sm font-semibold backdrop-blur hover:bg-white/30 transition-all"
                    >
                      View Live Demo
                      <FaExternalLinkAlt className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  )}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section className={`py-24 px-6 ${
          darkMode ? "bg-white/5" : "bg-gray-100"
        }`}>
          <Reveal>
            <h2 className={`text-4xl md:text-5xl font-bold text-center ${
              darkMode ? "" : "text-gray-800"
            }`}>
              Core Competencies
            </h2>
          </Reveal>
          <div className="mt-16 flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
            {skills.map((s, i) => (
              <Reveal key={s} delay={i * 0.03}>
                <motion.span 
                  className={`rounded-2xl p-6 text-center font-medium backdrop-blur transition-all ${
                    darkMode 
                      ? "bg-white/5 ring-1 ring-white/10 hover:bg-white/10 hover:scale-105" 
                      : "bg-white ring-1 ring-gray-200 shadow-lg hover:shadow-xl hover:scale-105"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {s}
                </motion.span>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="max-w-4xl mx-auto px-6 py-24">
          <Reveal>
            <h2 className={`text-4xl md:text-5xl font-bold text-center mb-12 ${
              darkMode ? "" : "text-gray-800"
            }`}>
              Get In Touch
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <p className={`text-center mb-8 text-lg leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                Interested in working together or have questions? Send me a message and I&apos;ll get back to you soon.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-4 rounded-xl transition-all focus:outline-none focus:ring-2 ${
                        darkMode 
                          ? "bg-white/5 text-white placeholder-gray-400 ring-1 ring-white/10 focus:ring-yellow-400" 
                          : "bg-white text-gray-900 placeholder-gray-500 ring-1 ring-gray-200 shadow-lg focus:ring-yellow-400"
                      }`}
                      placeholder="Your Name"
                    />
                  </div>
                  
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-4 rounded-xl transition-all focus:outline-none focus:ring-2 ${
                        darkMode 
                          ? "bg-white/5 text-white placeholder-gray-400 ring-1 ring-white/10 focus:ring-yellow-400" 
                          : "bg-white text-gray-900 placeholder-gray-500 ring-1 ring-gray-200 shadow-lg focus:ring-yellow-400"
                      }`}
                      placeholder="Your Email"
                    />
                  </div>
                </div>
                
                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-4 rounded-xl transition-all focus:outline-none focus:ring-2 resize-none ${
                      darkMode 
                        ? "bg-white/5 text-white placeholder-gray-400 ring-1 ring-white/10 focus:ring-yellow-400" 
                        : "bg-white text-gray-900 placeholder-gray-500 ring-1 ring-gray-200 shadow-lg focus:ring-yellow-400"
                    }`}
                    placeholder="Your Message"
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 px-8 py-4 font-semibold text-black shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  >
                    <FaPaperPlane /> 
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={copyEmailToClipboard}
                    className={`inline-flex items-center gap-3 rounded-full px-6 py-3 font-semibold transition-all hover:scale-105 hover:shadow-lg ${
                      darkMode 
                        ? "bg-white/10 ring-1 ring-white/20 backdrop-blur hover:bg-white/20 text-white" 
                        : "bg-white ring-1 ring-gray-200 shadow-lg hover:bg-gray-50 text-gray-900"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {copiedEmail ? "✓ Copied!" : "Copy Email"}
                  </motion.button>
                </div>

                {submitStatus === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`p-4 rounded-xl text-center ${
                      darkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700"
                    }`}
                  >
                    Thank you for your message! I&apos;ll get back to you soon.
                  </motion.div>
                )}
              </form>

              {/* Social Links */}
              <Reveal delay={0.25}>
                <div className="mt-12 flex justify-center gap-6 text-2xl">
                  <a
                    href="mailto:aatishadajania20@gmail.com"
                    aria-label="Email"
                    className={`transition hover:scale-110 ${
                      darkMode ? "text-gray-300 hover:text-yellow-300" : "text-gray-600 hover:text-indigo-600"
                    }`}
                  >
                    <FaEnvelope />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/aatish-adajania-694566268"
                    aria-label="LinkedIn"
                    className={`transition hover:scale-110 ${
                      darkMode ? "text-gray-300 hover:text-yellow-300" : "text-gray-600 hover:text-indigo-600"
                    }`}
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="https://github.com/aatishadajania"
                    aria-label="GitHub"
                    className={`transition hover:scale-110 ${
                      darkMode ? "text-gray-300 hover:text-yellow-300" : "text-gray-600 hover:text-indigo-600"
                    }`}
                  >
                    <FaGithub />
                  </a>
                </div>
              </Reveal>
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer className={`py-8 text-center ${
          darkMode ? "border-gray-800" : "border-gray-200"
        } border-t`}>
          <div className="max-w-6xl mx-auto px-6">
            <p className={`text-sm ${
              darkMode ? "text-gray-400" : "text-gray-600"
            }`}>
              © 2025 Aatish Adajania. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}