import React, { ReactNode } from "react"

type Props = {
	title?: ReactNode
	action?: ReactNode
	children?: ReactNode
	className?: string
}

export default function Card({
	title,
	action,
	children,
	className = "",
}: Props): JSX.Element {
	return (
		<section
			className={
				`rounded-xl border border-dashed p-5 mb-5` +
				` bg-[var(--surface-bg)] shadow-[var(--panel-shadow)]` +
				` border-[var(--panel-border-color)] ${className}`
			}
		>
			{(title || action) && (
				<header className="mb-3 flex items-center justify-between">
					{title && <h2 className="text-xl font-semibold">{title}</h2>}
					{action}
				</header>
			)}
			{children}
		</section>
	)
}
