"use client"

import type React from "react"
import { useState, useRef } from "react"
import { X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import styles from "../../styles/Sorteo.module.css"

export default function Sorteo() {
  const [names, setNames] = useState<string[]>([])
  const [newName, setNewName] = useState("")
  const [winners, setWinners] = useState<string[]>([])
  const [isSpinning, setIsSpinning] = useState(false)
  const wheelRef = useRef<HTMLDivElement>(null)

  const MAX_NAMES = 20
  const MAX_WINNERS = 20

  const addName = () => {
    if (newName.trim() && !names.includes(newName.trim()) && names.length < MAX_NAMES) {
      setNames([...names, newName.trim()])
      setNewName("")
    }
  }

  const removeName = (nameToRemove: string) => {
    setNames(names.filter((name) => name !== nameToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addName()
    }
  }

  const shuffleArray = (array: string[]) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  const spinWheel = () => {
    if (names.length < 1) return

    setIsSpinning(true)
    const shuffled = shuffleArray(names)
    const selectedWinners = shuffled.slice(0, Math.min(MAX_WINNERS, names.length))

    // Animación de la ruleta
    if (wheelRef.current) {
      const spins = 5 // Número de vueltas completas
      const degrees = spins * 360 + Math.random() * 360
      wheelRef.current.style.transform = `rotate(${degrees}deg)`
    }

    // Mostrar ganadores después de la animación
    setTimeout(() => {
      setWinners(selectedWinners)
      setIsSpinning(false)
    }, 4000)
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Link href="/" className={styles.logoLink}>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Logo-UNLAR-SOMthil8AMiqD2bv2s1P1VT13qg9OR.png"
            alt="Logo UNLaR"
            width={300}
            height={100}
            className={styles.logo}
            priority
          />
        </Link>
        <h1 className={styles.title}>Sorteo</h1>

        <div className={styles.inputSection}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ingrese un nombre"
            className={styles.input}
            disabled={isSpinning || names.length >= MAX_NAMES}
          />
          <button 
            onClick={addName} 
            className={styles.addButton} 
            disabled={!newName.trim() || isSpinning || names.length >= MAX_NAMES}
          >
            Agregar
          </button>
        </div>

        <div className={styles.namesList}>
          {names.map((name, index) => (
            <div key={index} className={styles.nameTag}>
              {name}
              <button onClick={() => removeName(name)} className={styles.deleteButton} disabled={isSpinning}>
                <X size={16} />
              </button>
            </div>
          ))}
        </div>

        <div className={styles.wheel} ref={wheelRef}>
          {names.slice(0, MAX_NAMES).map((name, index) => (
            <div
              key={index}
              className={styles.wheelSegment}
              style={{
                transform: `rotate(${(360 / Math.min(MAX_NAMES, names.length)) * index}deg)`,
                background: `hsl(${(360 / Math.min(MAX_NAMES, names.length)) * index}, 70%, 50%)`,
              }}
            >
              {name}
            </div>
          ))}
        </div>

        <button onClick={spinWheel} className={styles.spinButton} disabled={names.length < 1 || isSpinning}>
          {isSpinning ? "Sorteando..." : "Sortear"}
        </button>

        {winners.length > 0 && (
          <div className={styles.results}>
            <h3>Ganadores:</h3>
            <div className={styles.resultsList}>
              {winners.map((winner, index) => (
                <div key={index} className={styles.resultItem}>
                  {index + 1}. {winner}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}


