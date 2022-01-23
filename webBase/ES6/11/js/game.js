import Event from "./event.js"
import Map from "./map.js"
import Food from "./food.js"
import Snake from "./snake.js"
export default class Game extends Event{
  constructor(el,rect,number=256){
    super();
    this.map=new Map(el,rect);
    this.food=new Food(this.map.cells,this.map.rows,this.creatFoodColor(number));
    this.snake=new Snake(this.map);
    this.map.setData(this.snake.data);
    this.creatFood();
    this.render();
    this.timer=0;
    this.grade=0;
    this.interval=200;
    this.keDown=this.keDown.bind(this);
    this.control();
  }
  render(){
    this.map.clearData();
    this.map.setData(this.snake.data);
    this.map.setData(this.food.data);
    this.map.render();
  }
  start(){
    this.move();
  }
  creatFood(){
    this.food.create();
    if(this.map.include(this.food.data)){
      this.creatFood();
    };
  }
  stop(){
    clearInterval(this.timer);
  }
  move(){
    this.stop();
    this.timer=setInterval(()=>{
      this.snake.move();
      if(this.isEat()){
        this.grade++;
        this.snake.eatFood(this.food.data.color);
        this.creatFood();
        this.changerGrade(this.grade);
        this.interval*=.99;
        this.stop();
        this.start();
        if(this.grade>=20){
          this.over(1);
        }
      };
      if(this.isOver()){
        this.over(0);
        return false;
      }
      this.render();
    },this.interval);
  }
  isEat(){
    return (this.snake.data[0].x === this.food.data.x) && (this.snake.data[0].y === this.food.data.y)
  }
  isOver(){
    if(this.snake.data[0].x<0 || this.snake.data[0].x>=this.map.cells || this.snake.data[0].y<0 || this.snake.data[0].y>=this.map.rows){
      return true;
    };
    for (let index = 1; index < this.snake.data.length; index++) {
      if(this.snake.data[0].x == this.snake.data[index].x && this.snake.data[0].y == this.snake.data[index].y){
        return true;
      }
    };
    return false;

  }
  over(overStatus=0){
    if(overStatus){
      this.dispatch('win')
    }else{
      this.dispatch('over')
    }
    
    this.stop();
  }
  changerGrade(grade){
    this.dispatch('changegrade',grade)
  }
  keDown({keyCode}){
    let isDir;
    switch(keyCode){
      case 37:
        isDir=this.snake.changeDir("left");
        break;
      case 38:
        isDir=this.snake.changeDir("top");
        break;
      case 39:
        isDir=this.snake.changeDir("right");
        break;
      case 40:
        isDir=this.snake.changeDir("bottom");
        break;
    }
    console.log(isDir)
  }
  control(){
    if(this.toControl){
      this.toControl();
      return false;
    }
    window.addEventListener("keydown",this.keDown)
  }
  addControl(fn){
    fn.call(this);
    window.removeEventListener("keydown",this.keDown)
  }
  creatFoodColor(number){
    let outArr=[];
    for (let index = 0; index < number; index++) {
      outArr.push(`rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`)
    };
    return outArr;
  }
}