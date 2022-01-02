import Yase from './heroes/yase.js';

export default class Player{
    constructor(name){
        this.name = name;
        this.heroes = [new Yase()];
    }
}