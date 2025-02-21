"use client"

import { useEffect, useRef } from "react"
import styles from "../styles/ParticleBackground.module.css"

interface Particle {
  x: number
  y: number
  dx: number
  dy: number
  size: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Configurar canvas para pantalla retina
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    canvas.style.width = `${rect.width}px`
    canvas.style.height = `${rect.height}px`

    // Configuración de partículas
    const particleCount = 100
    const particles: Particle[] = []
    const connectionDistance = 100
    const particleSpeed = 0.2

    // Crear partículas
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        dx: (Math.random() - 0.5) * particleSpeed,
        dy: (Math.random() - 0.5) * particleSpeed,
        size: Math.random() * 2 + 1,
      })
    }

    // Función para dibujar partículas y conexiones
    function draw() {
      ctx.clearRect(0, 0, rect.width, rect.height)
      ctx.fillStyle = "#0A2647"
      ctx.strokeStyle = "#0A2647"
      ctx.lineWidth = 0.5

      particles.forEach((particle, i) => {
        // Mover partícula
        particle.x += particle.dx
        particle.y += particle.dy

        // Rebotar en los bordes
        if (particle.x < 0 || particle.x > rect.width) particle.dx *= -1
        if (particle.y < 0 || particle.y > rect.height) particle.dy *= -1

        // Dibujar partícula
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Dibujar conexiones
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - particle.x
          const dy = particles[j].y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionDistance) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      })

      requestAnimationFrame(draw)
    }

    // Iniciar animación
    draw()

    // Ajustar tamaño del canvas cuando cambie el tamaño de la ventana
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      ctx.scale(dpr, dpr)
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className={styles.canvas} />
}

