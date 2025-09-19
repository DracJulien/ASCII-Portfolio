export default function AsciiDivider({ label = "" }) {

	return (
		<pre aria-hidden="true" className="ascii-divider">
	┌──────────────────────────────────────────────────────────┐
	│ {label.padEnd(52, ' ')} │
	└──────────────────────────────────────────────────────────┘
		</pre>
	)
}
