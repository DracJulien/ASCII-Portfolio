export default function Footer(){

  return (
    <footer className="border-t border-dashed border-white/10 mt-8 py-6">
      <div className="max-w-5xl mx-auto px-4">
        <pre
          className="ascii-box"
          style={{ fontSize: 12, lineHeight: 1.1, margin: 0 }}
          aria-hidden="true"
        >
        </pre>

        <p className="muted aligned"  style={{ marginTop: 10 }}>
          .·´¯`·.·• Thanks for visiting •·.·`¯´·. — Handcrafted by ♥ with React + Tailwind.
        </p>
      </div>
    </footer>
  )
}
