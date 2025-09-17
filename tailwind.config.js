export default {
	content: ['./index.html','./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				bg:'#0b0e14',
				card:'#11151f',
				psbg:		'#012456',
				accent:	'#7aa2f7',
				accent2:'#f7768e',
		},
		fontFamily: {
			mono: ['ui-monospace','SFMono-Regular','Menlo','Consolas','Liberation Mono','monospace'],
		},
		boxShadow: {
			soft: '0 6px 24px rgba(0,0,0,.25)',
		}
		},
	},
	plugins: [],
}
