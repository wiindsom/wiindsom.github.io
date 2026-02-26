"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

export default function Home() {
const colors = [
  "bg-indigo-500",
  "bg-red-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-pink-500",
  "bg-purple-500",
  "bg-blue-500",
  "bg-orange-500",
];

  const [count, setCount] = useState(0);
  const [running, setRunning] = useState(false);

  const btnRef = useRef<HTMLButtonElement | null>(null);

  const runningRef = useRef(false);
  const rafRef = useRef<number | null>(null);

  const lastHitRef = useRef(0);
  const pointerCapturedRef = useRef(false);

  const [color, setColor] = useState("bg-indigo-500");

  const posRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ vx: 360, vy: 260 }); // px/sec
  const lastTimeRef = useRef<number>(0);

  useLayoutEffect(() => {
    const place = () => {
      const el = btnRef.current;
      if (!el) return;

      const bw = el.offsetWidth || 200;
      const bh = el.offsetHeight || 56;

      const x = Math.max(0, window.innerWidth / 2 - bw / 2);
      const y = Math.max(0, window.innerHeight - bh - 28);

      posRef.current = { x, y };
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    place();
    requestAnimationFrame(place);
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (runningRef.current) return;
      const el = btnRef.current;
      if (!el) return;

      const bw = el.offsetWidth || 200;
      const bh = el.offsetHeight || 56;

      const x = Math.max(0, window.innerWidth / 2 - bw / 2);
      const y = Math.max(0, window.innerHeight - bh - 28);

      posRef.current = { x, y };
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const animate = (t: number) => {
    const el = btnRef.current;
    if (!el || !runningRef.current) return;

    const dt = Math.min(0.03, (t - lastTimeRef.current) / 1000);
    lastTimeRef.current = t;

    const bw = el.offsetWidth || 200;
    const bh = el.offsetHeight || 56;

    const maxX = Math.max(0, window.innerWidth - bw);
    const maxY = Math.max(0, window.innerHeight - bh);

    let { x, y } = posRef.current;
    let { vx, vy } = velRef.current;

    x += vx * dt;
    y += vy * dt;

    if (x <= 0) {
      x = 0;
      vx = Math.abs(vx);
    } else if (x >= maxX) {
      x = maxX;
      vx = -Math.abs(vx);
    }

    if (y <= 0) {
      y = 0;
      vy = Math.abs(vy);
    } else if (y >= maxY) {
      y = maxY;
      vy = -Math.abs(vy);
    }

    posRef.current = { x, y };
    velRef.current = { vx, vy };

    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    rafRef.current = requestAnimationFrame(animate);
  };

  const start = () => {
    runningRef.current = true;
    setRunning(true);

    lastTimeRef.current = performance.now();

    const dirX = Math.random() < 0.5 ? -1 : 1;
    const dirY = Math.random() < 0.5 ? -1 : 1;
    velRef.current = { vx: 360 * dirX, vy: 260 * dirY };

    rafRef.current = requestAnimationFrame(animate);
  };

  const stop = () => {
    runningRef.current = false;
    setRunning(false);
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  };

  const reset = () => {
    stop();
    setCount(0);

    const el = btnRef.current;
    if (!el) return;

    const bw = el.offsetWidth || 200;
    const bh = el.offsetHeight || 56;

    const x = Math.max(0, window.innerWidth / 2 - bw / 2);
    const y = Math.max(0, window.innerHeight - bh - 28);

    posRef.current = { x, y };
    el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  };

  const handleHit = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!pointerCapturedRef.current) {
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
        pointerCapturedRef.current = true;
      } catch {
      }
    }

    const now = performance.now();
    if (now - lastHitRef.current < 30) return;
    lastHitRef.current = now;

    setCount((c) => c + 1);
    setColor(colors[Math.floor(Math.random() * colors.length)]);

    if (!runningRef.current) {
      start();
      return;
    }

    const next = count + 1;
    const base = 360;
    const speed = base + next * 20; 

    const signX = Math.sign(velRef.current.vx) || 1;
    const signY = Math.sign(velRef.current.vy) || 1;

    velRef.current.vx = signX * speed;
    velRef.current.vy = signY * speed * 0.75;
  };

  return (
    <div className="min-h-screen bg-[#2B3045] text-gray-200 overflow-hidden relative">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 text-center px-4 w-full max-w-2xl pointer-events-none">
        <h1 className="text-6xl sm:text-7xl font-semibold tracking-tight">
          Fuckass Button Clicker
        </h1>

        <p className="mt-4 text-lg text-gray-300">+1 per button click and speed increases based on counter</p>

        <p className="mt-6 text-xl font-medium">
          Counter: <span className="text-white">{count}</span>{" "}
          <span className="text-gray-400">
            • {running ? "running" : "idle"}
          </span>
        </p>

        <div className="mt-5 flex items-center justify-center gap-3 pointer-events-auto">
          <button
            onPointerDown={reset}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 active:scale-95 transition"
          >
            Reset
          </button>
        </div>
      </div>

      <button
        ref={btnRef}
        onPointerDown={handleHit}
        onPointerUp={(e) => {
          if (pointerCapturedRef.current) {
            try {
              e.currentTarget.releasePointerCapture(e.pointerId);
            } catch {}
            pointerCapturedRef.current = false;
          }
        }}
        className={[
          "absolute left-0 top-0 z-50",
          "min-w-55 text-center",
          "px-6 py-3 rounded-xl",
          color,
          "text-white font-semibold",
          "shadow-lg shadow-black/30",
          "select-none cursor-pointer",
          "will-change-transform",
        ].join(" ")}
      >
        Come and get me
      </button>
    </div>
  );
}
