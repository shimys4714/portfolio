const frame = document.querySelector(".visualWrap");
const items = frame.querySelectorAll("article");
const asidePop = document.querySelector(".visualPop");
const popClose = asidePop.querySelector("span");

for(let el of items){
    el.addEventListener("mouseenter", e=>{
        e.currentTarget.querySelector("video").play();
    });

    el.addEventListener("mouseleave", e=>{
        e.currentTarget.querySelector("video").pause();
    });

    el.addEventListener("click", e=>{
        let tit = e.currentTarget.querySelector("h2").innerText;//해당돔의 텍스트 가져오기
        let txt = e.currentTarget.querySelector("p").innerText;
        let vidSrc = e.currentTarget.querySelector("video").getAttribute("src");

        asidePop.querySelector("h1").innerText = tit;
        //asidePop.querySelector("p").innerText = txt;
        asidePop.querySelector("video").setAttribute("src", vidSrc);
        asidePop.querySelector("video").play();
        frame.classList.add("on");
        asidePop.classList.add("on");
        asidePop.querySelector(".conTxt").classList.add("on");
    });
};

popClose.addEventListener("click", e=>{
    frame.classList.remove("on");
    asidePop.classList.remove("on");
    asidePop.querySelector("video").pause();
    asidePop.querySelector(".conTxt").classList.remove("on");
});