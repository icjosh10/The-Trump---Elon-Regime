// import { dark, light } from './src/lib/data/colors';
import colors from 'tailwindcss/colors';
// fix colors warning v3
delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];
import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import container_query from '@tailwindcss/container-queries';
import scrollbar from 'tailwind-scrollbar';

/** @type {import('tailwindcss').Config} */
const config = {
	darkMode: ['class'],
	content: { files: ['./src/**/*.{html,js,svelte,ts}'] },
	safelist: ['dark'],
	plugins: [container_query, typography, forms, scrollbar({ nocompatible: true })],
	theme: {
		fluid: ({ theme }) => ({
			defaultScreens: [theme('screens.tablet'), theme('screens.desktop')]
		}),
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '4rem'
			},
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'slide-in': 'slide-in 0.3s ease-out'
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 }
				},
				'fade-in': {
					'0%': { opacity: 0 },
					'100%': { opacity: 1 }
				},
				'slide-in': {
					'0%': { transform: 'translateY(10px)', opacity: 0 },
					'100%': { transform: 'translateY(0)', opacity: 1 }
				}
			},
			colors: {
				bg1: 'hsl(var(--bg1))',
				bg2: 'hsl(var(--bg2))',
				bg3: 'hsl(var(--bg3))',
				bg4: 'hsl(var(--bg4))',
				bg5: 'hsl(var(--bg5))',
				bg6: 'hsl(var(--bg6))',
				bg7: 'hsl(var(--bg7))',
				card: 'hsl(var(--card))',
				'card-foreground': 'hsl(var(--card-foreground))',
				popover: 'hsl(var(--popover))',
				'popover-foreground': 'hsl(var(--popover-foreground))',
				primary: 'hsl(var(--primary))',
				'primary-foreground': 'hsl(var(--primary-foreground))',
				secondary: 'hsl(var(--secondary))',
				'secondary-foreground': 'hsl(var(--secondary-foreground))',
				muted: 'hsl(var(--muted))',
				'muted-foreground': 'hsl(var(--muted-foreground))',
				accent: 'hsl(var(--accent))',
				'accent-foreground': 'hsl(var(--accent-foreground))',
				destructive: 'hsl(var(--destructive))',
				'destructive-foreground': 'hsl(var(--destructive-foreground))',
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				text: 'hsl(var(--text))',
				//
				'cyan-contrast': 'hsl(var(--cyan))'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			screens: {
				desktop: '62.5rem', // 1000px
				tablet: '43.75rem' // 700px
			}
		},
		colors: { ...colors },
		fontFamily: {
			roboto: ['Roboto', 'Helvetica', 'Arial', 'sans-serif'],
			fancy: ['DIN Next Rounded LT W01 Bold', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
		}
	}
};

export default config;
