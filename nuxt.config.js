export default {
  privateRuntimeConfig: {
    axios: {
      baseURL: process.env.NODE_ENV === 'production' ? '' : 'http://localhost:8001'
    }
  },
  head: {
    title: 'Get ON',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '@/assets/css/app.css'
  ],
  plugins: [
    '@/plugins/init.client.js',
    '@/plugins/axios.js',
  ],
  components: true,
  buildModules: [
    '@nuxtjs/tailwindcss',
  ],
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy'
  ],
  proxy: {
    '/dev/': { target: 'http://localhost:8001', pathRewrite: { '^/dev/': '' } }
  },
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },
  build: {
  }
}
