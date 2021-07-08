const btnMo = document.querySelector(".btnMo");
const menuMo = document.querySelector(".menuMo");

btnMo.onclick = function(e) {
    e.preventDefault();

    btnMo.classList.toggle("on");
    menuMo.classList.toggle("on");
}

$("#gnb>li").on("mouseenter", function(){
    $(this).find(".sub").show();
});
$("#gnb>li").on("mouseleave", function(){
    $(this).find(".sub").hide();
});
