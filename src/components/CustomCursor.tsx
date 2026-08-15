"use client";

import { useRef, useState, useEffect } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isOverScrollbar, setIsOverScrollbar] = useState(false);

  const isMouseDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });

  // Drag-to-scroll refs
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPosition({
        x: Math.round(window.innerWidth / 2),
        y: Math.round(window.innerHeight / 2),
      });
    }

    const cancelMomentum = () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };

    const runMomentum = () => {
      velocityRef.current *= 0.96;

      if (Math.abs(velocityRef.current) < 0.5) {
        velocityRef.current = 0;
        rafRef.current = null;
        return;
      }

      window.scrollBy(0, velocityRef.current);
      rafRef.current = requestAnimationFrame(runMomentum);
    };

    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isClickable = !!(
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"
      );

      const isScrollbarArea = e.clientX > window.innerWidth - 20;

      if (isMouseDownRef.current && !isDraggingRef.current) {
        const dx = Math.abs(e.clientX - dragStartRef.current.x);
        const dy = Math.abs(e.clientY - dragStartRef.current.y);
        if (dx > 4 || dy > 4) {
          isDraggingRef.current = true;
          setIsDragging(true);
          cancelMomentum();
          // Freeze all hover:scale transforms while dragging
          document.body.classList.add("is-dragging");
        }
      }

      // Drag-to-scroll: scroll the page as the user drags
      if (isDraggingRef.current) {
        const now = performance.now();
        const dy = e.clientY - lastYRef.current;
        const dt = now - lastTimeRef.current;

        window.scrollBy(0, -dy);

        if (dt > 0) {
          velocityRef.current = (-dy / dt) * 25;
        }

        lastYRef.current = e.clientY;
        lastTimeRef.current = now;
      }

      setIsOverScrollbar(isScrollbarArea);
      setIsPointer(isClickable && !isScrollbarArea);
    };

    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Don't hijack clicks on interactive elements
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      ) {
        return;
      }

      // Prevent browser's native drag on text, images, etc.
      e.preventDefault();

      isMouseDownRef.current = true;
      isDraggingRef.current = false;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      lastYRef.current = e.clientY;
      lastTimeRef.current = performance.now();
      velocityRef.current = 0;
      cancelMomentum();
      setIsClicking(true);
      setIsDragging(false);
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
      document.body.classList.remove("is-dragging");

      // Kick off momentum if there's velocity
      if (isDraggingRef.current && Math.abs(velocityRef.current) > 0.5) {
        rafRef.current = requestAnimationFrame(runMomentum);
      }

      isDraggingRef.current = false;
      setIsClicking(false);
      setIsDragging(false);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => {
      setIsVisible(false);
      cancelMomentum();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false);
        cancelMomentum();
      }
    };

    const handleNativeDragStart = (e: DragEvent) => {
      e.preventDefault();
    };

    setIsVisible(true);

    document.addEventListener("mousemove", updatePosition, true);
    document.addEventListener("mousedown", handleMouseDown, true);
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("dragstart", handleNativeDragStart);
    window.addEventListener("blur", handleMouseUp);

    return () => {
      cancelMomentum();
      document.body.classList.remove("is-dragging");
      document.removeEventListener("mousemove", updatePosition, true);
      document.removeEventListener("mousedown", handleMouseDown, true);
      document.removeEventListener("mouseup", handleMouseUp, true);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("dragstart", handleNativeDragStart);
      window.removeEventListener("blur", handleMouseUp);
    };
  }, []);

  // Don't render on mobile/touch devices
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            body {
              cursor: ${isOverScrollbar ? "default" : "none"} !important;
              ${isClicking ? "user-select: none !important;" : ""}
            }
            a, button, [role="button"], [type="button"], [type="submit"], [type="reset"] {
              cursor: ${isOverScrollbar ? "default" : "none"} !important;
            }
            /* Freeze hover scale transforms while drag-scrolling so
               scale transitions don't corrupt the mousemove dy delta */
            body.is-dragging * {
              transform: none !important;
              transition: none !important;
            }
            ::-webkit-scrollbar {
              cursor: default !important;
            }
            ::-webkit-scrollbar-thumb {
              background: #888;
            }
            ::-webkit-scrollbar-thumb:hover {
              background: #555 !important;
            }
            ::-webkit-scrollbar-track {
              cursor: default !important;
            }
          `,
        }}
      />
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ${
          isVisible && !isOverScrollbar ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {/* Outer ring */}
        <div
          className={`absolute rounded-full border border-[hsl(var(--primary))] transition-all duration-200 ${
            isDragging
              ? "w-9 h-9 -translate-x-[18px] -translate-y-[18px] scale-95 bg-[hsl(var(--primary))]/10"
              : isPointer
                ? "w-8 h-8 -translate-x-4 -translate-y-4"
                : "w-10 h-10 -translate-x-5 -translate-y-5"
          } ${isClicking && !isDragging ? "scale-75 opacity-70" : "scale-100 opacity-100"}`}
        ></div>

        {/* Inner dot */}
        <div
          className={`absolute bg-[hsl(var(--primary))] rounded-full transition-all duration-200 ${
            isDragging
              ? "w-3 h-3 -translate-x-1.5 -translate-y-1.5 opacity-90"
              : isPointer
                ? "w-2 h-2 -translate-x-1 -translate-y-1"
                : "w-1 h-1 -translate-x-0.5 -translate-y-0.5"
          } ${isClicking && !isDragging ? "scale-150 opacity-70" : "scale-100 opacity-100"}`}
        ></div>
      </div>
    </>
  );
};

export default CustomCursor;