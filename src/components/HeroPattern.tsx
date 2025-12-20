import { useEffect, useRef } from "react";

export default function HeroPattern() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    
    // Configuration
    const particleCount = 250; // Enough to look dense but not messy
    const connectionRadius = 100; // Mouse interaction radius
    const flowSpeed = 2; // Base speed
    
    interface Particle {
      x: number;
      y: number;
      baseY: number; // The Y position it wants to return to
      vx: number;
      vy: number;
      length: number;
      speed: number;
      opacity: number;
      size: number;
    }
    
    let particles: Particle[] = [];

    const initParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        const y = Math.random() * canvas.height;
        particles.push({
          x: Math.random() * canvas.width,
          y: y,
          baseY: y,
          vx: flowSpeed + Math.random() * 2, // Varying speeds
          vy: 0,
          length: 20 + Math.random() * 80, // Varying trail lengths
          speed: 1 + Math.random(), // Speed multiplier
          opacity: 0.1 + Math.random() * 0.3, // Varying opacity
          size: Math.random() < 0.1 ? 2 : 1 // Occasional thicker lines
        });
      }
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const render = () => {
      // Create trails by not fully clearing (fading effect)
      // ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      // OR clean clear for crisp lines:
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Physics: Mouse Interaction (Repulsion / Flow around)
        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Repulsion force
        if (dist < connectionRadius * 2) {
            const force = (connectionRadius * 2 - dist) / (connectionRadius * 2);
            const angle = Math.atan2(dy, dx);
            // Push away mostly in Y direction, slightly in X
            const pushY = Math.sin(angle) * force * 5; 
            
            p.vy += pushY * 0.5;
        }

        // Spring back to base Y
        const springForce = (p.baseY - p.y) * 0.02;
        p.vy += springForce;
        
        // Damping
        p.vy *= 0.95;

        // Move
        p.x += p.vx * p.speed;
        p.y += p.vy;

        // Reset if off screen
        if (p.x > canvas.width + p.length) {
            p.x = -p.length;
            p.y = Math.random() * canvas.height;
            p.baseY = p.y;
            p.vx = flowSpeed + Math.random() * 2;
            p.vy = 0;
        }

        // Draw Streamline
        // Gradient for fading tail
        const gradient = ctx.createLinearGradient(p.x - p.length, p.y, p.x, p.y);
        gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
        gradient.addColorStop(1, `rgba(255, 255, 255, ${p.opacity})`);
        
        ctx.beginPath();
        ctx.strokeStyle = gradient;
        ctx.lineWidth = p.size;
        ctx.lineCap = "round";
        
        // Simple line segment for high performance and clean look
        // For more curvature, we'd need history, but straight lines with varying Y look like "fast shutter speed" rain/wind
        // Let's angle the line slightly based on vy for a more dynamic feel
        ctx.moveTo(p.x - p.length, p.y - p.vy * 2); 
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    
    handleResize();
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-60 mix-blend-screen"
    />
  );
}
