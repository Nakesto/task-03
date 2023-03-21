export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Vincent Gunawan",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "Vincent Gunawan" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico", as: "icon" },
      {
        rel: "stylesheet prefetch",
        as: "style",
        href: "https://fonts.googleapis.com/css?family=Alfa Slab One",
      },
      {
        rel: "stylesheet prefetch",
        href: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css",
        integrity:
          "sha512-SzlrxWUlpfuzQ+pcUCosxcglQRNAq/DZjVsC0lE40xsADsfeQoEypE+enwcOiGjk/bSuGGKHEyjSoQ1zVisanQ==",
        crossorigin: "anonymous",
        referrerpolicy: "no-referrer",
        as: "style",
      },
      {
        rel: "stylesheet prefetch",
        as: "style",
        href: "https://fonts.googleapis.com/css?family=Montserrat",
      },
    ],
    script: [
      {
        src: "/assets/js/core/jquery.3.2.1.min.js",
      },
      {
        src: "/assets/js/core/popper.min.js",
      },
      {
        src: "/assets/js/plugin/jquery-ui-1.12.1.custom/jquery-ui.min.js",
      },
      {
        src: "/assets/js/plugin/jquery-ui-touch-punch/jquery.ui.touch-punch.min.js",
      },
      {
        src: "/assets/js/plugin/bootstrap-toggle/bootstrap-toggle.min.js",
      },
      {
        src: "/assets/js/plugin/jquery-scrollbar/jquery.scrollbar.min.js",
      },
      {
        src: "/assets/js/plugin/sweetalert/sweetalert.min.js",
      },
      {
        src: "/assets/js/plugin/moment/moment.min.js",
      },
      {
        src: "/assets/js/plugin/datatables/datatables.min.js",
      },
      {
        src: "/assets/js/plugin/bootstrap-tagsinput/bootstrap-tagsinput.min.js",
      },
      {
        src: "/assets/js/plugin/bootstrap-wizard/bootstrapwizard.js",
      },
      {
        src: "/assets/js/plugin/datepicker/bootstrap-datetimepicker.min.js",
      },
      {
        src: "/assets/js/plugin/select2/select2.full.min.js",
      },
      {
        src: "/assets/js/plugin/jquery.sparkline/jquery.sparkline.min.js",
      },
      {
        src: "/assets/js/plugin/bootstrap-notify/bootstrap-notify.min.js",
      },
      {
        src: "/assets/js/plugin/summernote/summernote-bs4.min.js",
      },
      {
        src: "/assets/js/plugin/jquery.validate/jquery.validate.min.js",
      },
      {
        src: "/assets/js/plugin/jquery.validate/jquery.validate.min.js",
      },
      {
        src: "/assets/js/plugin/owl-carousel/owl.carousel.min.js",
      },
      {
        src: "/assets/js/plugin/jquery.magnific-popup/jquery.magnific-popup.min.js",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "@/assets/css/bootstrap.min.css",
    "@/assets/css/atlantis.css",
    "@/assets/css/fonts.min.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/global-components",
    "~/plugins/axios-interceptor.js",
    "~/plugins/vee-validate.js",
    "~/plugins/filters.js",
    "~/plugins/autoFocus.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    "@nuxtjs/router",
    "@nuxtjs/axios",
    "@nuxtjs/auth-next",
    "@nuxtjs/dotenv",
  ],

  router: {
    middleware: ["auth"],
    prefetchLinks: false,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ["vee-validate/dist/rules"],
  },
  auth: {
    strategies: {
      local: {
        token: {
          required: true,
          type: "",
          property: "accessToken",
        },
        user: {
          property: "user",
        },
        endpoints: {
          login: { url: "http://localhost:3200/login", method: "post" },
          user: false,
          logout: false,
        },
      },
    },
    redirect: {
      login: "/login",
      logout: "/login",
      home: "/",
      callback: false,
    },
    rewriteRedirects: true,
  },
};
