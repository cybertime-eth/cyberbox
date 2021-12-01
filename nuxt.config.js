export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'cyberbox',
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
    '@/plugins/aos.client.js'
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
        endpoint: 'https://api.thegraph.com/subgraphs/name/itdev-1210/cyber-box-graph-one',
        options: {},
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
      '@nuxtjs/proxy'
    ],

    axios: {
      proxy: true
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
