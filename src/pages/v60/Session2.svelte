<div class="receita">
  <header class="receita__header">
    <button class="receita__btn-voltar" type="button" on:click={() => dispatch('voltar')}>
      ← Voltar
    </button>
    <h2 class="receita__title">Receita</h2>
  </header>

  <div class="receita__resumo">
    <div class="receita__resumo-item">
      <span class="receita__resumo-label">Café</span>
      <span class="receita__resumo-value">{$v60State.gramas}g</span>
    </div>
    <div class="receita__resumo-item">
      <span class="receita__resumo-label">Água</span>
      <span class="receita__resumo-value">{$v60Recipe.aguaTotal}ml</span>
    </div>
    <div class="receita__resumo-item">
      <span class="receita__resumo-label">Temperatura</span>
      <span class="receita__resumo-value">{$v60State.temperatura}°C</span>
    </div>
    <div class="receita__resumo-item">
      <span class="receita__resumo-label">Tempo total</span>
      <span class="receita__resumo-value">{$v60Recipe.tempoTotal}</span>
    </div>
  </div>

  <section class="receita__fases">
    <span class="receita__fases-label">Fases de despejo</span>
    <div class="receita__fases-grid">
      {#each $v60Recipe.fases as fase (fase.numero)}
        <FaseCard {fase} />
      {/each}
    </div>
  </section>
</div>

<script>
  import { createEventDispatcher } from 'svelte'
  import { v60State, v60Recipe } from '../../stores/v60.js'
  import FaseCard from '../../components/FaseCard.svelte'

  const dispatch = createEventDispatcher()
</script>

<style>
  .receita {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    padding: 24px 16px 40px;
  }

  .receita__header {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-bottom: 8px;
    border-bottom: 2px solid var(--color-border);
  }

  .receita__btn-voltar {
    background: none;
    border: 1.5px solid var(--color-border);
    border-radius: 8px;
    color: var(--color-accent);
    font-size: 0.88rem;
    font-weight: 600;
    font-family: inherit;
    padding: 6px 12px;
    cursor: pointer;
    transition: background 0.15s;
  }

  .receita__btn-voltar:active {
    background: var(--color-border);
  }

  .receita__title {
    margin: 0;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-text);
  }

  .receita__resumo {
    display: flex;
    flex-direction: column;
    gap: 0;
    background: var(--color-card);
    border: 1.5px solid var(--color-border);
    border-radius: 12px;
    overflow: hidden;
  }

  .receita__resumo-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid var(--color-border);
  }

  .receita__resumo-item:last-child {
    border-bottom: none;
  }

  .receita__resumo-label {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .receita__resumo-value {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text);
  }

  .receita__fases {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .receita__fases-label {
    font-size: 0.78rem;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .receita__fases-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
</style>
