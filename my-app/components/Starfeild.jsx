"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Starfield() {
  const mountRef = useRef(null);
  const animationRef = useRef(null); // Store animation frame reference

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return; // Prevent potential null errors

    const scene = new THREE.Scene();
    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const starCount = 2000;
    const starsGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 1000; // x
      positions[i + 1] = (Math.random() - 0.5) * 1000; // y
      positions[i + 2] = Math.random() * -1000; // z (away from camera)
    }

    starsGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    const starsMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.8,
    });

    const stars = new THREE.Points(starsGeometry, starsMaterial);
    scene.add(stars);

    // Animation function
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      const positions = starsGeometry.attributes.position.array;
      for (let i = 0; i < starCount * 3; i += 3) {
        positions[i + 2] += 0.8; // move star closer
        if (positions[i + 2] > camera.position.z) {
          positions[i] = (Math.random() - 0.5) * 1000;
          positions[i + 1] = (Math.random() - 0.5) * 1000;
          positions[i + 2] = -1000;
        }
      }

      starsGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = mount.clientWidth || window.innerWidth;
      const newHeight = mount.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to prevent memory leaks
    return () => {
      cancelAnimationFrame(animationRef.current); // Stop animation loop
      window.removeEventListener("resize", handleResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose(); // Free up WebGL resources
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none"
    />
  );
}
