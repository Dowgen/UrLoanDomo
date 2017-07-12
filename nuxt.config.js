module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'UrLoan project' }
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
      'swiper'
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
