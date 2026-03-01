import { sveltePreprocess } from 'svelte-preprocess'

const dev = process.env.NODE_ENV !== 'production'

const config = {
  preprocess: sveltePreprocess(),
  compilerOptions: { dev }
}

export default config
