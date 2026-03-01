import { writable, derived } from 'svelte/store'

const STORAGE_KEY = 'v60_recipe'

export const PROPORCOES = [18, 15, 12] // Suave, Equilibrado, Intenso
export const TEMPERATURAS = [96, 93, 90] // Clara, Média, Escura
export const TEMPOS_TOTAIS_SEG = [210, 180, 150] // Clara=3:30, Média=3:00, Escura=2:30
export const NUM_FASES = [4, 5, 6] // Corpo: Suave, Equilibrado, Intenso

// [pct fase1, pct fase2] por sabor: Ácido, Equilibrado, Doce
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
  sabor: 1
}

export function formatTime (segundos) {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function loadFromStorage () {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return DEFAULT_STATE
    return { ...DEFAULT_STATE, ...JSON.parse(saved) }
  } catch {
    return DEFAULT_STATE
  }
}

function saveToStorage (state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
}

function calcAguaTotal (gramas, forca) {
  return Math.round(gramas * PROPORCOES[forca])
}

function calcVolumes (aguaTotal, numFases, sabor) {
  const [pct1, pct2] = DISTRIBUICAO_SABOR[sabor]
  const agua1 = Math.round(aguaTotal * pct1)
  const agua2 = Math.round(aguaTotal * pct2)
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

function calcFases (volumes, tempoTotalSeg) {
  const numFases = volumes.length
  const tempoPorFase = Math.round(tempoTotalSeg / numFases)

  return volumes.map((volume, i) => {
    const timeStart = i * tempoPorFase
    const timeEnd = i === numFases - 1 ? tempoTotalSeg : (i + 1) * tempoPorFase
    return {
      numero: i + 1,
      timeStart,
      timeEnd,
      volume,
      timeStartFmt: formatTime(timeStart),
      timeEndFmt: formatTime(timeEnd)
    }
  })
}

function calcularReceita (gramas, forca, torra, corpo, sabor) {
  const aguaTotal = calcAguaTotal(gramas, forca)
  const numFases = NUM_FASES[corpo]
  const tempoTotalSeg = TEMPOS_TOTAIS_SEG[torra]
  const volumes = calcVolumes(aguaTotal, numFases, sabor)
  const fases = calcFases(volumes, tempoTotalSeg)

  return {
    aguaTotal,
    proporcao: PROPORCOES[forca],
    numFases,
    temperatura: TEMPERATURAS[torra],
    tempoTotal: formatTime(tempoTotalSeg),
    fases
  }
}

export const v60State = writable(loadFromStorage())

v60State.subscribe(saveToStorage)

export const v60Recipe = derived(v60State, ($s) =>
  calcularReceita($s.gramas, $s.forca, $s.torra, $s.corpo, $s.sabor)
)
