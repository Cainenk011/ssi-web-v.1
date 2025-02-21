"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import styles from "../styles/Hero.module.css"
import HeroBackground from "./HeroBackground"

export default function Hero() {
  const scrollToServices = () => {
    const servicesSection = document.getElementById("servicios")
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <section className={styles.hero} id="inicio">
      <HeroBackground />
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ssi-removebg-preview-n7ZGRum2zTqarN7XF80GT5TrhDH6tJ.png"
            alt="Logo Subsecretaría de Informática"
            width={150}
            height={150}
            className={styles.logo}
            priority
          />
        </div>
        <h1 className={styles.title}>Subsecretaría de Informática</h1>
        <p className={styles.subtitle}>Innovación tecnológica al servicio de la educación superior</p>
        <button onClick={scrollToServices} className={styles.scrollButton} aria-label="Ir a servicios">
          <span className={styles.scrollText}>Nuestros Servicios</span>
          <div className={styles.arrowContainer}>
            <ChevronDown size={40} strokeWidth={2} />
          </div>
        </button>
      </div>
    </section>
  )
}

