import { useEffect, useState } from 'react';

export function GridBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const x = (window.innerWidth - mousePosition.x * 2) / 100;
  const y = (window.innerHeight - mousePosition.y * 2) / 100;

  return (
    <>
      {/* Living Grid Background */}
      <div
        className="fixed top-0 left-0 w-screen h-screen -z-10 opacity-30"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage:
            'linear-gradient(to right, #1f1f1f 1px, transparent 1px), linear-gradient(to bottom, #1f1f1f 1px, transparent 1px)',
          transform: `perspective(1000px) rotateX(5deg) scale(1.05) translateX(${x}px) translateY(${y}px)`,
          transformOrigin: 'center top',
        }}
      />
      
      {/* Vignette */}
      <div
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, transparent 40%, #080808 100%)',
        }}
      />
    </>
  );
}
