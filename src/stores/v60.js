import { writable, derived } from 'svelte/store'

const STORAGE_KEY = 'v60_recipe'

// Configurações de proporções por força: Intenso, Equilibrado, Suave
export const PROPORCOES = [12, 15, 18]

// Configurações de temperatura por torra: Clara, Média, Escura
export const TEMPERATURAS = [95, 92, 88]

// Tempo total em segundos por torra: Clara=3:30, Média=3:00, Escura=2:30
export const TEMPOS_TOTAIS_SEG = [210, 180, 150]

// Número de fases por corpo: Delicado, Cremoso, Viscoso
export const NUM_FASES = [3, 4, 5]

// Distribuição percentual [fase1, fase2] por sabor: Ácido, Equilibrado, Doce
export const DISTRIBUICAO_SABOR = [
  [0.25, 0.15],
  [0.20, 0.20],
  [0.15, 0.25]
]

const DEFAULT_STATE = {
  gramas: 15,
  click: 14,
  forca: 1,
  torra: 1,
  corpo: 1,
  sabor: 1,
  proporcao: 15,
  temperatura: 93,
  tempoTotalSeg: null,
  sabor_pct1: 20,
  sabor_pct2: 20
}

// ===== Funções puras para formatação =====

export const formatTime = (segundos) => {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// ===== Funções puras para cálculos =====

const calcAguaTotal = (gramas, proporcao) =>
  Math.round(gramas * proporcao)

const calcVolumes = (aguaTotal, numFases, pct1, pct2) => {
  const agua1 = Math.round(aguaTotal * pct1 / 100)
  const agua2 = Math.round(aguaTotal * pct2 / 100)
  const fasesRestantes = numFases - 2
  const aguaPorFase = Math.floor((aguaTotal - agua1 - agua2) / fasesRestantes)

  const volumes = [agua1, agua2]
  let soma = agua1 + agua2

  for (let i = 0; i < fasesRestantes - 1; i++) {
    volumes.push(aguaPorFase)
    soma += aguaPorFase
  }

  volumes.push(aguaTotal - soma)
  return volumes
}

// Calcula tempo de cada fase com base no volume e peso progressivo
const calcTemposPorFase = (volumes, tempoTotalSeg) => {
  const numFases = volumes.length
  const TEMPO_PRIMEIRA_FASE = 30

  // Fase 1 sempre 30s, distribuir o resto
  const tempoDisponivel = tempoTotalSeg - TEMPO_PRIMEIRA_FASE
  const tempos = [TEMPO_PRIMEIRA_FASE]

  // Calcular peso de cada fase a partir da segunda (aumenta com o número)
  // Peso: fase 2 = 0.8, fase 3 = 1.0, fase 4 = 1.2, fase 5 = 1.4, etc
  const pesos = volumes.map((_, i) => {
    if (i === 0) return 0 // Fase 1 já tem tempo fixo
    return 0.6 + (i * 0.2) // Aumenta peso progressivamente
  })

  // Calcular volume * peso para cada fase (exceto primeira)
  let somaVolumePeso = 0
  for (let i = 1; i < numFases; i++) {
    somaVolumePeso += volumes[i] * pesos[i]
  }

  // Distribuir tempo disponível proporcionalmente
  for (let i = 1; i < numFases; i++) {
    const tempo = Math.round((volumes[i] * pesos[i] / somaVolumePeso) * tempoDisponivel)
    tempos.push(tempo)
  }

  return tempos
}

const calcFases = (volumes, tempoTotalSeg) => {
  const numFases = volumes.length
  const tempos = calcTemposPorFase(volumes, tempoTotalSeg)

  let timeStart = 0
  let aguaAcumulada = 0

  return volumes.map((volume, i) => {
    aguaAcumulada += volume
    const duracao = tempos[i]
    const timeEnd = timeStart + duracao

    const fase = {
      numero: i + 1,
      timeStart,
      timeEnd,
      volume,
      duracao,
      aguaAcumulada,
      timeStartFmt: formatTime(timeStart),
      timeEndFmt: formatTime(timeEnd)
    }

    timeStart = timeEnd
    return fase
  })
}

const calcularReceita = (gramas, torra, corpo, proporcao, temperatura, sabor_pct1, sabor_pct2, tempoTotalSeg) => {
  const aguaTotal = calcAguaTotal(gramas, proporcao)
  const numFases = NUM_FASES[corpo]
  const tempoTotal = tempoTotalSeg ?? TEMPOS_TOTAIS_SEG[torra]
  const volumes = calcVolumes(aguaTotal, numFases, sabor_pct1, sabor_pct2)
  const fases = calcFases(volumes, tempoTotal)

  return {
    aguaTotal,
    proporcao,
    numFases,
    temperatura,
    tempoTotal: formatTime(tempoTotal),
    fases
  }
}

// ===== Funções de persistência =====

const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? { ...DEFAULT_STATE, ...JSON.parse(saved) } : DEFAULT_STATE
  } catch {
    return DEFAULT_STATE
  }
}

const saveToStorage = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

// ===== Stores =====

export const v60State = writable(loadFromStorage())
v60State.subscribe(saveToStorage)

export const v60Recipe = derived(
  v60State,
  ($s) => calcularReceita(
    $s.gramas, $s.torra, $s.corpo, $s.proporcao,
    $s.temperatura, $s.sabor_pct1, $s.sabor_pct2, $s.tempoTotalSeg
  )
)
