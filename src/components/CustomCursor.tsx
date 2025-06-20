"use client"

import { useState, useEffect } from "react"

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      // Check if cursor is over a clickable element
      const target = e.target as HTMLElement
      const isClickable = !!(
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        window.getComputedStyle(target).cursor === "pointer"
      )

      setIsPointer(isClickable)
    }
    const handleMouseDown = () => setIsClicking(true)
    const handleMouseUp = () => setIsClicking(false)
    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsVisible(false)
      }
    }

    // Set initial visibility
    setIsVisible(true)

    document.addEventListener("mousemove", updatePosition)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)
    document.addEventListener("visibilitychange", handleVisibilityChange)

    return () => {
      document.removeEventListener("mousemove", updatePosition)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          body {
            cursor: none !important;
          }
          a, button, [role="button"], [type="button"], [type="submit"], [type="reset"] {
            cursor: none !important;
          }
        `
      }} />
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        {/* Outer ring */}
        <div
          className={`absolute rounded-full border border-[hsl(var(--primary))] transition-all duration-200 ${
            isPointer ? "w-8 h-8 -translate-x-4 -translate-y-4" : "w-10 h-10 -translate-x-5 -translate-y-5"
          } ${isClicking ? "scale-75 opacity-70" : "scale-100 opacity-100"}`}
        ></div>

        {/* Inner dot */}
        <div
          className={`absolute bg-[hsl(var(--primary))] rounded-full transition-all duration-200 ${
            isPointer ? "w-2 h-2 -translate-x-1 -translate-y-1" : "w-1 h-1 -translate-x-0.5 -translate-y-0.5"
          } ${isClicking ? "scale-150 opacity-70" : "scale-100 opacity-100"}`}
        ></div>
      </div>
    </>
  )
}

export default CustomCursor
