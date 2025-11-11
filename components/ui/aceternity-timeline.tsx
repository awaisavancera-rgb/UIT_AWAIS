import React from "react";
import { motion, useInView, useAnimation } from "framer-motion";

export type TimelineItem = {
  year: string;
  content: string;
};

interface AceternityTimelineProps {
  items: TimelineItem[];
}

// Enhanced timeline with Framer Motion animations
// - Horizontal scroll with snap
// - Hide scrollbar
// - When hovered, mouse wheel moves to next/prev item
// - Beautiful entrance animations and hover effects
export default function AceternityTimeline({ items }: AceternityTimelineProps) {
  const listRef = React.useRef<HTMLOListElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const hoverRef = React.useRef(false)
  const lastWheelRef = React.useRef(0)
  const draggingRef = React.useRef(false)
  const startRef = React.useRef<{ x: number; left: number } | null>(null)

  const isInView = useInView(containerRef, { once: true, margin: "-100px" })
  const controls = useAnimation()

  React.useEffect(() => {
    if (isInView) {
      controls.start("visible")
    }
  }, [isInView, controls])

  const onWheel = (e: React.WheelEvent) => {
    if (!hoverRef.current) return
    const list = listRef.current
    if (!list) return
    const now = Date.now()
    if (now - lastWheelRef.current < 250) return

    const children = Array.from(list.children) as HTMLElement[]
    if (children.length === 0) return
    const scrollLeft = list.scrollLeft

    // find current index by closest offsetLeft
    let current = 0
    for (let i = 0; i < children.length; i++) {
      if (children[i].offsetLeft - 10 <= scrollLeft) current = i
      else break
    }

    const atStart = scrollLeft <= 2
    const atEnd = scrollLeft >= list.scrollWidth - list.clientWidth - 2

    const dir = e.deltaY > 0 ? 1 : -1
    const next = Math.min(Math.max(current + dir, 0), children.length - 1)

    // If we can't advance further, allow page to scroll
    if ((dir < 0 && (atStart || next === current)) || (dir > 0 && (atEnd || next === current))) {
      return
    }

    // We can advance inside timeline -> prevent page scroll
    e.preventDefault()
    const targetLeft = children[next].offsetLeft
    list.scrollTo({ left: targetLeft, behavior: "smooth" })
    lastWheelRef.current = now
  }

  // Drag handlers (desktop)
  const onPointerDown = (e: React.PointerEvent) => {
    const list = listRef.current
    if (!list) return
    draggingRef.current = true
    startRef.current = { x: e.clientX, left: list.scrollLeft }
    list.setPointerCapture?.(e.pointerId)
    list.style.cursor = 'grabbing'
    list.style.userSelect = 'none'
  }
  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return
    const list = listRef.current
    if (!list || !startRef.current) return
    const dx = e.clientX - startRef.current.x
    list.scrollLeft = startRef.current.left - dx
  }
  const endDrag = (e?: React.PointerEvent) => {
    const list = listRef.current
    draggingRef.current = false
    startRef.current = null
    if (list) {
      if (e) list.releasePointerCapture?.(e.pointerId)
      list.style.cursor = ''
      list.style.userSelect = ''
    }
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const trackVariants = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 1.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.4,
        delay: 0.3,
      },
    },
  }

  return (
    <motion.div
      ref={containerRef}
      className="relative timeline-container py-8"
      onWheel={onWheel}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
    >
      {/* Central horizontal timeline line */}
      <motion.div
        className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-primary via-primary to-primary transform -translate-y-1/2 z-10"
        variants={trackVariants}
      />

      <motion.ol
        ref={listRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="relative flex gap-8 md:gap-12 overflow-x-auto pb-8 pt-8 scroll-smooth snap-x snap-mandatory hide-scrollbar timeline-scroll"
        style={{
          paddingTop: '120px',
          paddingBottom: '120px',
          overflowY: 'visible'
        }}
      >
        {items.map((item, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.li
              key={idx}
              className="relative snap-start min-w-[320px] md:min-w-[380px] timeline-item flex flex-col items-center"
              variants={itemVariants}
            >
              {/* Timeline dot on the center line */}
              <motion.div
                className={`absolute left-1/2 transform -translate-x-1/2 z-20 ${isEven ? 'top-1/2 -translate-y-1/2' : 'top-1/2 -translate-y-1/2'
                  }`}
                variants={dotVariants}
              >
                <div className="relative h-4 w-4 rounded-full bg-primary ring-4 ring-background shadow-lg">
                  {/* Pulsing ring effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-primary/40"
                    animate={{
                      scale: [1, 2, 1],
                      opacity: [0.6, 0, 0.6],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: idx * 0.3,
                    }}
                  />
                </div>
              </motion.div>

              {/* Card positioned above or below the line */}
              <motion.div
                className={`relative w-full ${isEven ? 'order-1 mb-16' : 'order-2 mt-16'
                  }`}
                style={{
                  marginTop: isEven ? '0' : '60px',
                  marginBottom: isEven ? '60px' : '0',
                }}
              >
                {/* Arrow connector pointing to center line */}
                <div
                  className={`absolute left-1/2 transform -translate-x-1/2 z-10 ${isEven
                      ? 'bottom-0 translate-y-full'
                      : 'top-0 -translate-y-full'
                    }`}
                >
                  <div
                    className={`w-0 h-0 ${isEven
                        ? 'border-l-[12px] border-r-[12px] border-t-[16px] border-l-transparent border-r-transparent border-t-background'
                        : 'border-l-[12px] border-r-[12px] border-b-[16px] border-l-transparent border-r-transparent border-b-background'
                      }`}
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
                    }}
                  />
                </div>

                {/* Timeline card */}
                <motion.div
                  className="bg-background border rounded-xl shadow-md relative overflow-hidden group timeline-card"
                  whileHover={{
                    y: isEven ? -4 : 4,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  {/* Subtle hover overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />

                  <div className="p-5 md:p-6 relative z-10">
                    <motion.div
                      className="text-primary text-xl font-semibold mb-3 flex items-center justify-center gap-2"
                      initial={{ opacity: 0, y: isEven ? 20 : -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 + 0.3, duration: 0.5 }}
                    >
                      <span className="bg-primary/10 px-3 py-1 rounded-full text-primary font-bold">
                        {item.year}
                      </span>
                    </motion.div>

                    <motion.p
                      className="text-muted-foreground text-sm leading-relaxed text-center"
                      initial={{ opacity: 0, y: isEven ? 20 : -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 + 0.5, duration: 0.5 }}
                    >
                      {item.content}
                    </motion.p>
                  </div>

                  {/* Subtle border highlight on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl border border-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                </motion.div>
              </motion.div>
            </motion.li>
          );
        })}
      </motion.ol>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground/60 flex items-center gap-2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="w-1 h-1 bg-primary rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <span>Scroll to explore timeline</span>
      </motion.div>
    </motion.div>
  );
}
