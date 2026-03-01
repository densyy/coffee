<div class="container">
  {#if sessao === 1}
    <Session1 on:gerar={() => { sessao = 2 }} />
  {:else}
    <Session2 on:voltar={() => { sessao = 1 }} />
  {/if}
</div>

<script>
  import Session1 from '../pages/v60/Session1.svelte'
  import Session2 from '../pages/v60/Session2.svelte'
  import { onMount } from 'svelte'
  import { mountNoDrag } from '../lib/noDrag'

  let sessao = 1

  onMount(() => mountNoDrag(document.body))
</script>

<style>
  .container {
    width: 100%;
    overflow-y: auto;
  }
</style>
