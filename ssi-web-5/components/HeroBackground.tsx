useEffect(() => {
  const canvas = canvasRef.current
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  if (!ctx) return // Asegurar que ctx no es null antes de continuar

  const dpr = window.devicePixelRatio || 1
  const rect = canvas.getBoundingClientRect()

  canvas.width = rect.width * dpr
  canvas.height = rect.height * dpr
  ctx.scale(dpr, dpr) // Aquí ya sabemos que ctx no es null

  canvas.style.width = `${rect.width}px`
  canvas.style.height = `${rect.height}px`

  const particleCount = 80
  const particles: Particle[] = []
  const connectionDistance = 120
  const particleSpeed = 0.15

  // Crear partículas
  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * rect.width,
      y: Math.random() * rect.height,
      dx: (Math.random() - 0.5) * particleSpeed,
      dy: (Math.random() - 0.5) * particleSpeed,
      size: Math.random() * 1.5 + 0.5,
    })
  }

  function draw() {
    if (!ctx) return // Validación extra por seguridad
    ctx.clearRect(0, 0, rect.width, rect.height)

    ctx.fillStyle = "rgba(20, 66, 114, 0.2)"
    ctx.lineWidth = 0.5

    particles.forEach((particle, i) => {
      particle.x += particle.dx
      particle.y += particle.dy

      if (particle.x < 0 || particle.x > rect.width) particle.dx *= -1
      if (particle.y < 0 || particle.y > rect.height) particle.dy *= -1

      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[j].x - particle.x
        const dy = particles[j].y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          ctx.beginPath()
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particles[j].x, particles[j].y)
          const opacity = (1 - distance / connectionDistance) * 0.15
          ctx.strokeStyle = `rgba(20, 66, 114, ${opacity})`
          ctx.stroke()
        }
      }
    })

    requestAnimationFrame(draw)
  }

  draw()

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


