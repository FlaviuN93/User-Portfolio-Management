/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				gray: '#677489',
				darkBlue: '#20293a',
				violet: '#6466e9',
				light2: '#e3e8ef',
				light3: '#f2f5f9',
				lightGray: '#cbcdd1',
				danger: '#ab1b1b',
				black2: '#364153',
				lightViolet: '#e1e7fd',
				darkViolet: '#4138c2',
			},
		},
		screens: {
			mobile: '420px',
			lgMobile: '480px',
			md: '640px',
			tablet: '768px',
			laptop: '1024px',
		},
	},
	plugins: [],
}
