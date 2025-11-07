"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface ShootingStarPhysics {
  velocity: { x: number; y: number };
  acceleration: { x: number; y: number };
  lifetime: number;
  maxLifetime: number;
  trailSegments: number;
  angle: number;
}

type ShootingStarPoints = THREE.Points & ShootingStarPhysics;

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const starsRef = useRef<THREE.Points | null>(null);
  const shootingStarsRef = useRef<THREE.Points[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      3000
    );
    camera.position.z = 0;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create realistic starfield
    const createStars = () => {
      const starCount = 12000;
      const positions = new Float32Array(starCount * 3);
      const sizes = new Float32Array(starCount);
      const colors = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount; i++) {
        // Distribute stars uniformly across the entire screen depth
        positions[i * 3] = (Math.random() - 0.5) * 3000; // X: full width
        positions[i * 3 + 1] = (Math.random() - 0.5) * 2000; // Y: full height
        positions[i * 3 + 2] = -Math.random() * 2000 - 100; // Z: depth layers

        // Larger star sizes with more variation
        const sizeRandom = Math.random();
        if (sizeRandom > 0.95) {
          sizes[i] = 5.0 + Math.random() * 4.0; // Very bright stars
        } else if (sizeRandom > 0.85) {
          sizes[i] = 3.0 + Math.random() * 2.5; // Bright stars
        } else if (sizeRandom > 0.7) {
          sizes[i] = 1.8 + Math.random() * 1.5; // Medium stars
        } else {
          sizes[i] = 0.8 + Math.random() * 1.2; // Small stars
        }

        // Star colors - mostly white with slight variations
        const colorVariation = Math.random();
        if (colorVariation > 0.98) {
          // Blue-white stars (rare)
          colors[i * 3] = 0.8 + Math.random() * 0.2;
          colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
          colors[i * 3 + 2] = 1.0;
        } else if (colorVariation > 0.96) {
          // Orange-white stars (rare)
          colors[i * 3] = 1.0;
          colors[i * 3 + 1] = 0.9 + Math.random() * 0.1;
          colors[i * 3 + 2] = 0.7 + Math.random() * 0.2;
        } else {
          // White stars (most common) with subtle variations
          const brightness = 0.85 + Math.random() * 0.15;
          colors[i * 3] = brightness;
          colors[i * 3 + 1] = brightness;
          colors[i * 3 + 2] = brightness + Math.random() * 0.1;
        }
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

      // Custom shader material for realistic star rendering
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          varying float vSize;
          uniform float time;
          
          void main() {
            vColor = color;
            vSize = size;
            
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            
            // Twinkling effect - subtle size variation
            float twinkle = sin(time * 2.0 + position.x * 0.1 + position.y * 0.1) * 0.2 + 0.8;
            gl_PointSize = size * twinkle * (500.0 / -mvPosition.z);
            
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          varying float vSize;
          
          void main() {
            // Create circular stars with soft edges
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);
            
            if (dist > 0.5) discard;
            
            // Smooth falloff for realistic glow
            float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
            alpha = pow(alpha, 2.0);
            
            // Core brightness
            float core = 1.0 - smoothstep(0.0, 0.2, dist);
            
            vec3 finalColor = vColor * (0.7 + core * 0.3);
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const stars = new THREE.Points(geometry, material);
      starsRef.current = stars;
      scene.add(stars);
    };

    // Create hyper-realistic shooting stars with advanced trail effect
    const createShootingStar = () => {
      const trailSegments = 50;
      const positions = new Float32Array(trailSegments * 3);
      const alphas = new Float32Array(trailSegments);

      // Random starting position - anywhere on screen
      const startX = (Math.random() - 0.5) * 2000;
      const startY = (Math.random() - 0.3) * 1000 + 300;
      const startZ = -200 - Math.random() * 400; // Closer to camera

      // Realistic shooting star trajectory (diagonal downward)
      const angle = Math.PI / 5 + Math.random() * Math.PI / 8;
      const speed = 6 + Math.random() * 5;
      const trailLength = 150 + Math.random() * 120; // Longer trails

      // Initialize trail positions
      for (let i = 0; i < trailSegments; i++) {
        const t = i / (trailSegments - 1);
        positions[i * 3] = startX - Math.cos(angle) * trailLength * t;
        positions[i * 3 + 1] = startY + Math.sin(angle) * trailLength * t;
        positions[i * 3 + 2] = startZ;
        
        // Exponential falloff for trail alpha
        alphas[i] = Math.pow(1 - t, 2.5);
      }

      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));

      // Advanced shader for realistic trail with glow
      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          fade: { value: 1.0 },
          glowIntensity: { value: 1.0 },
        },
        vertexShader: `
          attribute float alpha;
          varying float vAlpha;
          varying vec3 vPosition;
          uniform float time;
          uniform float fade;
          
          void main() {
            vAlpha = alpha * fade;
            vPosition = position;
            
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Much larger point size with distance attenuation
            gl_PointSize = (15.0 + alpha * 25.0) * (400.0 / -mvPosition.z);
          }
        `,
        fragmentShader: `
          varying float vAlpha;
          varying vec3 vPosition;
          uniform float glowIntensity;
          
          void main() {
            // Create smooth circular glow
            vec2 center = gl_PointCoord - vec2(0.5);
            float dist = length(center);
            
            if (dist > 0.5) discard;
            
            // Core-to-edge gradient
            float intensity = 1.0 - smoothstep(0.0, 0.5, dist);
            intensity = pow(intensity, 1.5);
            
            // Hot core (white-blue)
            vec3 coreColor = vec3(1.0, 0.98, 0.95);
            vec3 glowColor = vec3(0.7, 0.85, 1.0);
            vec3 finalColor = mix(glowColor, coreColor, intensity);
            
            float alpha = vAlpha * intensity * glowIntensity;
            gl_FragColor = vec4(finalColor, alpha);
          }
        `,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });

      const shootingStar = new THREE.Points(geometry, material);

      // Physics properties
      const velocityX = Math.cos(angle) * speed;
      const velocityY = -Math.sin(angle) * speed;
      const gravity = 0.05; // Subtle gravitational acceleration
      
      const starWithPhysics = shootingStar as unknown as ShootingStarPoints;
      starWithPhysics.velocity = { x: velocityX, y: velocityY };
      starWithPhysics.acceleration = { x: 0, y: -gravity };
      starWithPhysics.lifetime = 0;
      starWithPhysics.maxLifetime = 1.8 + Math.random() * 0.8;
      starWithPhysics.trailSegments = trailSegments;
      starWithPhysics.angle = angle;

      scene.add(shootingStar);
      shootingStarsRef.current.push(starWithPhysics);
    };

    createStars();
    
    // Create initial shooting stars for immediate visual
    for (let i = 0; i < 3; i++) {
      setTimeout(() => createShootingStar(), i * 500);
    }

    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;

      // Update star twinkle
      if (starsRef.current) {
        const material = starsRef.current.material as THREE.ShaderMaterial;
        material.uniforms.time.value = time;
      }

      // Subtle camera rotation for depth
      camera.rotation.z = Math.sin(time * 0.05) * 0.002;

      // Update shooting stars with physics
      shootingStarsRef.current = shootingStarsRef.current.filter((star) => {
        const starWithPhysics = star as ShootingStarPoints;
        const velocity = starWithPhysics.velocity;
        const acceleration = starWithPhysics.acceleration;
        const lifetime = starWithPhysics.lifetime;
        const maxLifetime = starWithPhysics.maxLifetime;
        const trailSegments = starWithPhysics.trailSegments;

        // Apply physics
        velocity.x += acceleration.x;
        velocity.y += acceleration.y;

        // Update all trail segment positions
        const positions = star.geometry.attributes.position.array as Float32Array;
        for (let i = trailSegments - 1; i > 0; i--) {
          positions[i * 3] = positions[(i - 1) * 3];
          positions[i * 3 + 1] = positions[(i - 1) * 3 + 1];
          positions[i * 3 + 2] = positions[(i - 1) * 3 + 2];
        }
        
        // Update head position
        positions[0] += velocity.x;
        positions[1] += velocity.y;
        
        star.geometry.attributes.position.needsUpdate = true;

        // Update lifetime
        starWithPhysics.lifetime += 0.016;

        // Fade out with smooth easing
        const material = star.material as THREE.ShaderMaterial;
        const fadeProgress = lifetime / maxLifetime;
        
        if (fadeProgress > 0.7) {
          // Exponential fade at the end
          const fadeFactor = 1 - ((fadeProgress - 0.7) / 0.3);
          material.uniforms.fade.value = Math.pow(fadeFactor, 2);
        } else {
          material.uniforms.fade.value = 1.0;
        }
        
        // Glow intensity pulsing effect
        material.uniforms.glowIntensity.value = 0.8 + Math.sin(time * 8 + lifetime * 3) * 0.2;

        if (lifetime >= maxLifetime) {
          scene.remove(star);
          star.geometry.dispose();
          material.dispose();
          return false;
        }
        return true;
      });

      // More frequent shooting stars for professional look
      if (Math.random() < 0.015) {
        createShootingStar();
      }

      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!camera || !renderer) return;

      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      // Clean up shooting stars
      shootingStarsRef.current.forEach((star) => {
        scene.remove(star);
        star.geometry.dispose();
        (star.material as THREE.Material).dispose();
      });

      // Clean up stars
      if (starsRef.current) {
        scene.remove(starsRef.current);
        starsRef.current.geometry.dispose();
        (starsRef.current.material as THREE.Material).dispose();
      }

      // Clean up renderer
      if (renderer) {
        renderer.dispose();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
