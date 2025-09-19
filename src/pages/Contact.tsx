import { useState } from 'react'

export default function Contact(){
  const [status, setStatus] = useState('')

  async function onSubmit(e){
    e.preventDefault()
    setStatus('Sending…')
    const form = e.currentTarget
    const data = new FormData(form)
    try{
      const res = await fetch(form.action, { method: 'POST', body: data, headers: { 'Accept':'application/json' } })
      if(res.ok){ setStatus('Thanks! I will reply quickly.'); form.reset() }
      else setStatus('Oops, something went wrong.')
    }catch{
      setStatus('Network error.')
    }
  }

  return (
    <section className="py-10">
      <h2 className="text-xl font-bold mb-3">Contact</h2>
      <div className="dashed rounded-xl p-4">
        <p>Use the form below (Formspree) or email me directly.</p>
        <form id="contactForm" method="POST" action="https://formspree.io/f/yourFormID" onSubmit={onSubmit} className="grid gap-3 mt-3">
          <label> Name<br/>
            <input name="name" required placeholder="Your name" className="w-full px-3 py-2 rounded-lg bg-transparent border border-dashed"/>
          </label>
          <label> Email<br/>
            <input type="email" name="email" required placeholder="you@mail.com" className="w-full px-3 py-2 rounded-lg bg-transparent border border-dashed"/>
          </label>
          <label> Message<br/>
            <textarea name="message" required rows="5" placeholder="Tell me more…" className="w-full px-3 py-2 rounded-lg bg-transparent border border-dashed"></textarea>
          </label>
          <input type="text" name="_gotcha" style={{display:'none'}} tabIndex={-1} autoComplete="off" />
          <div className="flex items-center gap-3 flex-wrap">
            <button className="px-3 py-2 border border-dashed rounded-lg" type="submit">Send</button>
            <span className="text-sm">{status}</span>
            <span className="px-2 py-1 rounded bg-white/10 text-sm">julien.dev@example.com</span>
            <a className="px-3 py-2 border border-dashed rounded-lg" href="mailto:julien.dev@example.com">Open Mail</a>
          </div>
        </form>
      </div>
    </section>
  )
}
