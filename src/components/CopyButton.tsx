import { useState } from "react"
import { Clipboard, ClipboardCheck } from "lucide-react"

type CopyButtonProps = {
    text: string
    label?: string
    className?: string
}

export default function CopyButton({ text, label, className = "btn" }: CopyButtonProps) {
    const [copied, setCopied] = useState(false)

    async function copy() {
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            setTimeout(() => setCopied(false), 1200)
        } catch {
            // ignore
        }
    }

    return (
        <button
            className={className}
            onClick={copy}
            type="button"
            title={`Copy ${text}`}
        >
            {copied ? <ClipboardCheck size={16} style={{ marginRight: label ? 6 : 0 }} /> : <Clipboard size={16} style={{ marginRight: label ? 6 : 0 }} />}
            {label || text}
        </button>
    )
}
