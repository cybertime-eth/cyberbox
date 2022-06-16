export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Cyberbox - ReFi NFT Marketplace',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {name: 'robots', content: 'max-image-preview:large'},
      {vmid: 'title', hid: 'title', name: 'title', content: 'Cyberbox - ReFi NFT Marketplace'},
      {vmid: 'og:title', hid: 'og:title', property: 'og:title', content: 'Cyberbox - ReFi NFT Marketplace'},
      {vmid: 'description', hid: 'description', name: 'description', content: 'Regenerate nature by trading NFTs on the Celo blockchain. Buy or gift NFT carbon offset certificates. Track your carbon status in realtime.'},
      {vmid: 'og:description', hid: 'og:description', property: 'og:description', content: 'Regenerate nature by trading NFTs on the Celo blockchain. Buy or gift NFT carbon offset certificates. Track your carbon status in realtime.'},
      {vmid: 'og:image', hid: 'og:image', property: 'og:image', content: '/cyberbox.png'},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/var.css'
  ],
  styleResources: {
    scss: ['@/assets/colors.scss']
  },
  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/aos.client.js',
    '@/plugins/analytics.client.js',
    '@/plugins/amplitude.client.js',
    '@/plugins/outside.js',
    '@/plugins/components.js',
    '@/plugins/vue-carousel.client.js',
    '@/plugins/utils.js',
    '@/plugins/bugsnag.js',
    '@/plugins/logrocket.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,
 
  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources', 'nuxt-graphql-request'],

  graphql: {
    /**
     * An Object of your GraphQL clients
     */
    clients: {
      default: {
        endpoint: 'https://api.thegraph.com/subgraphs/name/itdev-1210/cyber-box-certification-five',
        options: {}
      },
      ubeswap: {
        endpoint: 'https://api.thegraph.com/subgraphs/name/ubeswap/ubeswap',
        options: {}
      },
      // ...your other clients
    },
  },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      '@nuxtjs/proxy',
      'nuxt-logrocket',
      ['nuxt-bugsnag', {
        apiKey: 'cef8153f64709623f660870486f23999',
        publishRelease: true,
        reporterOptions: {
          appVersion: 'v1.0.0',
          autoAssignRelease: true
        }
      }]
    ],

    axios: {
      proxy: true
    },

    logRocket: {
      logRocketId: 'gcwpaj/cyberbox',
      devModeAllowed: false,
      config: {
        //
      }
    },

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
      cache: false,
      extend(config, {}) {
        config.node = {
          fs: 'empty'
        }
      }
    }
  }
