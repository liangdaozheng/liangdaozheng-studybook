// 和视图有关系的
/* 
// 单一原则
  鲁班  亚瑟 技能 皮肤 玩家  游戏管理  根据需求分析对象
  对象--->抽象--》类 ---》抽象基类--》组织逻辑关系。。。（模块化）
game{
    login(username){
        player
    }
}

 player {
     name:"张三",
     heroes:[
        luban:{
            name:"鲁班",
            skills:[],
            skins:[],
            ico:''
        }
        yase:{
            name:"yase",
            skills:[],
            skins:[],
             ico:''
        }
     ]
 }
*/

import Game from './game/game.js';
let game = new Game();
// console.log(game);
document.querySelector(".sub").onclick = function(){
    let username = document.querySelector(".username").value;
    game.login(username);
    console.log(game); 
    renderHeroes(game.player.heroes);
    document.querySelector(".login").style.display = "none";
    document.querySelector(".game").style.display = "block";
    document.querySelector(".chioseusername").innerHTML = username;
}

// 渲染英雄
function renderHeroes(heroes){
    document.querySelector(".heroView").innerHTML = "";
    heroes.forEach(hero=>{
        let heroDiv = document.createElement("div");
        heroDiv.classList.add("heroItem");
        heroDiv.innerHTML = `<img src="${hero.ico}" />
        <span>${hero.name}</span>`;
        document.querySelector(".skillsView").innerHTML = "";
        document.querySelector(".skinView").innerHTML = "";
        heroDiv.onclick = function(){
            renderSkills(hero.skills);
            renderSkins(hero.skins);
            document.querySelector(".heroShow").innerHTML = `<img src="${hero.ico}" />`
        }
        document.querySelector(".heroView").appendChild(heroDiv);
    })
}

// 渲染技能
function renderSkills(skills){
    // console.log(skills)
    document.querySelector(".skillsView").innerHTML = "";
    // 渲染技能
    skills.forEach(skill=>{
        let img = document.createElement("img");
        img.src = skill.ico;
        document.querySelector(".skillsView").appendChild(img);
    })
}


// 渲染皮肤
function renderSkins(skins){
    document.querySelector(".skinView").innerHTML = "";
    skins.forEach(skin=>{
        let skinItem = document.createElement("div");
        skinItem.classList.add("skinItem");
        skinItem.innerHTML = `<img src="${skin.ico}" />
        <span>${skin.name}</span>`;
        skinItem.onclick = function(){
            document.querySelector(".skinShow").innerHTML = `<img src='${skin.img}' />`;
        }
        document.querySelector(".skinView").appendChild(skinItem);
    })
}




// 切换
document.querySelector(".heroBtn").onclick = function(){
    document.querySelector(".heroContainer").style.display = "block";
    document.querySelector(".skinContainer").style.display = "none";
}

document.querySelector(".skinBtn").onclick = function(){
   
    document.querySelector(".heroContainer").style.display = "none";
    document.querySelector(".skinContainer").style.display = "block";
}

// 作业： 实现一个鲁班英雄 实现鲁班渲染和 技能渲染。