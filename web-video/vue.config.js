// vue.config.js
module.exports = {
  outputDir: '../dist/web/video/wwwroot',
  publicPath: '/video',
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/_styles/_reset.scss";
          @import "@/_styles/_variables.scss";
        `
      }
    }
  },
  devServer: {
    proxy: [
      {
        context: [ '/users' ],
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    ]
  }
}