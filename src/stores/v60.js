import { writable, derived } from 'svelte/store'

const STORAGE_KEY = 'v60_recipe'

// Configurações de proporções por força: Intenso, Equilibrado, Suave
export const PROPORCOES = [12, 15, 18]

// Configurações de temperatura por torra: Clara, Média, Escura
export const TEMPERATURAS = [96, 93, 90]

// Tempo total em segundos por torra: Clara=3:30, Média=3:00, Escura=2:30
export const TEMPOS_TOTAIS_SEG = [210, 180, 150]

// Número de fases por corpo: Delicado, Cremoso, Viscoso
export const NUM_FASES = [5, 4, 3]

// Distribuição percentual [fase1, fase2] por sabor: Ácido, Equilibrado, Doce
export const DISTRIBUICAO_SABOR = [
  [0.25, 0.15],
  [0.20, 0.20],
  [0.15, 0.25]
]

const DEFAULT_STATE = {
  gramas: 12,
  click: 12,
  forca: 1,
  torra: 1,
  corpo: 1,
  sabor: 1,
  proporcao: 15,
  temperatura: 93,
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

const calcFases = (volumes, tempoTotalSeg) => {
  const numFases = volumes.length
  const tempoPorFase = Math.round(tempoTotalSeg / numFases)

  let aguaAcumulada = 0
  return volumes.map((volume, i) => {
    aguaAcumulada += volume
    const timeStart = i * tempoPorFase
    const timeEnd = i === numFases - 1 ? tempoTotalSeg : (i + 1) * tempoPorFase

    return {
      numero: i + 1,
      timeStart,
      timeEnd,
      volume,
      aguaAcumulada,
      timeStartFmt: formatTime(timeStart),
      timeEndFmt: formatTime(timeEnd)
    }
  })
}

const calcularReceita = (gramas, torra, corpo, proporcao, temperatura, sabor_pct1, sabor_pct2) => {
  const aguaTotal = calcAguaTotal(gramas, proporcao)
  const numFases = NUM_FASES[corpo]
  const tempoTotalSeg = TEMPOS_TOTAIS_SEG[torra]
  const volumes = calcVolumes(aguaTotal, numFases, sabor_pct1, sabor_pct2)
  const fases = calcFases(volumes, tempoTotalSeg)

  return {
    aguaTotal,
    proporcao,
    numFases,
    temperatura,
    tempoTotal: formatTime(tempoTotalSeg),
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
    $s.temperatura, $s.sabor_pct1, $s.sabor_pct2
  )
)
