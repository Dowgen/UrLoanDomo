module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: '优贷管家',
    meta: [
      { charset: 'utf-8' },
      { 'http-equiv':"Access-Control-Allow-Origin", content:"*"},
      { 'http-equiv':"x-ua-compatible", content:"ie=edge,chrome=1"},
      { name: 'viewport', content: 'width=device-width,height=device-height,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable=no' },
      { name: 'format-detection', content: 'telephone=no'},
      { hid: 'description', name: 'description', content: '优待管家，巴拉巴拉' }
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  plugins: [
    { src: '~plugins/swiper.js', ssr: false }
  ],

  css: [
    'toastr/build/toastr.min.css',
    'swiper/dist/css/swiper.css'
  ],
  /*
   ** Customize the progress-bar color
   */
  loading: {color: '#3B8070'},
  /*
   ** Build configuration
   */
  build: {
    vendor: [
      'axios',
      'jquery',
      'toastr',
      'swiper',
      'Dropzone'
    ],
    /*
     ** Run ESLINT on save
     */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
/*          loader: 'eslint-loader',*/
          exclude: /(node_modules)/
        })
      }
    }
  }
}
