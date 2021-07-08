const btnMo = document.querySelector(".btnMo");
const menuMo = document.querySelector(".menuMo");

btnMo.onclick = function(e) {
    e.preventDefault();

    btnMo.classList.toggle("on");
    menuMo.classList.toggle("on");
}

//gnb 활성화
$(".gnb>li").on("mouseenter", function(){
    $(this).find(".sub").show();
});
$(".gnb>li").on("mouseleave", function(){
    $(this).find(".sub").hide();
});

//gnb 포커스 활성화
$(".gnb>li").each(function(index){
    //1depth1에 첫번째 a요소에 포커스인 이벤트 연결
    $(".gnb>li").eq(index).find("a").first().on("focusin", function(){
        $(".gnb>li").eq(index).find(".sub").show(); 
    });     
    //length li에 마지막 a요소에 fouseout이벤트 연결
    $(".gnb>li").eq(index).find("a").last().on("focusout", function(){
        $(".gnb>li").eq(index).find(".sub").hide(); 
    });
});