'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [hovered, setHovered] = useState(false);
  const [isDragCursor, setIsDragCursor] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 30, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const addHoverListeners = () => {
      const handleMouseOver = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const dragTarget = target.closest('.drag-gallery');
        
        if (dragTarget) {
          setIsDragCursor(true);
          setHovered(false);
          return;
        } else {
          setIsDragCursor(false);
        }

        if (
          target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('.interactive-card') ||
          target.classList.contains('interactive') ||
          target.getAttribute('data-cursor') === 'pointer'
        ) {
          setHovered(true);
        } else {
          setHovered(false);
        }
      };

      document.addEventListener('mouseover', handleMouseOver);
      return () => {
        document.removeEventListener('mouseover', handleMouseOver);
      };
    };

    window.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    const removeHoverListeners = addHoverListeners();

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      removeHoverListeners();
    };
  }, [cursorX, cursorY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer follow circle */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-violet-500 pointer-events-none z-50 mix-blend-difference hidden md:flex items-center justify-center text-[8px] font-mono font-black tracking-wider text-violet-400"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isDragCursor ? 2.5 : (hovered ? 1.8 : 1),
          backgroundColor: isDragCursor ? 'rgba(139, 92, 246, 0.25)' : (hovered ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0)'),
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
      >
        {isDragCursor && "DRAG"}
      </motion.div>
      {/* Inner precise dot */}
      <motion.div
        className="fixed top-2.5 left-2.5 w-3 h-3 rounded-full bg-violet-400 pointer-events-none z-50 mix-blend-difference hidden md:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          scale: isDragCursor ? 0 : (hovered ? 0.3 : 1),
        }}
        transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      />
    </>
  );
}
