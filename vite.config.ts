import {env} from 'node:process';
import {defineConfig} from 'vite';
import preact from '@preact/preset-vite';

export default defineConfig({
	plugins: [preact()],
	base: env.IS_GITHUB ? 'audio-visualizer' : undefined,
});
