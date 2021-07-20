var url = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos";
var url_search = "https://www.flickr.com/services/rest/?method=flickr.photos.search";
var key = "9d33df771d1d59016c37bd7c118d5b28";
var user = "193212950@N04";
var target = document.querySelector("article");
var targetEl = "#gallery article";


//flickr 갤러리 데이터 호출
getFlicker(url, key, 15);

$("body").on("click", "#search .textSearch button", function(e){
    //e.preventDefault();
    
    var tags = $(this).prev().val();

    getFlicker(url_search, key, 15, tags);
    console.log();
});

//이미지 클릭시 클릭시 팝업
$("body").on("click", "#gallery article .pic", function(e){
    e.preventDefault();

    var imgSrc = $(this).attr("data-src");

    var tags = `
        <aside id="imgPop">
            <div class="pic">
                <img src="${imgSrc}">
            </div>
            <span>CLOSE</span>
        </aside>
    `;
    $("#imgPop").fadeIn();
    $("body").append(tags);
});

//이미지 닫기 버튼 
$("body").on("click", "#imgPop span", function(e){
    e.preventDefault();

    $(this).parent("#imgPop").fadeOut(500, function(){
        $(this).remove();
    });
});

//flicker 데이터 호출 함수
function getFlicker(url, key, num, tags){

    var result = {};
    //아이디 이미지 전용 옵션 객체
    var opt_id = { 
        api_key : key,
        per_page : num,
        format: "json",
        nojsoncallback : 1,
        user_id : user,
        tag_mode : "any",
        privacy_filter : 5
    };

    //키워드 검색 이미지 전용 옵션 객체
    var opt_search = { 
        api_key : key,
        per_page : num,
        format: "json",
        nojsoncallback : 1,
        tags : tags,
        tag_mode : "any",
        privacy_filter : 5
    };

    if(tags==undefined){
        result = opt_id;
    }else{
        result = opt_search;
    };

    $("article").removeClass("on");
    $.ajax({
        url : url,
        dataType : "json",
        data : result 
    })
    .success(function(data){
        console.log(data.photos.photo);
        var imgs = data.photos.photo;

        $("#gallery article").empty();
    
        $(imgs).each(function(index, data){
            var tit = data.title;
            if(!data.title) tit = "default text";

            var imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_m.jpg`;
            var imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_b.jpg`;
        
            var tags = `
                <article>
                    <div class="inner">
                        <div class="pic" data-src=${imgSrcBig}>
                            <img src="${imgSrc}">
                        </div>
                        <h2>${tit}</h2>
                    </div>
                </article>
            `;
            $("#gallery").append(tags);
        })
    
        //isotope 플러그인 적용
        setTimeout(function(){
            iso = new Isotope("#gallery",{ 
                // layoutMode: 'packery',
                itemSelector : "article",
                //columWidth : "article",
                transitionDuration : "1s",
                percentPosition : true
            });
            $("article").addClass("on")
        },500)
    })
    .error(function(err){
        console.log("데이터를 불러오는데 실패했습니다.");
    })
};
