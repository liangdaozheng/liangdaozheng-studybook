
const mainController =require("../controllers/main");





const routes=[
  {
    method:'get',
    url:'/',
    middlewares:[
      mainController.main
    ]
  }
]

module.exports={
  routes
}