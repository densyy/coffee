<div class="fase-card">
  <span class="fase-card__header">FASE {fase.numero}</span>
  <span class="fase-card__time">{fase.timeStartFmt} → {fase.timeEndFmt}</span>
  <span class="fase-card__acumulado">{fase.aguaAcumulada}ml</span>
  <span class="fase-card__volume">+{fase.volume}ml</span>
</div>

<script>
  export let fase = {}
</script>

<style>
  .fase-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    background: var(--color-input);
    border: 1.5px solid var(--color-border);
    border-radius: 14px;
    padding: 16px 12px;
    min-width: 0;
    flex: 1 1 calc(50% - 8px);
    box-shadow: 0 2px 6px rgba(74, 44, 26, 0.1);
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .fase-card:hover {
    border-color: var(--color-border-focus);
    box-shadow: 0 4px 12px rgba(139, 111, 71, 0.1);
  }

  .fase-card__header {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: var(--color-accent);
    text-transform: uppercase;
  }

  .fase-card__time {
    font-size: 0.85rem;
    color: var(--color-text);
    font-variant-numeric: tabular-nums;
    font-weight: 500;
  }

  .fase-card__acumulado {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--color-text);
    line-height: 1.1;
  }

  .fase-card__volume {
    font-size: 0.8rem;
    font-weight: 500;
    color: var(--color-text-muted);
  }
</style>
