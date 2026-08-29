import { MusicIcon, PlayIcon, PauseIcon, SpeakerIcon, TrashIcon, UploadIcon } from './Icons'

function formatTime(value) {
  if (!Number.isFinite(value)) return '00:00'
  const total = Math.max(0, Math.floor(value))
  const minutes = Math.floor(total / 60)
  const seconds = total % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

export function AudioPlayer({ file, duration, currentTime, volume, setVolume, playing, audioReady, onChooseFile, onRemove, onPlayPause, onSeek, fileInputRef }) {
  const progress = duration ? currentTime / duration * 100 : 0

  return (
    <section className="audio-card">
      <div className="audio-head">
        <div className="audio-heading">
          <div className="audio-icon"><SpeakerIcon /></div>
          <div>
            <div className="eyebrow">ÁUDIO EMBUTIDO</div>
            <h3>MÚSICA + NARRAÇÃO</h3>
            <p>SINCRONIZADO COM A LUZ</p>
          </div>
        </div>
        <button className="tiny-action" type="button" onClick={() => fileInputRef.current?.click()} title={file ? 'Trocar áudio' : 'Adicionar áudio'}>
          <UploadIcon />
        </button>
      </div>

      <input
        ref={fileInputRef}
        className="hidden-input"
        type="file"
        accept="audio/*,.mp3,.wav,.ogg,.opus,.m4a,.aac"
        onChange={(event) => {
          onChooseFile(event.target.files?.[0])
          event.target.value = ''
        }}
      />

      {!file ? (
        <button className="upload-zone" type="button" onClick={() => fileInputRef.current?.click()}>
          <UploadIcon />
          <strong>+ ADICIONAR ÁUDIO</strong>
          <span>MP3 · WAV · OGG · OPUS</span>
        </button>
      ) : (
        <>
          <div className="audio-file">
            <div className="file-main">
              <div className="file-icon"><MusicIcon /></div>
              <div className="file-copy">
                <strong title={file.name}>{file.name}</strong>
                <span>{audioReady ? `${formatTime(duration)} · áudio local` : 'CARREGANDO ÁUDIO…'}</span>
              </div>
            </div>
            <button className="icon-button subtle" type="button" onClick={onRemove} title="Remover áudio"><TrashIcon /></button>
          </div>

          <div className="player-controls">
            <button className={`play-circle ${playing ? 'playing' : ''} ${!audioReady ? 'loading' : ''}`} type="button" onClick={onPlayPause} disabled={!audioReady} title={!audioReady ? 'Aguardando o áudio carregar' : playing ? 'Pausar' : 'Reproduzir'}>
              {playing ? <PauseIcon /> : <PlayIcon />}
            </button>
            <div className="timeline-wrap">
              <input aria-label="Progresso do áudio" type="range" min="0" max="100" step="0.1" value={progress} disabled={!audioReady} onChange={(event) => onSeek(Number(event.target.value))} style={{ '--progress': `${progress}%` }} />
              <div className="time-row"><span>{formatTime(currentTime)}</span><span>{formatTime(duration)}</span></div>
            </div>
            <div className="volume-wrap">
              <VolumeIconSmall />
              <input aria-label="Volume" type="range" min="0" max="1" step="0.01" value={volume} onChange={(event) => setVolume(Number(event.target.value))} style={{ '--progress': `${volume * 100}%` }} />
            </div>
          </div>
        </>
      )}
    </section>
  )
}

function VolumeIconSmall() {
  return <span className="volume-small"><SpeakerIcon /></span>
}
