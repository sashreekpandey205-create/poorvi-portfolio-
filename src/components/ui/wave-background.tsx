'use client'
import * as React from 'react'
import { useEffect, useRef } from 'react'
import { createNoise2D } from 'simplex-noise'

interface Point {
    x: number
    y: number
    wave: { x: number; y: number }
    cursor: {
        x: number
        y: number
        vx: number
        vy: number
    }
}

interface WavesProps {
    className?: string
    strokeColor?: string
    backgroundColor?: string
    pointerSize?: number
}

export function Waves({
    className = "",
    strokeColor = "#ffffff",
    backgroundColor = "#000000",
    pointerSize = 0.5
}: WavesProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
    const mouseRef = useRef({
        x: -10,
        y: 0,
        lx: 0,
        ly: 0,
        sx: 0,
        sy: 0,
        v: 0,
        vs: 0,
        a: 0,
        set: false,
    })
    const linesRef = useRef<Point[][]>([])
    const noiseRef = useRef<((x: number, y: number) => number) | null>(null)
    const rafRef = useRef<number | null>(null)
    const boundingRef = useRef<DOMRect | null>(null)
    const isVisibleRef = useRef<boolean>(false)
    const isScrollingRef = useRef<boolean>(false)
    const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    const dprRef = useRef<number>(1)

    // Initialization
    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return

        // Get 2D context — enable alpha compositing if background is transparent
        const needsAlpha = backgroundColor === 'transparent'
        ctxRef.current = canvasRef.current.getContext('2d', { alpha: needsAlpha })
        if (!ctxRef.current) return

        // Cache device pixel ratio
        dprRef.current = Math.min(window.devicePixelRatio || 1, 2)

        // Initialize noise generator
        noiseRef.current = createNoise2D()

        // Initialize size and lines
        setSize()
        setLines()

        // Scroll detection — pause animation during active scrolling
        // so the browser can dedicate 100% of frame budget to scroll compositing
        const onScroll = () => {
            isScrollingRef.current = true
            if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
            scrollTimerRef.current = setTimeout(() => {
                isScrollingRef.current = false
                // Resume animation after scroll settles
                if (isVisibleRef.current && !rafRef.current) {
                    rafRef.current = requestAnimationFrame(tick)
                }
            }, 150)
        }
        window.addEventListener('scroll', onScroll, { passive: true })

        // Intersection observer to pause animation when off-screen
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    isVisibleRef.current = true
                    if (!rafRef.current && !isScrollingRef.current) {
                        rafRef.current = requestAnimationFrame(tick)
                    }
                } else {
                    isVisibleRef.current = false
                    if (rafRef.current) {
                        cancelAnimationFrame(rafRef.current)
                        rafRef.current = null
                    }
                }
            },
            { threshold: 0 }
        )

        observer.observe(containerRef.current)

        // Bind events
        window.addEventListener('resize', onResize)
        window.addEventListener('mousemove', onMouseMove)
        containerRef.current.addEventListener('touchmove', onTouchMove, { passive: false })

        // Do NOT start animation here — let IntersectionObserver handle it
        // This prevents burning CPU on mount when section isn't even visible

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
            if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current)
            window.removeEventListener('resize', onResize)
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('scroll', onScroll)
            containerRef.current?.removeEventListener('touchmove', onTouchMove)
            observer.disconnect()
        }
    }, [])

    // Set canvas size with DPR support for crisp lines
    const setSize = () => {
        if (!containerRef.current || !canvasRef.current || !ctxRef.current) return

        boundingRef.current = containerRef.current.getBoundingClientRect()
        const { width, height } = boundingRef.current
        const dpr = dprRef.current

        // Set the canvas buffer size (actual pixels)
        canvasRef.current.width = width * dpr
        canvasRef.current.height = height * dpr

        // Set the canvas CSS size (display size)
        canvasRef.current.style.width = `${width}px`
        canvasRef.current.style.height = `${height}px`

        // Scale context so drawing coordinates match CSS pixels
        ctxRef.current.scale(dpr, dpr)
    }

    // Setup lines — pure data, no DOM elements created
    const setLines = () => {
        if (!boundingRef.current) return

        const { width, height } = boundingRef.current
        linesRef.current = []

        const xGap = 24
        const yGap = 24

        const oWidth = width + 200
        const oHeight = height + 30

        const totalLines = Math.ceil(oWidth / xGap)
        const totalPoints = Math.ceil(oHeight / yGap)

        const xStart = (width - xGap * totalLines) / 2
        const yStart = (height - yGap * totalPoints) / 2

        for (let i = 0; i < totalLines; i++) {
            const points: Point[] = []

            for (let j = 0; j < totalPoints; j++) {
                points.push({
                    x: xStart + xGap * i,
                    y: yStart + yGap * j,
                    wave: { x: 0, y: 0 },
                    cursor: { x: 0, y: 0, vx: 0, vy: 0 },
                })
            }

            linesRef.current.push(points)
        }
    }

    // Resize handler
    const onResize = () => {
        setSize()
        setLines()
    }

    // Mouse handler
    const onMouseMove = (e: MouseEvent) => {
        updateMousePosition(e.clientX, e.clientY)
    }

    // Touch handler
    const onTouchMove = (e: TouchEvent) => {
        e.preventDefault()
        const touch = e.touches[0]
        updateMousePosition(touch.clientX, touch.clientY)
    }

    // Update mouse position — no DOM writes, just data
    const updateMousePosition = (clientX: number, clientY: number) => {
        if (!containerRef.current || !isVisibleRef.current) return

        const rect = containerRef.current.getBoundingClientRect()
        const mouse = mouseRef.current

        mouse.x = clientX - rect.left
        mouse.y = clientY - rect.top

        if (!mouse.set) {
            mouse.sx = mouse.x
            mouse.sy = mouse.y
            mouse.lx = mouse.x
            mouse.ly = mouse.y
            mouse.set = true
        }
    }

    // Move points — wave + cursor physics
    const movePoints = (time: number) => {
        const { current: lines } = linesRef
        const { current: mouse } = mouseRef
        const { current: noise } = noiseRef

        if (!noise) return

        const cosA = Math.cos(mouse.a)
        const sinA = Math.sin(mouse.a)
        const l = Math.max(175, mouse.vs)
        const mouseFactor = l * mouse.vs * 0.00035
        const cosAMouse = cosA * mouseFactor
        const sinAMouse = sinA * mouseFactor

        for (let li = 0, ll = lines.length; li < ll; li++) {
            const points = lines[li]
            for (let pi = 0, pl = points.length; pi < pl; pi++) {
                const p = points[pi]

                // Sweeping, large waves
                const move = noise(
                    (p.x + time * 0.004) * 0.0015,
                    (p.y + time * 0.002) * 0.001
                ) * 12

                p.wave.x = Math.cos(move) * 35
                p.wave.y = Math.sin(move) * 18

                // Mouse effect
                const dx = p.x - mouse.sx
                const dy = p.y - mouse.sy

                // Fast-path bounding box check before calculating square root (Math.hypot)
                if (Math.abs(dx) < l && Math.abs(dy) < l) {
                    const d = Math.hypot(dx, dy)
                    if (d < l) {
                        const s = 1 - d / l
                        const f = Math.cos(d * 0.001) * s

                        p.cursor.vx += cosAMouse * f
                        p.cursor.vy += sinAMouse * f
                    }
                }

                p.cursor.vx += (0 - p.cursor.x) * 0.01
                p.cursor.vy += (0 - p.cursor.y) * 0.01

                p.cursor.vx *= 0.95
                p.cursor.vy *= 0.95

                p.cursor.x += p.cursor.vx
                p.cursor.y += p.cursor.vy

                p.cursor.x = Math.min(50, Math.max(-50, p.cursor.x))
                p.cursor.y = Math.min(50, Math.max(-50, p.cursor.y))
            }
        }
    }

    // Draw lines — direct Canvas2D calls, zero DOM overhead
    const drawLines = () => {
        const ctx = ctxRef.current
        const canvas = canvasRef.current
        if (!ctx || !canvas || !boundingRef.current) return

        const { width, height } = boundingRef.current

        // Clear the entire canvas buffer in one shot
        ctx.clearRect(0, 0, width, height)

        // Fill background only if not transparent
        if (backgroundColor !== 'transparent') {
            ctx.fillStyle = backgroundColor
            ctx.fillRect(0, 0, width, height)
        }

        // Set stroke style once for all lines
        ctx.strokeStyle = strokeColor
        ctx.lineWidth = 1

        const { current: lines } = linesRef

        for (let li = 0, ll = lines.length; li < ll; li++) {
            const points = lines[li]
            if (points.length < 2) continue

            ctx.beginPath()

            // First point — no cursor force
            const p0 = points[0]
            ctx.moveTo(p0.x + p0.wave.x, p0.y + p0.wave.y)

            // Remaining points — with cursor force
            for (let pi = 1, pl = points.length; pi < pl; pi++) {
                const p = points[pi]
                ctx.lineTo(
                    p.x + p.wave.x + p.cursor.x,
                    p.y + p.wave.y + p.cursor.y
                )
            }

            ctx.stroke()
        }
    }

    // Draw the pointer dot directly on canvas
    const drawPointer = () => {
        const ctx = ctxRef.current
        if (!ctx) return

        const mouse = mouseRef.current
        const radius = (pointerSize * 16) / 2 // Convert rem to px approx

        ctx.beginPath()
        ctx.arc(mouse.sx, mouse.sy, radius, 0, Math.PI * 2)
        ctx.fillStyle = strokeColor
        ctx.fill()
    }

    // Animation loop
    const tick = (time: number) => {
        const { current: mouse } = mouseRef

        // Smooth mouse movement
        mouse.sx += (mouse.x - mouse.sx) * 0.1
        mouse.sy += (mouse.y - mouse.sy) * 0.1

        // Mouse velocity
        const dx = mouse.x - mouse.lx
        const dy = mouse.y - mouse.ly
        const d = Math.hypot(dx, dy)

        mouse.v = d
        mouse.vs += (d - mouse.vs) * 0.1
        mouse.vs = Math.min(100, mouse.vs)

        // Previous mouse position
        mouse.lx = mouse.x
        mouse.ly = mouse.y

        // Mouse angle
        mouse.a = Math.atan2(dy, dx)

        // Run physics + draw in one pass
        movePoints(time)
        drawLines()
        drawPointer()

        if (isVisibleRef.current && !isScrollingRef.current) {
            rafRef.current = requestAnimationFrame(tick)
        } else {
            rafRef.current = null
        }
    }

    return (
        <div
            ref={containerRef}
            className={`waves-component relative overflow-hidden ${className}`}
            style={{
                backgroundColor,
                position: 'absolute',
                top: 0,
                left: 0,
                margin: 0,
                padding: 0,
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                contain: 'strict',
                willChange: 'transform',
            }}
        >
            <canvas
                ref={canvasRef}
                className="block w-full h-full"
                style={{ willChange: 'transform' }}
            />
        </div>
    )
}
