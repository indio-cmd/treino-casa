export function SystemStatus({ poweredOn, playing, file, activeModule, manualMode }) {
  return (
    <section className="status-strip">
      <div className="status-heading">
        <span className="eyebrow">MONITORAMENTO</span>
        <strong>ESTADO DA VIVÊNCIA</strong>
      </div>
      <div className="status-item"><i className={poweredOn ? 'ok' : ''} /><span>SISTEMA</span><strong>{poweredOn ? 'LIGADO' : 'DESLIGADO'}</strong></div>
      <div className="status-item"><i className={file ? 'ok' : ''} /><span>ÁUDIO</span><strong>{file ? 'PRONTO' : 'AGUARDANDO'}</strong></div>
      <div className="status-item"><i className={playing ? 'pulse' : ''} /><span>REPRODUÇÃO</span><strong>{playing ? 'TOCANDO' : 'PARADO'}</strong></div>
      <div className="status-item"><i className={activeModule >= 0 ? 'ok' : ''} /><span>LUZ</span><strong>{activeModule >= 0 ? `MÓD. ${activeModule + 1}` : '—'}</strong></div>
      <div className="status-item"><i className={manualMode ? 'manual' : ''} /><span>CONTROLE</span><strong>{manualMode ? 'MANUAL' : 'SINCRONIZADO'}</strong></div>
    </section>
  )
}
