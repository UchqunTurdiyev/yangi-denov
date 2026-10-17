"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import type { RoomKey } from "@/lib/site";

// Xonadonning soddalashtirilgan 3D maketi: chizmalardagi xonalar joylashuvi asosida
// devorlar, pollar va mebellar protsedura yo'li bilan quriladi (o'lchamlar metrda).

type Kind = "living" | "bed" | "kitchen" | "bath" | "hall" | "dining" | "studio";
type Room = { name: string; kind: Kind; x: number; z: number; w: number; d: number };
type Wall = [number, number, number, number, number?]; // x1,z1,x2,z2, eshik o'rni (0..1)
type Layout = { W: number; D: number; rooms: Room[]; walls: Wall[]; balcony: [number, number, number, number] };

const LAYOUTS: Record<RoomKey, Layout> = {
  1: {
    W: 7.2,
    D: 5.4,
    rooms: [
      { name: "Oshxona-mehmonxona", kind: "studio", x: 0, z: 0, w: 3.8, d: 5.4 },
      { name: "Koridor", kind: "hall", x: 3.8, z: 0, w: 1.8, d: 1.8 },
      { name: "Hammom", kind: "bath", x: 5.6, z: 0, w: 1.6, d: 1.8 },
      { name: "Yotoqxona", kind: "bed", x: 3.8, z: 1.8, w: 3.4, d: 3.6 },
    ],
    walls: [
      [0, 0, 7.2, 0, 0.653],
      [7.2, 0, 7.2, 5.4],
      [0, 5.4, 7.2, 5.4, 0.78],
      [0, 0, 0, 5.4],
      [3.8, 0, 3.8, 1.8, 0.5],
      [3.8, 1.8, 3.8, 5.4],
      [3.8, 1.8, 5.6, 1.8, 0.5],
      [5.6, 1.8, 7.2, 1.8],
      [5.6, 0, 5.6, 1.8, 0.5],
    ],
    balcony: [4.5, 5.4, 2.7, 1.0],
  },
  2: {
    W: 9.6,
    D: 6.4,
    rooms: [
      { name: "Hammom", kind: "bath", x: 0, z: 0, w: 2.2, d: 2.4 },
      { name: "Koridor", kind: "hall", x: 2.2, z: 0, w: 3.8, d: 2.4 },
      { name: "Oshxona", kind: "kitchen", x: 6.0, z: 0, w: 3.6, d: 2.4 },
      { name: "Mehmonxona", kind: "living", x: 0, z: 2.4, w: 4.4, d: 4.0 },
      { name: "Yotoqxona", kind: "bed", x: 4.4, z: 2.4, w: 3.4, d: 4.0 },
      { name: "Ovqatlanish", kind: "dining", x: 7.8, z: 2.4, w: 1.8, d: 4.0 },
    ],
    walls: [
      [0, 0, 9.6, 0, 0.417],
      [9.6, 0, 9.6, 6.4],
      [0, 6.4, 9.6, 6.4, 0.23],
      [0, 0, 0, 6.4],
      [2.2, 0, 2.2, 2.4, 0.5],
      [6.0, 0, 6.0, 2.4, 0.5],
      [0, 2.4, 2.2, 2.4],
      [2.2, 2.4, 4.4, 2.4, 0.5],
      [4.4, 2.4, 6.0, 2.4, 0.5],
      [6.0, 2.4, 7.8, 2.4],
      [4.4, 2.4, 4.4, 6.4],
      [7.8, 2.4, 7.8, 6.4],
    ],
    balcony: [0.8, 6.4, 3.2, 1.0],
  },
  3: {
    W: 10.4,
    D: 6.8,
    rooms: [
      { name: "Hammom", kind: "bath", x: 0, z: 0, w: 2.2, d: 2.6 },
      { name: "Koridor", kind: "hall", x: 2.2, z: 0, w: 5.2, d: 2.6 },
      { name: "Oshxona", kind: "kitchen", x: 7.4, z: 0, w: 3.0, d: 2.6 },
      { name: "Yotoqxona", kind: "bed", x: 0, z: 2.6, w: 3.4, d: 4.2 },
      { name: "Mehmonxona", kind: "living", x: 3.4, z: 2.6, w: 4.0, d: 4.2 },
      { name: "Bolalar xonasi", kind: "bed", x: 7.4, z: 2.6, w: 3.0, d: 4.2 },
    ],
    walls: [
      [0, 0, 10.4, 0, 0.46],
      [10.4, 0, 10.4, 6.8],
      [0, 6.8, 10.4, 6.8, 0.52],
      [0, 0, 0, 6.8],
      [2.2, 0, 2.2, 2.6, 0.5],
      [7.4, 0, 7.4, 2.6, 0.5],
      [0, 2.6, 2.2, 2.6],
      [2.2, 2.6, 3.4, 2.6, 0.5],
      [3.4, 2.6, 7.4, 2.6, 0.5],
      [7.4, 2.6, 10.4, 2.6],
      [3.4, 2.6, 3.4, 6.8],
      [7.4, 2.6, 7.4, 6.8, 0.5],
    ],
    balcony: [4.0, 6.8, 3.0, 1.0],
  },
};

const WALL_H = 1.25; // "qo'g'irchoq uyi" kesimi — ichi ko'rinsin
const WALL_T = 0.14;
const DOOR = 0.9;

const COLORS = {
  wall: 0xf7f4ee,
  wallTop: 0x0f2f2a,
  wood: 0xc9a27a,
  tile: 0xd9dcdc,
  hall: 0xbfa184,
  fabric: 0x2f5f57,
  bed: 0xf2efe8,
  blanket: 0x4c5a58,
  dark: 0x2b2f30,
  white: 0xffffff,
  gold: 0xffbb4d,
  green: 0x056f62,
  glass: 0x9fd3e6,
  plant: 0x3f8f4a,
};

function mat(color: number, rough = 0.85) {
  return new THREE.MeshStandardMaterial({ color, roughness: rough, metalness: 0 });
}

function box(w: number, h: number, d: number, color: number, x: number, y: number, z: number, parent: THREE.Object3D) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat(color));
  m.position.set(x, y + h / 2, z);
  m.castShadow = true;
  m.receiveShadow = true;
  parent.add(m);
  return m;
}

function wallSegments([x1, z1, x2, z2, door]: Wall): [number, number, number, number][] {
  if (door === undefined) return [[x1, z1, x2, z2]];
  const len = Math.hypot(x2 - x1, z2 - z1);
  const a = Math.max(0, door * len - DOOR / 2) / len;
  const b = Math.min(len, door * len + DOOR / 2) / len;
  const lerp = (t: number): [number, number] => [x1 + (x2 - x1) * t, z1 + (z2 - z1) * t];
  const [ax, az] = lerp(a);
  const [bx, bz] = lerp(b);
  const out: [number, number, number, number][] = [];
  if (a > 0.01) out.push([x1, z1, ax, az]);
  if (b < 0.99) out.push([bx, bz, x2, z2]);
  return out;
}

function furnish(r: Room, g: THREE.Group) {
  const cx = r.x + r.w / 2;
  const cz = r.z + r.d / 2;
  const far = r.z + r.d; // xonaning tashqi (balkon) tomoni
  switch (r.kind) {
    case "bed": {
      const bw = Math.min(1.8, r.w - 0.9);
      box(bw, 0.42, 2.0, COLORS.bed, cx, 0, far - 1.15, g);
      box(bw, 0.06, 1.3, COLORS.blanket, cx, 0.42, far - 0.8, g);
      box(bw + 0.1, 0.9, 0.1, COLORS.dark, cx, 0, far - 0.1, g);
      box(0.45, 0.12, 0.3, COLORS.white, cx - bw / 4, 0.44, far - 0.35, g);
      box(0.45, 0.12, 0.3, COLORS.white, cx + bw / 4, 0.44, far - 0.35, g);
      box(Math.min(2.2, r.w - 0.4), 1.1, 0.55, COLORS.white, cx, 0, r.z + 0.4, g); // shkaf
      box(0.4, 0.45, 0.4, COLORS.wood, r.x + 0.35, 0, far - 0.35, g);
      break;
    }
    case "living":
    case "studio": {
      const sofaZ = far - 0.55;
      box(Math.min(2.4, r.w - 0.8), 0.42, 0.85, COLORS.fabric, cx, 0, sofaZ, g);
      box(Math.min(2.4, r.w - 0.8), 0.45, 0.2, COLORS.fabric, cx, 0.42, sofaZ + 0.33, g);
      box(1.0, 0.04, 0.6, COLORS.dark, cx, 0.4, sofaZ - 1.1, g);
      box(0.06, 0.36, 0.06, COLORS.dark, cx, 0.04, sofaZ - 1.1, g);
      box(2.4, 0.02, 1.7, COLORS.white, cx, 0, sofaZ - 0.9, g); // gilam
      if (r.kind === "studio") {
        box(r.w - 0.6, 0.9, 0.6, COLORS.white, cx, 0, r.z + 0.4, g); // oshxona mebeli
        box(r.w - 0.6, 0.04, 0.62, COLORS.dark, cx, 0.9, r.z + 0.4, g);
        box(0.62, 2.0, 0.62, COLORS.dark, r.x + 0.42, 0, r.z + 0.4, g); // muzlatgich
        box(1.2, 0.75, 0.8, COLORS.wood, cx, 0, r.z + 1.6, g);
      } else {
        box(1.8, 0.45, 0.4, COLORS.dark, cx, 0, r.z + 0.3, g); // TV tumba
        box(1.4, 0.8, 0.05, 0x111111, cx, 0.75, r.z + 0.15, g);
      }
      plant(r.x + 0.35, far - 0.35, g);
      break;
    }
    case "kitchen": {
      box(r.w - 0.4, 0.9, 0.6, COLORS.white, cx, 0, r.z + 0.4, g);
      box(r.w - 0.4, 0.04, 0.62, COLORS.dark, cx, 0.9, r.z + 0.4, g);
      box(0.6, 0.9, r.d - 1.1, COLORS.white, r.x + r.w - 0.5, 0, cz + 0.3, g);
      box(0.62, 2.0, 0.62, COLORS.dark, r.x + 0.45, 0, r.z + 0.4, g);
      box(1.1, 0.75, 0.7, COLORS.wood, cx - 0.3, 0, cz + 0.45, g);
      break;
    }
    case "dining": {
      box(0.9, 0.75, Math.min(2.0, r.d - 1.2), COLORS.dark, cx, 0, cz, g);
      for (const dz of [-0.6, 0, 0.6]) {
        box(0.4, 0.45, 0.4, COLORS.wood, cx - 0.7, 0, cz + dz, g);
        box(0.4, 0.45, 0.4, COLORS.wood, cx + 0.7, 0, cz + dz, g);
      }
      break;
    }
    case "bath": {
      box(0.75, 0.55, Math.min(1.6, r.d - 0.5), COLORS.white, r.x + 0.5, 0, r.z + r.d / 2, g);
      box(0.5, 0.85, 0.4, COLORS.white, r.x + r.w - 0.4, 0, r.z + 0.35, g);
      box(0.4, 0.42, 0.55, COLORS.white, r.x + r.w - 0.35, 0, r.z + r.d - 0.5, g);
      break;
    }
    case "hall": {
      box(Math.min(1.4, r.w - 0.4), 1.0, 0.4, COLORS.wood, cx, 0, r.z + r.d - 0.32, g);
      break;
    }
  }
}

function plant(x: number, z: number, g: THREE.Group) {
  box(0.3, 0.35, 0.3, COLORS.white, x, 0, z, g);
  const leaf = new THREE.Mesh(new THREE.IcosahedronGeometry(0.32, 0), mat(COLORS.plant));
  leaf.position.set(x, 0.65, z);
  leaf.castShadow = true;
  g.add(leaf);
}

function floorColor(k: Kind) {
  if (k === "bath") return COLORS.tile;
  if (k === "hall") return COLORS.hall;
  return COLORS.wood;
}

function buildApartment(key: RoomKey) {
  const L = LAYOUTS[key];
  const root = new THREE.Group();
  const floors = new THREE.Group();
  const walls = new THREE.Group();
  const furniture = new THREE.Group();
  root.add(floors, walls, furniture);

  // poydevor plitasi
  const slab = new THREE.Mesh(new THREE.BoxGeometry(L.W + 0.6, 0.25, L.D + 1.8), mat(0xe9e1cf));
  slab.position.set(L.W / 2, -0.13, L.D / 2 + 0.4);
  slab.receiveShadow = true;
  root.add(slab);

  for (const r of L.rooms) {
    const f = new THREE.Mesh(new THREE.BoxGeometry(r.w, 0.04, r.d), mat(floorColor(r.kind), 0.7));
    f.position.set(r.x + r.w / 2, 0.0, r.z + r.d / 2);
    f.receiveShadow = true;
    floors.add(f);
    furnish(r, furniture);
  }

  // balkon
  const [bx, bz, bw, bd] = L.balcony;
  const bal = new THREE.Mesh(new THREE.BoxGeometry(bw, 0.04, bd), mat(COLORS.tile));
  bal.position.set(bx + bw / 2, 0, bz + bd / 2);
  bal.receiveShadow = true;
  floors.add(bal);
  const rail = mat(COLORS.dark);
  for (let i = 0; i <= Math.round(bw / 0.18); i++) {
    const p = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.9, 0.03), rail);
    p.position.set(bx + (i * bw) / Math.round(bw / 0.18), 0.45, bz + bd);
    walls.add(p);
  }
  box(bw, 0.04, 0.06, COLORS.dark, bx + bw / 2, 0.9, bz + bd, walls);
  plant(bx + bw - 0.3, bz + bd - 0.3, furniture);

  const wallMat = mat(COLORS.wall, 0.95);
  const capMat = mat(COLORS.wallTop, 0.6);
  for (const w of L.walls) {
    for (const [x1, z1, x2, z2] of wallSegments(w)) {
      const len = Math.hypot(x2 - x1, z2 - z1) + WALL_T;
      const horizontal = Math.abs(z2 - z1) < 1e-6;
      const geo = new THREE.BoxGeometry(horizontal ? len : WALL_T, WALL_H, horizontal ? WALL_T : len);
      const m = new THREE.Mesh(geo, wallMat);
      m.position.set((x1 + x2) / 2, WALL_H / 2, (z1 + z2) / 2);
      m.castShadow = true;
      m.receiveShadow = true;
      walls.add(m);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(horizontal ? len : WALL_T + 0.01, 0.03, horizontal ? WALL_T + 0.01 : len), capMat);
      cap.position.set((x1 + x2) / 2, WALL_H + 0.015, (z1 + z2) / 2);
      walls.add(cap);
    }
  }

  root.position.set(-L.W / 2, 0, -L.D / 2 - 0.4);
  return { root, walls, furniture, layout: L };
}

export default function Apartment3D({ rooms }: { rooms: RoomKey }) {
  const host = useRef<HTMLDivElement>(null);
  const labelsRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [labels, setLabels] = useState<{ name: string; area: string }[]>([]);
  const api = useRef<{ load: (k: RoomKey) => void } | null>(null);

  useEffect(() => {
    const el = host.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 200);
    camera.position.set(7, 14, 11);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xd8cdb4, 1.6));
    const sun = new THREE.DirectionalLight(0xfff3dc, 2.4);
    sun.position.set(6, 14, 8);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -10;
    sun.shadow.camera.right = 10;
    sun.shadow.camera.top = 10;
    sun.shadow.camera.bottom = -10;
    sun.shadow.bias = -0.0005;
    sun.shadow.radius = 4;
    scene.add(sun);

    const ground = new THREE.Mesh(new THREE.CircleGeometry(14, 64), new THREE.ShadowMaterial({ opacity: 0.12 }));
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.26;
    ground.receiveShadow = true;
    scene.add(ground);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.enablePan = false;
    controls.minDistance = 9;
    controls.maxDistance = 40;
    controls.maxPolarAngle = Math.PI / 2.35;
    controls.autoRotate = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    controls.autoRotateSpeed = 0.7;
    controls.target.set(0, 0, 0);
    // Telefonda bir barmoq bilan sahifa suriladi, model esa ikki barmoq bilan aylantiriladi.
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE };
    renderer.domElement.style.touchAction = "pan-y";

    let current: ReturnType<typeof buildApartment> | null = null;
    let anchors: THREE.Vector3[] = [];
    let buildT = 1;
    let size = 10;
    // Tor (telefon) ekranda kamera uzoqroqqa chiqadi, shunda butun xonadon sig'adi.
    const fit = () => {
      const dist = (size * 1.2 + 3.5) * Math.max(1, 1.25 / camera.aspect);
      camera.position.copy(camera.position.clone().normalize().multiplyScalar(dist));
    };

    const dispose = (o: THREE.Object3D) =>
      o.traverse((n) => {
        if (n instanceof THREE.Mesh) {
          n.geometry.dispose();
          (Array.isArray(n.material) ? n.material : [n.material]).forEach((m) => m.dispose());
        }
      });

    const load = (k: RoomKey) => {
      if (current) {
        scene.remove(current.root);
        dispose(current.root);
      }
      current = buildApartment(k);
      scene.add(current.root);
      const L = current.layout;
      anchors = L.rooms.map(
        (r) => new THREE.Vector3(r.x + r.w / 2 - L.W / 2, WALL_H + 0.2, r.z + r.d / 2 - L.D / 2 - 0.4)
      );
      setLabels(L.rooms.map((r) => ({ name: r.name, area: (r.w * r.d).toFixed(1).replace(".", ",") })));
      size = Math.max(L.W, L.D);
      fit();
      buildT = 0;
    };
    api.current = { load };
    load(rooms);

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      fit();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);

    const v = new THREE.Vector3();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      if (current && buildT < 1) {
        buildT = Math.min(1, buildT + 0.022);
        const e = 1 - Math.pow(1 - buildT, 3);
        current.walls.scale.y = Math.max(0.001, e);
        current.furniture.scale.setScalar(Math.max(0.001, Math.min(1, (buildT - 0.35) / 0.65)));
        current.furniture.position.y = (1 - e) * 1.5;
      }
      controls.update();
      renderer.render(scene, camera);

      const box = labelsRef.current;
      if (box) {
        const { width, height } = el.getBoundingClientRect();
        anchors.forEach((a, i) => {
          const node = box.children[i] as HTMLElement | undefined;
          if (!node || !current) return;
          v.copy(a).project(camera);
          node.style.transform = `translate(-50%, -50%) translate(${((v.x + 1) / 2) * width}px, ${((1 - v.y) / 2) * height}px)`;
          node.style.opacity = buildT > 0.8 ? "1" : "0";
        });
      }
    };
    tick();
    setReady(true);

    const stopAuto = () => (controls.autoRotate = false);
    renderer.domElement.addEventListener("pointerdown", stopAuto);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      renderer.domElement.removeEventListener("pointerdown", stopAuto);
      controls.dispose();
      if (current) dispose(current.root);
      dispose(scene);
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    api.current?.load(rooms);
  }, [rooms]);

  return (
    <div className="viewer3d">
      <div ref={host} className="viewer3d__canvas" />
      <div ref={labelsRef} className="viewer3d__labels" aria-hidden>
        {labels.map((l) => (
          <span key={l.name + l.area} className="room-tag">
            {l.name}
            <b>{l.area} m²</b>
          </span>
        ))}
      </div>
      {!ready && <div className="viewer3d__loading">3D maket yuklanmoqda…</div>}
      <div className="viewer3d__hint">
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 12a9 9 0 1 1-3-6.7" />
          <path d="M21 4v5h-5" />
        </svg>
        Aylantiring · yaqinlashtiring
      </div>
    </div>
  );
}
