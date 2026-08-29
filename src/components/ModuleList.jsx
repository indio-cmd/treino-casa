import { ModulePreview } from './ModulePreview'
import { MODULES } from '../data/modules'
import { UploadIcon } from './Icons'

function stateLabel(index, activeModule, poweredOn) {
  if (poweredOn && index === activeModule) return 'ATIVO'
  if (poweredOn && index < activeModule) return 'CONCLUÍDO'
  return 'DISPONÍVEL'
}

export function ModuleList({ activeModule, selectedModule, poweredOn, segments, onSelectModule, onTestModule, onAdjustEnd, fileInputRef }) {
  return (
    <section className="modules-panel">
      <div className="section-title">
        <div>
          <span>PROGRESSÃO DA LUZ</span>
          <strong>DURANTE A VIVÊNCIA</strong>
        </div>
        <div className="module-counter">07</div>
      </div>

      <div className="module-list">
        {MODULES.map((module, index) => {
          const active = activeModule === index
          const selected = selectedModule === index
          const segment = segments[index]
          return (
            <button
              key={module.id}
              className={`module-card ${active ? 'active' : ''} ${selected ? 'selected' : ''}`}
              type="button"
              onClick={() => onSelectModule(index)}
              style={{ '--module-color': module.color }}
            >
              <ModulePreview moduleIndex={index} active={active} />
              <div className="module-copy">
                <div className="module-topline">
                  <span className="module-number">{index + 1}º MÓDULO</span>
                  <span className={`module-state ${active ? 'live' : ''}`}>{stateLabel(index, activeModule, poweredOn)}</span>
                </div>
                <strong>{module.name}</strong>
                <div className="module-bottom">
                  <span className="module-dot" />
                  <span className="module-time">{segment.start.toFixed(1)}% — {segment.end.toFixed(1)}%</span>
                  <span className="test-text">TESTAR</span>
                  <span className="upload-mini" onClick={(event) => { event.stopPropagation(); fileInputRef?.current?.click() }} title="Adicionar ou trocar áudio"><UploadIcon /></span>
                </div>
                <div className="segment-editor" onClick={(event) => event.stopPropagation()}>
                  <input aria-label={`Final do módulo ${index + 1}`} type="range" min={index === 0 ? 1 : segment.start + 1} max={index === 6 ? 100 : 99 - (6 - index)} step="0.1" value={segment.end} onChange={(event) => onAdjustEnd(index, event.target.value)} style={{ '--progress': `${segment.end}%` }} />
                  <button type="button" onClick={() => onTestModule(index)}>TESTAR LUZ</button>
                </div>
              </div>
            </button>
          )
        })}
      </div>
    </section>
  )
}
