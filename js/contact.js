var container = document.querySelector("#map"); //연결할 맵의 선택자
var branch_btns = document.querySelectorAll(".branch li"); //지점보기 버튼 선택자
var active_btn = document.querySelector(".branch li.on"); //지점버튼의 활성화 선택자명
var active_index = active_btn.getAttribute("data-index"); //해당 버튼의 data-index속성값 

var t_on = document.querySelectorAll(".traffic li")[0]; //트래픽 보기 버튼 선택자
var t_off = document.querySelectorAll(".traffic li")[1]; //트래픽 숨기기 버튼 선택자

var drag = true; //드래그 가능
var zoom = true; //줌 가능

//처음 로딩완료시 출력될 지도의 경도, 위도
//1.구글맵에서 검색해서 경도,위도값 구함 (위치값이 정밀하지 못함)
//2.카카오맵 api에서 클릭으로 마커표시 샘플코드 (위의 위치값을 적용)
//3.해당 위치에서 우리가 원하는 위치를 정밀하게 마커로 찍어서 표시 (위도, 경도값) 구함
var options = { 
	center: new kakao.maps.LatLng(37.49595906855047 ,127.02796555611167), 
	level: 3
};

//각각의 본점, 지점의 이름, 위도,경도, 마커이미지, 마커수정위치값, 매칭되는 버튼을 등록
var markerOptions = [
    {
        title:"본점", 
        latlng: new kakao.maps.LatLng(37.49595906855047 ,127.02796555611167),
        imgSrc : 'img/locationIcon11.png', 
        imgSize: new kakao.maps.Size(100,98),//이미지 픽셀
        imgPos : { offset: new kakao.maps.Point(50,88)}, 
        button: branch_btns[0]
    },
    {
        title:"지점1", 
        latlng: new kakao.maps.LatLng(37.57086919829189,126.97617209688083),
        imgSrc : 'img/locationIcon11.png',
        imgSize: new kakao.maps.Size(100,98),
        imgPos : { offset: new kakao.maps.Point(50,88)},
        button: branch_btns[1]
    },
    {
        title:"지점2", 
        latlng: new kakao.maps.LatLng(37.39415926694563,127.11040640371255),
        imgSrc : 'img/locationIcon11.png', 
        imgSize: new kakao.maps.Size(100,98),
        imgPos : { offset: new kakao.maps.Point(50,88)},
        button: branch_btns[2]
    }
]; 


//카카오맵 인스턴스 생성 및 기능 활성화
var map = new kakao.maps.Map(container, options);
var mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMRIGHT);


//마커 옵션 갯수만큼 반복을 돌며 마커 생성 및 지점 보기 버튼 이벤트 연결
for(var i=0; i< markerOptions.length; i++){
    new kakao.maps.Marker({
        map:map,
        position:markerOptions[i].latlng,
        title: markerOptions[i].title, 
        image: new kakao.maps.MarkerImage(markerOptions[i].imgSrc, markerOptions[i].imgSize, markerOptions[i].imgPos)
    });

    (function(index){
        markerOptions[index].button.onclick = function(e){         
             e.preventDefault(); 
                        
            for(var k=0; k<markerOptions.length; k++){
                markerOptions[k].button.classList.remove("on"); 
            }
            markerOptions[index].button.classList.add("on"); 
            moveTo(markerOptions[index].latlng); 
        }
    })(i);   
}

function moveTo(target){
    var moveLatLon = target; 
    map.setCenter(moveLatLon); 
}  


//브라우저 리사이즈시 마커 중앙 유지
window.onresize = function(){   
    map.setCenter(markerOptions[active_index].latlng);
}
 

//트래픽 보기 버튼 이벤트 연결
t_on.addEventListener("click", function(e){
    e.preventDefault(); 

    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC); 
    t_on.classList.add("on"); 
    t_off.classList.remove("on"); 
}); 
t_off.addEventListener("click", function(e){
    e.preventDefault(); 
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    t_on.classList.remove("on"); 
    t_off.classList.add("on"); 
});

//지도 드래그 기능 함수
setDraggable(drag);
function setDraggable(draggable) {    
    map.setDraggable(draggable);    
}

//지도 줌 기능 함수
setZoomable(zoom);
function setZoomable(zoomable) {
    // 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
    map.setZoomable(zoomable);    
}

 