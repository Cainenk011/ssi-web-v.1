import { Facebook, Twitter, Linkedin, Mail } from "lucide-react"
import styles from "../styles/Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.grid}>
          <div className={styles.column}>
            <h3>Contacto</h3>
            <ul className={styles.links}>
              <li>Av. Luis M. de la Fuente S/N, Ciudad Universitaria de la Ciencia y de la Técnica, F5300 La Rioja</li>
              <li>Tel: (380)154-202768</li>
              <li>Email: pcordoba@unlar.edu.ar</li>
            </ul>
          </div>
          <div className={styles.column}>
            <h3>Enlaces Rápidos</h3>
            <ul className={styles.links}>
              <li>
                <a href="#servicios">Servicios</a>
              </li>
              <li>
                <a href="#noticias">Noticias</a>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles.social}>
            <a href="#" aria-label="Facebook">
              <Facebook size={24} />
            </a>
          </div>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} Subsecretaría de Informática. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

