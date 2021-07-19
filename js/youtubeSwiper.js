//1. 유투브 데이터 호출
callData({
    target : ".swiper-wrapper",
    key: "AIzaSyDOSnqALQfHxM4ffPCF7DwTOBnzaNHmlNM",
    count : 4,
    playlist : "PL7hVQ41w3GSmbKLxyH7CUN8Lmx1DmQUDD" 
});

//3. 이미지 클릭 > 비디오 재생 팝업창 생성 
$("body").on("click", ".swiper-slide .pic", function(e){
    e.preventDefault();
   
    var vidId = $(this).children("a").attr("href");
    
    createPop({
        width: "100%",
        height: "100vh",
        background: "rgba(0,0,0,0.9)",
        vidId : vidId
    });

    $("body").css({ overflow: "hidden"});
});

//4. 팝업창 닫기
$("body").on("click",".pop .close",function(e){
    e.preventDefault();
    $(this).parent(".pop").remove();
    //화면 스크롤 원상태로
    $("body").css({ overflow: "auto"});
});

//4. 팝업창 함수 
 function createPop(opt){
    
    $("body")
       .append(
           $("<aside class='pop'>")
               .css({
                   //함수 호출시 수정할 옵션값 지정
                   width: opt.width,
                   height: opt.height,
                   background: opt.background,
                   position: "fixed",
                   top: "50%",
                   left: "50%",
                   transform: "translate(-50%, -50%)",
                   padding: 100,
                   boxSizing: "border-box"
               })
               .append(
                   $("<a href='#' class='close'>")
                       .text("close")
                       .css({
                           position: "absolute",
                           top: 20,
                           right: 20,
                           color: "#fff"
                       }),
                   $("<img src='img/loading.gif'>")
                       .css({
                           width: 400,
                           position: "absolute",
                           top: "50%",
                           left: "50%",
                           transform: "translate(-50%, -50%)"
                       }),
                   $("<div class='con'>")
                       .css({
                           width: "100%",
                           height: "100%",
                           position: "relative",
                           display : "none"
                       })
                       .append(
                           $("<iframe>")
                               .attr({
                                   src : "https://www.youtube.com/embed/"+ opt.vidId,
                                   frameborder:0,
                                   allowfullscreen:true,//큰화면 확대
                                   width: "100%",
                                   height: 600
                               })
                       )

               )

       )
   //로딩이미지가 먼저 보이고 1초 후에 영상 보이게하고 부드럽게 이미지 제거 
   setTimeout(function(){
       $(".pop .con").fadeIn(500, function(){
           $(this).prev().remove();
       })
   }, 1000);
};

//2.함수 -  유투브 데이터 호출 
function callData(opt){
    $.ajax({
        url : 'https://www.googleapis.com/youtube/v3/playlistItems',
        dataType : "jsonp", //보안필요
        data : {
            part: "snippet",
            key: opt.key,
            maxResults : opt.count,
            playlistId : opt.playlist
        }
    })
    .success(function(data){
        console.log(data.items);

        var item = data.items;

        $(item).each(function(index, data){

            var title_txt = data.snippet.title;
            var leng = title_txt.length;
            (leng > 30) ? title_txt = title_txt.substr(0,30)+"..." : title_txt;

            var p_txt = data.snippet.description;
            var len = p_txt.length;
            (len > 60) ? p_txt = p_txt.substr(0,50)+"..." : p_txt;
            
            var date = data.snippet.publishedAt;
            date = date.split("T")[0];

            $(opt.target)
                .append(
                    $("<div class='swiper-slide'>")
                        .append(
                            $("<div class='pic'>")
                                .append(
                                    $("<a>")
                                    .attr({href : data.snippet.resourceId.videoId })
                                    .css({backgroundImage: "url("+data.snippet.thumbnails.high.url+")" })
                                ),
                            $("<div class='con'>")
                                .append(
                                    $("<h2>").text(title_txt),
                                    $("<p>").text(p_txt),
                                    $("<span>").text(date)
                                )
                        )
                )
        });
        var swiper = new Swiper("#gallery_main",{
            direction : "horizontal",
            autoplay: {
                delay: 2500,
                disableOnInteraction: false,
              },
            loop : true,
            navigation : {
                nextEl : ".swiper-button-next",
                prevEl : ".swiper-button-prev"
            },
            keyboard: {
                enabled: true,
              },
            spaceBetween : 0,
            slidesPerView : "auto",
            centeredSlides : true,
            effect : "coverflow",
            coverflowEffect : {
                rotate: 0, //슬라이드 회전각
                stretch: -100, //슬라이더간 거리
                depth: 200, //깊이 효과값
                modifier: 1, //효과 배수
                slideShadows: false,  //그림자효과
            }
        });
    })
    .error(function(err){
        console.log(err);
    })
};
