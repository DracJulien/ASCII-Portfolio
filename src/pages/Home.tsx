import TerminalPS from '@/components/TerminalPS.jsx'

export default function Home(){
  return (
    <section className="py-12 grid gap-6 md:grid-cols-2">
      <div>
        <p className="text-gray-400 text-sm">PORTFOLIO / FULL‑STACK / ASCII ART</p>
        <h1 className="text-3xl font-extrabold my-2">Julien — Full‑Stack Developer</h1>
        <div className="ascii-box dashed rounded-xl p-3">
┌────────────────────────────────────────────────────┐
│ “I love making systems elegant, reliable,          │
│  and fun to use. From scalable backends to         │
│  refined frontends, I design end-to-end.”          │
└────────────────────────────────────────────────────┘
        </div>
        <p className="text-gray-400 mt-3">Available for freelance missions & ambitious projects. Based in Europe/Paris.</p>
        <div className="flex gap-2 flex-wrap mt-3">
          <a className="px-3 py-2 border border-dashed rounded-lg" href="/projects">View Projects →</a>
          <a className="px-3 py-2 border border-dashed rounded-lg" href="/contact">Contact ✉︎</a>
        </div>
      </div>
      <TerminalPS />
    </section>
  )
}
