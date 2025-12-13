import { Github, Linkedin, Mail, Terminal } from "lucide-react"

export default function Footer() {
    const year = new Date().getFullYear()

    return (
        <footer className="footer-root">
            <div className="footer-content">
                {/* Left: Copyright */}
                <div className="footer-section">
                    <Terminal size={14} className="text-muted" />
                    <span>© {year} Julien Drac</span>
                </div>

                {/* Center: System Status */}
                <div className="footer-section status">
                    <span className="status-dot"></span>
                    <span>SYSTEM ONLINE</span>
                </div>

                {/* Right: Socials */}
                <div className="footer-section">
                    <a
                        href="https://github.com/Dracjulien"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                        aria-label="GitHub"
                    >
                        <Github size={16} />
                    </a>
                    <a
                        href="https://linkedin.com/in/julien-drac"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="footer-link"
                        aria-label="LinkedIn"
                    >
                        <Linkedin size={16} />
                    </a>
                    <a href="mailto:julien@seagle.io" className="footer-link" aria-label="Email">
                        <Mail size={16} />
                    </a>
                </div>
            </div>
        </footer>
    )
}
