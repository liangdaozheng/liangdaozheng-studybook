import logo from './src/images/logo.png'

console.log(logo);

const img = new Image()
img.src = logo
document.body.appendChild(img)

import './src/css/index.css'

import indexMd from './src/docs/index.md'

document.body.innerHTML += indexMd

import(/* webpackChunkName: 'axios', webpackPreload: true */ 'axios')
	.then(({default: axios}) => {
		axios.get('/api/user')
			.then(res => {
				console.log(res);
			})
	})

/*
*

工程化

	模块化

	组件化

	规范化

	自动化
	*
	*
	*

## 常用linux命令

open 打开文件或文件夹

touch 创建文件

rm 删除文件

mkdir 创建目录

ls 输出当前目录文件

lsof -i:port 查看端口占用

kill pid 杀死对应进程
*
* */
