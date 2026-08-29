import { MODULES } from '../data/modules'

export function ModulePreview({ moduleIndex, active }) {
  const module = MODULES[moduleIndex]
  return (
    <div className="module-preview" style={{ '--accent': module.color }} aria-hidden="true">
      <div className="mini-helix">
        <span className="mini-strand a" />
        <span className="mini-strand b" />
        {Array.from({ length: 6 }, (_, index) => <i key={index} style={{ top: `${15 + index * 13}%` }} />)}
        {active && <span className="mini-glow" />}
      </div>
      <div className="mini-base" />
    </div>
  )
}
