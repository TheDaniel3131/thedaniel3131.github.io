"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Plus,
  X,
  Codesandbox,
  // RotateCcw,
  Compass,
} from "lucide-react";

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
    text: "What is time if I don't even have one?",
    x: 2,
    y: 1.5,
    z: -3,
  },
];

const AXIS_LENGTH = 8;
const GRID_SIZE = 10;
const GRID_DIVISIONS = 10;
const MAP_PANEL_SIZE = 120;
const MAP_WORLD_RANGE = 10;
const RADAR_WORLD_RANGE = 14;
const HUES = [0.9, 0.6, 0.15, 0.45, 0.75, 0.05, 0.55, 0.3, 0.85, 0.2];

type MapMode = "mini" | "radar";

interface MapPoint {
  id: string;
  cx: number;
  cy: number;
  color: string;
}
interface MapData {
  points: MapPoint[];
  camX: number;
  camY: number;
  camAngleDeg: number;
}

export default function Space() {
  const mountRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const frameRef = useRef<number>(0);
  const spheresRef = useRef<{ mesh: THREE.Mesh; id: string }[]>([]);
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
  const [mapMode, setMapMode] = useState<MapMode>("mini");
  const [mapData, setMapData] = useState<MapData>({
    points: [],
    camX: MAP_PANEL_SIZE / 2,
    camY: MAP_PANEL_SIZE / 2,
    camAngleDeg: 0,
  });
  const mapModeRef = useRef<MapMode>("mini");
  useEffect(() => {
    mapModeRef.current = mapMode;
  }, [mapMode]);

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

  useEffect(() => {
    if (!mountRef.current || thoughts.length === 0) return;
    const el = mountRef.current;
    const w = el.clientWidth;
    const h = el.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x020209);
    scene.fog = new THREE.FogExp2(0x020209, 0.018);

    const camera = new THREE.PerspectiveCamera(60, w / h, 0.1, 500);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Stars
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(3000 * 3);
    for (let i = 0; i < 3000 * 3; i++) starPos[i] = (Math.random() - 0.5) * 300;
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

    // Grid
    const gridHelper = new THREE.GridHelper(
      GRID_SIZE * 2,
      GRID_DIVISIONS * 2,
      0x1a1a4e,
      0x0d0d2b,
    );
    (gridHelper.material as THREE.Material).transparent = true;
    (gridHelper.material as THREE.Material).opacity = 0.8;
    scene.add(gridHelper);

    // Axes
    const mkAxis = (dir: THREE.Vector3, color: number, opacity = 0.9) => {
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
      });
      return new THREE.Line(
        new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(0, 0, 0),
          dir.clone().multiplyScalar(AXIS_LENGTH),
        ]),
        mat,
      );
    };
    scene.add(mkAxis(new THREE.Vector3(1, 0, 0), 0xff4466));
    scene.add(mkAxis(new THREE.Vector3(0, 1, 0), 0x44ff88));
    scene.add(mkAxis(new THREE.Vector3(0, 0, 1), 0x4488ff));
    scene.add(mkAxis(new THREE.Vector3(-1, 0, 0), 0xff4466, 0.3));
    scene.add(mkAxis(new THREE.Vector3(0, -1, 0), 0x44ff88, 0.3));
    scene.add(mkAxis(new THREE.Vector3(0, 0, -1), 0x4488ff, 0.3));

    const mkTicks = (axis: "x" | "y" | "z", color: number) => {
      const pts: THREE.Vector3[] = [];
      for (let i = -AXIS_LENGTH; i <= AXIS_LENGTH; i++) {
        if (i === 0) continue;
        const a = new THREE.Vector3(),
          b = new THREE.Vector3();
        const T = 0.1;
        if (axis === "x") {
          a.set(i, -T, 0);
          b.set(i, T, 0);
        }
        if (axis === "y") {
          a.set(-T, i, 0);
          b.set(T, i, 0);
        }
        if (axis === "z") {
          a.set(0, -T, i);
          b.set(0, T, i);
        }
        pts.push(a, b);
      }
      scene.add(
        new THREE.LineSegments(
          new THREE.BufferGeometry().setFromPoints(pts),
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

    scene.add(
      new THREE.Mesh(
        new THREE.SphereGeometry(0.06, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xffffff }),
      ),
    );

    // Thought spheres
    spheresRef.current = [];
    thoughts.forEach((t, i) => {
      const color = new THREE.Color().setHSL(HUES[i % HUES.length], 0.85, 0.65);
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 20, 20),
        new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.95,
        }),
      );
      mesh.position.set(t.x, t.y, t.z);
      scene.add(mesh);
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

    const onResize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let t = 0;
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      t += 0.005;
      spheresRef.current.forEach(({ mesh }, i) => {
        mesh.position.y += Math.sin(t + i * 0.8) * 0.001;
        if (mesh.children[0]) mesh.children[0].lookAt(camera.position);
      });

      const size = new THREE.Vector2();
      renderer.getSize(size);
      const newLabels = thoughts.map((th) => {
        const sphere = spheresRef.current.find((s) => s.id === th.id);
        if (!sphere)
          return { id: th.id, x: 0, y: 0, text: th.text, visible: false };
        const pos = sphere.mesh.position.clone();
        pos.project(camera);
        const visible = pos.z < 1;
        // Clamp labels to stay within screen bounds with margin
        const rawX = ((pos.x + 1) / 2) * size.x;
        const rawY = ((-pos.y + 1) / 2) * size.y;
        const x = Math.max(70, Math.min(size.x - 70, rawX));
        const y = Math.max(80, Math.min(size.y - 80, rawY));
        return { id: th.id, x, y, text: th.text, visible };
      });
      setLabels(newLabels);

      const camX = camera.position.x;
      const camZ = camera.position.z;
      const fwdX = -camX,
        fwdZ = -camZ;
      const angFwd = Math.atan2(fwdX, fwdZ);
      const half = MAP_PANEL_SIZE / 2;

      let points: MapPoint[];
      let camPanelX = half,
        camPanelY = half,
        camAngleDeg = 0;

      if (mapModeRef.current === "mini") {
        const scale = half / MAP_WORLD_RANGE;
        points = thoughts.map((th, i) => ({
          id: th.id,
          cx: half + th.x * scale,
          cy: half + th.z * scale,
          color: `hsl(${HUES[i % HUES.length] * 360}, 85%, 65%)`,
        }));
        camPanelX = half + camX * scale;
        camPanelY = half + camZ * scale;
        camAngleDeg = (angFwd * 180) / Math.PI;
      } else {
        const scale = half / RADAR_WORLD_RANGE;
        points = thoughts.map((th, i) => {
          const dx = th.x - camX,
            dz = th.z - camZ;
          const dist = Math.sqrt(dx * dx + dz * dz);
          const rel = Math.atan2(dx, dz) - angFwd;
          const r = Math.min(dist * scale, half - 6);
          return {
            id: th.id,
            cx: half + Math.sin(rel) * r,
            cy: half - Math.cos(rel) * r,
            color: `hsl(${HUES[i % HUES.length] * 360}, 85%, 65%)`,
          };
        });
      }
      setMapData({ points, camX: camPanelX, camY: camPanelY, camAngleDeg });
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

  // const resetCamera = () => {
  //   sphericalRef.current = { theta: 0.4, phi: 1.0, radius: 12 };
  // };

  return (
    <div
      className="relative w-full h-screen overflow-hidden"
      style={{ background: "#020209" }}
    >
      {/* Canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
      />

      {/* Axis legend — bottom left, above bottom controls */}
      <div className="absolute bottom-20 left-4 z-10 flex flex-col gap-1 pointer-events-none">
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

      {/* Floating labels — clamped within viewport */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {labels
          .filter((l) => l.visible)
          .map((l) => (
            <button
              key={l.id}
              className="absolute pointer-events-auto transform -translate-x-1/2 -translate-y-1/2 text-white/60 hover:text-white text-[10px] max-w-[110px] text-center leading-tight transition-colors duration-150 cursor-pointer bg-transparent border-0 px-1"
              style={{ left: l.x, top: l.y + 20 }}
              onClick={() =>
                setSelected(thoughts.find((t) => t.id === l.id) ?? null)
              }
            >
              {l.text.length > 30 ? l.text.slice(0, 30) + "…" : l.text}
            </button>
          ))}
      </div>

      {/* Navbar scrim */}
      <div
        className="absolute top-0 left-0 right-0 h-28 z-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #020209 0%, rgba(2,2,9,0.85) 55%, rgba(2,2,9,0) 100%)",
        }}
      />

      {/* ── Navbar ── */}
      <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-4 h-16">
        {/* Left: back */}
        <Link
          to="/"
          className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm font-medium shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="hidden sm:inline">Back</span>
        </Link>

        {/* Center: logo */}
        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
          <Codesandbox className="h-5 w-5 text-white/60" />
          <span className="text-white/60 font-bold text-xl">DPTF</span>
        </div>

        {/* Right: icon-only action buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => setMapMode((m) => (m === "mini" ? "radar" : "mini"))}
            title={mapMode === "mini" ? "Switch to radar" : "Switch to minimap"}
            className="text-white/40 hover:text-white border border-white/10 hover:border-white/30 p-2 rounded-full transition-all"
          >
            <Compass className="h-4 w-4" />
          </button>
          {/* <button
            onClick={resetCamera}
            title="Reset camera"
            className="text-white/40 hover:text-white border border-white/10 hover:border-white/30 p-2 rounded-full transition-all"
          >
            <RotateCcw className="h-4 w-4" />
          </button> */}
          {/* Add thought: icon on mobile, icon+text on sm+ */}
          <button
            onClick={() => setAdding(true)}
            title="Add thought"
            className="flex items-center gap-1.5 text-white/50 hover:text-white border border-white/10 hover:border-white/30 p-2 sm:px-3 sm:py-1.5 rounded-full transition-all"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline text-sm">Add thought</span>
          </button>
        </div>
      </div>

      {/* ── Minimap — bottom left, above axis legend ── */}
      <div
        className="absolute z-20 rounded-full overflow-hidden pointer-events-none"
        style={{
          width: MAP_PANEL_SIZE,
          height: MAP_PANEL_SIZE,
          // On mobile: bottom-left so it doesn't fight the controls hint center
          bottom: "4.5rem",
          right: "1rem",
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.12)",
          backdropFilter: "blur(4px)",
        }}
      >
        <svg
          width={MAP_PANEL_SIZE}
          height={MAP_PANEL_SIZE}
          viewBox={`0 0 ${MAP_PANEL_SIZE} ${MAP_PANEL_SIZE}`}
        >
          <circle
            cx={MAP_PANEL_SIZE / 2}
            cy={MAP_PANEL_SIZE / 2}
            r={MAP_PANEL_SIZE / 2 - 1}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
          />
          <circle
            cx={MAP_PANEL_SIZE / 2}
            cy={MAP_PANEL_SIZE / 2}
            r={(MAP_PANEL_SIZE / 2) * 0.6}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
          />
          <circle
            cx={MAP_PANEL_SIZE / 2}
            cy={MAP_PANEL_SIZE / 2}
            r={(MAP_PANEL_SIZE / 2) * 0.3}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
          />
          {mapMode === "mini" && (
            <circle
              cx={MAP_PANEL_SIZE / 2}
              cy={MAP_PANEL_SIZE / 2}
              r={2}
              fill="rgba(255,255,255,0.5)"
            />
          )}
          {mapData.points.map((p) => (
            <circle key={p.id} cx={p.cx} cy={p.cy} r={2.5} fill={p.color} />
          ))}
          <g
            transform={`translate(${mapData.camX}, ${mapData.camY}) rotate(${mapData.camAngleDeg})`}
          >
            <polygon points="0,-6 4,5 -4,5" fill="#ffffff" opacity={0.9} />
          </g>
        </svg>
        <div className="absolute top-1.5 left-0 right-0 text-center text-[8px] font-mono text-white/25 tracking-widest uppercase">
          {mapMode === "mini" ? "map" : "radar"}
        </div>
      </div>

      {/* Controls hint — bottom center */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/20 text-[10px] sm:text-xs text-center pointer-events-none whitespace-nowrap">
        drag to orbit · scroll to zoom · tap thought to read
      </div>

      {/* Selected thought modal */}
      {selected && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center px-4"
          style={{ background: "rgba(2,2,9,0.7)", backdropFilter: "blur(6px)" }}
          onClick={() => setSelected(null)}
        >
          <div
            className="border border-white/15 rounded-2xl p-6 sm:p-8 w-full max-w-md relative"
            style={{ background: "rgba(255,255,255,0.04)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 text-white/30 hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            <p className="text-white text-base sm:text-lg leading-relaxed pr-6">
              {selected.text}
            </p>
            <p className="text-white/25 text-xs mt-4 font-mono">
              ({selected.x.toFixed(1)}, {selected.y.toFixed(1)},{" "}
              {selected.z.toFixed(1)})
            </p>
          </div>
        </div>
      )}

      {/* Add thought modal */}
      {adding && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center px-4"
          style={{ background: "rgba(2,2,9,0.7)", backdropFilter: "blur(6px)" }}
          onClick={() => setAdding(false)}
        >
          <div
            className="border border-white/15 rounded-2xl p-6 sm:p-8 w-full max-w-md relative"
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
