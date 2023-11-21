module.exports = {
  outputDir: 'docs',
  publicPath: './',
  pages: {
      index: {
        entry: "src/main.js",
        title: "poke-poke-dex",
      },
  },
  devServer: {
    port: 8000,
    disableHostCheck: true,
    historyApiFallback: {
      index: './'
    }
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/scss/app.scss";`
      }
    },
  },
}