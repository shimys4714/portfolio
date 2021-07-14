//유튜브 Api 호출
$.ajax({
    url:"https://www.googleapis.com/youtube/v3/playlistItems",
    dataType:"jsonp", 
    data:{
        part:"snippet", 
        key:"AIzaSyDOSnqALQfHxM4ffPCF7DwTOBnzaNHmlNM",  
        maxResults : 6, 
        playlistId: "PL7hVQ41w3GSnF__Bxz4dNxR_jCB2Fd4w9" 
    }
})
.success(function(data){
    var items = data.items;
    var result = "";

    $(items).each(function(index, data){
        console.log(data);

        var title = data.snippet.title;
        if(title.length > 50){
            title = title.substr(0,50) + "...";
        };

        var contents = data.snippet.description;
        if(contents.length > 100){
            contents = contents.substr(0,70) + "...";
        };

        var date = data.snippet.publishedAt;
        date = date.split("T")[0];
        
        result += `
            <article>
                <a href=${data.snippet.resourceId.videoId} class="pic">
                    <img src=${data.snippet.thumbnails.high.url}>
                </a>
                <div class="con">
                    <h2>${title}</h2>
                    <p>${contents}</p>
                    <span>${date}</span>
                </div>
            </article>
        `;
    });
    $(".vidList").append(result);
})
.error(function(err){
    console.error(err)
});

$("body").on("click",".vidList article", function(e){
    e.preventDefault();
    var vidSrc = $(this).find(".pic").attr("href");
    console.log(this);

    var tags = `
        <aside class="vidPop">
            <div class="inner"></div>
            <span>CLOSE</span>
        </aside>
    `;
    $("body").append(tags);
    $(".vidPop").fadeIn();
    $(".vidPop .inner").append(
        $("<iframe>")
            .attr({
                src : "https://www.youtube.com/embed/"+vidSrc,
                frameborder : 0,
                allowfullscreen : true,
                width: "80%",
                height: "80%"
            })
            .css({
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)"
            })
    );
});

$("body").on("click", ".vidPop span", function(){
    $(this).parent().fadeOut(400, function(){
        $(this).find("iframe").remove();
    });
});

//more story 이미지----------
//news 이미지 -----------------
const story = document.querySelector("#more");
const lists = story.querySelectorAll("article");
const len = lists.length;
let num = 0;

for(let i=0; i<len; i++){
    let pic = lists[i].querySelector(".pic");
    
    pic.style.backgroundImage = `url(img/5_youtube/story${i+1}.jpg)`;
}
