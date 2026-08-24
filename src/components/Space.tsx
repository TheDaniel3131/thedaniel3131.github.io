"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Link } from "react-router-dom";
import { ArrowLeft, Plus, X, Codesandbox, RotateCcw } from "lucide-react";

interface Thought {
  id: string;
  text: string;
  x: number;
  y: number;
  z: number;
}

const HARDCODED_THOUGHTS: Thought[] = [
  {
    id: "h1",
    text: "what if we're all just loading screens for something bigger",
    x: 2,
    y: 1.5,
    z: -3,
  },
  {
    id: "h2",
    text: "the best ideas come at 3am and are gone by morning",
    x: -3,
    y: 0.5,
    z: -2,
  },
  {
    id: "h3",
    text: "every bug is just an undocumented feature",
    x: 1,
    y: -2,
    z: -4,
  },
  { id: "h4", text: "silence is underrated", x: -2, y: 2, z: -5 },
  {
    id: "h5",
    text: "you don't finish games, you abandon them at a good point",
    x: 3,
    y: -1,
    z: -3,
  },
  {
    id: "h6",
    text: "design is just problem solving with opinions",
    x: -1,
    y: -1.5,
    z: -2,
  },
  {
    id: "h7",
    text: "music is the only language that needs no translation",
    x: 0,
    y: 2.5,
    z: -6,
  },
  {
    id: "h8",
    text: "the internet never forgets but people always do",
    x: 2.5,
    y: -0.5,
    z: -5,
  },
  { id: "h9", text: "sleeping is just saving the game", x: -3.5, y: 1, z: -4 },
  {
    id: "h10",
    text: "most problems are communication problems in disguise",
    x: 1.5,
    y: 1,
    z: -7,
  },
];

const AXIS_LENGTH = 8;
const GRID_SIZE = 10;
const GRID_DIVISIONS = 10;

export default function Space() {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const spheresRef = useRef<{ mesh: THREE.Mesh; id: string }[]>([]);

  // Orbit state
  const isDraggingRef = useRef(false);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({ theta: 0.4, phi: 1.0, radius: 12 });

  const [thoughts, setThoughts] = useState<Thought[]>([]);
  const [labels, setLabels] = useState<
    { id: string; x: number; y: number; text: string; visible: boolean }[]
  >([]);
  const [selected, setSelected] = useState<Thought | null>(null);
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");

  // Load thoughts
  useEffect(() => {
    const stored = localStorage.getItem("space-thoughts");
    const extra: Thought[] = stored ? JSON.parse(stored) : [];
    const userThoughts = extra.map((t, i) => ({
      ...t,
      id: `u-${i}`,
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 6,
      z: (Math.random() - 0.5) * 10,
    }));
    setThoughts([...HARDCODED_THOUGHTS, ...userThoughts]);
  }, []);

  // Build scene
  useEffect(() => {
    if (!mountRef.current || thoughts.length === 0) return;

    const el = mountRef.current;
    const w = el.clientWidth;
    const h = el.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020209);
    scene.fog = new THREE.FogExp2(0x020209, 0.018);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 500);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ── Stars ──────────────────────────────────────────────
    const starGeo = new THREE.BufferGeometry();
    const starCount = 3000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++)
      starPos[i] = (Math.random() - 0.5) * 300;
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({
          color: 0xffffff,
          size: 0.12,
          transparent: true,
          opacity: 0.6,
        }),
      ),
    );

    // ── Grid (XZ plane, Y=0) ────────────────────────────────
    const gridHelper = new THREE.GridHelper(
      GRID_SIZE * 2,
      GRID_DIVISIONS * 2,
      0x1a1a4e,
      0x0d0d2b,
    );
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.8;
    scene.add(gridHelper);

    // ── Axes ────────────────────────────────────────────────
    const mkAxis = (dir: THREE.Vector3, color: number) => {
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.9,
      });
      const pts = [
        new THREE.Vector3(0, 0, 0),
        dir.clone().multiplyScalar(AXIS_LENGTH),
      ];
      return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
    };
    scene.add(mkAxis(new THREE.Vector3(1, 0, 0), 0xff4466)); // X red
    scene.add(mkAxis(new THREE.Vector3(0, 1, 0), 0x44ff88)); // Y green
    scene.add(mkAxis(new THREE.Vector3(0, 0, 1), 0x4488ff)); // Z blue

    // Negative axes (dimmer)
    const mkAxisNeg = (dir: THREE.Vector3, color: number) => {
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity: 0.3,
      });
      const pts = [
        new THREE.Vector3(0, 0, 0),
        dir.clone().multiplyScalar(AXIS_LENGTH),
      ];
      return new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat);
    };
    scene.add(mkAxisNeg(new THREE.Vector3(-1, 0, 0), 0xff4466));
    scene.add(mkAxisNeg(new THREE.Vector3(0, -1, 0), 0x44ff88));
    scene.add(mkAxisNeg(new THREE.Vector3(0, 0, -1), 0x4488ff));

    // Axis tick marks
    const mkTicks = (axis: "x" | "y" | "z", color: number) => {
      const pts: THREE.Vector3[] = [];
      for (let i = -AXIS_LENGTH; i <= AXIS_LENGTH; i++) {
        if (i === 0) continue;
        const a = new THREE.Vector3();
        const b = new THREE.Vector3();
        const TICK = 0.1;
        if (axis === "x") {
          a.set(i, -TICK, 0);
          b.set(i, TICK, 0);
        }
        if (axis === "y") {
          a.set(-TICK, i, 0);
          b.set(TICK, i, 0);
        }
        if (axis === "z") {
          a.set(0, -TICK, i);
          b.set(0, TICK, i);
        }
        pts.push(a, b);
      }
      const geo = new THREE.BufferGeometry().setFromPoints(pts);
      scene.add(
        new THREE.LineSegments(
          geo,
          new THREE.LineBasicMaterial({
            color,
            transparent: true,
            opacity: 0.4,
          }),
        ),
      );
    };
    mkTicks("x", 0xff4466);
    mkTicks("y", 0x44ff88);
    mkTicks("z", 0x4488ff);

    // Origin sphere
    const origin = new THREE.Mesh(
      new THREE.SphereGeometry(0.06, 16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff }),
    );
    scene.add(origin);

    // ── Thought spheres ─────────────────────────────────────
    spheresRef.current = [];
    const hues = [0.9, 0.6, 0.15, 0.45, 0.75, 0.05, 0.55, 0.3, 0.85, 0.2];
    thoughts.forEach((t, i) => {
      const geo = new THREE.SphereGeometry(0.12, 20, 20);
      const color = new THREE.Color().setHSL(hues[i % hues.length], 0.85, 0.65);
      const mat = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.95,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(t.x, t.y, t.z);
      scene.add(mesh);

      // Glow ring
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.16, 0.22, 32),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.25,
          side: THREE.DoubleSide,
        }),
      );
      mesh.add(ring);

      spheresRef.current.push({ mesh, id: t.id });
    });

    // ── Camera position ──────────────────────────────────────
    const updateCamera = () => {
      const { theta, phi, radius } = sphericalRef.current;
      camera.position.set(
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi),
        radius * Math.sin(phi) * Math.cos(theta),
      );
      camera.lookAt(0, 0, 0);
    };
    updateCamera();

    // ── Orbit mouse handlers ─────────────────────────────────
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastMouseRef.current.x;
      const dy = e.clientY - lastMouseRef.current.y;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      sphericalRef.current.theta -= dx * 0.005;
      sphericalRef.current.phi = Math.max(
        0.1,
        Math.min(Math.PI - 0.1, sphericalRef.current.phi + dy * 0.005),
      );
      updateCamera();
    };
    const onMouseUp = () => {
      isDraggingRef.current = false;
    };
    const onWheel = (e: WheelEvent) => {
      sphericalRef.current.radius = Math.max(
        4,
        Math.min(30, sphericalRef.current.radius + e.deltaY * 0.02),
      );
      updateCamera();
    };

    // Touch orbit
    let lastTouch = { x: 0, y: 0 };
    const onTouchStart = (e: TouchEvent) => {
      lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchMove = (e: TouchEvent) => {
      const dx = e.touches[0].clientX - lastTouch.x;
      const dy = e.touches[0].clientY - lastTouch.y;
      lastTouch = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      sphericalRef.current.theta -= dx * 0.005;
      sphericalRef.current.phi = Math.max(
        0.1,
        Math.min(Math.PI - 0.1, sphericalRef.current.phi + dy * 0.005),
      );
      updateCamera();
    };

    renderer.domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: true });
    renderer.domElement.addEventListener("touchstart", onTouchStart);
    renderer.domElement.addEventListener("touchmove", onTouchMove);

    // ── Resize ───────────────────────────────────────────────
    const onResize = () => {
      if (!el || !renderer || !camera) return;
      const w = el.clientWidth,
        h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Animate ──────────────────────────────────────────────
    let t = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      t += 0.005;

      // Gentle float on spheres
      spheresRef.current.forEach(({ mesh }, i) => {
        mesh.position.y += Math.sin(t + i * 0.8) * 0.001;
        // Billboard glow ring toward camera
        if (mesh.children[0]) mesh.children[0].lookAt(camera.position);
      });

      // Project to screen for labels
      const size = new THREE.Vector2();
      renderer.getSize(size);
      const newLabels = thoughts.map((th) => {
        const sphere = spheresRef.current.find((s) => s.id === th.id);
        if (!sphere)
          return { id: th.id, x: 0, y: 0, text: th.text, visible: false };
        const pos = sphere.mesh.position.clone();
        pos.project(camera);
        // Check if behind camera
        const visible = pos.z < 1;
        return {
          id: th.id,
          x: ((pos.x + 1) / 2) * size.x,
          y: ((-pos.y + 1) / 2) * size.y,
          text: th.text,
          visible,
        };
      });
      setLabels(newLabels);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameRef.current);
      renderer.domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      renderer.domElement.removeEventListener("wheel", onWheel);
      renderer.domElement.removeEventListener("touchstart", onTouchStart);
      renderer.domElement.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [thoughts]);

  const handleAddThought = useCallback(() => {
    if (!newText.trim()) return;
    const t: Thought = {
      id: `u-${Date.now()}`,
      text: newText.trim(),
      x: (Math.random() - 0.5) * 10,
      y: (Math.random() - 0.5) * 6,
      z: (Math.random() - 0.5) * 10,
    };
    const stored = localStorage.getItem("space-thoughts");
    const existing: Thought[] = stored ? JSON.parse(stored) : [];
    localStorage.setItem("space-thoughts", JSON.stringify([...existing, t]));
    setThoughts((prev) => [...prev, t]);
    setNewText("");
    setAdding(false);
  }, [newText]);

  const resetCamera = () => {
    sphericalRef.current = { theta: 0.4, phi: 1.0, radius: 12 };
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "#020209" }}
    >
      {/* Three.js canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      />

      {/* Axis legend */}
      <div className="absolute bottom-16 left-4 z-10 flex flex-col gap-1 pointer-events-none">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-0.5 bg-[#ff4466]" />
          <span className="text-[#ff4466] font-mono">X</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-0.5 bg-[#44ff88]" />
          <span className="text-[#44ff88] font-mono">Y</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-4 h-0.5 bg-[#4488ff]" />
          <span className="text-[#4488ff] font-mono">Z</span>
        </div>
      </div>

      {/* Floating labels */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {labels
          .filter((l) => l.visible)
          .map((l) => (
            <button
              key={l.id}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 text-white/60 hover:text-white text-[11px] max-w-[130px] text-center leading-tight transition-colors duration-150 cursor-pointer bg-transparent border-0 px-1"
              style={{ left: l.x, top: l.y + 20 }}
              onClick={() =>
                setSelected(thoughts.find((t) => t.id === l.id) ?? null)
              }
            >
              {l.text.length > 36 ? l.text.slice(0, 36) + "…" : l.text}
            </button>
          ))}
      </div>

      {/* Navbar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 h-20">
        <Link
          to="/"
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-base font-medium"
        >
          <ArrowLeft className="h-5 w-5" />
          Back
        </Link>
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
          <Codesandbox className="h-6 w-6 text-white/60" />
          <span className="text-white/60 font-bold text-2xl">DPTF</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={resetCamera}
            title="Reset camera"
            className="text-white/40 hover:text-white border border-white/10 hover:border-white/30 p-2 rounded-full transition-all"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
          <button
            onClick={() => setAdding(true)}
            className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all"
          >
            <Plus className="h-4 w-4" />
            Add thought
          </button>
        </div>
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/20 text-xs text-center pointer-events-none">
        drag to orbit · scroll to zoom · click thought to read
      </div>

      {/* Selected thought */}
      {selected && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center"
          style={{ background: "rgba(2,2,9,0.7)", backdropFilter: "blur(6px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="border border-white/15 rounded-2xl p-8 max-w-md mx-4 relative"
            style={{ background: "rgba(255,255,255,0.04)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-white text-lg leading-relaxed">
              {selected.text}
            </p>
            <p className="text-white/25 text-xs mt-4 font-mono">
              ({selected.x.toFixed(1)}, {selected.y.toFixed(1)},{" "}
              {selected.z.toFixed(1)})
            </p>
          </div>
        </div>
      )}

      {/* Add thought */}
      {adding && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center"
          style={{ background: "rgba(2,2,9,0.7)", backdropFilter: "blur(6px)" }}
          onClick={() => setAdding(false)}
        >
          <div
            className="border border-white/15 rounded-2xl p-8 max-w-md w-full mx-4 relative"
            style={{ background: "rgba(255,255,255,0.04)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setAdding(false)}
              className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="text-white/70 font-medium mb-4 text-sm">
              Leave a thought in space
            </h3>
            <textarea
              autoFocus
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="what's on your mind..."
              maxLength={120}
              rows={3}
              className="w-full rounded-lg px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none resize-none"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleAddThought();
                }
              }}
            />
            <div className="flex items-center justify-between mt-3">
              <span className="text-white/20 text-xs font-mono">
                {newText.length}/120
              </span>
              <button
                onClick={handleAddThought}
                disabled={!newText.trim()}
                className="px-4 py-2 rounded-lg text-white text-xs transition-all disabled:opacity-20"
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                Release into space
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
