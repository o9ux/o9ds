import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useTheme } from '@/contexts/ThemeContext';

/*
 * Interactive particle waves — faithful to
 * https://codepen.io/deathfang/pen/WxNVoq
 *
 * Key CodePen characteristics matched:
 *   1. Per-particle scale: each dot pulses based on its sine-wave position
 *   2. Camera follows mouse with smooth 0.05 lerp
 *   3. camera.lookAt(scene.position) gives natural orbital perspective
 *   4. Wave appears as a horizon band with depth perspective
 */

const SEPARATION = 100;
const AMOUNTX = 50;
const AMOUNTY = 50;
const TOTAL = AMOUNTX * AMOUNTY;

/* ── Custom Shaders for per-particle sizing ── */

const vertexShader = `
  attribute float scale;
  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = scale * (300.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = `
  uniform vec3 color;
  uniform float uOpacity;
  void main() {
    // Circular particle with soft edge
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;
    float alpha = 1.0 - smoothstep(0.3, 0.5, dist);
    gl_FragColor = vec4(color, alpha * uOpacity);
  }
`;

export default function ParticleWaves({ className }) {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const materialRef = useRef(null);

  // Update particle color and opacity when theme changes
  useEffect(() => {
    themeRef.current = theme;
    if (materialRef.current?.uniforms?.color) {
      materialRef.current.uniforms.color.value.set(
        theme === 'dark' ? '#ffffff' : '#000000'
      );
      materialRef.current.uniforms.uOpacity.value = theme === 'dark' ? 0.8 : 1.0;
    }
  }, [theme]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ── Scene ──
    const scene = new THREE.Scene();

    // ── Camera — matches CodePen: FOV 75, z = 1000 ──
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      1,
      10000
    );
    camera.position.z = 1000;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const canvas = renderer.domElement;
    canvas.style.display = 'block';
    canvas.style.width = '100%';
    canvas.style.height = '100%';

    // ── Particle grid ──
    const positions = new Float32Array(TOTAL * 3);
    const scales = new Float32Array(TOTAL);

    let idx = 0;
    for (let ix = 0; ix < AMOUNTX; ix++) {
      for (let iy = 0; iy < AMOUNTY; iy++) {
        positions[idx * 3]     = ix * SEPARATION - (AMOUNTX * SEPARATION) / 2;
        positions[idx * 3 + 1] = 0;
        positions[idx * 3 + 2] = iy * SEPARATION - (AMOUNTY * SEPARATION) / 2;
        scales[idx] = 1;
        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // ── ShaderMaterial for per-particle sizing ──
    const material = new THREE.ShaderMaterial({
      uniforms: {
        color: {
          value: new THREE.Color(
            themeRef.current === 'dark' ? '#ffffff' : '#000000'
          ),
        },
        uOpacity: {
          value: themeRef.current === 'dark' ? 0.8 : 1.0,
        },
      },
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
    });
    materialRef.current = material;

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // ── Mouse tracking — same as CodePen: relative to window center ──
    let mouseX = 0;
    let mouseY = 0;
    let windowHalfX = window.innerWidth / 2;
    let windowHalfY = window.innerHeight / 2;

    const onMouseMove = (e) => {
      mouseX = e.clientX - windowHalfX;
      mouseY = e.clientY - windowHalfY;
    };

    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        mouseX = e.touches[0].pageX - windowHalfX;
        mouseY = e.touches[0].pageY - windowHalfY;
      }
    };

    const onTouchMove = (e) => {
      if (e.touches.length === 1) {
        mouseX = e.touches[0].pageX - windowHalfX;
        mouseY = e.touches[0].pageY - windowHalfY;
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchstart', onTouchStart, { passive: true });
    document.addEventListener('touchmove', onTouchMove, { passive: true });

    // ── Resize ──
    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!container) return;
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      }, 100);
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop — exact CodePen render() ──
    let count = 0;
    let animationId;

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // CodePen camera follow — exact formula
      camera.position.x += (mouseX - camera.position.x) * 0.05;
      camera.position.y += (-mouseY - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Wave animation — exact CodePen formula
      const posArray = geometry.attributes.position.array;
      const scaleArray = geometry.attributes.scale.array;

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // Y position: combined sine waves
          posArray[i * 3 + 1] =
            (Math.sin((ix + count) * 0.3) * 50) +
            (Math.sin((iy + count) * 0.5) * 50);

          // Per-particle scale: pulsing based on wave position
          scaleArray[i] =
            (Math.sin((ix + count) * 0.3) + 1) * 4 +
            (Math.sin((iy + count) * 0.5) + 1) * 4;

          i++;
        }
      }

      geometry.attributes.position.needsUpdate = true;
      geometry.attributes.scale.needsUpdate = true;

      renderer.render(scene, camera);
      count += 0.1;
    };

    animate();

    // ── Cleanup ──
    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      materialRef.current = null;
      renderer.dispose();
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={containerRef} className={className} />;
}
