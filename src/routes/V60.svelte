<div class="container">
  <Session1 />
</div>

<script>
  import Session1 from '../pages/v60/Session1.svelte'
  import { onMount } from 'svelte'
  import { mountNoDrag } from '../lib/noDrag'

  let teardown

  onMount(() => {
    noDrag()
  })

  function noDrag () {
    teardown = mountNoDrag(document.body)
    return () => teardown && teardown()
  }
</script>

<style>
  .container {
    width: 100%;
    overflow-y: auto;
  }
</style>
