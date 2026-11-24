"use client";

import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  allSkills,
  certifications,
  education,
  experience,
  profile,
  projects,
  skillGroups,
  stats,
} from "@/lib/data";
import { CountUp, Magnetic, Reveal, SplitText, TiltCard, scrollToId } from "./UI";

/* =========================================================
   HERO
   ========================================================= */
function RoleRotator() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % profile.roles.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="rotator">
      <AnimatePresence mode="wait">
        <motion.span
          key={i}
          initial={{ y: "110%", rotateX: -80, opacity: 0 }}
          animate={{ y: "0%", rotateX: 0, opacity: 1 }}
          exit={{ y: "-110%", rotateX: 80, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="grad"
        >
          {profile.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, 25]);

  return (
    <section id="home" ref={ref} className="hero">
      <motion.div className="hero-inner" style={{ y, opacity, rotateX }}>
        <motion.div
          className="badge"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.7, duration: 0.7 }}
        >
          <span className="pulse" /> Available for full-time roles
        </motion.div>

        <h1 className="hero-title">
          <span className="hero-hi mono">
            <SplitText text="Hi, I'm" delay={1.8} immediate />
          </span>
          <span className="hero-name">
            <SplitText text={profile.first} delay={1.95} immediate />
          </span>
          <span className="hero-name outline">
            <SplitText text={profile.last} delay={2.1} immediate />
          </span>
        </h1>

        <motion.p
          className="hero-role"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4, duration: 0.8 }}
        >
          <RoleRotator />
        </motion.p>

        <motion.p
          className="hero-sub"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.55, duration: 0.8 }}
        >
          I build scalable web products with React, Next.js, Node.js and FastAPI, and bring LLM-powered
          features into production. Based in {profile.location}.
        </motion.p>

        <motion.div
          className="hero-cta"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.7, duration: 0.8 }}
        >
          <Magnetic>
            <button className="btn btn-primary" onClick={() => scrollToId("projects")}>
              View my work <span className="arrow">→</span>
            </button>
          </Magnetic>
          <Magnetic>
            <a className="btn btn-ghost" href={profile.cv} target="_blank" rel="noreferrer">
              Download CV
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>

      <motion.button
        className="scroll-hint"
        onClick={() => scrollToId("about")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        aria-label="Scroll down"
      >
        <span className="mouse">
          <span />
        </span>
        <span className="mono">scroll</span>
      </motion.button>
    </section>
  );
}

/* =========================================================
   MARQUEE
   ========================================================= */
export function Marquee() {
  const items = [...allSkills, ...allSkills];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {items.map((s, i) => (
          <span key={i}>
            {s} <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   SECTION HEADING
   ========================================================= */
function Heading({ index, kicker, title }: { index: string; kicker: string; title: string }) {
  return (
    <div className="heading">
      <Reveal>
        <div className="kicker mono">
          <span className="grad">{index}</span> / {kicker}
        </div>
      </Reveal>
      <h2>
        <SplitText text={title} />
      </h2>
    </div>
  );
}

/* =========================================================
   ABOUT
   ========================================================= */
export function About() {
  return (
    <section id="about" className="section about">
      <div className="container split-layout right">
        <div>
          <Heading index="01" kicker="About me" title="Code that ships, systems that scale." />
          <Reveal delay={0.1}>
            <p className="lead">{profile.summary}</p>
          </Reveal>

          <div className="stats">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={0.1 + i * 0.08}>
                <TiltCard className="stat" max={10}>
                  <div className="stat-num grad">
                    <CountUp to={s.value} suffix={s.suffix} plain={s.value > 1000} />
                  </div>
                  <div className="stat-label">{s.label}</div>
                </TiltCard>
              </Reveal>
            ))}
          </div>

          <div className="edu-grid">
            <Reveal delay={0.1}>
              <TiltCard className="glass-card" max={6}>
                <div className="card-kicker mono">Education</div>
                <h3>{education.degree}</h3>
                <p className="muted">{education.school}</p>
                <div className="chips">
                  <span className="chip">{education.year}</span>
                  <span className="chip">CGPA {education.cgpa}</span>
                </div>
              </TiltCard>
            </Reveal>
            <Reveal delay={0.2}>
              <TiltCard className="glass-card" max={6} accent="#22d3ee">
                <div className="card-kicker mono">Certifications</div>
                <ul className="cert-list">
                  {certifications.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   SKILLS — interactive 3D tag sphere
   ========================================================= */
function SkillSphere() {
  const wrap = useRef<HTMLDivElement>(null);
  const tags = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const n = allSkills.length;
    // Fibonacci sphere distribution
    const pts = allSkills.map((_, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = Math.PI * (3 - Math.sqrt(5)) * i;
      return { x: Math.cos(th) * r, y, z: Math.sin(th) * r };
    });

    let ax = 0.0025;
    let ay = 0.004;
    let tx = ax;
    let ty = ay;
    let radius = 200;
    let raf = 0;

    const resize = () => {
      const w = wrap.current?.clientWidth ?? 400;
      radius = Math.min(230, w * 0.4);
    };
    resize();

    const onMove = (e: PointerEvent) => {
      const r = wrap.current!.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
      ty = dx * 0.03;
      tx = -dy * 0.03;
    };
    const onLeave = () => {
      tx = 0.0025;
      ty = 0.004;
    };

    const tick = () => {
      ax += (tx - ax) * 0.05;
      ay += (ty - ay) * 0.05;
      const cx = Math.cos(ax), sx = Math.sin(ax);
      const cy = Math.cos(ay), sy = Math.sin(ay);
      pts.forEach((p, i) => {
        // rotate around X
        const y1 = p.y * cx - p.z * sx;
        const z1 = p.y * sx + p.z * cx;
        // rotate around Y
        const x2 = p.x * cy + z1 * sy;
        const z2 = -p.x * sy + z1 * cy;
        p.x = x2;
        p.y = y1;
        p.z = z2;
        const el = tags.current[i];
        if (el) {
          const depth = (z2 + 1) / 2; // 0 back .. 1 front
          el.style.transform = `translate(-50%, -50%) translate3d(${x2 * radius}px, ${y1 * radius}px, ${z2 * radius}px) scale(${0.65 + depth * 0.55})`;
          el.style.opacity = String(0.25 + depth * 0.75);
          el.style.zIndex = String(Math.round(depth * 100));
          el.style.filter = `blur(${(1 - depth) * 1.5}px)`;
        }
      });
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const w = wrap.current!;
    w.addEventListener("pointermove", onMove);
    w.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      w.removeEventListener("pointermove", onMove);
      w.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="sphere" ref={wrap}>
      <div className="sphere-core" />
      {allSkills.map((s, i) => (
        <span
          key={s}
          ref={(el) => {
            tags.current[i] = el;
          }}
          className="sphere-tag"
        >
          {s}
        </span>
      ))}
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="section skills">
      <div className="container split-layout left">
        <div>
          <Heading index="02" kicker="Tech stack" title="The tools I build with." />
          <div className="skill-groups">
            {skillGroups.map((g, i) => (
              <Reveal key={g.label} delay={i * 0.06}>
                <div className="skill-group">
                  <div className="skill-label mono">{g.label}</div>
                  <div className="chips">
                    {g.items.map((it) => (
                      <motion.span key={it} className="chip chip-lg" whileHover={{ y: -4, scale: 1.06 }} data-hover>
                        {it}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal delay={0.2} className="sphere-holder">
          <SkillSphere />
          <p className="mono sphere-hint">move your cursor over the sphere</p>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   EXPERIENCE — timeline
   ========================================================= */
export function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="experience" className="section experience">
      <div className="container split-layout right">
        <div>
          <Heading index="03" kicker="Experience" title="Where I've been building." />
          <div className="timeline" ref={ref}>
            <div className="timeline-line">
              <motion.div className="timeline-fill" style={{ scaleY }} />
            </div>
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={0.05} y={70}>
                <div className="tl-item">
                  <div className="tl-dot">
                    <span />
                  </div>
                  <TiltCard className="glass-card tl-card" max={5} accent={["#7c5cff", "#22d3ee", "#ff4ecd"][i % 3]}>
                    <div className="tl-head">
                      <div>
                        <h3>{e.role}</h3>
                        <div className="tl-company">
                          {e.company} <span className="muted">· {e.place}</span>
                        </div>
                      </div>
                      <span className="chip mono">{e.period}</span>
                    </div>
                    <ul className="tl-points">
                      {e.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                    <div className="chips">
                      {e.tags.map((t) => (
                        <span key={t} className="chip chip-sm">
                          {t}
                        </span>
                      ))}
                    </div>
                  </TiltCard>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   PROJECTS
   ========================================================= */
export function Projects() {
  return (
    <section id="projects" className="section projects">
      <div className="container">
        <Heading index="04" kicker="Selected work" title="Things I've built." />
        <div className="project-grid">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.08} y={80} className={p.featured ? "span-2" : ""}>
              <TiltCard className={`project ${p.featured ? "is-featured" : ""}`} max={9} accent={p.accent}>
                <div className="project-top">
                  <span className="project-num mono">{String(i + 1).padStart(2, "0")}</span>
                  <span className="project-orb" />
                </div>
                <div className="project-body">
                  <h3>{p.name}</h3>
                  <div className="project-full">{p.full}</div>
                  <p>{p.desc}</p>
                </div>
                <div className="chips">
                  {p.stack.map((s) => (
                    <span key={s} className="chip chip-sm">
                      {s}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1}>
          <div className="center">
            <Magnetic>
              <a className="btn btn-ghost" href={profile.github} target="_blank" rel="noreferrer">
                More on GitHub ↗
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =========================================================
   CONTACT + FOOTER
   ========================================================= */
export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };

  return (
    <section id="contact" className="section contact">
      <div className="container contact-inner">
        <Reveal>
          <div className="kicker mono">
            <span className="grad">05</span> / Contact
          </div>
        </Reveal>
        <h2 className="contact-title">
          <SplitText text="Let's build" />
          <br />
          <span className="grad-text">
            <SplitText text="something great." delay={0.25} />
          </span>
        </h2>
        <Reveal delay={0.2}>
          <p className="lead center-text">
            Open to full-time roles and interesting projects. Send me a message and I&apos;ll get back to you
            quickly.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <div className="contact-actions">
            <Magnetic strength={0.5}>
              <a className="btn btn-primary btn-xl" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
            </Magnetic>
            <Magnetic>
              <button className="btn btn-ghost" onClick={copy}>
                {copied ? "Copied ✓" : "Copy email"}
              </button>
            </Magnetic>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <div className="socials">
            <a href={profile.github} target="_blank" rel="noreferrer" data-hover>
              GitHub <span>↗</span>
            </a>
            <a href={profile.whatsapp} target="_blank" rel="noreferrer" data-hover>
              WhatsApp <span>↗</span>
            </a>
            <a href={`tel:${profile.phone.replace(/\s/g, "")}`} data-hover>
              {profile.phone}
            </a>
            <a href={profile.cv} target="_blank" rel="noreferrer" data-hover>
              Resume <span>↗</span>
            </a>
          </div>
        </Reveal>
      </div>
      <footer className="footer container">
        <span className="mono">© {new Date().getFullYear()} {profile.name}</span>
        <span className="mono muted">Built with Next.js, Three.js &amp; Framer Motion</span>
        <button className="mono to-top" onClick={() => scrollToId("home")}>
          Back to top ↑
        </button>
      </footer>
    </section>
  );
}
