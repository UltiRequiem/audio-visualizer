import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'
import {env} from 'node:process';


export default defineConfig({
  plugins: [preact()],
  base: env.IS_GITHUB ? 'audio-visualizer' : undefined,
})
