<main class="content">
  <Router {routes} />
</main>

<script>
  import Router from 'svelte-spa-router'
  import routes from './routes.js'
</script>

<style>
  @import '../public/global.css';
  .content {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
