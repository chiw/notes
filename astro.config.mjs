import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://chiw.github.io',
  	base: 'notes',
	integrations: [
		starlight({
			title: 'Notes',
			social: {
				github: 'https://github.com/chiw/notes',
			},
			// sidebar: [
			// 	{
			// 		label: 'Guides',
			// 		items: [
			// 			// Each item here is one entry in the navigation menu.
			// 			{ label: 'Example Guide', link: '/guides/example/' },
			// 		],
			// 	},
			// 	{
			// 		label: 'Reference',
			// 		autogenerate: { directory: 'reference' },
			// 	},
			// 	{
			// 		label: 'ssl',
			// 		autogenerate: { directory: 'ssl'}
			// 	}
			// ],
			customCss: [
				// Relative path to your custom CSS file
				'./src/styles/custom.css',
			],
		}),
	],
});
