import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CursorEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
    };

    const mouseEnter = () => setCursorVariant('hover');
    const mouseLeave = () => setCursorVariant('default');

    window.addEventListener('mousemove', mouseMove);
    
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, [role="button"]');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', mouseEnter);
      el.addEventListener('mouseleave', mouseLeave);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', mouseEnter);
        el.removeEventListener('mouseleave', mouseLeave);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      scale: 2,
    }
  };

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
        transition={{
          type: "tween",
          ease: "backOut",
          duration: 0.3
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '32px',
          height: '32px',
          backgroundColor: 'rgba(99, 102, 241, 0.6)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          filter: 'blur(1px)',
        }}
      />
      
      {/* Cursor trail */}
      <motion.div
        className="cursor-trail"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.1
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '16px',
          height: '16px',
          backgroundColor: 'rgba(139, 92, 246, 0.8)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />

      {/* Lighting effect following cursor */}
      <motion.div
        className="cursor-light"
        animate={{
          x: mousePosition.x - 100,
          y: mousePosition.y - 100,
        }}
        transition={{
          type: "tween",
          ease: "linear",
          duration: 0.2
        }}
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 30%, transparent 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 1,
          filter: 'blur(20px)',
        }}
      />
    </>
  );
};

export default CursorEffect;