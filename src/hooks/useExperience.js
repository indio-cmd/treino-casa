import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { DEFAULT_SEGMENTS, MODULES } from '../data/modules'

const clamp = (value, min, max) => Math.min(max, Math.max(min, value))

export function useExperience() {
  const audioRef = useRef(null)
  const objectUrlRef = useRef(null)
  const fileInputRef = useRef(null)
  const [poweredOn, setPoweredOn] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [file, setFile] = useState(null)
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.85)
  const [selectedModule, setSelectedModule] = useState(0)
  const [activeModule, setActiveModule] = useState(-1)
  const [manualMode, setManualMode] = useState(false)
  const [segments, setSegments] = useState(DEFAULT_SEGMENTS)
  const [error, setError] = useState('')
  const [audioReady, setAudioReady] = useState(false)

  const progress = useMemo(() => duration > 0 ? currentTime / duration * 100 : 0, [currentTime, duration])

  const status = useMemo(() => {
    if (!poweredOn) return 'Sistema desligado'
    if (!file) return 'Aguardando áudio'
    if (playing) return 'Vivência em andamento'
    return 'Pronto para iniciar'
  }, [poweredOn, file, playing])

  const getModuleFromProgress = useCallback((percentage) => {
    const hit = segments.findIndex((segment, index) => {
      if (index === segments.length - 1) return percentage >= segment.start && percentage <= segment.end
      return percentage >= segment.start && percentage < segment.end
    })
    return hit === -1 ? MODULES.length - 1 : hit
  }, [segments])

  const normalizeSegments = useCallback((next) => {
    const result = [...next]
    result[0] = { start: 0, end: clamp(result[0]?.end ?? 14.28, 1, 99) }
    for (let i = 1; i < result.length; i += 1) {
      const start = result[i - 1].end
      const rawEnd = result[i]?.end ?? start + 14
      const end = i === result.length - 1 ? 100 : clamp(rawEnd, start + 1, 99 - (result.length - 1 - i))
      result[i] = { start, end }
    }
    result[result.length - 1].end = 100
    return result
  }, [])

  const onTimeUpdate = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    setCurrentTime(audio.currentTime)
    if (!manualMode && duration > 0) {
      setActiveModule(getModuleFromProgress(audio.currentTime / duration * 100))
    }
  }, [duration, getModuleFromProgress, manualMode])

  const readAudioDuration = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return false
    const nextDuration = Number(audio.duration)
    if (!Number.isFinite(nextDuration) || nextDuration <= 0) return false
    setDuration(nextDuration)
    setCurrentTime(Number.isFinite(audio.currentTime) ? audio.currentTime : 0)
    setAudioReady(true)
    setError('')
    return true
  }, [])

  const onLoadedMetadata = useCallback(() => {
    readAudioDuration()
  }, [readAudioDuration])

  const onDurationChange = useCallback(() => {
    readAudioDuration()
  }, [readAudioDuration])

  const onCanPlay = useCallback(() => {
    readAudioDuration()
  }, [readAudioDuration])

  const onAudioError = useCallback(() => {
    const audio = audioRef.current
    setAudioReady(false)
    setDuration(0)
    setPlaying(false)
    const code = audio?.error?.code
    const messages = {
      1: 'O carregamento do áudio foi interrompido.',
      2: 'O navegador não conseguiu carregar o áudio. Verifique o arquivo.',
      3: 'O navegador não conseguiu decodificar este áudio. Tente MP3 ou WAV.',
      4: 'O formato ou codec deste áudio não é suportado pelo navegador.'
    }
    setError(messages[code] || 'Não foi possível carregar este áudio.')
  }, [])

  const onPlay = useCallback(() => setPlaying(true), [])
  const onPause = useCallback(() => setPlaying(false), [])
  const onEnded = useCallback(() => {
    setPlaying(false)
    setCurrentTime(duration)
    setActiveModule(6)
  }, [duration])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    const listeners = [
      ['timeupdate', onTimeUpdate],
      ['loadedmetadata', onLoadedMetadata],
      ['durationchange', onDurationChange],
      ['canplay', onCanPlay],
      ['play', onPlay],
      ['pause', onPause],
      ['ended', onEnded],
      ['error', onAudioError]
    ]
    listeners.forEach(([event, handler]) => audio.addEventListener(event, handler))
    return () => listeners.forEach(([event, handler]) => audio.removeEventListener(event, handler))
  }, [onAudioError, onCanPlay, onDurationChange, onEnded, onLoadedMetadata, onPause, onPlay, onTimeUpdate, volume])

  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
  }, [])

  const togglePower = useCallback(() => {
    setPoweredOn((value) => {
      const next = !value
      if (!next) {
        audioRef.current?.pause()
        setActiveModule(-1)
        setCurrentTime(0)
        setManualMode(false)
      }
      return next
    })
  }, [])

  const chooseAudio = useCallback((nextFile) => {
    setError('')
    if (!nextFile) return
    if (!nextFile.type.startsWith('audio/') && !/\.(mp3|wav|ogg|opus|m4a|aac)$/i.test(nextFile.name)) {
      setError('Selecione um arquivo de áudio compatível.')
      return
    }
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    objectUrlRef.current = URL.createObjectURL(nextFile)
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.removeAttribute('src')
    audio.load()
    audio.preload = 'auto'
    audio.src = objectUrlRef.current
    audio.load()
    setFile(nextFile)
    setDuration(0)
    setAudioReady(false)
    setPlaying(false)
    setCurrentTime(0)
    setActiveModule(0)
    setSelectedModule(0)
    setManualMode(false)
  }, [])

  const removeAudio = useCallback(() => {
    audioRef.current?.pause()
    audioRef.current?.removeAttribute('src')
    audioRef.current?.load()
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current)
    objectUrlRef.current = null
    setFile(null)
    setDuration(0)
    setCurrentTime(0)
    setAudioReady(false)
    setPlaying(false)
    setActiveModule(-1)
  }, [])

  const playPause = useCallback(async () => {
    if (!poweredOn) return
    if (!file) {
      fileInputRef.current?.click()
      return
    }
    const audio = audioRef.current
    if (!audio) return
    setManualMode(false)
    setError('')
    if (audio.paused || audio.ended) {
      try {
        if (audio.ended) audio.currentTime = 0
        if (!audioReady) {
          const loaded = readAudioDuration()
          if (!loaded) {
            setError('O áudio ainda está carregando. Aguarde um instante e pressione PLAY novamente.')
            return
          }
        }
        await audio.play()
      } catch (playError) {
        const code = audio.error?.code
        if (code === 3 || code === 4) {
          setError('Este arquivo não pôde ser decodificado pelo navegador. Tente MP3 ou WAV.')
        } else if (playError?.name === 'NotAllowedError') {
          setError('A reprodução automática foi bloqueada. Pressione PLAY novamente.')
        } else {
          setError('Não foi possível reproduzir o áudio. Verifique o arquivo e tente novamente.')
        }
      }
    } else {
      audio.pause()
    }
  }, [audioReady, file, poweredOn, readAudioDuration])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
    setCurrentTime(0)
    setActiveModule(file ? 0 : -1)
    setManualMode(false)
  }, [file])

  const restart = useCallback(async () => {
    if (!audioRef.current || !file || !audioReady) return
    audioRef.current.currentTime = 0
    setCurrentTime(0)
    setActiveModule(0)
    setManualMode(false)
    try {
      await audioRef.current.play()
    } catch {
      setError('Não foi possível iniciar o áudio.')
    }
  }, [audioReady, file])

  const seek = useCallback((nextPercentage) => {
    const audio = audioRef.current
    if (!audio || !duration) return
    const nextTime = clamp(nextPercentage, 0, 100) / 100 * duration
    audio.currentTime = nextTime
    setCurrentTime(nextTime)
    if (!manualMode) setActiveModule(getModuleFromProgress(nextPercentage))
  }, [duration, getModuleFromProgress, manualMode])

  const selectModule = useCallback((index) => {
    setSelectedModule(index)
    setActiveModule(index)
    setManualMode(true)
  }, [])

  const testModule = useCallback((index) => {
    setSelectedModule(index)
    setActiveModule(index)
    setManualMode(true)
  }, [])

  const setModuleEnd = useCallback((index, end) => {
    setSegments((prev) => {
      const next = prev.map((segment) => ({ ...segment }))
      next[index].end = Number(end)
      return normalizeSegments(next)
    })
  }, [normalizeSegments])

  return {
    audioRef,
    fileInputRef,
    poweredOn,
    playing,
    file,
    duration,
    currentTime,
    volume,
    setVolume,
    selectedModule,
    activeModule,
    manualMode,
    segments,
    progress,
    status,
    error,
    audioReady,
    togglePower,
    chooseAudio,
    removeAudio,
    playPause,
    stop,
    restart,
    seek,
    selectModule,
    testModule,
    setModuleEnd
  }
}
