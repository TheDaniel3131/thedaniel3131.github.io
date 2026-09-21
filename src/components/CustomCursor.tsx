"use client";

import { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "react-router-dom";

const CustomCursor = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const crosshairRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isMouseDownRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const lastYRef = useRef(0);
  const lastTimeRef = useRef(0);
  const velocityRef = useRef(0);
  const rafRef = useRef<number | null>(null);
  const isPointerRef = useRef(false);
  const isDraggingStateRef = useRef(false);
  const isClickingRef = useRef(false);
  const isScrollbarRef = useRef(false);
  const loadingRef = useRef(true);
  const lastMousePosRef = useRef({ x: -1, y: -1 });

  const location = useLocation();
  const isSpacePage = location.pathname === "/space";
  const isSpacePageRef = useRef(isSpacePage);

  useEffect(() => {
    isSpacePageRef.current = isSpacePage;
  }, [isSpacePage]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches
    ) {
      return;
    }

    const styleEl = document.createElement("style");
    styleEl.textContent = `
    body { cursor: none !important; }
    a, button, [role="button"], [type="button"], [type="submit"], [type="reset"] { cursor: none !important; }
    body.is-dragging * { transition: none !important; }
    body.is-dragging,
    body.is-dragging * { cursor: grabbing !important; }
    body.is-scrollbar-interaction,
    body.is-scrollbar-interaction * { cursor: grab !important; }
    body.is-scrollbar-interaction:active,
    body.is-scrollbar-interaction:active * { cursor: grabbing !important; }
    body.is-scrollbar-interaction [data-custom-cursor] {
      opacity: 0 !important;
      visibility: hidden !important;
    }
    html.is-scrollbar-interaction,
    body.is-scrollbar-interaction { scrollbar-width: auto !important; scrollbar-color: auto !important; }
    html.is-scrollbar-interaction::-webkit-scrollbar { width: auto !important; height: auto !important; }
    html.is-scrollbar-interaction::-webkit-scrollbar-track,
    html.is-scrollbar-interaction::-webkit-scrollbar-thumb { background: initial !important; border-radius: initial !important; }
  `;
    document.head.appendChild(styleEl);

    const observer = new MutationObserver(() => {
      const isLoading = document.body.classList.contains("loading");
      loadingRef.current = isLoading;
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity =
          isLoading || isScrollbarRef.current ? "0" : "1";
        wrapperRef.current.style.visibility = isScrollbarRef.current
          ? "hidden"
          : "visible";
      }
      if (crosshairRef.current) {
        crosshairRef.current.style.opacity =
          isLoading || isScrollbarRef.current ? "0" : "1";
        crosshairRef.current.style.visibility = isScrollbarRef.current
          ? "hidden"
          : "visible";
      }
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    loadingRef.current = document.body.classList.contains("loading");

    const setVisible = (v: boolean) => {
      if (isScrollbarRef.current) return;
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity = v && !loadingRef.current ? "1" : "0";
      }
    };

    const setScrollbarInteraction = (active: boolean) => {
      isScrollbarRef.current = active;
      document.body.classList.toggle("is-scrollbar-interaction", active);
      document.documentElement.classList.toggle(
        "is-scrollbar-interaction",
        active,
      );
      if (wrapperRef.current) {
        wrapperRef.current.style.opacity =
          active || loadingRef.current ? "0" : "1";
        wrapperRef.current.style.visibility = active ? "hidden" : "visible";
      }
      if (crosshairRef.current) {
        crosshairRef.current.style.opacity = active ? "0" : "1";
        crosshairRef.current.style.visibility = active ? "hidden" : "visible";
      }
    };

    const applyOuterClasses = () => {
      const outer = outerRef.current;
      const inner = innerRef.current;
      if (!outer || !inner) return;

      const dragging = isDraggingStateRef.current;
      const pointer = isPointerRef.current;
      const clicking = isClickingRef.current;

      if (dragging) {
        outer.style.width = "36px";
        outer.style.height = "36px";
        outer.style.transform = "translate(-18px, -18px) scale(0.95)";
        outer.style.backgroundColor = "hsl(var(--primary) / 0.1)";
        inner.style.width = "12px";
        inner.style.height = "12px";
        inner.style.transform = "translate(-6px, -6px)";
        inner.style.opacity = "0.9";
      } else if (pointer) {
        outer.style.width = "32px";
        outer.style.height = "32px";
        outer.style.transform = "translate(-16px, -16px) scale(1)";
        outer.style.backgroundColor = "";
        inner.style.width = "8px";
        inner.style.height = "8px";
        inner.style.transform = "translate(-4px, -4px)";
        inner.style.opacity = "1";
      } else {
        outer.style.width = "40px";
        outer.style.height = "40px";
        outer.style.transform = `translate(-20px, -20px) scale(${clicking ? "0.75" : "1"})`;
        outer.style.backgroundColor = "";
        outer.style.opacity = clicking ? "0.7" : "1";
        inner.style.width = "4px";
        inner.style.height = "4px";
        inner.style.transform = "translate(-2px, -2px)";
        inner.style.opacity = clicking ? "0.7" : "1";
      }
    };

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
      lastMousePosRef.current = { x: e.clientX, y: e.clientY };

      const overScrollbar = e.clientX >= document.documentElement.clientWidth;
      if (overScrollbar !== isScrollbarRef.current) {
        setScrollbarInteraction(overScrollbar);
      }
      if (overScrollbar) return;

      if (wrapperRef.current) {
        wrapperRef.current.style.left = `${e.clientX}px`;
        wrapperRef.current.style.top = `${e.clientY}px`;
        if (!loadingRef.current) {
          wrapperRef.current.style.opacity = "1";
        }
      }

      if (crosshairRef.current) {
        crosshairRef.current.style.left = `${e.clientX}px`;
        crosshairRef.current.style.top = `${e.clientY}px`;
      }

      const target = e.target as HTMLElement;
      const isClickable = !!(
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"
      );

      isPointerRef.current = isClickable;

      if (!isSpacePageRef.current) {
        if (isMouseDownRef.current && !isDraggingRef.current) {
          const dx = Math.abs(e.clientX - dragStartRef.current.x);
          const dy = Math.abs(e.clientY - dragStartRef.current.y);
          if (dx > 4 || dy > 4) {
            isDraggingRef.current = true;
            isDraggingStateRef.current = true;
            cancelMomentum();
            document.body.classList.add("is-dragging");
          }
        }

        if (isDraggingRef.current) {
          const now = performance.now();
          const dy = e.clientY - lastYRef.current;
          const dt = now - lastTimeRef.current;
          window.scrollBy(0, -dy);
          if (dt > 0) velocityRef.current = (-dy / dt) * 25;
          lastYRef.current = e.clientY;
          lastTimeRef.current = now;
        }
      }

      applyOuterClasses();
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.clientX >= document.documentElement.clientWidth) {
        setScrollbarInteraction(true);
        return;
      }

      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a")
      )
        return;

      if (!isSpacePageRef.current) e.preventDefault();

      isMouseDownRef.current = true;
      isDraggingRef.current = false;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
      lastYRef.current = e.clientY;
      lastTimeRef.current = performance.now();
      velocityRef.current = 0;
      cancelMomentum();
      isClickingRef.current = true;
      isDraggingStateRef.current = false;
      applyOuterClasses();
    };

    const handleMouseUp = () => {
      isMouseDownRef.current = false;
      setScrollbarInteraction(false);
      document.body.classList.remove("is-dragging");

      if (
        !isSpacePageRef.current &&
        isDraggingRef.current &&
        Math.abs(velocityRef.current) > 0.5
      ) {
        rafRef.current = requestAnimationFrame(runMomentum);
      }

      isDraggingRef.current = false;
      isClickingRef.current = false;
      isDraggingStateRef.current = false;
      applyOuterClasses();
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => {
      setVisible(false);
      cancelMomentum();
    };
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setVisible(false);
        cancelMomentum();
      }
    };
    const handleNativeDragStart = (e: DragEvent) => e.preventDefault();

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
      observer.disconnect();
      document.body.classList.remove("is-dragging");
      document.body.classList.remove("is-scrollbar-interaction");
      document.documentElement.classList.remove("is-scrollbar-interaction");
      document.head.removeChild(styleEl);
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

  if (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: coarse)").matches
  ) {
    return null;
  }

  if (isSpacePage) {
    return createPortal(
      <div
        ref={crosshairRef}
        data-custom-cursor
        className="fixed pointer-events-none z-[9999] opacity-0 invisible transition-opacity duration-300"
        style={{ left: "50%", top: "50%" }}
      >
        <div className="absolute w-4 h-4 -translate-x-2 -translate-y-2">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-white/40" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/40" />
        </div>
      </div>,
      document.body,
    );
  }

  return createPortal(
    <div
      ref={wrapperRef}
      data-custom-cursor
      className="fixed pointer-events-none z-[9999] opacity-0"
      style={{
        left: "0px",
        top: "0px",
        overflow: "visible",
        visibility: "hidden",
      }}
    >
      <div
        ref={outerRef}
        className="absolute rounded-full border border-[hsl(var(--primary))]"
        style={{
          width: "40px",
          height: "40px",
          transform: "translate(-20px, -20px)",
          overflow: "visible",
          transition:
            "width 200ms, height 200ms, opacity 200ms, background-color 200ms",
        }}
      />
      <div
        ref={innerRef}
        className="absolute bg-[hsl(var(--primary))] rounded-full"
        style={{
          width: "4px",
          height: "4px",
          transform: "translate(-2px, -2px)",
          transition: "width 200ms, height 200ms, opacity 200ms",
        }}
      />
    </div>,
    document.body,
  );
};

export default CustomCursor;
