
const frame = document.querySelector("#team");
const lists = frame.querySelectorAll("article");
const len = lists.length;
let num = 0;

for(let i=0; i<len; i++){
    let pic = lists[i].querySelector(".pic");
    
    pic.style.backgroundImage = `url(img/2_team/team${i+1}.jpg)`;
}