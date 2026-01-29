'use client';

import { useEffect, useRef } from 'react';

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Draw animated background shapes
    const drawShapes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#f0f7ff');
      gradient.addColorStop(1, '#f5f3ff');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Animated circles with subtle movement
      const time = Date.now() * 0.00005;
      const circles = [
        { x: canvas.width * 0.2, y: canvas.height * 0.3, r: 150, color: 'rgba(14, 165, 233, 0.08)' },
        { x: canvas.width * 0.8, y: canvas.height * 0.6, r: 200, color: 'rgba(147, 51, 234, 0.08)' },
        { x: canvas.width * 0.5, y: canvas.height * 0.8, r: 100, color: 'rgba(34, 197, 94, 0.06)' }
      ];

      circles.forEach((circle, i) => {
        const offset = Math.sin(time + i) * 15;
        ctx.beginPath();
        ctx.arc(circle.x + offset, circle.y, circle.r, 0, Math.PI * 2);
        ctx.fillStyle = circle.color;
        ctx.fill();
      });
    };

    const animationFrame = setInterval(drawShapes, 50);
    drawShapes();

    return () => clearInterval(animationFrame);
  }, []);

  return (
    <section className="hero">
      <div className="hero-background" />
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-60"
      />

      <div className="container relative z-10">
        <div className="hero-content">
          <div className="animate-slideUp">
            <h1 className="hero-title">
              Transform Your Real Estate Journey
            </h1>
            <p className="hero-subtitle">
              We provide comprehensive real estate solutions with cutting-edge technology and expert guidance to help you find your dream property.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary">
                Get Started
              </button>
              <button className="btn btn-outline">
                Learn More
              </button>
            </div>
          </div>

          <div className="hero-visual animate-slideDown">
            <div className="flex items-center justify-center w-full h-full">
              <h2 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 leading-tight">
                RealTrust
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
