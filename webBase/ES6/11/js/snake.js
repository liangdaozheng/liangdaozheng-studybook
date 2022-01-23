export default class Snake{
  constructor(){
    this.data=[
      {x:6,y:4,color:'green'},
      {x:5,y:4,color:'red'},
      {x:4,y:4,color:'white'},
      {x:3,y:4,color:'blue'},
      {x:2,y:4,color:'pink'},
    ];
    this.direction="right";
  }
  move(){
    let index=this.data.length-1;
    this.lastData={
      x:this.data[index].x,
      y:this.data[index].y,
      color:this.data[index].color,
    }
    for (index; index > 0; index--) {
      this.data[index].x=this.data[index-1].x;
      this.data[index].y=this.data[index-1].y;
    }
    switch(this.direction){
      case "left":
        this.data[0].x--;
        break;
      case "right":
        this.data[0].x++;
        break;
      case "top":
        this.data[0].y--;
        break;
      case "bottom":
        this.data[0].y++;
        break;
    }
  }
  changeDir(dir){
    if(this.direction === "left" || this.direction === "right"){
      if(dir === "left" || dir === "right"){
        return false;
      };
    }else{
      if(dir === "top" || dir === "bottom"){
        return false;
      };
    }
    this.direction=dir;
    return true;
  }
  eatFood(color){
    this.lastData.color=color;
    this.data.push(this.lastData);
  }
  
}
