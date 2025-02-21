"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import styles from "../styles/Header.module.css"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault()
    const servicesSection = document.getElementById("servicios")
    if (servicesSection) {
      servicesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  return (
    <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ""}`}>
      <div className={`container ${styles.navbar}`}>
        <Link href="/" className={styles.logo}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ssi-removebg-preview-n7ZGRum2zTqarN7XF80GT5TrhDH6tJ.png"
            alt="Logo Subsecretaría de Informática"
            width={120}
            height={60}
            className={styles.logoImage}
            priority
          />
        </Link>
        <button className={styles.menuButton} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          <Menu size={24} />
        </button>
        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ""}`}>
          <Link href="/">Inicio</Link>
          <a href="#servicios" onClick={scrollToServices}>
            Servicios
          </a>
          <Link href="#contacto">Contacto</Link>
          <Link href="/sorteo" className={styles.specialLink}>
            Sorteo
          </Link>
        </nav>
      </div>
    </header>
  )
}

