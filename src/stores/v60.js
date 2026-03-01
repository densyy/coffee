import { writable, derived } from 'svelte/store'

const STORAGE_KEY = 'v60_recipe'

const PROPORCOES = [18, 15, 12] // Suave, Equilibrado, Intenso
const TEMPERATURAS = [96, 93, 90] // Clara, Média, Escura
const TEMPOS_TOTAIS_SEG = [210, 180, 150] // Clara=3:30, Média=3:00, Escura=2:30
const NUM_FASES = [4, 5, 6] // Corpo: Suave, Equilibrado, Intenso

// [pct fase1, pct fase2] por sabor: Ácido, Equilibrado, Doce
const DISTRIBUICAO_SABOR = [
  [0.25, 0.15],
  [0.20, 0.20],
  [0.15, 0.25]
]

const DEFAULT_STATE = {
  cafeGramas: 12,
  forca: 1,
  torra: 1,
  corpo: 1,
  sabor: 1
}

function loadFromStorage () {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return DEFAULT_STATE
    const parsed = JSON.parse(saved)
    return { ...DEFAULT_STATE, ...parsed }
  } catch {
    return DEFAULT_STATE
  }
}

export function formatTime (segundos) {
  const m = Math.floor(segundos / 60)
  const s = segundos % 60
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

function calcularFases (cafeGramas, forca, torra, corpo, sabor) {
  const proporcao = PROPORCOES[forca]
  const aguaTotal = Math.round(cafeGramas * proporcao)
  const numFases = NUM_FASES[corpo]
  const tempoTotalSeg = TEMPOS_TOTAIS_SEG[torra]

  const [pct1, pct2] = DISTRIBUICAO_SABOR[sabor]
  const agua1 = Math.round(aguaTotal * pct1)
  const agua2 = Math.round(aguaTotal * pct2)

  const fasesRestantes = numFases - 2
  const aguaRestante = aguaTotal - agua1 - agua2
  const aguaPorFaseRestante = Math.floor(aguaRestante / fasesRestantes)

  const volumes = [agua1, agua2]
  let somaAcumulada = agua1 + agua2

  for (let i = 0; i < fasesRestantes - 1; i++) {
    volumes.push(aguaPorFaseRestante)
    somaAcumulada += aguaPorFaseRestante
  }
  volumes.push(aguaTotal - somaAcumulada)

  const tempoPorFase = Math.round(tempoTotalSeg / numFases)

  const fases = volumes.map((volume, i) => {
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

  return {
    aguaTotal,
    proporcao,
    numFases,
    temperatura: TEMPERATURAS[torra],
    tempoTotal: formatTime(tempoTotalSeg),
    fases
  }
}

const initialState = loadFromStorage()
export const v60State = writable(initialState)

v60State.subscribe(state => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  } catch {}
})

export const v60Recipe = derived(v60State, ($s) =>
  calcularFases($s.cafeGramas, $s.forca, $s.torra, $s.corpo, $s.sabor)
)

export { PROPORCOES, TEMPERATURAS, TEMPOS_TOTAIS_SEG, NUM_FASES, DISTRIBUICAO_SABOR }
