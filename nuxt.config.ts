// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	app: {
		head: {
			title: "Taskman - Task Manager App",
			charset: "utf-8",
			viewport: "width=device-width, initial-scale=1",

			meta: [
				{ charset: "utf-8" },
				{ name: "viewport", content: "width=device-width, initial-scale=1" },
				{
					hid: "description",
					name: "description",
					content: "Taskmam - Task manager app",
				},
				{ name: "format-detection", content: "telephone=no" },
			],
			link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
		},
	},

	devtools: {
		enabled: process.env.NODE_ENV === "development",
		timeline: {
			enabled: true,
		},
	},

	ssr: false,
	css: ["~/assets/scss/main.scss"],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData:
						'@use "@/assets/scss/_colors.scss" as *; ' + '@use "@/assets/scss/_reset.scss" as *;',
				},
			},
		},
	},
	router: {
		middleware: ["auth"],
	},
	modules: [
		["@pinia/nuxt", { autoImports: ["defineStore"] }],
		"@nuxtjs/google-fonts",
		"@nuxt/image",
	],

	runtimeConfig: {
		public: {
			apiBaseUrl: process.env.API_BASE_URL,
		},
	},

	googleFonts: {
		display: "swap",
		preload: true,
		families: {
			Sora: {
				wght: [200, 300, 400, 500, 600, 700],
			},

			Poppins: {
				wght: [200, 300, 400, 500, 600, 700],
			},
		},
	},
});
