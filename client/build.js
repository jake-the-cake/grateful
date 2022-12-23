import { buildSync } from 'esbuild'

buildSync({
  entryPoints: [ './src/index.tsx' ],
  bundle: true,
  minify: false,
  sourcemap: true,
  target: [ 'ES6' ],
  outfile: './public/dist/bundle.js'
})