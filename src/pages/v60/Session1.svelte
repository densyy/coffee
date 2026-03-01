<div class="calculator">
  <header class="calculator__header">
    <span class="calculator__icon">☕</span>
    <h1 class="calculator__title">Calculador V60</h1>
    <p class="calculator__subtitle">Método Tetsu 4:6</p>
  </header>

  <FieldNumber
    id="gramas"
    label="Gramas de café"
    value={$v60State.gramas}
    unit="g"
    on:change={(e) => updateState('gramas', e.detail)}
  />

  <section class="calculator__field">
    <span class="calculator__field-label">Força</span>
    <SliderSelector
      options={OPCOES_FORCA}
      value={$v60State.forca}
      subtitle={subtitleForca}
      on:change={(e) => updateState('forca', e.detail)}
    />
  </section>

  <FieldNumber
    label="Quantidade de água"
    value={$v60Recipe.aguaTotal}
    unit="ml"
    readonly
  />

  <section class="calculator__field">
    <span class="calculator__field-label">Moedor</span>
    <p class="calculator__field-static">Modus C3</p>
  </section>

  <FieldNumber
    id="click"
    label="Click do moedor"
    value={$v60State.click}
    unit="clicks"
    max={50}
    on:change={(e) => updateState('click', e.detail)}
  />

  <section class="calculator__field">
    <span class="calculator__field-label">Torra do café</span>
    <SliderSelector
      options={OPCOES_TORRA}
      value={$v60State.torra}
      subtitle={subtitleTorra}
      on:change={(e) => updateState('torra', e.detail)}
    />
  </section>

  <section class="calculator__field">
    <span class="calculator__field-label">Corpo</span>
    <SliderSelector
      options={OPCOES_CORPO}
      value={$v60State.corpo}
      subtitle={subtitleCorpo}
      on:change={(e) => updateState('corpo', e.detail)}
    />
  </section>

  <section class="calculator__field">
    <span class="calculator__field-label">Sabor</span>
    <SliderSelector
      options={OPCOES_SABOR}
      value={$v60State.sabor}
      subtitle={subtitleSabor}
      on:change={(e) => updateState('sabor', e.detail)}
    />
  </section>

  <section class="calculator__fases">
    <span class="calculator__field-label">Fases de despejo</span>
    <div class="calculator__fases-grid">
      {#each $v60Recipe.fases as fase (fase.numero)}
        <FaseCard {fase} />
      {/each}
    </div>
  </section>
</div>

<script>
  import { v60State, v60Recipe, PROPORCOES, TEMPERATURAS, TEMPOS_TOTAIS_SEG, NUM_FASES, DISTRIBUICAO_SABOR, formatTime } from '../../stores/v60.js'
  import SliderSelector from '../../components/SliderSelector.svelte'
  import FaseCard from '../../components/FaseCard.svelte'
  import FieldNumber from '../../components/FieldNumber.svelte'

  const OPCOES_FORCA = [
    { label: 'Suave' },
    { label: 'Equilibrado' },
    { label: 'Intenso' }
  ]

  const OPCOES_TORRA = [
    { label: 'Clara' },
    { label: 'Média' },
    { label: 'Escura' }
  ]

  const OPCOES_CORPO = [
    { label: 'Suave' },
    { label: 'Equilibrado' },
    { label: 'Intenso' }
  ]

  const OPCOES_SABOR = [
    { label: 'Ácido' },
    { label: 'Equilibrado' },
    { label: 'Doce' }
  ]

  $: subtitleForca = `1:${PROPORCOES[$v60State.forca]}`
  $: subtitleTorra = `${TEMPERATURAS[$v60State.torra]}°C · ${formatTime(TEMPOS_TOTAIS_SEG[$v60State.torra])}`
  $: subtitleCorpo = `${NUM_FASES[$v60State.corpo]} fases`
  $: subtitleSabor = buildSubtitleSabor(DISTRIBUICAO_SABOR[$v60State.sabor])

  function buildSubtitleSabor ([p1, p2]) {
    return `Fase 1: ${p1 * 100}% · Fase 2: ${p2 * 100}%`
  }

  function updateState (key, value) {
    v60State.update(s => ({ ...s, [key]: value }))
  }
</script>

<style>
  .calculator {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    padding: 24px 16px 40px;
  }

  .calculator__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--color-border);
  }

  .calculator__icon {
    font-size: 2.5rem;
    line-height: 1;
  }

  .calculator__title {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: var(--color-text);
    letter-spacing: -0.01em;
  }

  .calculator__subtitle {
    margin: 0;
    font-size: 0.85rem;
    color: var(--color-text-muted);
    font-weight: 500;
  }

  .calculator__field {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .calculator__field-label {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .calculator__field-static {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
    padding: 10px 14px;
    background: var(--color-card);
    border: 1.5px solid var(--color-border);
    border-radius: 10px;
  }

  .calculator__fases {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .calculator__fases-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
</style>

