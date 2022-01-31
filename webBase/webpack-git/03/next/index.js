const ora = require('ora')

// 美化命令行加载样式
const spinner = ora({
	text: '加载中...'
}).start()

// setTimeout(() => {
// 	spinner.succeed('加载成功')
// }, 2000)

// const download = require('download-git-repo')
//
// download('ImJustAMan/mini-webpack-template', './template', err => {
// 	if(err) spinner.fail('加载失败');
// 	spinner.succeed('加载成功')
// })
const fs = require('fs')
const content = fs.readFileSync('./template/package.json', 'utf8')

const ejs = require('ejs')

console.log(ejs.render(content, {name: process.cwd().split('/')[process.cwd().split('/').length - 1]}))
