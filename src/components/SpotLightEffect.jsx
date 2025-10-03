import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SpotlightEffect = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Main spotlight that follows cursor */}
      <motion.div
        className="spotlight-main"
        animate={{
          background: `
            radial-gradient(
              circle at ${mousePosition.x}% ${mousePosition.y}%, 
              rgba(99, 102, 241, 0.15) 0%, 
              rgba(139, 92, 246, 0.1) 20%, 
              rgba(236, 72, 153, 0.05) 40%, 
              transparent 70%
            )
          `
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      {/* Central lighting effect */}
      <motion.div
        className="central-light"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '800px',
          height: '800px',
          background: `
            radial-gradient(
              circle,
              rgba(99, 102, 241, 0.08) 0%,
              rgba(139, 92, 246, 0.06) 30%,
              rgba(236, 72, 153, 0.03) 60%,
              transparent 80%
            )
          `,
          borderRadius: '50%',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Pulsing ring effect */}
      <motion.div
        className="pulse-ring"
        animate={{
          scale: [1, 2, 3],
          opacity: [0.5, 0.2, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut"
        }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100px',
          height: '100px',
          border: '2px solid rgba(99, 102, 241, 0.3)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* Secondary pulse ring */}
      <motion.div
        className="pulse-ring-2"
        animate={{
          scale: [1, 1.8, 2.5],
          opacity: [0.3, 0.1, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeOut",
          delay: 1
        }}
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '150px',
          height: '150px',
          border: '1px solid rgba(139, 92, 246, 0.4)',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </>
  );
};

export default SpotlightEffect;