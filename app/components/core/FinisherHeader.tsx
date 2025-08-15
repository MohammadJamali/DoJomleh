"use client";

import React, { useEffect, useRef, useCallback } from "react";

/* ----------------------------- Types & Interfaces ----------------------------- */

type ShapeType = "c" | "s" | "t";

interface Range {
  min: number;
  max: number;
}

interface SpeedRange {
  x: Range;
  y: Range;
}

interface SizeOptions {
  min: number;
  max: number;
  pulse?: number;
}

interface OpacityOptions {
  center: number;
  edge: number;
}

interface FinisherOptions {
  count: number;
  size: SizeOptions;
  speed: SpeedRange;
  colors: {
    background: string;
    particles: string[];
  };
  blending: GlobalCompositeOperation | "none";
  opacity: OpacityOptions;
  skew: number;
  shapes: ShapeType[];
}

/* ----------------------------- Default Options ----------------------------- */

const defaultOptions: FinisherOptions = {
  count: 6,
  size: { min: 1100, max: 1300, pulse: 0 },
  speed: {
    x: { min: 0.1, max: 0.3 },
    y: { min: 0.1, max: 0.3 },
  },
  colors: {
    background: "#9138e5",
    particles: ["#6bd6ff", "#ffcb57", "#ff333d"],
  },
  blending: "overlay",
  opacity: { center: 1, edge: 0.1 },
  skew: -2,
  shapes: ["c"],
};

/* ----------------------------- Helpers ----------------------------- */

function clampRandom(range: Range): number {
  if (range.min === range.max) return range.min;
  return Math.random() * (range.max - range.min) + range.min;
}

function randomSign(): 1 | -1 {
  return Math.random() > 0.5 ? 1 : -1;
}

function degToRadians(d: number) {
  return (d * Math.PI) / 180;
}

function parseHexColor(hex: string) {
  const cleaned = hex.replace("#", "");
  if (/^[A-Fa-f0-9]{3}$/.test(cleaned)) {
    const r = parseInt(cleaned[0] + cleaned[0], 16);
    const g = parseInt(cleaned[1] + cleaned[1], 16);
    const b = parseInt(cleaned[2] + cleaned[2], 16);
    return { r, g, b };
  } else if (/^[A-Fa-f0-9]{6}$/.test(cleaned)) {
    const r = parseInt(cleaned.substring(0, 2), 16);
    const g = parseInt(cleaned.substring(2, 4), 16);
    const b = parseInt(cleaned.substring(4, 6), 16);
    return { r, g, b };
  } else {
    return { r: 0, g: 0, b: 0 };
  }
}

function skewTranslateYDegrees(skewDeg: number, width: number) {
  const rad = degToRadians(Math.abs(skewDeg));
  return Math.ceil(Math.tan(rad) * (width / 2));
}

/* ----------------------------- Particle Class ----------------------------- */

class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: { r: number; g: number; b: number };
  shape: ShapeType;
  sizeValue: number;
  sizeDirection: number;
  options: FinisherOptions;
  centerOpacity: number;
  edgeOpacity: number;
  containerWidth: number;
  containerHeight: number;

  constructor(
    colorHex: string,
    anchorQuadrant: number,
    options: FinisherOptions,
    containerWidth: number,
    containerHeight: number
  ) {
    this.options = options;
    this.color = parseHexColor(colorHex);
    this.shape = options.shapes[Math.floor(Math.random() * options.shapes.length)];
    this.sizeDirection = randomSign();
    this.sizeValue = Math.abs(clampRandom(options.size));
    this.centerOpacity = options.opacity.center;
    this.edgeOpacity = options.opacity.edge;

    this.vx = clampRandom(options.speed.x) * randomSign();
    this.vy = clampRandom(options.speed.y) * randomSign();

    this.containerWidth = containerWidth;
    this.containerHeight = containerHeight;

    const halfW = containerWidth / 2;
    const halfH = containerHeight / 2;
    const baseX = Math.random() * halfW;
    const baseY = Math.random() * halfH;
    switch (anchorQuadrant % 4) {
      case 1:
        this.x = baseX + halfW;
        this.y = baseY;
        break;
      case 2:
        this.x = baseX;
        this.y = baseY + halfH;
        break;
      case 3:
        this.x = baseX + halfW;
        this.y = baseY + halfH;
        break;
      default:
        this.x = baseX;
        this.y = baseY;
    }
  }

  rgba(alpha: number) {
    return `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`;
  }

  animate(ctx: CanvasRenderingContext2D, width: number, height: number) {
    if (this.options.size.pulse) {
      this.sizeValue += this.options.size.pulse * this.sizeDirection;
      if (this.sizeValue > this.options.size.max || this.sizeValue < this.options.size.min) {
        this.sizeDirection *= -1;
        this.sizeValue = Math.abs(this.sizeValue);
      }
    }

    this.x += this.vx;
    this.y += this.vy;

    if (this.x < 0) {
      this.vx *= -1;
      this.x = 1;
    } else if (this.x > width) {
      this.vx *= -1;
      this.x = width - 1;
    }
    if (this.y < 0) {
      this.vy *= -1;
      this.y = 1;
    } else if (this.y > height) {
      this.vy *= -1;
      this.y = height - 1;
    }

    ctx.beginPath();
    ctx.globalCompositeOperation = this.options.blending && this.options.blending !== "none" ? this.options.blending : "source-over";

    const gradRadius =
      (this.shape === "c" ? this.sizeValue / 2 : this.shape === "t" ? 0.577 * this.sizeValue : 0.707 * this.sizeValue) || this.sizeValue;
    const gradient = ctx.createRadialGradient(this.x, this.y, 0.01, this.x, this.y, Math.abs(gradRadius));
    gradient.addColorStop(0, this.rgba(this.centerOpacity));
    gradient.addColorStop(1, this.rgba(this.edgeOpacity));
    ctx.fillStyle = gradient;

    const half = Math.abs(this.sizeValue / 2);

    if (this.shape === "c") {
      ctx.arc(this.x, this.y, half, 0, Math.PI * 2, false);
      ctx.closePath();
      ctx.fill();
      return;
    }

    if (this.shape === "s") {
      const left = this.x - half;
      const top = this.y - half;
      ctx.moveTo(left, top + 2 * half);
      ctx.lineTo(left + 2 * half, top + 2 * half);
      ctx.lineTo(left + 2 * half, top);
      ctx.lineTo(left, top);
      ctx.closePath();
      ctx.fill();
      return;
    }

    if (this.shape === "t") {
      const v = Math.round(30 * (half / (half || 1)));
      const baseY = this.y + v;
      ctx.moveTo(this.x - half, baseY);
      ctx.lineTo(this.x + half, baseY);
      ctx.lineTo(this.x, this.y - 2 * v);
      ctx.closePath();
      ctx.fill();
      return;
    }
  }
}

/* ----------------------------- FinisherHeader Component ----------------------------- */

interface FinisherHeaderProps {
  options?: Partial<FinisherOptions>;
  autoplay?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function FinisherHeader({
  options: userOptions,
  autoplay = true,
  children,
  style,
}: FinisherHeaderProps) {
  const mergedOptions = { ...defaultOptions, ...(userOptions || {}) } as FinisherOptions;
  mergedOptions.size = { ...defaultOptions.size, ...(userOptions?.size || {}) };
  mergedOptions.speed = { ...defaultOptions.speed, ...(userOptions?.speed || {}) };
  mergedOptions.colors = { ...defaultOptions.colors, ...(userOptions?.colors || {}) };
  mergedOptions.opacity = { ...defaultOptions.opacity, ...(userOptions?.opacity || {}) };
  mergedOptions.shapes = userOptions?.shapes ?? defaultOptions.shapes;
  mergedOptions.count = userOptions?.count ?? defaultOptions.count;
  mergedOptions.blending = userOptions?.blending ?? defaultOptions.blending;
  mergedOptions.skew = userOptions?.skew ?? defaultOptions.skew;

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const devicePixelRatioRef = useRef<number>(1);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const sizeRef = useRef<{ w: number; h: number } | null>(null); // keep last known size to scale particles on resize

  const createParticles = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const width = Math.max(1, wrapper.clientWidth);
    const height = Math.max(1, wrapper.clientHeight);

    // Only decide initial count here. If particles already exist, keep that count (do not recreate).
    if (particlesRef.current.length > 0) {
      // update container dims on existing particles (no re-create)
      for (const p of particlesRef.current) {
        p.containerWidth = width;
        p.containerHeight = height;
      }
      return;
    }

    // initial particle count: small-screen reduction applied only on creation
    const actualCount = window.innerWidth < 600 && mergedOptions.count > 5 ? Math.round(mergedOptions.count / 2) : mergedOptions.count;

    const particles: Particle[] = [];
    let colorIndex = 0;
    for (let i = 0; i < actualCount; i++) {
      const quadrant = i % 4;
      const colorHex = mergedOptions.colors.particles[colorIndex];
      colorIndex++;
      if (colorIndex >= mergedOptions.colors.particles.length) colorIndex = 0;
      const p = new Particle(colorHex, quadrant, mergedOptions, width, height);
      particles.push(p);
    }
    particlesRef.current = particles;

    // store initial size
    sizeRef.current = { w: width, h: height };
  }, [mergedOptions]);

  const resizeCanvas = useCallback(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    const { width, height } = wrapper.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    devicePixelRatioRef.current = dpr;

    // canvas pixel size (account for DPR)
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = `${Math.max(1, Math.floor(width))}px`;
    canvas.style.height = `${Math.max(1, Math.floor(height))}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const translateY = skewTranslateYDegrees(mergedOptions.skew, width);
    const transform = `skewY(${mergedOptions.skew}deg) translateY(-${translateY}px)`;
    canvas.style.position = "absolute";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.right = "0";
    canvas.style.bottom = "0";
    canvas.style.zIndex = "-1";
    canvas.style.pointerEvents = "none";
    canvas.style.transform = transform;
    canvas.style.webkitTransform = transform;
    canvas.style.outline = "1px solid transparent";
    const bgRgb = parseHexColor(mergedOptions.colors.background);
    canvas.style.backgroundColor = `rgba(${bgRgb.r}, ${bgRgb.g}, ${bgRgb.b}, 1)`;

    // --- IMPORTANT: do NOT recreate particles here ---
    // Instead, scale particle positions so animation appears consistent across sizes
    const prevSize = sizeRef.current;
    const newW = Math.max(1, Math.floor(width));
    const newH = Math.max(1, Math.floor(height));

    if (particlesRef.current.length > 0) {
      if (prevSize && prevSize.w > 0 && prevSize.h > 0) {
        const scaleX = newW / prevSize.w;
        const scaleY = newH / prevSize.h;

        for (const p of particlesRef.current) {
          p.x = p.x * scaleX;
          p.y = p.y * scaleY;
          p.containerWidth = newW;
          p.containerHeight = newH;
        }
      } else {
        // no prev size recorded — just update container dims
        for (const p of particlesRef.current) {
          p.containerWidth = newW;
          p.containerHeight = newH;
        }
      }
    }

    // update stored size after scaling
    sizeRef.current = { w: newW, h: newH };
    // do NOT call createParticles() here — we keep animation and colors intact
  }, [mergedOptions]);

  const step = useCallback(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, wrapper.clientWidth, wrapper.clientHeight);

    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      particles[i].animate(ctx, wrapper.clientWidth, wrapper.clientHeight);
    }

    animationIdRef.current = window.requestAnimationFrame(step);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;

    // initial sizing
    resizeCanvas();

    // create particles only once on mount (or when options change via separate effect)
    if (particlesRef.current.length === 0) {
      createParticles();
    }

    if (typeof ResizeObserver !== "undefined") {
      resizeObserverRef.current = new ResizeObserver(() => {
        // ResizeObserver callback runs frequently; call resizeCanvas (which will scale existing particles)
        resizeCanvas();
      });
      resizeObserverRef.current.observe(wrapper);
    } else {
      const onResize = () => {
        resizeCanvas();
      };
      window.addEventListener("resize", onResize);
      // cleanup fallback listener later in return
      return () => {
        window.removeEventListener("resize", onResize);
      };
    }

    if (autoplay) {
      if (animationIdRef.current != null) {
        cancelAnimationFrame(animationIdRef.current);
      }
      animationIdRef.current = window.requestAnimationFrame(step);
    }

    return () => {
      if (animationIdRef.current != null) {
        cancelAnimationFrame(animationIdRef.current);
        animationIdRef.current = null;
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
        resizeObserverRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplay, resizeCanvas, step]);

  // update particles when options change (recreate only if options changed)
  useEffect(() => {
    // If there are already particles, we want to preserve their state; however if options changes
    // semantically require recreation (e.g. different count or different particle palette) we recreate.
    // We'll check for a simple signal: if particle color palette length or count changed, recreate.
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const currentCount = particlesRef.current.length;
    const desiredCount = window.innerWidth < 600 && mergedOptions.count > 5 ? Math.round(mergedOptions.count / 2) : mergedOptions.count;
    const currentPaletteLen = particlesRef.current.length > 0 ? new Set(particlesRef.current.map((p) => `${p.color.r}-${p.color.g}-${p.color.b}`)).size : 0;
    const desiredPaletteLen = mergedOptions.colors.particles.length;

    const shouldRecreate = currentCount === 0 || currentCount !== desiredCount || currentPaletteLen !== desiredPaletteLen;

    if (shouldRecreate) {
      // clear existing then create fresh particles (this is an explicit options-change-driven recreate)
      particlesRef.current = [];
      // ensure sizeRef is set so createParticles can use it
      sizeRef.current = { w: wrapper.clientWidth, h: wrapper.clientHeight };
      createParticles();
    } else {
      // no recreation; at least update blending/opacity on existing particles
      for (const p of particlesRef.current) {
        p.options = mergedOptions;
        p.centerOpacity = mergedOptions.opacity.center;
        p.edgeOpacity = mergedOptions.opacity.edge;
      }
    }
  }, [createParticles, mergedOptions]);

  const wrapperStyle: React.CSSProperties = {
    position: "relative",
    overflow: "hidden",
    display: "block",
    width: "100%",
    height: "100%",
    ...style,
  };

  const canvasElement = <canvas ref={canvasRef} aria-hidden />;

  return (
    <div ref={wrapperRef} style={wrapperStyle}>
      {canvasElement}
      <div style={{ position: "relative", zIndex: 0 }}>{children}</div>
    </div>
  );
}
