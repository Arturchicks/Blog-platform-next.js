export type Mode = "system" | "light" | "dark"

export type Toggle = {
  mode?: Mode | undefined
  setMode?: (mode: Mode | null) => void
}
