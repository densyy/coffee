import { wrap } from 'svelte-spa-router/wrap'

export const routes = {
  '/': wrap({ asyncComponent: () => import('./routes/V60.svelte') }),
  '/v60': wrap({ asyncComponent: () => import('./routes/V60.svelte') }),
}

export default routes
