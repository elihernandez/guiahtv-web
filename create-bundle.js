let plugin = {
    name: 'empty-css-imports',
    setup(build) {
      build.onLoad({ filter: /\.scss$/ }, () => ({contents: ''}))
    },
}

require('esbuild').build({
    entryPoints: ['src/index.js'],
    bundle: true,
    loader: { '.js': 'jsx' },
    minify: false,
    outdir: 'build/esbuild',
    define: {
        'process.env.NODE_ENV' : '"production"'
    },
    target: ['chrome58'],
    format: 'esm',
    sourcemap: true,
    splitting: true,
    plugins: [plugin]
})