//service toggle---------------------------
const $toggle = $(".toggle");
const $btns = $toggle.find("dt");
const $boxs = $toggle.find("dd");
let speed = 500;
let enableClick = true;

$boxs.slideUp();

$btns.on("click", function(e){
    e.preventDefault();

    if(enableClick){
        enableClick =  false;
        activation(this);
    };
});

function activation(self){
    var isOn = $(self).hasClass("on");

    $btns.removeClass("on")
    $boxs.slideUp(speed);

    if(isOn){
        $(self).removeClass("on")
        $(self).next().slideUp(speed, function(){
            enableClick = true;
        });
    }else { 
        $(self).addClass("on");
        $(self).next().slideDown(speed, function(){
            enableClick = true;
        });
    };
};