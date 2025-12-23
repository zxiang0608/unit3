import { useEffect, useState } from 'react';

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Add hover listeners to interactive elements
    const interactiveElements = document.querySelectorAll(
      'a, button, [data-interactive]'
    );
    
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Hide on mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Cursor Dot */}
      <div
        className="fixed top-0 left-0 w-2 h-2 bg-[#ff4500] rounded-full pointer-events-none z-[9999]"
        style={{
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
        }}
      />
      
      {/* Cursor Outline */}
      <div
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-[9999] transition-all duration-200 ${
          isHovering
            ? 'w-20 h-20 bg-[#eaeaea] border-transparent mix-blend-difference'
            : 'w-10 h-10 border-[#ff4500] mix-blend-difference'
        }`}
        style={{
          transform: `translate(${position.x - (isHovering ? 40 : 20)}px, ${position.y - (isHovering ? 40 : 20)}px)`,
        }}
      />
    </>
  );
}
