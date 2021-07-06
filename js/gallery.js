var url = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos";
var key = "9d33df771d1d59016c37bd7c118d5b28";
var user = "193212950@N04";

//flickr 갤러리 데이터 호출
getFlicker(url, key, 15);

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
    
        setTimeout(function(){
            iso = new Isotope("#gallery",{ 
                itemSelector : "article",
                columWidth : "article",
                transitionDuration : "2s",
                percentPosition : true
            });
            $("article").addClass("on")
        },500)
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
