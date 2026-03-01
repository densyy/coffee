<div class="slider">
  <div class="slider__track">
    {#each options as option, i}
      <button
        class="slider__option{value === i ? ' slider__option--active' : ''}"
        on:click={() => dispatch('change', i)}
        type="button"
      >
        {option.label}
      </button>
    {/each}
  </div>
  {#if subtitle}
    <p class="slider__subtitle">{subtitle}</p>
  {/if}
</div>

<script>
  import { createEventDispatcher } from 'svelte'

  export let options = []
  export let value = 0
  export let subtitle = ''

  const dispatch = createEventDispatcher()
</script>

<style>
  .slider {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .slider__track {
    display: flex;
    border-radius: 24px;
    background: var(--color-card);
    overflow: hidden;
    border: 1.5px solid var(--color-border);
  }

  .slider__option {
    flex: 1;
    padding: 8px 0;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-text);
    transition: background 0.15s, color 0.15s;
    border-radius: 0;
  }

  .slider__option:first-child { border-radius: 22px 0 0 22px; }
  .slider__option:last-child  { border-radius: 0 22px 22px 0; }

  .slider__option--active {
    background: var(--color-accent);
    color: white;
    font-weight: 700;
  }

  .slider__subtitle {
    font-size: 0.78rem;
    color: var(--color-text-muted);
    margin: 0;
    text-align: center;
  }
</style>
