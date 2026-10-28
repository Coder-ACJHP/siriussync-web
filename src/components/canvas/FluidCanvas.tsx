import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function FluidCanvas() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check if WebGL is supported
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    let animationFrameId: number;
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Grid of particles with wave oscillation
    const rows = 45;
    const cols = 70;
    const numParticles = rows * cols;
    const positions = new Float32Array(numParticles * 3);
    const originalPositions = new Float32Array(numParticles * 3);

    let idx = 0;
    const spacingX = 4.2;
    const spacingY = 3.2;
    const offsetX = (cols * spacingX) / 2;
    const offsetY = (rows * spacingY) / 2;

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const x = j * spacingX - offsetX;
        const y = i * spacingY - offsetY;
        const z = 0;

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = y;
        positions[idx * 3 + 2] = z;

        originalPositions[idx * 3] = x;
        originalPositions[idx * 3 + 1] = y;
        originalPositions[idx * 3 + 2] = z;
        idx++;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Monochrome high-end minimalist particle shader/material
    const material = new THREE.PointsMaterial({
      color: 0x71717a, // subtle zinc-500
      size: 1.8,
      transparent: true,
      opacity: 0.38,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      targetX = (clientX / width - 0.5) * 50;
      targetY = (clientY / height - 0.5) * -40;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', onResize);

    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.04;
      mouseY += (targetY - mouseY) * 0.04;

      camera.position.x = mouseX * 0.4;
      camera.position.y = mouseY * 0.4;
      camera.lookAt(0, 0, 0);

      const pos = geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < numParticles; i++) {
        const i3 = i * 3;
        const ox = originalPositions[i3];
        const oy = originalPositions[i3 + 1];

        // Organic fluid wave math
        const wave = Math.sin(ox * 0.05 + elapsedTime * 1.2) * Math.cos(oy * 0.05 + elapsedTime * 1.0) * 8;
        const mouseDist = Math.sqrt((ox - mouseX) ** 2 + (oy - mouseY) ** 2);
        const mouseEffect = Math.max(0, 25 - mouseDist * 0.4);

        pos[i3 + 2] = wave + mouseEffect * 0.8;
      }

      geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-70"
      aria-hidden="true"
    />
  );
}

