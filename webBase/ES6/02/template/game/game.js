// 游戏管理类
import Player from './player.js';

export default class Game{
    constructor(){
        this.player = null;
    }
    login(username){
        this.player = new Player(username);
    }
}
