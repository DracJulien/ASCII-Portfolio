export default function VersionBadge(){

	const ver  = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : 'dev'
	const sha  = typeof __GIT_SHA__     !== 'undefined' ? __GIT_SHA__     : 'local'
	const time = typeof __BUILD_TIME__  !== 'undefined' ? __BUILD_TIME__  : ''

	return (
		<span
			title={`build ${time}`}
			className="inline-flex items-center gap-1 rounded-lg border border-dashed px-2 py-0.5 text-xs"
			style={{ background:'var(--surface-bg)', borderColor:'var(--panel-border-color)' }}
		>
			v{ver} · {sha}
		</span>
	)
}