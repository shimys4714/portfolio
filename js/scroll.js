//DOM Cachimg
const $naviBtns = $("#navi li");
const $mainCon = $(".myScroll");
const len = $naviBtns.length;
let posArr = [];
let mainSpeed = 1000;

//브라우저 화면에서 일정 수치만큼 떨어진 곳에서 박스에서 클래스 on을 걸어주기위한 변수 설정
let baseLine = -100;

//처음 로딩시
setPos();

//브라우저 리사이즈시 다시 세로 위치값을 갱신
$(window).on("resize", setPos);

//화면에서 스크롤할때
$(window).on("scroll", function(){
    const scroll = $(this).scrollTop();
 
    activateBtn(scroll);

 });

//네비 버튼을 클릭했을 때
//기본링크이동 금지
$naviBtns.children("a").on("click", function(e){
    e.preventDefault();

    moveScroll(this);
});

function setPos(){
    
    posArr = []; 
    for( let i = 0; i < len; i++){
        posArr.push($mainCon.eq(i).offset().top);
    }
    console.log(posArr);    
};

//activateBtn 함수호출
//스크롤이 poArr의 순번에 해당하는 값보다 크거나 같다면

//모든 버튼에 on을 제거하고
//해당하는 버튼의 a에 on 추가

//모든 박스에 on을 제거
//해당순번- 화면에 보일 박스에 클래스 on 추가  

function activateBtn(scroll){
    for( let i = 0; i < len; i++){
       if(scroll >= posArr[i] + baseLine){
          $naviBtns.children("a").removeClass("on");
          $naviBtns.eq(i).children("a").addClass("on");
 
          $mainCon.removeClass("on");
          $mainCon.eq(i).addClass("on");
       }
    }
};

//moveScroll 함수 호출
//클릭한 버튼에서 href값을 구해서 변수 target에 담고
//클릭한 버튼에 해당하는 target의 세로 위치값을 변수 targetPos에 담는다.
//문서가 스크롤바 위치값이 targetPos에 맞춰 이동하도록 animate로 이동하도록 처리
function moveScroll(el){

    const target = $(el).attr("href");
    const targetPos = $(target).offset().top;
    $("html, body").animate({
        scrollTop : targetPos
    },mainSpeed);
};


