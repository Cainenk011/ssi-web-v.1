import { Monitor, Server, Shield, Users } from "lucide-react"
import styles from "../styles/Services.module.css"

const services = [
  {
    icon: <Monitor size={40} />,
    title: "Soporte Técnico",
    description: "Asistencia y mantenimiento de equipos informáticos para toda la comunidad universitaria.",
  },
  {
    icon: <Server size={40} />,
    title: "Infraestructura",
    description: "Gestión y mantenimiento de servidores, redes y sistemas de la universidad.",
  },
  {
    icon: <Shield size={40} />,
    title: "Seguridad",
    description: "Protección de datos y sistemas informáticos institucionales.",
  },
  {
    icon: <Users size={40} />,
    title: "Capacitación",
    description: "Programas de formación en tecnologías de la información para personal y estudiantes.",
  },
]

export default function Services() {
  return (
    <section className={styles.services} id="servicios">
      <div className="container">
        <h2 className={styles.sectionTitle}>Nuestros Servicios</h2>
        <p className={styles.sectionSubtitle}>
          Brindamos soluciones tecnológicas integrales para potenciar la educación
        </p>
        <div className={styles.grid}>
          {services.map((service, index) => (
            <div key={index} className={styles.card}>
              <div className={styles.icon}>{service.icon}</div>
              <h3 className={styles.title}>{service.title}</h3>
              <p className={styles.description}>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

