"use client";

import Lenis from "lenis";
import { AnimatePresence, motion, useInView, useMotionValue, useSpring, useScroll } from "framer-motion";
import { ReactNode, useEffect, useRef, useState, MouseEvent as RMouseEvent } from "react";
import { nav, profile } from "@/lib/data";

/* ---------- smooth scrolling (Lenis) ---------- */
let lenisInstance: Lenis | null = null;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) lenisInstance.scrollTo(el, { offset: 0, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
}

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.25, smoothWheel: true, wheelMultiplier: 0.95 });
    lenisInstance = lenis;
    let id = 0;
    const raf = (t: number) => {
      lenis.raf(t);
      id = requestAnimationFrame(raf);
    };
    id = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
  return null;
}

/* ---------- scroll progress bar ---------- */
export function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 25 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

/* ---------- custom cursor ---------- */
export function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 180, damping: 20, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 180, damping: 20, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    document.documentElement.classList.add("has-cursor");
    const move = (e: globalThis.MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const t = e.target as HTMLElement;
      setHover(!!t.closest("a, button, [data-hover]"));
    };
    window.addEventListener("mousemove", move);
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [x, y]);

  if (!enabled) return null;
  return (
    <>
      <motion.div className="cursor-dot" style={{ x, y }} />
      <motion.div className={`cursor-ring ${hover ? "is-hover" : ""}`} style={{ x: rx, y: ry }} />
    </>
  );
}

/* ---------- intro loader ---------- */
export function Loader() {
  const [n, setN] = useState(0);
  const [done, setDone] = useState(false);
  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v = Math.min(100, v + Math.ceil(Math.random() * 9));
      setN(v);
      if (v >= 100) {
        clearInterval(id);
        setTimeout(() => setDone(true), 450);
      }
    }, 45);
    return () => clearInterval(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="loader"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="loader-inner">
            <motion.div
              className="loader-name"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              {profile.first}
              <span className="grad">.</span>
            </motion.div>
            <div className="loader-bar">
              <div style={{ width: `${n}%` }} />
            </div>
            <div className="loader-num mono">{String(n).padStart(3, "0")}%</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- navigation ---------- */
export function Nav() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      let current = "home";
      for (const n of nav) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < window.innerHeight * 0.45) current = n.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <motion.header
      className={`nav ${scrolled ? "is-scrolled" : ""}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="logo" onClick={() => go("home")} aria-label="Home">
        <span className="logo-mark">R</span>
        <span className="logo-text">razi<span className="grad">.dev</span></span>
      </button>
      <nav className={`nav-links ${open ? "is-open" : ""}`}>
        {nav.map((n) => (
          <button key={n.id} onClick={() => go(n.id)} className={active === n.id ? "is-active" : ""}>
            {active === n.id && <motion.span layoutId="nav-pill" className="nav-pill" />}
            <span>{n.label}</span>
          </button>
        ))}
      </nav>
      <a className="nav-cta" href={`mailto:${profile.email}`}>
        Hire me
      </a>
      <button className={`burger ${open ? "is-open" : ""}`} onClick={() => setOpen(!open)} aria-label="Menu">
        <span />
        <span />
      </button>
    </motion.header>
  );
}

/* ---------- reveal on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  y = 50,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- letter-by-letter 3D text ---------- */
export function SplitText({
  text,
  className,
  delay = 0,
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  immediate?: boolean;
}) {
  const shown = { opacity: 1, y: "0%", rotateX: 0 };
  return (
    <span className={`split ${className ?? ""}`} aria-label={text}>
      {text.split(" ").map((word, wi, arr) => (
        <span className="split-word" key={wi} aria-hidden>
          {word.split("").map((ch, ci) => (
            <motion.span
              key={ci}
              className="split-char"
              initial={{ opacity: 0, y: "100%", rotateX: -90 }}
              {...(immediate ? { animate: shown } : { whileInView: shown, viewport: { once: true } })}
              transition={{ duration: 0.8, delay: delay + (wi * 5 + ci) * 0.03, ease: [0.22, 1, 0.36, 1] }}
            >
              {ch}
            </motion.span>
          ))}
          {wi < arr.length - 1 && " "}
        </span>
      ))}
    </span>
  );
}

/* ---------- magnetic button ---------- */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 200, damping: 15 });
  const y = useSpring(0, { stiffness: 200, damping: 15 });
  const move = (e: RMouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };
  return (
    <motion.div ref={ref} className="magnetic" style={{ x, y }} onMouseMove={move} onMouseLeave={leave}>
      {children}
    </motion.div>
  );
}

/* ---------- 3D tilt card with glare ---------- */
export function TiltCard({
  children,
  className,
  max = 12,
  accent,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  accent?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 160, damping: 18 });
  const ry = useSpring(0, { stiffness: 160, damping: 18 });

  const move = (e: RMouseEvent) => {
    const el = ref.current!;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className="tilt-wrap">
      <motion.div
        ref={ref}
        className={`tilt ${className ?? ""}`}
        style={{ rotateX: rx, rotateY: ry, ["--accent" as string]: accent ?? "#7c5cff" }}
        onMouseMove={move}
        onMouseLeave={leave}
        data-hover
      >
        <div className="tilt-glare" />
        {children}
      </motion.div>
    </div>
  );
}

/* ---------- animated counter ---------- */
export function CountUp({ to, suffix = "", plain = false }: { to: number; suffix?: string; plain?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(plain ? Math.max(0, to - 40) : 0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const from = plain ? Math.max(0, to - 40) : 0;
    const dur = 1800;
    let id = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      setV(Math.round(from + (to - from) * e));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [inView, to, plain]);
  return (
    <span ref={ref}>
      {v}
      {suffix}
    </span>
  );
}
