var url = "https://www.flickr.com/services/rest/?method=flickr.people.getPhotos";
var user = "193212950@N04";

$.ajax({
    url : url,
    dataType : "json",
    data : {
        api_key : "9d33df771d1d59016c37bd7c118d5b28",
        per_page : 40,
        format: "json",
        nojsoncallback : 1,
        user_id : user
    } 
})
.success(function(data){
    console.log(data.photos.photo);
    var imgs = data.photos.photo;

    $(imgs).each(function(index, data){
        var tit = data.title;
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

})
.error(function(err){
    console.log(err);
});

$("body").on("click", "#gallery article .pic", function(){
    var imgSrc = $(this).attr("data-src");

    var tags = `
        <aside id="imgPop">
            <div class="pic">
                <img src="${imgSrc}">
            </div>
            <span>CLOSE</span>
        </aside>
    `;

    $("body").append(tags);
});

$("body").on("click", "#imgPop span", function(){
    $(this).parent("#imgPop").remove();
});