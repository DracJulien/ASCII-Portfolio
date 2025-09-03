import { Routes, Route, NavLink, useNavigate } from 'react-router-dom'
import { Sun, Moon, Printer, Mail } from 'lucide-react'
import Home     from '@/pages/Home.jsx'
import Projects from '@/pages/Projects.jsx'
import CV       from '@/pages/CV.jsx'
import Contact  from '@/pages/Contact.jsx'
import Footer   from '@/components/Footer.jsx'
import useTheme from '@/hooks/useTheme.js'

export default function App(){
  const { theme, toggleTheme } = useTheme()
  const nav = useNavigate()

  return (
    <div className="min-h-screen bg-[radial-gradient(1200px_600px_at_80%_-10%,rgba(122,162,247,.08),transparent)] bg-bg text-white font-mono">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-black/30 border-b border-dashed border-white/10">
        <nav className="max-w-5xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
          <div className="text-accent2 font-bold tracking-wide">&gt;&gt; JULIEN DRAC</div>
          <div className="flex items-center gap-2 flex-wrap">
            <NavLink className="px-3 py-1 rounded-lg border border-dashed border-white/20 hover:border-accent/80" to="/">About</NavLink>
            <NavLink className="px-3 py-1 rounded-lg border border-dashed border-white/20 hover:border-accent/80" to="/projects">Projects</NavLink>
            <NavLink className="px-3 py-1 rounded-lg border border-dashed border-white/20 hover:border-accent/80" to="/cv">CV</NavLink>
            <NavLink className="px-3 py-1 rounded-lg border border-dashed border-white/20 hover:border-accent/80" to="/contact">Contact</NavLink>
            <button onClick={()=>window.print()} className="px-3 py-1 rounded-lg border border-dashed border-white/20 hover:border-accent/80 flex items-center gap-1"><Printer size={16}/>CV</button>
            <button onClick={toggleTheme} className="px-3 py-1 rounded-lg border border-dashed border-white/20 hover:border-accent/80 flex items-center gap-1">
              {theme==='light' ? <Moon size={16}/> : <Sun size={16}/>}
              {theme==='light' ? 'Dark' : 'Light'}
            </button>
          </div>
        </nav>
      </header>

      <main className="max-w-5xl mx-auto px-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/projects" element={<Projects/>} />
          <Route path="/cv" element={<CV/>} />
          <Route path="/contact" element={<Contact/>} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
