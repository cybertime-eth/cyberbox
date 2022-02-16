export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'CyberBox - NFT Marketplace on Celo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''},
      {name: 'format-detection', content: 'telephone=no'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/logo.svg'}
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
    '@/plugins/outside.js',
    '@/plugins/components.js',
    '@/plugins/utils.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxtjs/style-resources', 'nuxt-graphql-request', '@nuxtjs/google-analytics'],

  graphql: {
    /**
     * An Object of your GraphQL clients
     */
    clients: {
      default: {
        endpoint: 'https://api.thegraph.com/subgraphs/name/itdev-1210/celo-add-four-nft-four',
        options: {}
      },
      secondClient: {
        // ...client config
      },
      // ...your other clients
    },
  },

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
      // https://go.nuxtjs.dev/axios
      '@nuxtjs/axios',
      '@nuxtjs/proxy',
      '@nuxtjs/gtm'
    ],

    axios: {
      proxy: true
    },

    googleAnalytics: {
      id: 'G-55W61832ZQ',
      layer: 'dataLayer',
      pageTracking: true
    },

    gtm: {
      id: 'GTM-WR8Q7LM',
      layer: 'dataLayer',
      pageTracking: true,
      enabled: true
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
