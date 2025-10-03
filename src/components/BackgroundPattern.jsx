import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const BackgroundPattern = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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
    <div className="background-pattern">
      {/* Animated gradient mesh */}
      <motion.div
        className="gradient-mesh"
        animate={{
          background: `
            radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(99, 102, 241, 0.1) 0%, transparent 50%),
            radial-gradient(circle at ${100 - mousePosition.x}% ${100 - mousePosition.y}%, rgba(139, 92, 246, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 20% 80%, rgba(236, 72, 153, 0.05) 0%, transparent 50%)
          `,
        }}
        transition={{ duration: 0.3 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -2,
        }}
      />

      {/* CSS Pattern - Dots */}
      <div
        className="dot-pattern"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.3,
          backgroundImage: `
            radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)
          `,
          backgroundSize: '40px 40px',
          zIndex: -1,
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="floating-orb orb-1"
        animate={{
          x: [0, 100, 0],
          y: [0, -100, 0],
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'fixed',
          top: '20%',
          left: '10%',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
          zIndex: -1,
        }}
      />

      <motion.div
        className="floating-orb orb-2"
        animate={{
          x: [0, -80, 0],
          y: [0, 120, 0],
          scale: [1, 0.8, 1],
          rotate: [0, -180, -360],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'fixed',
          top: '60%',
          right: '15%',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(30px)',
          zIndex: -1,
        }}
      />

      <motion.div
        className="floating-orb orb-3"
        animate={{
          x: [0, 60, 0],
          y: [0, -80, 0],
          scale: [1, 1.1, 1],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: 'fixed',
          bottom: '20%',
          left: '50%',
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(25px)',
          zIndex: -1,
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="grid-pattern"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.02,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          zIndex: -1,
        }}
      />
    </div>
  );
};

export default BackgroundPattern;