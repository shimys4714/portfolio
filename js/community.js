//news 이미지 -----------------
const news = document.querySelector("#news");
const lists = news.querySelectorAll("article");
const len = lists.length;
let num = 0;

for(let i=0; i<len; i++){
    let pic = lists[i].querySelector(".pic");
    
    pic.style.backgroundImage = `url(img/3_community/news${i+1}.jpg)`;
}

//Q&A 테이블--------------------------------
const url = "data/board.json";
const frame = $(".community .inner .table");
const resultData = callData(url);

createTable(frame, resultData);

function callData(url){
    let result;

    $.ajax({
        url : url,
        dataType : "json",
        async : false
    })
    .success((data)=>{
        result = data.board;
    })
    .error((err)=>{
        console.error(err);
    });

    return result;
}

function createTable(target, data){

    target.append(
        $("<table>")
            .attr("summery", "자유게시판의 번호, 제목, 작성자")
            .append(
                $("<caption class='h'>").text("자유게시판"),
                $("<thead>")
                    .append(
                        $("<tr>")
                            .append("<th scope='col'>No</th>")
                    ),
                $("<tbody>")
            )
    );

    for(let key in data[0]){
        console.log(key);

        target.find("thead tr")
            .append(
                $("<th scope='col'>").text(key)
            )
    }

    for(let i=0; i<data.length; i++){           
        target.find("tbody")
            .prepend(
                $("<tr>")
                    .append(
                        $("<td>").text(i+1),
                        $("<td>")                        
                            .append(
                                $("<a>").attr("href","#").text(data[i].Title)
                            ),
                        $("<td>").text(data[i].Writer),
                        $("<td>").text(data[i].Date)                        
                    )
            )
    }
}
