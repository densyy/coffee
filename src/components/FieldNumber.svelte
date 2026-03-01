<div class="field">
  {#if label}
    <label class="field__label" for={id}>{label}</label>
  {/if}
  <div class="field__input-row">
    <input
      class="field__input{readonly ? ' field__input--readonly' : ''}"
      {id}
      type="number"
      {min}
      {max}
      {value}
      {readonly}
      on:input={onInput}
    />
    {#if unit}
      <span class="field__unit">{unit}</span>
    {/if}
  </div>
</div>

<script>
  import { createEventDispatcher } from 'svelte'

  export let id = ''
  export let label = ''
  export let value = 0
  export let unit = ''
  export let min = 1
  export let max = 999
  export let readonly = false

  const dispatch = createEventDispatcher()

  const onInput = (e) => {
    const parsed = Number(e.target.value)
    if (parsed > 0) dispatch('change', parsed)
  }
</script>

<style>
  .field {
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
    padding: 12px 14px;
    border: 1.5px solid var(--color-border);
    border-radius: 10px;
    background: var(--color-input);
    color: var(--color-text);
    font-size: 1.1rem;
    font-weight: 600;
    font-family: inherit;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    appearance: textfield;;
    -moz-appearance: textfield;
  }

  .field__input::-webkit-outer-spin-button,
  .field__input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .field__input:focus {
    border-color: var(--color-border-focus);
    box-shadow: 0 0 0 3px rgba(139, 111, 71, 0.1);
  }

  .field__input--readonly {
    cursor: default;
    opacity: 0.8;
    background: var(--color-card);
  }

  .field__unit {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-text-muted);
    min-width: 28px;
  }
</style>
