import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  Globe,
  ArrowRight,
  ArrowUpRight,
  Menu,
  X,
  MapPin,
} from "lucide-react";

/* ------------------------------------------------------------------
   VISWAJIT R — PORTFOLIO
   Single-file, self-contained React component.
   Requires: react, framer-motion, lucide-react, Tailwind CSS.
   Fonts (Space Grotesk / Inter / JetBrains Mono) are injected at
   runtime so this file has zero external setup beyond the deps above.
------------------------------------------------------------------- */

/* ---------------------------- Design tokens ---------------------------- */
const COLORS = {
  ink: "#070F22", // page background — near-black navy
  navy: "#0E2447", // panel / card background
  navySoft: "#122C56",
  blue: "#3465E0", // primary blue accent
  blueSoft: "#5C82E8",
  gold: "#E3A93B", // primary gold accent
  goldLight: "#F3CE7C",
  paper: "#F4F6FB", // primary text on dark
  muted: "#8CA0C4", // secondary text
  line: "rgba(140,160,196,0.16)",
};

const NAV_LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "impact", label: "Impact" },
  { id: "contact", label: "Contact" },
];

/* ------------------------------- Logo mark ------------------------------
   Abstract "W2" monogram: a layered double-chevron in the spirit of the
   reference W2 mark — a monoline outer W with a smaller offset inner V
   creating the faceted, layered look. Rendered in blue + gold gradients.
-------------------------------------------------------------------------- */
function Logo({ size = 40, animate = false, className = "" }) {
  const reduce = useReducedMotion();
  const outerPath = "M8,18 L27,78 L50,40 L73,78 L92,18";
  const innerPath = "M34,58 L50,88 L66,58";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Viswajit R — W2 monogram"
    >
      <defs>
        <linearGradient id="w2-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={COLORS.goldLight} />
          <stop offset="100%" stopColor={COLORS.gold} />
        </linearGradient>
        <linearGradient id="w2-blue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={COLORS.blueSoft} />
          <stop offset="100%" stopColor={COLORS.blue} />
        </linearGradient>
      </defs>
      <motion.path
        d={outerPath}
        stroke="url(#w2-gold)"
        strokeWidth="11"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate && !reduce ? { pathLength: 0, opacity: 0 } : false}
        animate={animate && !reduce ? { pathLength: 1, opacity: 1 } : false}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.path
        d={innerPath}
        stroke="url(#w2-blue)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={animate && !reduce ? { pathLength: 0, opacity: 0 } : false}
        animate={animate && !reduce ? { pathLength: 1, opacity: 1 } : false}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
      />
    </svg>
  );
}

/* ----------------------------- Small helpers ----------------------------- */
function Eyebrow({ children }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase font-medium"
      style={{ color: COLORS.gold, fontFamily: "'JetBrains Mono', monospace" }}
    >
      <span className="h-[1px] w-6" style={{ backgroundColor: COLORS.gold }} />
      {children}
    </span>
  );
}

function SectionHeading({ eyebrow, title, sub, align = "left" }) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2
        className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
        style={{ color: COLORS.paper, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {title}
      </h2>
      {sub && (
        <p className="mt-4 text-base sm:text-lg leading-relaxed" style={{ color: COLORS.muted }}>
          {sub}
        </p>
      )}
    </div>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* --------------------------------- Nav --------------------------------- */
function Nav({ onNavigate, activeId }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div
        className="mx-auto max-w-6xl mt-3 sm:mt-4 px-4 sm:px-6 py-3 rounded-2xl backdrop-blur-xl flex items-center justify-between"
        style={{
          background: "rgba(7,15,34,0.6)",
          border: `1px solid ${COLORS.line}`,
        }}
      >
        <button
          onClick={() => onNavigate("hero")}
          className="flex items-center gap-2.5 group"
          aria-label="Go to top"
        >
          <Logo size={30} />
          <span
            className="text-sm font-semibold tracking-wide"
            style={{ color: COLORS.paper, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            VISWAJIT&nbsp;R
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <button
              key={l.id}
              onClick={() => onNavigate(l.id)}
              className="relative px-3.5 py-2 text-sm rounded-lg transition-colors"
              style={{
                color: activeId === l.id ? COLORS.paper : COLORS.muted,
                fontFamily: "'Inter', sans-serif",
              }}
            >
              {l.label}
              {activeId === l.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full"
                  style={{ backgroundColor: COLORS.gold }}
                />
              )}
            </button>
          ))}
        </nav>

        <button
          onClick={() => onNavigate("contact")}
          className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium px-4 py-2 rounded-lg"
          style={{ backgroundColor: COLORS.gold, color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}
        >
          Contact <ArrowUpRight size={15} />
        </button>

        <button
          className="md:hidden p-2 rounded-lg"
          style={{ color: COLORS.paper }}
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mx-4 mt-2 rounded-2xl overflow-hidden"
            style={{ background: "rgba(14,36,71,0.96)", border: `1px solid ${COLORS.line}` }}
          >
            {NAV_LINKS.map((l) => (
              <button
                key={l.id}
                onClick={() => {
                  onNavigate(l.id);
                  setOpen(false);
                }}
                className="block w-full text-left px-5 py-3.5 text-sm border-b last:border-b-0"
                style={{ color: COLORS.paper, borderColor: COLORS.line, fontFamily: "'Inter', sans-serif" }}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* --------------------------------- Hero --------------------------------- */
function Hero({ onNavigate, sectionRef }) {
  const reduce = useReducedMotion();
  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen w-full snap-start flex flex-col justify-center overflow-hidden px-6"
    >
      {/* ambient background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${COLORS.blue}33, transparent 70%)` }}
          animate={reduce ? {} : { y: [0, 30, 0], x: [0, 20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-48 -right-24 w-[560px] h-[560px] rounded-full blur-3xl"
          style={{ background: `radial-gradient(circle, ${COLORS.gold}22, transparent 70%)` }}
          animate={reduce ? {} : { y: [0, -24, 0], x: [0, -16, 0] }}
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(244,246,251,1) 1px, transparent 1px), linear-gradient(90deg, rgba(244,246,251,1) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="relative max-w-5xl mx-auto w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <Logo size={72} animate />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0.5}>
          <Eyebrow>AI &amp; Full-Stack Developer · Bengaluru</Eyebrow>
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1}
          className="mt-6 text-4xl sm:text-6xl md:text-7xl font-semibold tracking-tight leading-[1.05]"
          style={{ color: COLORS.paper, fontFamily: "'Space Grotesk', sans-serif" }}
        >
          From research papers
          <br />
          <span style={{ color: COLORS.gold }}>to running code.</span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1.4}
          className="mt-6 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ color: COLORS.muted }}
        >
          AI &amp; Data Science undergraduate building applied machine learning systems —
          causal reinforcement learning, computer vision, and the full-stack products
          that put them to work.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="show"
          custom={1.8}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onNavigate("projects")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
            style={{ backgroundColor: COLORS.gold, color: COLORS.ink, fontFamily: "'Inter', sans-serif" }}
          >
            View Projects <ArrowRight size={16} />
          </button>
          <button
            onClick={() => onNavigate("contact")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold"
            style={{
              border: `1px solid ${COLORS.line}`,
              color: COLORS.paper,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Contact
          </button>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <span
          className="text-[10px] tracking-[0.3em] uppercase"
          style={{ color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace" }}
        >
          Scroll
        </span>
        <motion.div
          className="w-[1px] h-8"
          style={{ backgroundColor: COLORS.muted }}
          animate={reduce ? {} : { scaleY: [1, 0.4, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

/* --------------------------------- About --------------------------------- */
function About({ sectionRef }) {
  const stats = [
    { label: "CGPA", value: "9.22 / 10" },
    { label: "Developers led", value: "12" },
    { label: "Students on AR/VR curriculum", value: "80+" },
    { label: "Hackathon site visitors", value: "500+" },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen w-full snap-start flex items-center px-6 py-28"
    >
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-5 gap-14 items-center">
        <motion.div
          className="md:col-span-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
        >
          <SectionHeading
            eyebrow="About"
            title="Research-minded. Product-driven."
          />
          <p className="mt-6 text-base sm:text-lg leading-relaxed" style={{ color: COLORS.muted }}>
            Viswajit is a fourth-year AI &amp; Data Science undergraduate at{" "}
            <span style={{ color: COLORS.paper }}>Nitte Meenakshi Institute of Technology</span>,
            Bengaluru, with a 9.22 CGPA and a habit of finishing what he starts. His work
            spans machine learning, reinforcement learning, and full-stack engineering —
            grounded in the belief that research only matters once it runs in production.
          </p>
          <p className="mt-4 text-base sm:text-lg leading-relaxed" style={{ color: COLORS.muted }}>
            As Technical Head of AUGMENTIX, he leads developers, ships tools used by
            hundreds of students, and turns early-stage ideas into systems people rely
            on — equally exacting in a research paper and a codebase.
          </p>
        </motion.div>

        <motion.div
          className="md:col-span-2 grid grid-cols-2 gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={fadeUp}
          custom={1}
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className="rounded-2xl p-5"
              style={{ background: COLORS.navy, border: `1px solid ${COLORS.line}` }}
            >
              <div
                className="text-2xl sm:text-3xl font-semibold"
                style={{ color: COLORS.gold, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {s.value}
              </div>
              <div className="mt-2 text-xs leading-snug" style={{ color: COLORS.muted }}>
                {s.label}
              </div>
            </div>
          ))}
          <div
            className="col-span-2 rounded-2xl p-5 flex items-center gap-3"
            style={{ background: COLORS.navySoft, border: `1px solid ${COLORS.line}` }}
          >
            <MapPin size={16} style={{ color: COLORS.blueSoft }} />
            <span className="text-sm" style={{ color: COLORS.paper }}>
              Bengaluru, Karnataka — NMIT · B.E. AI &amp; Data Science, 2023–2027
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------- Experience ------------------------------- */
function Experience({ sectionRef }) {
  const points = [
    "Authored and presented a research paper on AI-driven stock market price prediction to 50+ students and faculty",
    "Led 12 junior developers across 3 incubation projects, maintaining 100% milestone completion",
    "Co-developed an AR/VR curriculum with Madras Mindworks, used by over 80 engineering students",
    "Developed the official HackSurgeX website supporting registrations for a 36-hour hackathon with 500+ visitors",
    "Supported logistics for NirvAI 2024 and Hallomania 2025, attracting 250+ participants",
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative min-h-screen w-full snap-start flex items-center px-6 py-28"
    >
      <div className="max-w-5xl mx-auto w-full">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}>
          <SectionHeading eyebrow="Experience" title="Leading from the technical side." />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={1}
          className="mt-12 rounded-3xl p-8 sm:p-10"
          style={{ background: COLORS.navy, border: `1px solid ${COLORS.line}` }}
        >
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h3
                className="text-xl sm:text-2xl font-semibold"
                style={{ color: COLORS.paper, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Technical Head — AUGMENTIX
              </h3>
              <p className="mt-1 text-sm" style={{ color: COLORS.muted }}>
                AI &amp; DS Student Club · NMIT, Bengaluru
              </p>
            </div>
            <span
              className="text-xs tracking-widest uppercase px-3 py-1.5 rounded-full whitespace-nowrap self-start"
              style={{
                color: COLORS.gold,
                border: `1px solid ${COLORS.gold}55`,
                fontFamily: "'JetBrains Mono', monospace",
              }}
            >
              Nov 2024 — Present
            </span>
          </div>

          <ul className="mt-8 space-y-4">
            {points.map((p, i) => (
              <motion.li
                key={p}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="flex gap-3 text-sm sm:text-base leading-relaxed"
                style={{ color: COLORS.muted }}
              >
                <span className="mt-2 h-1.5 w-1.5 rounded-full shrink-0" style={{ backgroundColor: COLORS.blueSoft }} />
                <span>{p}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------- Projects -------------------------------- */
const PROJECTS = [
  {
    tag: "Final Year Project",
    title: "Causal Reinforcement Learning for Algorithmic Trading",
    desc: "A causal RL framework combining NOTEARS and Structural Causal Models across 30 financial assets — improving Sharpe Ratio over non-causal baselines with Dueling Double DQN and Discrete SAC, validated by a 7-model ablation study.",
    stack: ["Python", "Causal Inference", "Reinforcement Learning"],
  },
  {
    tag: "Academic Project",
    title: "Document Forgery Detection",
    desc: "Implemented and benchmarked five deep learning architectures to classify forged and manipulated documents, comparing accuracy, precision, recall, and F1 to identify the strongest model.",
    stack: ["Python", "PyTorch / TensorFlow", "CNNs"],
  },
  {
    tag: "Academic Project",
    title: "RhythmX — Algorithmic Music Discovery",
    desc: "A full-stack recommendation platform clustering songs by mood using K-Means and Librosa features, with a FastAPI backend applying Apriori-based rule mining to surface tracks beyond popularity signals.",
    stack: ["React", "FastAPI", "MongoDB", "scikit-learn"],
  },
  {
    tag: "Personal Project",
    title: "HackSurge X — Event Landing Page",
    desc: "An animated, framework-free hackathon landing page with a live countdown, event timeline, Canvas particle effects, and scroll-triggered animation — fully responsive and cinematic.",
    stack: ["HTML", "CSS", "JavaScript"],
  },
  {
    tag: "Hackathon Project",
    title: "AI Mentor — Gemini-Powered Student Guidance",
    desc: "A student mentoring platform integrating the Gemini API for personalized academic guidance, prototyped in 48 hours as an adaptive, context-aware support system.",
    stack: ["JavaScript", "Python", "Gemini API"],
  },
];

const SIDE_PROJECT = {
  title: "Bank ATM Simulation System",
  desc: "Console-based banking simulation using OOP and core data structures — account registration, authentication, transfers, minimum-balance logic, and service charges.",
  stack: ["C++", "DSA"],
};

function ProjectCard({ p, i }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className="group relative rounded-2xl p-6 sm:p-7 flex flex-col h-full"
      style={{ background: COLORS.navy, border: `1px solid ${COLORS.line}` }}
    >
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: `0 0 0 1px ${COLORS.gold}66, 0 20px 40px -20px ${COLORS.gold}33` }}
      />
      <span
        className="text-[10px] tracking-[0.24em] uppercase font-medium"
        style={{ color: COLORS.blueSoft, fontFamily: "'JetBrains Mono', monospace" }}
      >
        {p.tag}
      </span>
      <h3
        className="mt-3 text-lg font-semibold leading-snug"
        style={{ color: COLORS.paper, fontFamily: "'Space Grotesk', sans-serif" }}
      >
        {p.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed flex-1" style={{ color: COLORS.muted }}>
        {p.desc}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {p.stack.map((s) => (
          <span
            key={s}
            className="text-[11px] px-2.5 py-1 rounded-full"
            style={{ color: COLORS.goldLight, background: `${COLORS.gold}14`, border: `1px solid ${COLORS.gold}33` }}
          >
            {s}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

function Projects({ sectionRef }) {
  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen w-full snap-start flex items-center px-6 py-28"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}>
          <SectionHeading eyebrow="Featured Projects" title="Ideas, made to run." />
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.title} p={p} i={i} />
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl p-6 sm:p-7 flex flex-col justify-center"
            style={{ border: `1px dashed ${COLORS.line}` }}
          >
            <span
              className="text-[10px] tracking-[0.24em] uppercase font-medium"
              style={{ color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace" }}
            >
              Also built
            </span>
            <h3
              className="mt-3 text-base font-semibold"
              style={{ color: COLORS.paper, fontFamily: "'Space Grotesk', sans-serif" }}
            >
              {SIDE_PROJECT.title}
            </h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: COLORS.muted }}>
              {SIDE_PROJECT.desc}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {SIDE_PROJECT.stack.map((s) => (
                <span key={s} className="text-[11px] px-2.5 py-1 rounded-full" style={{ color: COLORS.blueSoft, background: `${COLORS.blue}14`, border: `1px solid ${COLORS.blue}33` }}>
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Skills --------------------------------- */
const SKILLS = [
  { cat: "Languages", items: ["Python", "C", "C++", "Java", "Go", "MATLAB"] },
  {
    cat: "AI / ML",
    items: [
      "Machine Learning",
      "Deep Learning",
      "Reinforcement Learning",
      "Causal Inference",
      "Computer Vision",
      "Clustering",
      "Association Rule Mining",
      "LLM API Integration",
    ],
  },
  { cat: "Frameworks & Libraries", items: ["PyTorch", "TensorFlow", "FastAPI", "React", "scikit-learn", "Librosa", "OpenCV"] },
  { cat: "Web & Databases", items: ["HTML", "CSS", "JavaScript", "Web Technologies", "MongoDB", "SQL", "Git"] },
  {
    cat: "Practices",
    items: ["OOP", "DSA", "Agile / Scrum", "Technical Team Leadership", "Event Management", "Curriculum Development"],
  },
];

function Skills({ sectionRef }) {
  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen w-full snap-start flex items-center px-6 py-28"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}>
          <SectionHeading eyebrow="Skills" title="The toolkit behind the work." />
        </motion.div>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {SKILLS.map((s, i) => (
            <motion.div
              key={s.cat}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: i * 0.06 }}
              className={`rounded-2xl p-6 ${s.cat === "AI / ML" ? "md:col-span-2" : ""}`}
              style={{ background: COLORS.navy, border: `1px solid ${COLORS.line}` }}
            >
              <h3
                className="text-sm tracking-[0.18em] uppercase font-medium"
                style={{ color: COLORS.gold, fontFamily: "'JetBrains Mono', monospace" }}
              >
                {s.cat}
              </h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {s.items.map((item) => (
                  <span
                    key={item}
                    className="text-sm px-3 py-1.5 rounded-lg"
                    style={{ color: COLORS.paper, background: COLORS.navySoft, border: `1px solid ${COLORS.line}` }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------- Impact --------------------------------- */
const TRAITS = [
  { t: "Attention to detail", m: "Ablation studies over assumptions — five architectures benchmarked, not guessed." },
  { t: "Ambitious", m: "Presented original research to 50+ peers and faculty before finishing his degree." },
  { t: "Curious", m: "Chases the \u201cwhy\u201d — from causal graphs to association-rule mining." },
  { t: "Analytical", m: "Validates results with statistical significance testing, not intuition." },
  { t: "Creative", m: "Layers reinforcement learning onto markets, mentoring onto Gemini, sound onto clustering." },
  { t: "Driven", m: "100% milestone completion across 3 incubation projects." },
  { t: "Collaborative", m: "Led 12 developers. Co-built a curriculum with an outside studio." },
  { t: "Reliable", m: "Shipped the registration site for a 36-hour hackathon with 500+ visitors — on time." },
  { t: "Adaptive", m: "Equally fluent in PyTorch notebooks and production React." },
  { t: "Resilient", m: "Seven-model ablation studies aren't quick. He runs them anyway." },
];

function Impact({ sectionRef }) {
  return (
    <section
      id="impact"
      ref={sectionRef}
      className="relative min-h-screen w-full snap-start flex items-center px-6 py-28"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}>
          <SectionHeading eyebrow="Impact & Leadership" title="What the work says about how he works." />
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TRAITS.map((tr, i) => (
            <motion.div
              key={tr.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: (i % 5) * 0.06 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl p-5"
              style={{ background: COLORS.navy, border: `1px solid ${COLORS.line}` }}
            >
              <div className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: COLORS.gold }} />
              <h3
                className="mt-4 text-sm font-semibold"
                style={{ color: COLORS.paper, fontFamily: "'Space Grotesk', sans-serif" }}
              >
                {tr.t}
              </h3>
              <p className="mt-2 text-xs leading-relaxed" style={{ color: COLORS.muted }}>
                {tr.m}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Contact -------------------------------- */
function Contact({ sectionRef }) {
  const links = [
    { icon: Mail, label: "Email", value: "viswajitw2@gmail.com", href: "mailto:viswajitw2@gmail.com" },
    { icon: Github, label: "GitHub", value: "W2Viswajit", href: "https://github.com/W2Viswajit" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "Viswajit Ramesh Kumar",
      href: "https://www.linkedin.com/in/viswajit-ramesh-kumar",
    },
    { icon: Globe, label: "Portfolio", value: "Viswajit.app", href: "https://Viswajit.app" },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen w-full snap-start flex items-center px-6 py-28"
    >
      <div className="max-w-4xl mx-auto w-full text-center">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}>
          <Eyebrow>Contact</Eyebrow>
          <h2
            className="mt-4 text-3xl sm:text-5xl font-semibold tracking-tight"
            style={{ color: COLORS.paper, fontFamily: "'Space Grotesk', sans-serif" }}
          >
            Let&rsquo;s build something worth shipping.
          </h2>
          <p className="mt-5 text-base sm:text-lg max-w-xl mx-auto" style={{ color: COLORS.muted }}>
            Open to research collaborations, engineering roles, and interesting problems.
            Reach out — I usually reply within a day.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          custom={1}
          className="mt-12 grid sm:grid-cols-2 gap-4"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center justify-between rounded-2xl px-6 py-5 transition-colors"
              style={{ background: COLORS.navy, border: `1px solid ${COLORS.line}` }}
            >
              <span className="flex items-center gap-4">
                <span
                  className="flex items-center justify-center h-10 w-10 rounded-xl"
                  style={{ background: `${COLORS.gold}18`, color: COLORS.gold }}
                >
                  <l.icon size={18} />
                </span>
                <span className="text-left">
                  <span className="block text-xs uppercase tracking-widest" style={{ color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace" }}>
                    {l.label}
                  </span>
                  <span className="block text-sm font-medium mt-0.5" style={{ color: COLORS.paper }}>
                    {l.value}
                  </span>
                </span>
              </span>
              <ArrowUpRight
                size={18}
                className="opacity-40 group-hover:opacity-100 transition-opacity"
                style={{ color: COLORS.paper }}
              />
            </a>
          ))}
        </motion.div>

        <motion.footer
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-20 flex flex-col items-center gap-3"
        >
          <Logo size={28} />
          <p className="text-xs" style={{ color: COLORS.muted, fontFamily: "'JetBrains Mono', monospace" }}>
            Viswajit R · Bengaluru, Karnataka · © {new Date().getFullYear()}
          </p>
        </motion.footer>
      </div>
    </section>
  );
}

/* ---------------------------------- App ---------------------------------- */
export default function Portfolio() {
  const containerRef = useRef(null);
  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    experience: useRef(null),
    projects: useRef(null),
    skills: useRef(null),
    impact: useRef(null),
    contact: useRef(null),
  };
  const [activeId, setActiveId] = useState("hero");

  // Inject fonts once.
  useEffect(() => {
    const id = "portfolio-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  // Track active section for nav highlighting.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { root: containerRef.current, threshold: 0.5 }
    );
    Object.values(sectionRefs).forEach((r) => r.current && observer.observe(r.current));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavigate = (id) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={containerRef}
      className="h-screen w-full overflow-y-scroll snap-y snap-mandatory scroll-smooth"
      style={{ background: COLORS.ink, fontFamily: "'Inter', sans-serif" }}
    >
      <Nav onNavigate={handleNavigate} activeId={activeId} />
      <Hero onNavigate={handleNavigate} sectionRef={sectionRefs.hero} />
      <About sectionRef={sectionRefs.about} />
      <Experience sectionRef={sectionRefs.experience} />
      <Projects sectionRef={sectionRefs.projects} />
      <Skills sectionRef={sectionRefs.skills} />
      <Impact sectionRef={sectionRefs.impact} />
      <Contact sectionRef={sectionRefs.contact} />
    </div>
  );
}
