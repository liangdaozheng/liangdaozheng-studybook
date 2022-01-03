// 导入技能
import S1 from '../skills/yase/s1.js';
import S2 from '../skills/yase/s2.js';
import S3 from '../skills/yase/s3.js';

// 导入皮肤
import Skin1 from '../skins/yase/skin1.js'
import Skin2 from '../skins/yase/skin2.js'

import MyEvent from '../myEvent.js';

export default class Yase extends MyEvent{
    constructor(){
        this.name = "亚瑟";
        this.skills = [new S1(),new S2(),new S3()];
        this.skins = [new Skin1(),new Skin2()];
        this.ico = "./sources/heroes/yase1.png";
        this.addEvent('init',this.init)
    }
    init(){
        console.log('start yase')
      }
}
