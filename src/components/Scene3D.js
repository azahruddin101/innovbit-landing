"use client";

import { useEffect, useRef } from "react";

/**
 * A real-time 3D rooftop scene: physical sky, sun-cast soft shadows, glass solar panels with reflections.
 * The parent stage drives it through two CSS variables (--p: story progress 0-1, --i: chapter index).
 * three.js is imported inside the effect, so it is its own bundle and never blocks the page.
 * If WebGL is unavailable it calls onFail and the parent keeps showing the illustrated scene.
 */
export default function Scene3D({ stageRef, onReady, onFail }) {
  const host = useRef(null);

  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      let THREE, SkyModule;
      try {
        [THREE, SkyModule] = await Promise.all([import("three"), import("three/addons/objects/Sky.js")]);
      } catch {
        if (!disposed) onFail?.();
        return;
      }
      if (disposed || !host.current) return;
      const { Sky } = SkyModule;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
      } catch {
        onFail?.();
        return;
      }
      const el = host.current;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 0.55;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
      renderer.domElement.style.cssText = "position:absolute;inset:0;width:100%;height:100%;display:block";
      el.appendChild(renderer.domElement);

      const rand = (() => { let s = 7; return () => { s = (s + 0x6d2b79f5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; })();
      const maxAniso = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      const canvasTex = (w, h, draw, { repeat, srgb = true } = {}) => {
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        draw(c.getContext("2d"), w, h);
        const t = new THREE.CanvasTexture(c);
        if (srgb) t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = maxAniso;
        if (repeat) { t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(repeat[0], repeat[1]); }
        return t;
      };

      // ---------- textures drawn once on canvases ----------
      const grassTex = canvasTex(512, 512, (g, w, h) => {
        g.fillStyle = "#7d9b57"; g.fillRect(0, 0, w, h);
        const shades = ["#6f8f4d", "#8aa862", "#759452", "#93b06a", "#668647"];
        for (let k = 0; k < 9000; k++) { g.fillStyle = shades[(rand() * shades.length) | 0]; g.globalAlpha = 0.35 + rand() * 0.4; g.fillRect(rand() * w, rand() * h, 1 + rand() * 2, 2 + rand() * 5); }
        g.globalAlpha = 1;
      }, { repeat: [90, 90] });

      const plasterTex = canvasTex(256, 256, (g, w, h) => {
        g.fillStyle = "#efe6d6"; g.fillRect(0, 0, w, h);
        for (let k = 0; k < 2600; k++) { g.fillStyle = rand() > 0.5 ? "#e4d9c6" : "#f6efe2"; g.globalAlpha = 0.25 + rand() * 0.3; g.fillRect(rand() * w, rand() * h, 1 + rand() * 3, 1 + rand() * 3); }
        g.globalAlpha = 1;
      }, { repeat: [0.22, 0.22] });

      const tileTex = canvasTex(256, 256, (g, w, h) => {
        g.fillStyle = "#7d5648"; g.fillRect(0, 0, w, h);
        const rows = 8, tw = 32;
        for (let r = 0; r < rows; r++) for (let c = -1; c < w / tw + 1; c++) {
          const x = c * tw + (r % 2 ? tw / 2 : 0), y = r * (h / rows);
          const tone = 88 + rand() * 26;
          g.fillStyle = `rgb(${tone + 28},${tone - 8},${tone - 22})`; g.fillRect(x + 1, y + 1, tw - 2, h / rows - 2);
          g.fillStyle = "rgba(0,0,0,.22)"; g.fillRect(x + 1, y + h / rows - 5, tw - 2, 4);
        }
      }, { repeat: [3, 2] });

      const panelTex = canvasTex(660, 400, (g, w, h) => {
        g.fillStyle = "#d4dbe0"; g.fillRect(0, 0, w, h); // aluminium frame
        g.fillStyle = "#0b1733"; g.fillRect(12, 12, w - 24, h - 24);
        const cols = 12, rows = 6, gx = 12, gy = 12, cw = (w - 24 - 4) / cols, ch = (h - 24 - 4) / rows;
        for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
          const x = gx + 2 + c * cw, y = gy + 2 + r * ch;
          const gr = g.createLinearGradient(x, y, x + cw, y + ch);
          gr.addColorStop(0, "#1c3a72"); gr.addColorStop(1, "#13295a");
          g.fillStyle = gr; g.fillRect(x + 1.5, y + 1.5, cw - 3, ch - 3);
          g.strokeStyle = "rgba(190,205,230,.55)"; g.lineWidth = 1;
          for (let b = 1; b <= 3; b++) { const bx = x + 1.5 + ((cw - 3) * b) / 4; g.beginPath(); g.moveTo(bx, y + 1.5); g.lineTo(bx, y + ch - 1.5); g.stroke(); }
          g.strokeStyle = "rgba(120,150,200,.18)";
          for (let f = 1; f < 14; f++) { const fy = y + 1.5 + ((ch - 3) * f) / 14; g.beginPath(); g.moveTo(x + 1.5, fy); g.lineTo(x + cw - 1.5, fy); g.stroke(); }
        }
      });

      // ---------- scene ----------
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(36, 1, 0.5, 6000);

      const mkSky = () => {
        const s = new Sky();
        s.scale.setScalar(5000);
        const u = s.material.uniforms;
        u.turbidity.value = 3.2; u.rayleigh.value = 1.5; u.mieCoefficient.value = 0.004; u.mieDirectionalG.value = 0.8;
        return s;
      };
      const sky = mkSky();
      scene.add(sky);
      const envScene = new THREE.Scene();
      const envSky = mkSky();
      envScene.add(envSky);
      const pmrem = new THREE.PMREMGenerator(renderer);
      let envTarget = null;

      scene.fog = new THREE.Fog("#cfe2ec", 70, 330);

      const sun = new THREE.DirectionalLight("#fff3df", 3);
      sun.castShadow = true;
      sun.shadow.mapSize.set(2048, 2048);
      const sc = sun.shadow.camera;
      sc.left = -16; sc.right = 16; sc.top = 16; sc.bottom = -16; sc.near = 1; sc.far = 90;
      sun.shadow.bias = -0.0004; sun.shadow.normalBias = 0.04; sun.shadow.radius = 4;
      scene.add(sun, sun.target);
      scene.add(new THREE.HemisphereLight("#cfe4f5", "#8aa06a", 0.3));

      const ground = new THREE.Mesh(new THREE.CircleGeometry(700, 48), new THREE.MeshStandardMaterial({ map: grassTex, roughness: 1, metalness: 0 }));
      ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true;
      scene.add(ground);

      // distant hills, softened by fog
      const hillMat = [0x84a066, 0x7a9760, 0x8fab70].map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 1 }));
      for (let k = 0; k < 16; k++) {
        const a = (k / 16) * Math.PI * 2 + rand() * 0.3, r = 150 + rand() * 90;
        const h = new THREE.Mesh(new THREE.SphereGeometry(36, 24, 12), hillMat[k % 3]);
        h.scale.set(1.6 + rand(), 0.28 + rand() * 0.3, 1.1); h.position.set(Math.sin(a) * r, -9, Math.cos(a) * r); h.rotation.y = a;
        scene.add(h);
      }

      // house: walls with gable ends, extruded along x
      const W = 10, D = 7, H = 3.6, PITCH = (24 * Math.PI) / 180, rise = (D / 2) * Math.tan(PITCH);
      const shape = new THREE.Shape();
      shape.moveTo(-D / 2, 0); shape.lineTo(D / 2, 0); shape.lineTo(D / 2, H); shape.lineTo(0, H + rise); shape.lineTo(-D / 2, H); shape.closePath();
      const wallGeo = new THREE.ExtrudeGeometry(shape, { depth: W, bevelEnabled: false });
      wallGeo.rotateY(-Math.PI / 2); wallGeo.translate(W / 2, 0, 0);
      const house = new THREE.Group();
      const walls = new THREE.Mesh(wallGeo, new THREE.MeshStandardMaterial({ map: plasterTex, roughness: 0.95 }));
      walls.castShadow = true; walls.receiveShadow = true;
      house.add(walls);
      const plinth = new THREE.Mesh(new THREE.BoxGeometry(W + 0.2, 0.35, D + 0.2), new THREE.MeshStandardMaterial({ color: "#b9b2a6", roughness: 1 }));
      plinth.position.y = 0.17; plinth.receiveShadow = true; plinth.castShadow = true;
      house.add(plinth);

      const slant = D / 2 / Math.cos(PITCH) + 0.4;
      const roofMat = new THREE.MeshStandardMaterial({ map: tileTex, bumpMap: tileTex, bumpScale: 1.2, roughness: 0.85 });
      const slabs = [1, -1].map((side) => {
        const g = new THREE.Group();
        g.position.set(0, H + (D / 4) * Math.tan(PITCH) + 0.05, side * (D / 4 + 0.12));
        g.rotation.x = side * PITCH;
        const m = new THREE.Mesh(new THREE.BoxGeometry(W + 0.9, 0.16, slant), roofMat);
        m.castShadow = true; m.receiveShadow = true; g.add(m);
        house.add(g);
        return g;
      });
      const ridge = new THREE.Mesh(new THREE.BoxGeometry(W + 0.9, 0.2, 0.34), new THREE.MeshStandardMaterial({ color: "#6a443a", roughness: 0.8 }));
      ridge.position.set(0, H + rise + 0.1, 0); ridge.castShadow = true; house.add(ridge);

      // door and windows on the front wall
      const glass = new THREE.MeshPhysicalMaterial({ color: "#27415a", roughness: 0.08, metalness: 0.2, clearcoat: 1, envMapIntensity: 1.4 });
      const trim = new THREE.MeshStandardMaterial({ color: "#f7f3ea", roughness: 0.7 });
      const opening = (x, y, w, h) => {
        const fr = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, h + 0.2, 0.08), trim); fr.position.set(x, y, D / 2 + 0.03); fr.castShadow = true;
        const gl = new THREE.Mesh(new THREE.BoxGeometry(w, h, 0.1), glass); gl.position.set(x, y, D / 2 + 0.06);
        house.add(fr, gl);
      };
      opening(-3, 1.9, 1.5, 1.25); opening(0.4, 1.9, 1.5, 1.25);
      const door = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.3, 0.1), new THREE.MeshStandardMaterial({ color: "#7b5a43", roughness: 0.6 }));
      door.position.set(3, 1.5, D / 2 + 0.06); door.castShadow = true; house.add(door);

      // inverter on the wall, and a status light
      const inverter = new THREE.Group();
      const inv = new THREE.Mesh(new THREE.BoxGeometry(0.62, 0.86, 0.22), new THREE.MeshStandardMaterial({ color: "#e8eeee", roughness: 0.4, metalness: 0.3 }));
      inv.castShadow = true;
      const led = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), new THREE.MeshBasicMaterial({ color: "#2fe6a4" }));
      led.position.set(0, 0.22, 0.12);
      inverter.add(inv, led);
      inverter.position.set(4.35, 1.6, D / 2 + 0.17);
      house.add(inverter);

      // solar panels on the south slope (local to the slab: x along the ridge, z up the slope)
      const panelGeo = new THREE.BoxGeometry(1.65, 0.05, 1.0);
      const panelMat = new THREE.MeshPhysicalMaterial({ map: panelTex, roughness: 0.22, metalness: 0.55, clearcoat: 1, clearcoatRoughness: 0.04, envMapIntensity: 1.5 });
      const panels = [];
      for (let r = 0; r < 3; r++) for (let c = 0; c < 5; c++) {
        const m = new THREE.Mesh(panelGeo, panelMat);
        const baseX = -3.6 + c * 1.8, baseZ = -1.15 + r * 1.12;
        m.position.set(baseX, 0.14, baseZ); m.castShadow = true; m.receiveShadow = true;
        m.userData = { r, c, a: 0, baseY: 0.14 };
        m.visible = false;
        slabs[0].add(m);
        panels.push(m);
      }
      scene.add(house);

      // garden: path, trees and shrubs
      const path = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 22), new THREE.MeshStandardMaterial({ color: "#cdbfa6", roughness: 1 }));
      path.rotation.x = -Math.PI / 2; path.position.set(3, 0.02, D / 2 + 11); path.receiveShadow = true; scene.add(path);
      const trunkMat = new THREE.MeshStandardMaterial({ color: "#6b4f3a", roughness: 1 });
      const leafMats = ["#4f7a3e", "#5e8a47", "#476f38"].map((c) => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 }));
      const tree = (x, z, s) => {
        const g = new THREE.Group();
        const t = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * s, 0.24 * s, 2.4 * s, 8), trunkMat); t.position.y = 1.2 * s; t.castShadow = true; g.add(t);
        for (let k = 0; k < 5; k++) {
          const b = new THREE.Mesh(new THREE.IcosahedronGeometry((1.05 - k * 0.06) * s, 2), leafMats[k % 3]);
          b.position.set((rand() - 0.5) * 1.3 * s, (2.7 + rand() * 1.3) * s, (rand() - 0.5) * 1.3 * s); b.castShadow = true; b.receiveShadow = true; g.add(b);
        }
        g.position.set(x, 0, z); scene.add(g);
      };
      tree(-8.5, 1.5, 1.25); tree(8.8, -1.5, 1.05); tree(-11, -6, 1.5); tree(12.5, 6, 1.2); tree(-13, 9, 0.9); tree(-15, 3, 1.4);
      const bush = (x, z, s) => { const b = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55 * s, 2), leafMats[(rand() * 3) | 0]); b.scale.y = 0.75; b.position.set(x, 0.4 * s, z); b.castShadow = true; b.receiveShadow = true; scene.add(b); };
      [[-4.5, 3.9, 1], [-2, 4, 0.8], [1.4, 3.95, 0.9], [5.9, 4, 1.1], [-5.6, 3.8, 0.8]].forEach(([x, z, s]) => bush(x, z, s));

      // ---------- driving it ----------
      const cur = { p: -1, i: -1 };
      let target = { p: 0, i: 0 };
      let envP = -1;
      const sunDir = new THREE.Vector3();
      const warm = new THREE.Color("#ffb877"), white = new THREE.Color("#fff3df"), fogLow = new THREE.Color("#f2d6b8"), fogHigh = new THREE.Color("#d2e4ee");
      const lookAt = new THREE.Vector3(0, 2.5, 0);
      const ease = (t) => t * t * (3 - 2 * t);
      let lastW = 0, lastH = 0;

      const applyTime = (p) => {
        const elev = ((9 + Math.sin(Math.PI * p) * 52) * Math.PI) / 180;
        const az = ((62 - p * 124) * Math.PI) / 180;
        sunDir.set(Math.sin(az) * Math.cos(elev), Math.sin(elev), Math.cos(az) * Math.cos(elev));
        sky.material.uniforms.sunPosition.value.copy(sunDir);
        envSky.material.uniforms.sunPosition.value.copy(sunDir);
        const k = ease(Math.min(1, Math.sin(elev) * 2.2));
        sun.position.copy(sunDir).multiplyScalar(45).add(new THREE.Vector3(0, 0, 0));
        sun.color.copy(warm).lerp(white, k);
        sun.intensity = 1.2 + k * 1.1;
        scene.fog.color.copy(fogLow).lerp(fogHigh, k);
        renderer.toneMappingExposure = 0.36 + (1 - k) * 0.14;
        if (Math.abs(p - envP) > 0.045 || envP < 0) {
          const next = pmrem.fromScene(envScene);
          if (envTarget) envTarget.dispose();
          envTarget = next; envP = p;
          scene.environment = envTarget.texture; scene.environmentIntensity = 0.4 + (1 - k) * 0.1;
        }
      };

      const applyCamera = (p) => {
        const a = ((-36 + p * 66) * Math.PI) / 180, r = 23 - ease(p) * 3, hgt = 6.2 + Math.sin(Math.PI * p) * 2.2;
        camera.position.set(Math.sin(a) * r, hgt, Math.cos(a) * r);
        camera.lookAt(lookAt);
      };

      const resize = () => {
        const w = el.clientWidth, h = el.clientHeight;
        if (!w || !h || (w === lastW && h === lastH)) return;
        lastW = w; lastH = h;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.fov = w < 700 ? 52 : 36;
        camera.clearViewOffset();
        if (w >= 1024) camera.setViewOffset(w, h, w * 0.17, 0, w, h); // house sits left of the card
        else camera.setViewOffset(w, h, 0, h * 0.16, w, h); // house sits above the card
        camera.updateProjectionMatrix();
        cur.p = -1; // force a redraw
      };

      let visible = true, raf = 0, last = performance.now(), firstDone = false, running = true;
      const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { rootMargin: "100px" });
      io.observe(el);
      const ro = new ResizeObserver(resize);
      ro.observe(el);
      resize();

      const tick = (now) => {
        raf = requestAnimationFrame(tick);
        if (!running || !visible) { last = now; return; }
        const dt = Math.min(0.1, (now - last) / 1000);
        last = now;
        const st = stageRef.current;
        if (st) { target = { p: parseFloat(st.style.getPropertyValue("--p")) || 0, i: parseFloat(st.style.getPropertyValue("--i")) || 0 }; }
        let dirty = false;
        if (cur.p < 0) { cur.p = target.p; cur.i = target.i; dirty = true; applyTime(cur.p); applyCamera(cur.p); }
        else if (Math.abs(target.p - cur.p) > 0.0004) {
          cur.p += (target.p - cur.p) * (1 - Math.exp(-dt * 7));
          applyTime(cur.p); applyCamera(cur.p); dirty = true;
        }
        cur.i = target.i;
        for (const m of panels) {
          const want = cur.i >= 3 + m.userData.r - 0.01 ? 1 : 0;
          const d = want - m.userData.a;
          if (Math.abs(d) > 0.002) {
            const stagger = m.userData.c * 0.035;
            m.userData.a += d * (1 - Math.exp(-dt * (want ? 5 : 8)));
            m.userData.a = Math.max(0, Math.min(1, m.userData.a));
            const e = ease(Math.max(0, Math.min(1, m.userData.a - stagger)));
            m.visible = m.userData.a > 0.01;
            m.scale.setScalar(0.4 + 0.6 * e);
            m.position.y = m.userData.baseY + (1 - e) * 1.4;
            dirty = true;
          }
        }
        led.visible = cur.i >= 5;
        if (dirty) {
          renderer.render(scene, camera);
          if (!firstDone) { firstDone = true; onReady?.(); }
        }
      };
      raf = requestAnimationFrame(tick);

      const onVis = () => { running = !document.hidden; };
      document.addEventListener("visibilitychange", onVis);
      const onLost = (e) => { e.preventDefault(); onFail?.(); };
      renderer.domElement.addEventListener("webglcontextlost", onLost);

      cleanup = () => {
        cancelAnimationFrame(raf);
        document.removeEventListener("visibilitychange", onVis);
        renderer.domElement.removeEventListener("webglcontextlost", onLost);
        io.disconnect(); ro.disconnect();
        scene.traverse((o) => { if (o.geometry) o.geometry.dispose(); const ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : []; ms.forEach((m) => { m.map?.dispose(); m.bumpMap?.dispose(); m.dispose(); }); });
        envTarget?.dispose(); pmrem.dispose();
        renderer.dispose(); renderer.forceContextLoss();
        renderer.domElement.remove();
      };
    })();

    return () => { disposed = true; cleanup(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={host} className="absolute inset-0" aria-hidden="true" />;
}
