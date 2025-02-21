import Header from "../components/Header"
import Hero from "../components/Hero"
import Services from "../components/Services"
import Footer from "../components/Footer"
import ParticleBackground from "../components/ParticleBackground"
import "../styles/globals.css"

export default function Home() {
  return (
    <main>
      <ParticleBackground />
      <Header />
      <Hero />
      <Services />
      <Footer />
    </main>
  )
}

