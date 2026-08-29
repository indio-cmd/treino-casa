import { useState } from 'react'
import { AudioPlayer } from './components/AudioPlayer'
import { ControlPanel } from './components/ControlPanel'
import { DNA } from './components/DNA'
import { ModuleList } from './components/ModuleList'
import { SystemStatus } from './components/SystemStatus'
import { useExperience } from './hooks/useExperience'
import './App.css'

export default function App() {
  const experience = useExperience()
  const [autoRotate, setAutoRotate] = useState(true)
  const [rotationSpeed, setRotationSpeed] = useState(0.18)

  const activeModule = experience.activeModule

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <div className="top-kicker">INSTALAÇÃO AUDIOVISUAL · PAINEL DE CONTROLE</div>
          <h1>UNIVIBRAÇÃO</h1>
        </div>
        <div className="live-chip"><span /> VIVÊNCIA DIGITAL</div>
      </header>

      <section className="main-grid">
        <div className="left-column">
          <section className="visual-card">
            <div className="visual-header">
              <div>
                <span className="eyebrow">MOLECULA HOLOGRÁFICA</span>
                <strong>DNA 3D · NÚCLEO LUMINOSO</strong>
              </div>
              <div className="visual-actions">
                <button type="button" className={`toggle-mini ${autoRotate ? 'active' : ''}`} onClick={() => setAutoRotate((value) => !value)}>{autoRotate ? 'AUTO ON' : 'AUTO OFF'}</button>
                <label className="speed-control">VELOCIDADE <input type="range" min="0" max="0.55" step="0.01" value={rotationSpeed} onChange={(event) => setRotationSpeed(Number(event.target.value))} style={{ '--progress': `${rotationSpeed / 0.55 * 100}%` }} /></label>
              </div>
            </div>
            <DNA activeModule={activeModule} poweredOn={experience.poweredOn} autoRotate={autoRotate} rotationSpeed={rotationSpeed} />
          </section>

          <ControlPanel
            poweredOn={experience.poweredOn}
            playing={experience.playing}
            file={experience.file}
            activeModule={activeModule}
            progress={experience.progress}
            status={experience.status}
            onPower={experience.togglePower}
            onPlayPause={experience.playPause}
            onStop={experience.stop}
            onRestart={experience.restart}
          />

          <AudioPlayer
            file={experience.file}
            duration={experience.duration}
            currentTime={experience.currentTime}
            volume={experience.volume}
            setVolume={experience.setVolume}
            playing={experience.playing}
            audioReady={experience.audioReady}
            onChooseFile={experience.chooseAudio}
            onRemove={experience.removeAudio}
            onPlayPause={experience.playPause}
            onSeek={experience.seek}
            fileInputRef={experience.fileInputRef}
          />

          {experience.error && <div className="error-banner">{experience.error}</div>}

          <section className="workflow-card">
            <div className="workflow-title"><span>FUNCIONAMENTO</span><strong>DA EXPERIÊNCIA</strong></div>
            <div className="workflow-steps">
              <div><b>▶</b><span>PRESSIONE<br />PLAY</span></div>
              <i>→</i>
              <div><b>♫</b><span>ÁUDIO ÚNICO<br />INICIA</span></div>
              <i>→</i>
              <div><b>◷</b><span>SINCRONIZAÇÃO<br />DE TEMPO</span></div>
              <i>→</i>
              <div><b>DNA</b><span>A LUZ AVANÇA<br />MÓDULO POR MÓDULO</span></div>
            </div>
          </section>
        </div>

        <aside className="right-column">
          <ModuleList
            activeModule={activeModule}
            selectedModule={experience.selectedModule}
            poweredOn={experience.poweredOn}
            segments={experience.segments}
            onSelectModule={experience.selectModule}
            onTestModule={experience.testModule}
            onAdjustEnd={experience.setModuleEnd}
            fileInputRef={experience.fileInputRef}
          />

          <section className="sync-card">
            <div className="sync-orbit">SYNC</div>
            <div>
              <span className="eyebrow">SINCRONIZAÇÃO</span>
              <strong>ÁUDIO + LUZ</strong>
              <p>Os limites de cada módulo podem ser ajustados nas barras da lista acima. O tempo do áudio é convertido automaticamente em percentuais.</p>
            </div>
          </section>
        </aside>
      </section>

      <SystemStatus
        poweredOn={experience.poweredOn}
        playing={experience.playing}
        file={experience.file}
        activeModule={activeModule}
        manualMode={experience.manualMode}
      />

      <footer className="footer-note">UNIVIBRAÇÃO · CONTROLE LOCAL · SEM UPLOAD DE ÁUDIO</footer>
      <audio ref={experience.audioRef} preload="auto" playsInline />
    </main>
  )
}
