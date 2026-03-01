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
    on:change={(e) => updateField('gramas', e.detail)}
  />

  <FieldNumber
    id="click"
    label="Click do moedor"
    value={$v60State.click}
    unit="clicks"
    max={50}
    on:change={(e) => updateField('click', e.detail)}
  />

  <section class="calculator__field">
    <span class="calculator__field-label">Concentração</span>
    <SliderSelector
      options={forceOptions}
      value={$v60State.forca}
      on:change={(e) => updateForce(e.detail)}
    />
    <div class="details-row">
      <div class="details-row__chips">
        <span class="details-chip">1:{$v60State.proporcao}ml/g</span>
        <span class="details-chip">{$v60Recipe.aguaTotal}ml de água</span>
      </div>
      <button
        class="details-row__btn{openConc ? ' details-row__btn--open' : ''}"
        type="button"
        title="Ajustar proporção"
        on:click={() => { openConc = !openConc }}
      >✏</button>
    </div>
    {#if openConc}
      <div class="details-expand" transition:slide={{ duration: 180 }}>
        <FieldNumber
          label="Proporção"
          value={$v60State.proporcao}
          unit="ml/g"
          min={5}
          max={30}
          on:change={(e) => updateField('proporcao', e.detail)}
        />
      </div>
    {/if}
  </section>

  <section class="calculator__field">
    <span class="calculator__field-label">Torra do café</span>
    <SliderSelector
      options={roastOptions}
      value={$v60State.torra}
      on:change={(e) => updateRoast(e.detail)}
    />
    <div class="details-row">
      <div class="details-row__chips">
        <span class="details-chip">{$v60State.temperatura}°C</span>
        <span class="details-chip">{$v60Recipe.tempoTotal}</span>
      </div>
      <button
        class="details-row__btn{openTorra ? ' details-row__btn--open' : ''}"
        type="button"
        title="Ajustar temperatura"
        on:click={() => { openTorra = !openTorra }}
      >✏</button>
    </div>
    {#if openTorra}
      <div class="details-expand" transition:slide={{ duration: 180 }}>
        <FieldNumber
          label="Temperatura"
          value={$v60State.temperatura}
          unit="°C"
          min={80}
          max={100}
          on:change={(e) => updateField('temperatura', e.detail)}
        />
        <FieldNumber
          label="Tempo total"
          value={getTempo($v60State.tempoTotalSeg, $v60State.torra)}
          unit="s"
          min={60}
          max={300}
          on:change={(e) => updateField('tempoTotalSeg', e.detail)}
        />
      </div>
    {/if}
  </section>

  <section class="calculator__field">
    <span class="calculator__field-label">Perfil de sabores</span>
    <SliderSelector
      options={flavorOptions}
      value={$v60State.sabor}
      on:change={(e) => updateFlavor(e.detail)}
    />
    <div class="details-row">
      <div class="details-row__chips">
        <span class="details-chip">Fase 1: {$v60State.sabor_pct1}%</span>
        <span class="details-chip">Fase 2: {$v60State.sabor_pct2}%</span>
      </div>
      <button
        class="details-row__btn{openSabor ? ' details-row__btn--open' : ''}"
        type="button"
        title="Ajustar distribuição"
        on:click={() => { openSabor = !openSabor }}
      >✏</button>
    </div>
    {#if openSabor}
      <div class="details-expand" transition:slide={{ duration: 180 }}>
        <FieldNumber
          label="Fase 1 — proporção"
          value={$v60State.sabor_pct1}
          unit="%"
          min={5}
          max={50}
          on:change={(e) => updateField('sabor_pct1', e.detail)}
        />
        <FieldNumber
          label="Fase 2 — proporção"
          value={$v60State.sabor_pct2}
          unit="%"
          min={5}
          max={50}
          on:change={(e) => updateField('sabor_pct2', e.detail)}
        />
      </div>
    {/if}
  </section>

  <section class="calculator__field">
    <span class="calculator__field-label">Textura</span>
    <SliderSelector
      options={bodyOptions}
      value={$v60State.corpo}
      subtitle={getBodySubtitle($v60State.corpo)}
      on:change={(e) => updateField('corpo', e.detail)}
    />
  </section>

  <button class="calculator__btn-gerar" type="button" on:click={() => dispatch('gerar')}>
    Gerar Receita
  </button>
</div>

<script>
  import { slide } from 'svelte/transition'
  import { createEventDispatcher } from 'svelte'
  import { v60State, v60Recipe, PROPORCOES, TEMPERATURAS, TEMPOS_TOTAIS_SEG, NUM_FASES, DISTRIBUICAO_SABOR } from '../../stores/v60.js'
  import SliderSelector from '../../components/SliderSelector.svelte'
  import FieldNumber from '../../components/FieldNumber.svelte'

  const dispatch = createEventDispatcher()

  let openConc = false
  let openTorra = false
  let openSabor = false

  const forceOptions = [
    { label: 'Intenso' },
    { label: 'Equilibrado' },
    { label: 'Suave' }
  ]

  const roastOptions = [
    { label: 'Clara' },
    { label: 'Média' },
    { label: 'Escura' }
  ]

  const bodyOptions = [
    { label: 'Delicado' },
    { label: 'Cremoso' },
    { label: 'Viscoso' }
  ]

  const flavorOptions = [
    { label: 'Ácido' },
    { label: 'Equilibrado' },
    { label: 'Doce' }
  ]

  // Funções puras para atualização de estado
  const updateField = (key, value) => {
    v60State.update(s => ({ ...s, [key]: value }))
  }

  const updateForce = (value) => {
    v60State.update(s => ({
      ...s,
      forca: value,
      proporcao: PROPORCOES[value]
    }))
  }

  const updateRoast = (value) => {
    v60State.update(s => ({
      ...s,
      torra: value,
      temperatura: TEMPERATURAS[value],
      tempoTotalSeg: null
    }))
  }

  const updateFlavor = (value) => {
    const [pct1, pct2] = DISTRIBUICAO_SABOR[value]
    v60State.update(s => ({
      ...s,
      sabor: value,
      sabor_pct1: Math.round(pct1 * 100),
      sabor_pct2: Math.round(pct2 * 100)
    }))
  }

  const getBodySubtitle = (corpo) => `${NUM_FASES[corpo]} fases`

  const getTempo = (tempoCustomizado, torra) => tempoCustomizado ?? TEMPOS_TOTAIS_SEG[torra]

  $: bodySubtitle = getBodySubtitle($v60State.corpo)
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
    padding-bottom: 12px;
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
    color: var(--color-text);
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

  /* details row */
  .details-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .details-row__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .details-chip {
    font-size: 0.78rem;
    font-weight: 600;
    color: var(--color-text);
    background: var(--color-expand-bg);
    border: 1px solid var(--color-border);
    border-radius: 20px;
    padding: 4px 12px;
  }

  .details-row__btn {
    flex-shrink: 0;
    width: 28px;
    height: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-card);
    border: 1px solid var(--color-border);
    border-radius: 8px;
    color: var(--color-text-muted);
    font-size: 0.78rem;
    cursor: pointer;
    transition: background 0.15s, color 0.15s, border-color 0.15s;
  }

  .details-row__btn:hover,
  .details-row__btn--open {
    background: var(--color-accent);
    border-color: var(--color-accent);
    color: white;
  }

  /* expanded inputs */
  .details-expand {
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
    background: var(--color-expand-bg);
    border: 1.5px solid var(--color-border);
    border-radius: 12px;
    overflow: hidden;
  }

  .calculator__btn-gerar {
    margin-top: 8px;
    padding: 14px;
    width: 100%;
    background: var(--color-accent);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1rem;
    font-weight: 700;
    font-family: inherit;
    cursor: pointer;
    transition: background 0.2s, box-shadow 0.2s;
  }

  .calculator__btn-gerar:hover {
    background: var(--color-accent-dark);
  }

  .calculator__btn-gerar:active {
    box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>

