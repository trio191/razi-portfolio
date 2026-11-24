"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  Sparkles,
  AdaptiveDpr,
} from "@react-three/drei";
import { EffectComposer, Bloom, Vignette, Noise, ChromaticAberration } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

/* ---------- scroll-driven keyframes (one per section) ---------- */
type Key = { x: number; y: number; z: number; s: number; color: string };

const DESKTOP: Key[] = [
  { x: 2.3, y: 0.1, z: 0, s: 1.0, color: "#7c5cff" }, // hero
  { x: -3.3, y: 0, z: -0.5, s: 0.8, color: "#22d3ee" }, // about
  { x: 3.6, y: 0, z: -5, s: 0.75, color: "#ff4ecd" }, // skills
  { x: -3.6, y: 0, z: -0.8, s: 0.7, color: "#7c5cff" }, // experience
  { x: 0, y: 0, z: -4, s: 1.3, color: "#22d3ee" }, // projects
  { x: 0, y: 0.2, z: -4, s: 1.1, color: "#ff4ecd" }, // contact
];

const MOBILE: Key[] = [
  { x: 0, y: 1.9, z: -1.5, s: 0.62, color: "#7c5cff" },
  { x: 0, y: 0, z: -3, s: 0.8, color: "#22d3ee" },
  { x: 0, y: 0, z: -3.5, s: 0.7, color: "#ff4ecd" },
  { x: 0, y: 0, z: -3, s: 0.8, color: "#7c5cff" },
  { x: 0, y: 0, z: -5, s: 1.0, color: "#22d3ee" },
  { x: 0, y: 0.6, z: -2, s: 0.9, color: "#ff4ecd" },
];

const tmpA = new THREE.Color();
const tmpB = new THREE.Color();

function scrollProgress() {
  if (typeof window === "undefined") return 0;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  return max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
}

function sample(keys: Key[], p: number, out: { x: number; y: number; z: number; s: number; color: THREE.Color }) {
  const f = p * (keys.length - 1);
  const i = Math.min(keys.length - 2, Math.floor(f));
  const t = THREE.MathUtils.smootherstep(f - i, 0, 1);
  const a = keys[i];
  const b = keys[i + 1];
  out.x = THREE.MathUtils.lerp(a.x, b.x, t);
  out.y = THREE.MathUtils.lerp(a.y, b.y, t);
  out.z = THREE.MathUtils.lerp(a.z, b.z, t);
  out.s = THREE.MathUtils.lerp(a.s, b.s, t);
  out.color.copy(tmpA.set(a.color)).lerp(tmpB.set(b.color), t);
}

/* ---------- central animated core ---------- */
function Core({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null!);
  const blob = useRef<THREE.Mesh>(null!);
  const shell = useRef<THREE.Mesh>(null!);
  const ringA = useRef<THREE.Mesh>(null!);
  const ringB = useRef<THREE.Mesh>(null!);
  const ringC = useRef<THREE.Mesh>(null!);
  const mat = useRef<any>(null!);
  const target = useMemo(() => ({ x: 0, y: 0, z: 0, s: 1, color: new THREE.Color("#7c5cff") }), []);
  const glow = useMemo(() => new THREE.Color(), []);

  useFrame((state, delta) => {
    const keys = mobile ? MOBILE : DESKTOP;
    const p = scrollProgress();
    sample(keys, p, target);
    const g = group.current;
    const k = 1 - Math.pow(0.001, delta); // frame-rate independent damping
    g.position.x += (target.x - g.position.x) * k;
    g.position.y += (target.y - g.position.y) * k;
    g.position.z += (target.z - g.position.z) * k;
    const s = g.scale.x + (target.s - g.scale.x) * k;
    g.scale.setScalar(s);

    const t = state.clock.elapsedTime;
    // tilt toward pointer + scroll spin
    g.rotation.y += ((state.pointer.x * 0.6 + p * Math.PI * 2) - g.rotation.y) * k * 0.6;
    g.rotation.x += ((-state.pointer.y * 0.4 + p * Math.PI * 0.5) - g.rotation.x) * k * 0.6;

    blob.current.rotation.y = t * 0.15;
    shell.current.rotation.x = t * 0.12;
    shell.current.rotation.y = -t * 0.18;
    ringA.current.rotation.z = t * 0.35;
    ringB.current.rotation.x = Math.PI / 2 + t * 0.25;
    ringB.current.rotation.y = t * 0.2;
    ringC.current.rotation.y = -t * 0.3;
    ringC.current.rotation.x = Math.PI / 3;

    if (mat.current) {
      mat.current.color.lerp(target.color, k);
      mat.current.distort = 0.35 + Math.sin(t * 0.8) * 0.08 + p * 0.15;
    }
    glow.copy(target.color).multiplyScalar(3);
    [shell, ringA, ringB, ringC].forEach((r) => {
      const m = r.current.material as THREE.MeshBasicMaterial;
      m.color.lerp(glow, k);
    });
  });

  return (
    <group ref={group}>
      <mesh ref={blob}>
        <sphereGeometry args={[1.25, mobile ? 96 : 160, mobile ? 96 : 160]} />
        <MeshDistortMaterial
          ref={mat}
          color="#7c5cff"
          roughness={0.08}
          metalness={0.85}
          envMapIntensity={1.6}
          distort={0.38}
          speed={2.2}
        />
      </mesh>
      <mesh ref={shell}>
        <icosahedronGeometry args={[2.0, 1]} />
        <meshBasicMaterial wireframe transparent opacity={0.25} toneMapped={false} />
      </mesh>
      <mesh ref={ringA}>
        <torusGeometry args={[2.45, 0.012, 16, 220]} />
        <meshBasicMaterial toneMapped={false} />
      </mesh>
      <mesh ref={ringB}>
        <torusGeometry args={[2.75, 0.008, 16, 220]} />
        <meshBasicMaterial toneMapped={false} transparent opacity={0.8} />
      </mesh>
      <mesh ref={ringC}>
        <torusGeometry args={[3.1, 0.006, 16, 220]} />
        <meshBasicMaterial toneMapped={false} transparent opacity={0.6} />
      </mesh>
      <Sparkles count={mobile ? 40 : 90} scale={5} size={2.5} speed={0.4} color="#ffffff" />
    </group>
  );
}

/* ---------- star / particle field ---------- */
function Particles({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 18;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi) - 6;
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    const p = scrollProgress();
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x = p * 0.8;
    ref.current.position.y = p * 3;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        sizeAttenuation
        color="#b9b2ff"
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ---------- floating glass/metal shapes ---------- */
const SHAPES = [
  { pos: [-5.5, 2.6, -3], type: "oct", c: "#22d3ee" },
  { pos: [5.8, -2.4, -4], type: "knot", c: "#ff4ecd" },
  { pos: [-4.5, -3.2, -2], type: "box", c: "#7c5cff" },
  { pos: [4.2, 3.4, -5], type: "ico", c: "#facc15" },
  { pos: [-7, -0.5, -7], type: "torus", c: "#7c5cff" },
  { pos: [7.5, 0.8, -8], type: "oct", c: "#22d3ee" },
  { pos: [0.5, -4.2, -6], type: "ico", c: "#ff4ecd" },
  { pos: [-1.5, 4.5, -8], type: "box", c: "#34d399" },
] as const;

function Shape({ type }: { type: string }) {
  switch (type) {
    case "oct":
      return <octahedronGeometry args={[0.45]} />;
    case "knot":
      return <torusKnotGeometry args={[0.32, 0.11, 128, 16]} />;
    case "box":
      return <boxGeometry args={[0.6, 0.6, 0.6]} />;
    case "torus":
      return <torusGeometry args={[0.45, 0.16, 24, 64]} />;
    default:
      return <icosahedronGeometry args={[0.45, 0]} />;
  }
}

function Floaters({ mobile }: { mobile: boolean }) {
  const group = useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    const p = scrollProgress();
    const k = 1 - Math.pow(0.01, delta);
    group.current.position.y += (p * 9 - group.current.position.y) * k;
    group.current.rotation.z += (state.pointer.x * 0.08 - group.current.rotation.z) * k;
  });
  const list = mobile ? SHAPES.slice(0, 5) : SHAPES;
  return (
    <group ref={group}>
      {list.map((s, i) => (
        <Float key={i} speed={1.4 + i * 0.15} rotationIntensity={2} floatIntensity={2}>
          <mesh position={s.pos as unknown as [number, number, number]} rotation={[i, i * 0.5, 0]}>
            <Shape type={s.type} />
            <meshStandardMaterial color={s.c} metalness={0.9} roughness={0.15} envMapIntensity={1.4} />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

/* ---------- camera parallax ---------- */
function Rig() {
  const { camera } = useThree();
  useFrame((state, delta) => {
    const k = 1 - Math.pow(0.02, delta);
    camera.position.x += (state.pointer.x * 0.5 - camera.position.x) * k;
    camera.position.y += (state.pointer.y * 0.35 - camera.position.y) * k;
    camera.lookAt(0, 0, -1);
  });
  return null;
}

/* ---------- studio lighting without network HDR ---------- */
function Studio() {
  return (
    <Environment resolution={256} frames={1}>
      <Lightformer form="rect" intensity={4} color="#ffffff" position={[0, 5, -6]} scale={[12, 3, 1]} />
      <Lightformer form="rect" intensity={3} color="#7c5cff" position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 4, 1]} />
      <Lightformer form="rect" intensity={3} color="#22d3ee" position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 4, 1]} />
      <Lightformer form="ring" intensity={2.5} color="#ff4ecd" position={[0, -4, 4]} scale={4} />
    </Environment>
  );
}

export default function Scene() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="scene" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        dpr={[1, mobile ? 1.5 : 2]}
        gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.toneMapping = THREE.ACESFilmicToneMapping;
        }}
      >
        <color attach="background" args={["#05050a"]} />
        <fog attach="fog" args={["#05050a", 10, 28]} />
        <ambientLight intensity={0.3} />
        <directionalLight position={[4, 6, 5]} intensity={1.4} />
        <pointLight position={[-5, -3, 3]} intensity={30} color="#22d3ee" />
        <Suspense fallback={null}>
          <Studio />
          <Core mobile={mobile} />
          <Floaters mobile={mobile} />
          <Particles count={mobile ? 1200 : 3000} />
        </Suspense>
        <Rig />
        <AdaptiveDpr pixelated />
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={1.1} luminanceThreshold={0.25} luminanceSmoothing={0.3} />
          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={new THREE.Vector2(0.0006, 0.0006)}
            radialModulation={false}
            modulationOffset={0}
          />
          <Noise opacity={0.035} />
          <Vignette eskil={false} offset={0.2} darkness={0.85} />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
