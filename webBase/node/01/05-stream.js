// stream 数据流

const fs=require("fs");
// let res=fs.readFileSync("1.txt");
// console.log(res.toString());

// let rs=fs.createReadStream("1.txt");

// rs.on("data",chunk=>{
//   console.log(chunk.toString())
// })

// 创建一个大文件
// let buffer=Buffer.alloc(65*1024);

// fs.writeFile('65kb',buffer,err=>{
//   if(err){
//     return console.log(err);
//   }
//   console.log("写入成功")
// })

// 流 会吧64k 的小文件传输
let rs=fs.createReadStream("65kb");
let num=0;
rs.on("data",chunk=>{
  num++;
  console.log(num);
  // console.log(chunk.toString())
})

rs.on("end",()=>{
  
})







