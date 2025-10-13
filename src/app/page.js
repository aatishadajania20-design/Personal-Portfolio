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
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
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
      desc: "Built with React, Node.js and Stripe. Features include escrow payments, real-time chat and project tracking.",
      url: "https://drive.google.com/file/d/1beJlCN6ae6wH4MQM9Qzc4fy1zRGwZzvz/view",
      tags: ["React", "Node.js", "Stripe", "Real-time Chat"],
    },
    {
      title: "Performance Marketing – Elinor Jewels",
      subtitle: "End-to-end ad-funnel design",
      desc: "Planned and executed Meta + Google campaigns and ran iterative A/B creative tests.",
      tags: ["Meta Ads", "Google Ads", "A/B Testing", "Growth Marketing"],
    },
    {
      title: "Customer Churn Prediction",
      subtitle: "Machine Learning Web App",
      desc: "Built a Streamlit app using Random Forest models to predict customer churn with 86% accuracy. Features interactive visualizations and real-time predictions.",
      url: "https://telco-churn-prediction1.streamlit.app/",
      tags: ["Python", "Random Forest", "Streamlit", "Machine Learning"],
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
            : "bg-gradient-to-br from-slate-50 via-blue-50 to-amber-50 text-gray-800"
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
              className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
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
        <header className="max-w-6xl mx-auto px-6 pt-24 pb-32">
          <div className="flex justify-between items-baseline">
            <motion.h1 
              className="text-4xl md:text-5xl font-bold"
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
                    darkMode ? "hover:text-yellow-400" : "hover:text-orange-500"
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

          <p id="typed-role" className="mt-3 text-lg min-h-[1.5em]" />

          <motion.p 
            className={`mt-6 max-w-3xl leading-relaxed ${
              darkMode ? "" : "text-gray-700"
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
            className="mt-8 flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <a
              href="https://drive.google.com/uc?export=download&id=1beJlCN6ae6wH4MQM9Qzc4fy1zRGwZzvz"
              className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
            >
              <FaDownload /> Download Résumé
            </a>
            <a
              href="https://www.linkedin.com/in/aatish-adajania-694566268"
              target="_blank"
              rel="noreferrer"
              className={`inline-flex items-center gap-2 rounded-lg border px-6 py-3 font-semibold transition-all hover:scale-105 hover:shadow-lg ${
                darkMode 
                  ? "border-gray-600 hover:bg-gray-800" 
                  : "border-gray-300 hover:bg-white shadow-md"
              }`}
            >
              <FaLinkedin /> Connect on LinkedIn
            </a>
          </motion.div>
        </header>

        <hr className={darkMode ? "border-gray-700" : "border-gray-300"} />

        {/* Projects */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold">Project Work</h2>
          </Reveal>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1}>
                <motion.div 
                  className={`group p-6 rounded-xl border h-full flex flex-col transition-all duration-300 hover:shadow-xl backdrop-blur-sm ${
                    darkMode 
                      ? "border-gray-700 hover:border-yellow-400 bg-gray-900/50" 
                      : "border-gray-300 hover:border-orange-400 bg-white/70 shadow-sm"
                  }`}
                  whileHover={{ y: -5 }}
                >
                  <div className="flex-1">
                    <h3 className={`text-xl font-semibold transition-colors ${
                      darkMode ? "group-hover:text-yellow-500" : "group-hover:text-orange-500"
                    }`}>
                      {p.title}
                    </h3>
                    <p className={`text-sm font-medium mt-2 ${
                      darkMode ? "text-yellow-500" : "text-orange-500"
                    }`}>
                      {p.subtitle}
                    </p>
                    <p className={`mt-4 leading-relaxed ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}>
                      {p.desc}
                    </p>
                    
                    {/* Project Tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {p.tags.map((tag, tagIndex) => (
                        <span 
                          key={tag}
                          className={`text-xs px-2 py-1 rounded-full border ${
                            darkMode 
                              ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20" 
                              : "bg-orange-500/10 text-orange-600 border-orange-500/20"
                          }`}
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
                      className={`mt-6 inline-flex items-center gap-2 text-sm font-medium transition-colors group/link ${
                        darkMode ? "text-yellow-500 hover:text-yellow-400" : "text-orange-500 hover:text-orange-400"
                      }`}
                    >
                      View Live Demo
                      <FaExternalLinkAlt className="group-hover/link:translate-x-1 transition-transform" />
                    </a>
                  )}
                </motion.div>
              </Reveal>
            ))}
          </div>
        </section>

        <hr className={darkMode ? "border-gray-700" : "border-gray-300"} />

        {/* Skills */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold">Core Competencies</h2>
          </Reveal>
          <div className="mt-10 flex flex-wrap gap-3">
            {skills.map((s, i) => (
              <Reveal key={s} delay={i * 0.03}>
                <motion.span 
                  className={`rounded-full px-5 py-2 text-sm font-medium backdrop-blur-sm cursor-default transition-all ${
                    darkMode 
                      ? "border border-gray-600 bg-gray-900/50 hover:border-yellow-400 hover:text-yellow-500" 
                      : "border border-gray-300 bg-white/70 shadow-sm hover:border-orange-400 hover:text-orange-500"
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
        <section className="max-w-4xl mx-auto px-6 py-20">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Get In Touch</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="max-w-2xl mx-auto">
              <p className={`text-center mb-8 text-lg leading-relaxed ${
                darkMode ? "" : "text-gray-700"
              }`}>
                Interested in working together or have questions? Send me a message and I'll get back to you soon.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:outline-none ${
                        darkMode 
                          ? "bg-gray-800 border-gray-600 text-white focus:border-yellow-400 focus:ring-yellow-400/20" 
                          : "bg-white border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400/20"
                      }`}
                      placeholder="Enter your name"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className={`block text-sm font-medium mb-2 ${
                      darkMode ? "text-gray-300" : "text-gray-700"
                    }`}>
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:outline-none ${
                        darkMode 
                          ? "bg-gray-800 border-gray-600 text-white focus:border-yellow-400 focus:ring-yellow-400/20" 
                          : "bg-white border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400/20"
                      }`}
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className={`block text-sm font-medium mb-2 ${
                    darkMode ? "text-gray-300" : "text-gray-700"
                  }`}>
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className={`w-full px-4 py-3 rounded-lg border transition-all focus:ring-2 focus:outline-none resize-none ${
                      darkMode 
                        ? "bg-gray-800 border-gray-600 text-white focus:border-yellow-400 focus:ring-yellow-400/20" 
                        : "bg-white border-gray-300 text-gray-900 focus:border-orange-400 focus:ring-orange-400/20"
                    }`}
                    placeholder="Enter your message..."
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-3 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500 px-8 py-4 font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                  >
                    <FaPaperPlane /> 
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={copyEmailToClipboard}
                    className={`inline-flex items-center gap-3 rounded-lg border px-6 py-3 font-semibold transition-all hover:scale-105 hover:shadow-lg ${
                      darkMode 
                        ? "border-gray-600 hover:bg-gray-800" 
                        : "border-gray-300 hover:bg-white shadow-md"
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
                    className={`p-4 rounded-lg text-center ${
                      darkMode ? "bg-green-500/20 text-green-400" : "bg-green-100 text-green-700"
                    }`}
                  >
                    Thank you for your message! I'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </div>
          </Reveal>
        </section>

        {/* Footer */}
        <footer className={`border-t py-8 text-center ${
          darkMode ? "border-gray-700" : "border-gray-300"
        }`}>
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