var url = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos";
var key = "9d33df771d1d59016c37bd7c118d5b28";
var user = "193212950@N04";

//flickr 갤러리 데이터 호출
getFlicker(url, key, 20);

function getFlicker(url, key, num){
    $.ajax({
        url : url,
        dataType : "json",
        data : {
            api_key : key,
            per_page : num,
            format: "json",
            nojsoncallback : 1,
            user_id : user,
        } 
    })
    .success(function(data){
        console.log(data.photos.photo);
        var imgs = data.photos.photo;
    
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
    
        setTimeout(function(){
            iso = new Isotope("article", { 
                itemSelector : "article",
                columWidth : "article",
                transitionDuration : "0.5s",
                percentPosition : true
            });
            $("article").addClass("on")
        },1000)
    })
    .error(function(err){
        console.log(err);
    })
};

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
    $("body").append(tags).fadeIn();
});

//이미지 닫기 버튼 
$("body").on("click", "#imgPop span", function(e){
    e.preventDefault();

    $(this).parent("#imgPop").fadeOut(500, function(){
        $(this).remove();
    });
});

//youtube 데이터 호출-------------------------------------
callData({
    target : ".swiper-wrapper",
    key: "AIzaSyDOSnqALQfHxM4ffPCF7DwTOBnzaNHmlNM",
    count : 5,
    playlist : "PL7hVQ41w3GSlVLbpnyVfCrkahRjo10718" 
});

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

            var videoHref = data.snippet.resourceId.videoId;

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
    })
    .error(function(err){
        console.log(err);
    })
};