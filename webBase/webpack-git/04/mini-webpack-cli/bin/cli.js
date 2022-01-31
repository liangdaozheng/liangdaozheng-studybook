
#! /usr/bin/env/ node


console.log("this is cli")
const {program}=require("commander");

program
    
    .version("1.0.0.1","-v, --version")
    .usage('<command> [option]')
    .option('-b, --black','配置黑色',true)
program
    .command('init <filename>')
    .description('初始化项目')
    .option('-c, --color','是否财商')
    .action((filename="test-default",args)=>{
      console.log(filename)
      const {color}=args
      console.log(color)
    })
program
    .command('bulid','build 打包项目')
program
    .parse()