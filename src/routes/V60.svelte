<div class="container">
  <Session1 />
</div>

<script>
  import Session1 from '../pages/v60/Session1.svelte'
  import { onMount } from 'svelte'
  import { mountNoDrag } from '../lib/noDrag'

  onMount(() => mountNoDrag(document.body))
</script>

<style>
  .container {
    width: 100%;
    overflow-y: auto;
  }
</style>
