import { PauseIcon, PlayIcon, PowerIcon, RestartIcon, StopIcon } from './Icons'

export function ControlPanel({ poweredOn, playing, file, activeModule, progress, status, onPower, onPlayPause, onStop, onRestart }) {
  return (
    <section className="control-panel">
      <div className="device-head">
        <div className="brand"><span>UNIVI</span>BRAÇÃO</div>
        <div className={`system-pill ${poweredOn ? 'on' : ''}`}><span /> {poweredOn ? 'SISTEMA ON' : 'SISTEMA OFF'}</div>
      </div>

      <div className="device-controls">
        <button className={`device-btn power ${poweredOn ? 'on' : ''}`} type="button" onClick={onPower} title="Ligar/desligar">
          <PowerIcon />
          <small>POWER</small>
        </button>
        <button className={`device-btn primary ${playing ? 'playing' : ''}`} type="button" onClick={onPlayPause} disabled={!poweredOn} title={playing ? 'Pausar' : 'Play'}>
          {playing ? <PauseIcon /> : <PlayIcon />}
          <small>{playing ? 'PAUSE' : 'PLAY'}</small>
        </button>
        <button className="device-btn" type="button" onClick={onStop} disabled={!poweredOn || !file} title="Parar">
          <StopIcon />
          <small>STOP</small>
        </button>
        <button className="device-btn" type="button" onClick={onRestart} disabled={!poweredOn || !file} title="Reiniciar">
          <RestartIcon />
          <small>REINICIAR</small>
        </button>
      </div>

      <div className="status-grid">
        <div><span>ESTADO</span><strong>{status}</strong></div>
        <div><span>ÁUDIO</span><strong>{file ? 'CARREGADO' : 'NÃO CARREGADO'}</strong></div>
        <div><span>SINCRONIZAÇÃO</span><strong>{poweredOn && file ? 'ATIVA' : 'AGUARDANDO'}</strong></div>
        <div><span>MÓDULO</span><strong>{activeModule >= 0 ? `${activeModule + 1} / 7` : '—'}</strong></div>
      </div>

      <div className="overall-progress">
        <div className="progress-head"><span>PROGRESSO GERAL</span><strong>{Math.round(progress)}%</strong></div>
        <div className="progress-track"><span style={{ width: `${progress}%` }} /></div>
      </div>
    </section>
  )
}
