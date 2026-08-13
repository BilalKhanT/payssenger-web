import * as THREE from "three";

interface NetworkHandle {
  destroy: () => void;
}

const COLORS = {
  signal: "#3e9be0",
  wire: "#8fc9ef",
  dark: "#0b1e30",
} as const;

/** Builds the soft radial sprite used for every point. */
function createCircleTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, "rgba(255,255,255,1)");
  gradient.addColorStop(0.35, "rgba(255,255,255,0.55)");
  gradient.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
}

/**
 * Renders the animated node/edge network behind the hero.
 * Returns a handle whose `destroy()` tears down the renderer and listeners.
 *
 * When `reduced` is true a single static frame is drawn (no RAF loop).
 */
export function createHeroNetwork(
  canvas: HTMLCanvasElement,
  reduced = false
): NetworkHandle {
  const wrap = canvas.parentElement;
  if (!wrap) return { destroy: () => {} };

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(52, 1, 0.1, 100);
  cam.position.set(0, 0, 15);
  const tex = createCircleTexture();

  const N = 168;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const meta: { d: number; sp: number; ph: number }[] = [];

  for (let i = 0; i < N; i++) {
    const x = (Math.random() * 2 - 1) * 13.5;
    const y = (Math.random() * 2 - 1) * 8.6;
    const z = (Math.random() * 2 - 1) * 3.2;
    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
    meta.push({
      d: Math.hypot(x, y),
      sp: 0.4 + Math.random() * 1.5,
      ph: Math.random() * 6.28,
    });
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("color", new THREE.BufferAttribute(col, 3));
  const mat = new THREE.PointsMaterial({
    size: 0.44,
    map: tex,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    sizeAttenuation: true,
  });
  const points = new THREE.Points(geo, mat);

  // Connect nearby nodes with up to three edges each.
  const linePositions: number[] = [];
  for (let i = 0; i < N; i++) {
    let c = 0;
    for (let j = i + 1; j < N; j++) {
      if (c >= 3) break;
      const dx = pos[i * 3] - pos[j * 3];
      const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
      const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
      if (Math.hypot(dx, dy, dz) < 3.3) {
        linePositions.push(
          pos[i * 3],
          pos[i * 3 + 1],
          pos[i * 3 + 2],
          pos[j * 3],
          pos[j * 3 + 1],
          pos[j * 3 + 2]
        );
        c++;
      }
    }
  }

  const lgeo = new THREE.BufferGeometry();
  lgeo.setAttribute(
    "position",
    new THREE.BufferAttribute(new Float32Array(linePositions), 3)
  );
  const lcol = new Float32Array(linePositions.length);
  lgeo.setAttribute("color", new THREE.BufferAttribute(lcol, 3));
  const lmat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
    blending: THREE.AdditiveBlending,
  });
  const lines = new THREE.LineSegments(lgeo, lmat);

  const group = new THREE.Group();
  group.add(lines);
  group.add(points);
  scene.add(group);

  // Travelling pulses that sweep outward across the field.
  const PN = 3;
  const ppos = new Float32Array(PN * 3);
  const pcol = new Float32Array(PN * 3);
  const pgeo = new THREE.BufferGeometry();
  pgeo.setAttribute("position", new THREE.BufferAttribute(ppos, 3));
  pgeo.setAttribute("color", new THREE.BufferAttribute(pcol, 3));
  const pmat = new THREE.PointsMaterial({
    size: 1.0,
    map: tex,
    vertexColors: true,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const pulses = new THREE.Points(pgeo, pmat);
  group.add(pulses);

  const signal = new THREE.Color(COLORS.signal);
  const wire = new THREE.Color(COLORS.wire);
  const dark = new THREE.Color(COLORS.dark);
  const scratch = new THREE.Color();

  const resize = () => {
    const rect = wrap.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height, false);
    cam.aspect = rect.width / Math.max(1, rect.height);
    cam.updateProjectionMatrix();
  };
  resize();
  window.addEventListener("resize", resize);

  let tx = 0;
  let ty = 0;
  let mx = 0;
  let my = 0;
  const handlePointer = (event: PointerEvent) => {
    const rect = wrap.getBoundingClientRect();
    tx = (event.clientX - rect.left) / rect.width - 0.5;
    ty = (event.clientY - rect.top) / rect.height - 0.5;
  };
  window.addEventListener("pointermove", handlePointer);

  const clock = new THREE.Clock();

  const render = () => {
    const t = clock.getElapsedTime();

    for (let i = 0; i < N; i++) {
      const m = meta[i];
      const f = Math.max(0, 1 - m.d / 13.5);
      const tw = 0.5 + 0.5 * Math.sin(t * m.sp + m.ph);
      const core = Math.max(0, 1 - m.d / 4.6);
      let bright = 0.1 + 0.5 * f * tw + core * 0.85;
      const black = Math.max(0, Math.sin(t * 0.5 - m.d * 0.34));
      bright *= 1 - 0.62 * (1 - f) * black;
      scratch.copy(dark).lerp(wire, Math.min(1, bright * 1.1));
      scratch.lerp(signal, core * 0.92);
      col[i * 3] = scratch.r;
      col[i * 3 + 1] = scratch.g;
      col[i * 3 + 2] = scratch.b;
    }
    geo.attributes.color.needsUpdate = true;

    for (let k = 0; k < lcol.length; k += 3) {
      const g = 0.05 + 0.05 * (0.5 + 0.5 * Math.sin(t * 0.4 + k * 0.13));
      lcol[k] = g * 0.35;
      lcol[k + 1] = g;
      lcol[k + 2] = g * 1.1;
    }
    lgeo.attributes.color.needsUpdate = true;

    for (let p = 0; p < PN; p++) {
      const prog = (t * 0.3 + p / PN) % 1;
      const ang = p * 2.4 + 0.5;
      const R = prog * 15.5;
      ppos[p * 3] = Math.cos(ang) * R;
      ppos[p * 3 + 1] = Math.sin(ang) * R * 0.62;
      ppos[p * 3 + 2] = 0.4;
      const fade = Math.sin(prog * Math.PI);
      pcol[p * 3] = signal.r * fade;
      pcol[p * 3 + 1] = signal.g * fade;
      pcol[p * 3 + 2] = signal.b * fade;
    }
    pgeo.attributes.position.needsUpdate = true;
    pgeo.attributes.color.needsUpdate = true;

    mx += (tx - mx) * 0.05;
    my += (ty - my) * 0.05;
    group.rotation.y = mx * 0.5;
    group.rotation.x = my * 0.32;
    cam.position.x = mx * 2.2;
    cam.position.y = -my * 1.6;
    cam.lookAt(0, 0, 0);
    renderer.render(scene, cam);
  };

  let rafId: number | null = null;
  if (reduced) {
    render();
  } else {
    const loop = () => {
      rafId = requestAnimationFrame(loop);
      render();
    };
    loop();
  }

  return {
    destroy: () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      geo.dispose();
      lgeo.dispose();
      pgeo.dispose();
      mat.dispose();
      lmat.dispose();
      pmat.dispose();
      tex.dispose();
      renderer.dispose();
    },
  };
}
