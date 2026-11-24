"use client";

import dynamic from "next/dynamic";
import { About, Contact, Experience, Hero, Marquee, Projects, Skills } from "@/components/Sections";
import { Cursor, Loader, Nav, ProgressBar, SmoothScroll } from "@/components/UI";

// WebGL scene only runs in the browser
const Scene = dynamic(() => import("@/components/Scene"), { ssr: false });

export default function Home() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <Scene />
      <div className="grain" aria-hidden />
      <ProgressBar />
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
