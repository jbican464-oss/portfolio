/* Floating 3D Particles — port sin React del componente de Magic UI
   (magicui.design/docs/components/floating-3d-particles).
   Uso: <canvas class="particles" data-quantity="400" data-color="#8B5CF6" data-size="5"
                data-opacity="0.3" data-drift="0.8" data-depth="0.5"></canvas>        */
(() => {
  const MOBILE_BREAKPOINT = 768;
  const SPREAD_FACTOR = 1.2;
  const MAX_DPR = 2;

  function hexToRgba(hex, alpha) {
    const clean = hex.replace("#", "").trim();
    const full = clean.length === 3 ? clean.split("").map((c) => c + c).join("") : clean;
    if (!/^[0-9a-f]{6}$/i.test(full)) return `rgba(139,92,246,${alpha})`;
    const n = Number.parseInt(full, 16);
    return `rgba(${(n >> 16) & 0xff},${(n >> 8) & 0xff},${n & 0xff},${alpha})`;
  }

  function deriveProjection(depth) {
    const t = Math.max(0, Math.min(1, depth));
    const fov = 800 - t * 600;
    const perspectiveDistance = 100 + t * 700;
    const depthRange = t * Math.min(400, fov + perspectiveDistance - 1);
    return { fov, perspectiveDistance, depthRange };
  }

  function spawnParticle(width, height, size, opacity) {
    const sizeVariance = size * 0.4;
    const opacityVariance = 0.2;
    return {
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * Math.max(width, height) * SPREAD_FACTOR,
      y: (Math.random() - 0.5) * height * 2,
      size: Math.max(0.5, size - sizeVariance + Math.random() * sizeVariance * 2),
      angularSpeed: 0.0015 + Math.random() * 0.001,
      opacity: Math.min(1, Math.max(0, opacity - opacityVariance + Math.random() * opacityVariance * 2)),
      screenX: 0, screenY: 0, projectedScale: 1,
    };
  }

  function Floating3DParticles(canvas, {
    quantity = 400, color = "#8B5CF6", size = 5, opacity = 0.3, drift = 0.8, depth = 0.5,
  } = {}) {
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;
    const s = { mounted: true, paused: false, reducedMotion: false, rafId: null };
    let width = 0, height = 0, particles = [], staticDirty = true;
    const { fov, perspectiveDistance, depthRange } = deriveProjection(depth);

    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const syncReducedMotion = () => { s.reducedMotion = mq.matches; };
    syncReducedMotion();

    const draw = (p) => {
      const r = Math.max(0, p.size * p.projectedScale);
      if (r <= 0) return;
      ctx.beginPath();
      ctx.fillStyle = hexToRgba(color, p.opacity);
      ctx.arc(p.screenX, p.screenY, r, 0, Math.PI * 2);
      ctx.fill();
    };

    const staticFrame = () => {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2, cy = height / 2;
      for (const p of particles) {
        const scale = fov / Math.max(1, fov + perspectiveDistance);
        p.screenX = cx + Math.cos(p.angle) * p.radius * scale;
        p.screenY = cy + p.y * scale;
        p.projectedScale = scale;
        draw(p);
      }
    };

    const tick = () => {
      if (!s.mounted) return;
      if (s.paused) { s.rafId = requestAnimationFrame(tick); return; }
      if (s.reducedMotion) {
        if (staticDirty) { staticDirty = false; staticFrame(); }
        s.rafId = requestAnimationFrame(tick);
        return;
      }
      staticDirty = true;
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2, cy = height / 2;
      for (const p of particles) {
        p.angle += p.angularSpeed;
        p.y -= drift;
        if (p.y < -height) { p.y = height; p.radius = Math.random() * Math.max(width, height) * SPREAD_FACTOR; }
        else if (p.y > height) { p.y = -height; p.radius = Math.random() * Math.max(width, height) * SPREAD_FACTOR; }
        const denom = Math.max(1, fov + perspectiveDistance + Math.sin(p.angle) * depthRange);
        const scale = fov / denom;
        p.screenX = cx + Math.cos(p.angle) * p.radius * scale;
        p.screenY = cy + p.y * scale;
        p.projectedScale = scale;
      }
      particles.sort((a, b) => a.projectedScale - b.projectedScale); // lejanas primero
      for (const p of particles) draw(p);
      s.rafId = requestAnimationFrame(tick);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.max(1, Math.min(devicePixelRatio || 1, MAX_DPR));
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = innerWidth < MOBILE_BREAKPOINT ? Math.round(quantity * 0.2) : quantity;
      particles = Array.from({ length: Math.max(0, count) }, () => spawnParticle(width, height, size, opacity));
      staticDirty = true;
    };

    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
    if (ro) ro.observe(canvas); else addEventListener("resize", resize);
    new IntersectionObserver(([e]) => { if (e) s.paused = document.hidden || !e.isIntersecting; }, { threshold: 0 }).observe(canvas);
    document.addEventListener("visibilitychange", () => { s.paused = document.hidden; });
    mq.addEventListener("change", syncReducedMotion);

    resize();
    s.rafId = requestAnimationFrame(tick);
  }

  document.querySelectorAll("canvas.particles").forEach((c) => {
    const d = c.dataset, num = (v) => (v === undefined ? undefined : Number(v));
    Floating3DParticles(c, {
      quantity: num(d.quantity), color: d.color, size: num(d.size),
      opacity: num(d.opacity), drift: num(d.drift), depth: num(d.depth),
    });
  });
})();
