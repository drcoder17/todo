module.exports = {
	purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
	darkMode: false,
	theme: {
		extend: {
			screens: {
				xs: { min: '350px', max: '500px' },
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
