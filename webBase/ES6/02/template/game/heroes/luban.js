// 导入技能
import S1 from '../skills/luban/s1.js';
import S2 from '../skills/luban/s2.js';
import S3 from '../skills/luban/s3.js';

// 导入皮肤
import Skin1 from '../skins/luban/skin1.js'
import Skin2 from '../skins/luban/skin2.js'



export default class Luban{
  constructor(){
      this.name = "鲁班";
      this.skills = [new S1(),new S2(),new S3()];
      this.skins = [new Skin1(),new Skin2()];
      this.ico = "./sources/heroes/luban1.png";
  }
}