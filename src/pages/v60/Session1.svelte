<div class="calculator">
  <header class="calculator__header">
    <span class="calculator__icon">☕</span>
    <h1 class="calculator__title">Calculador V60</h1>
    <p class="calculator__subtitle">Método Tetsu 4:6</p>
  </header>

  <!-- Gramas de café -->
  <section class="calculator__field">
    <label class="field__label" for="cafeGramas">Gramas de café</label>
    <div class="field__input-row">
      <input
        class="field__input"
        id="cafeGramas"
        type="number"
        min="1"
        max="100"
        value={$v60State.cafeGramas}
        on:input={handleGramasInput}
      />
      <span class="field__unit">g</span>
    </div>
  </section>

  <!-- Força -->
  <section class="calculator__field">
    <span class="field__label">Força</span>
    <SliderSelector
      options={OPCOES_FORCA}
      value={$v60State.forca}
      subtitle={subtitleForca}
      on:change={(e) => updateState('forca', e.detail)}
    />
  </section>

  <!-- Quantidade de água -->
  <section class="calculator__field">
    <span class="field__label">Quantidade de água</span>
    <div class="field__input-row">
      <input
        class="field__input field__input--readonly"
        type="number"
        value={$v60Recipe.aguaTotal}
        readonly
      />
      <span class="field__unit">ml</span>
    </div>
  </section>

  <!-- Moedor -->
  <section class="calculator__field">
    <span class="field__label">Moedor</span>
    <p class="field__static">Modus C3</p>
  </section>

  <!-- Torra -->
  <section class="calculator__field">
    <span class="field__label">Torra do café</span>
    <SliderSelector
      options={OPCOES_TORRA}
      value={$v60State.torra}
      subtitle={subtitleTorra}
      on:change={(e) => updateState('torra', e.detail)}
    />
  </section>

  <!-- Corpo -->
  <section class="calculator__field">
    <span class="field__label">Corpo</span>
    <SliderSelector
      options={OPCOES_CORPO}
      value={$v60State.corpo}
      subtitle={subtitleCorpo}
      on:change={(e) => updateState('corpo', e.detail)}
    />
  </section>

  <!-- Sabor -->
  <section class="calculator__field">
    <span class="field__label">Sabor</span>
    <SliderSelector
      options={OPCOES_SABOR}
      value={$v60State.sabor}
      subtitle={subtitleSabor}
      on:change={(e) => updateState('sabor', e.detail)}
    />
  </section>

  <!-- Fases -->
  <section class="calculator__fases">
    <h2 class="fases__title">Fases de despejo</h2>
    <div class="fases__grid">
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

  $: {
    const [p1, p2] = DISTRIBUICAO_SABOR[$v60State.sabor]
    subtitleSabor = `Fase 1: ${p1 * 100}% · Fase 2: ${p2 * 100}%`
  }

  let subtitleSabor = ''

  function updateState (key, value) {
    v60State.update(s => ({ ...s, [key]: value }))
  }

  function handleGramasInput (e) {
    const value = Number(e.target.value)
    if (value > 0) {
      v60State.update(s => ({ ...s, cafeGramas: value }))
    }
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

  .field__label {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .field__input-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .field__input {
    flex: 1;
    padding: 10px 14px;
    border: 1.5px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-card);
    color: var(--color-text);
    font-size: 1.1rem;
    font-weight: 600;
    font-family: inherit;
    outline: none;
    transition: border-color 0.15s;
    -moz-appearance: textfield;
  }

  .field__input::-webkit-outer-spin-button,
  .field__input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .field__input:focus {
    border-color: var(--color-accent);
  }

  .field__input--readonly {
    cursor: default;
    opacity: 0.8;
  }

  .field__unit {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text-muted);
    min-width: 28px;
  }

  .field__static {
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

  .fases__title {
    margin: 0;
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .fases__grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
</style>

