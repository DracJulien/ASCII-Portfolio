import { Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <pre className="footer-ascii">{`
╔══════════════════════════════════════╗
║  Built with ♥ · React + Vite + ASCII ║
╚══════════════════════════════════════╝`}</pre>

        <div className="footer-links">
          <a
            className="footer-link"
            href="https://github.com/Dracjulien"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={16} /> GitHub
          </a>
          <a
            className="footer-link"
            href="https://linkedin.com/in/julien-drac"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={16} /> LinkedIn
          </a>
          <a className="footer-link" href="mailto:juliendrac@pm.me">
            <Mail size={16} /> Email
          </a>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Julien Drac — Source on{" "}
          <a href="https://github.com/Dracjulien/ascii-portfolio">GitHub</a>
        </p>
      </div>
    </footer>
  )
}
