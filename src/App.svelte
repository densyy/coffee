<main class="content">
  <Router {routes} />
</main>

<AlertContainer />

<script>
  import Router from 'svelte-spa-router'
  import routes from './routes.js'
</script>

<style>
  .content {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
