
declare const __APP_VERSION__: string
declare const __GIT_SHA__: string
declare const __BUILD_TIME__: string

export default function VersionBadge(): JSX.Element {
  const ver  = typeof __APP_VERSION__ !== "undefined" ? __APP_VERSION__ : "dev"
  const sha  = typeof __GIT_SHA__     !== "undefined" ? __GIT_SHA__     : "local"
  const time = typeof __BUILD_TIME__  !== "undefined" ? __BUILD_TIME__  : ""

  return (
    <span
      title={time ? `build ${time}` : undefined}
      className="inline-flex items-center gap-1 rounded-lg border border-dashed px-2 py-0.5 text-xs"
      style={{ background: "var(--surface-bg)", borderColor: "var(--panel-border-color)" }}
    >
      v{ver} · {sha}
    </span>
  )
}
