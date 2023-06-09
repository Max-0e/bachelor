import { defineConfig } from 'windicss/helpers';

export default defineConfig({
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				successGreen: '#55BB55',
				successGreenDark: '#339933',
			},
			backgroundColor: {
				successGreen: '#55BB55',
				successGreenDark: '#339933',
			},
		},
	},
	plugins: [],
});
