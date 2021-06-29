const btnMo = document.querySelector(".btnMo");
const menuMo = document.querySelector(".menuMo");

btnMo.onclick = function(e) {
    e.preventDefault();

    btnMo.classList.toggle("on");
    menuMo.classList.toggle("on");
}