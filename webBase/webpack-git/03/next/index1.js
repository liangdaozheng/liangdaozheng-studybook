const inquirer = require('inquirer')
const Rx = require('rxjs')
const prompts = new Rx.Subject();

inquirer.prompt(prompts)

prompts.next({
	name: 'Please pick a preset',
	type: 'list',
	choices: [
		'Default ([Vue 2] babel, eslint)',
		'Default (Vue 3 Preview) ([Vue 3] babel, eslint)',
		'Manually select features'
	]
})

prompts.next(
		{
			name: 'Check the features needed for your project',
			type: 'checkbox',
			choices: [
				'Choose Vue version',
				'Babel',
				'TypeScript',
				'Progressive Web App (PWA) Support',
				'Router',
				'Vuex',
				'CSS Pre-processors',
				'Linter / Formatter',
				'Unit Testing',
				'E2E Testing'
			],
			default: [
				'Choose Vue version',
				'Babel',
				'Linter / Formatter',
			]
		}
)

// prompts.done()
prompts.complete()

// inquirer.prompt([
// 	{
// 		name: 'Please pick a preset',
// 		type: 'list',
// 		choices: [
// 			'Default ([Vue 2] babel, eslint)',
// 			'Default (Vue 3 Preview) ([Vue 3] babel, eslint)',
// 			'Manually select features'
// 		]
// 	},
// 	{
// 		name: 'Check the features needed for your project',
// 		type: 'checkbox',
// 		choices: [
// 			'Choose Vue version',
// 			'Babel',
// 			'TypeScript',
// 			'Progressive Web App (PWA) Support',
// 			'Router',
// 			'Vuex',
// 			'CSS Pre-processors',
// 			'Linter / Formatter',
// 			'Unit Testing',
// 			'E2E Testing'
// 		],
// 		default: [
// 			'Choose Vue version',
// 			'Babel',
// 			'Linter / Formatter',
// 		]
// 	},
// 	{
// 		name: 'Choose a version of Vue.js that you want to start the project with (Use arrow keys)',
// 		type: 'expand',
// 		choices: [
// 			{
// 				key: '1',
// 				value: '2.x'
// 			},
// 			{
// 				key: '2',
// 				value: '3.x'
// 			}
// 		]
// 	}
// ])
