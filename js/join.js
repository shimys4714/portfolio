$("input[type=submit]").on("click", function(e){
    if(!isTxt("userid",5)) e.preventDefault();
    if(!isPwd() || !conPwd("pwd1", "pwd2")){
        e.preventDefault();
    };
    if(!isTxt("email",5)) e.preventDefault();
    if(!isSelect("email2")) e.preventDefault(); 
    if(!isDate("birth")) e.preventDefault();
    if(!isCheck("gender")) e.preventDefault();
    if(!isTxt("message",5)) e.preventDefault();

});

//function--------------------------------

//아이디 인증
function isTxt(name, len){
    if(len == undefined) len =5;
    let txt = $("[name=" + name + "]").val();
    
    if(txt == ""){
        $("[name=" + name + "]").siblings("p").show();
        return false;
    }else{
        if(txt.length >= len) {
            $("[name=" + name + "]").siblings("p").hide();
            return true;
        }
        else{
            $("[name=" + name + "]").siblings("p").show();
                return false;
        }
    }
}

//비밀번호 인증
function isPwd(){
    let $pwd1 = $("input[name='pwd1']");
    let $pwd2 = $("input[name='pwd2']");
    let pwd1 = $pwd1.val();
    let pwd2 = $pwd2.val();

    let i = 0;

    let eng = /[a-zA-Z]/;
    let num = /[0-9]/;
    let spc = /[~!@#$%^&*()_+]/;

    
    //0글자일때 
    if(pwd1.length == 0){
        $pwd1.siblings("span").show().addClass("error");
        $pwd1.siblings("p").show();
        $pwd2.siblings("p").show();
        return false;
    }else{
        //1. 5글자 이상
        if(pwd1.length >=5 ){
            i++;
            $pwd1.siblings(".leng").removeClass("error");
            $pwd1.siblings(".leng").addClass("true");
        }else {
            $pwd1.siblings(".leng").removeClass("true");
            $pwd1.siblings(".leng").addClass("error");
        }
        //2. 영문자
        if(eng.test(pwd1)){
            i++;
            $pwd1.siblings(".eng").removeClass("error");
            $pwd1.siblings(".eng").addClass("true");
        }else{
            $pwd1.siblings(".eng").removeClass("true");
            $pwd1.siblings(".eng").addClass("error");
        }
        //3. 숫자
        if(num.test(pwd1)){
            i++;
            $pwd1.siblings(".num").removeClass("error");
            $pwd1.siblings(".num").addClass("true");
        }else{
            $pwd1.siblings(".num").removeClass("true");
            $pwd1.siblings(".num").addClass("error");
        }
        //4. 특수문자
        if(spc.test(pwd1)){
            i++;
            $pwd1.siblings(".spc").removeClass("error");
            $pwd1.siblings(".spc").addClass("true");
        }else{
            $pwd1.siblings(".spc").removeClass("true");
            $pwd1.siblings(".spc").addClass("error");
        }
        if (i ==4){
            $pwd1.siblings("p").hide();
            $pwd1.siblings("span").hide();

            return true;
        }else{
            return false;
        }
    }
};

//비밀번호 확인
function conPwd(name1, name2){
    let $pwd1 = $("input[name=" + name1 + "]");
    let $pwd2 = $("input[name=" + name2 + "]");
    let pwd1 = $pwd1.val();
    let pwd2 = $pwd2.val();
    //일치
    if (isPwd() == true && pwd1 == pwd2) {
        $pwd2.siblings("p").hide();
        return true;
    } else {
        $pwd2.siblings("p").show();
        return false;
    }
}

//이메일 인증
function isSelect(name){
    let sel = $("select[name=" + name + "]").children("option:selected").val();

  if (sel == "") {
    $("select[name=" + name + "]").siblings("p").show();
    return false;
  } else {
    $("select[name=" + name + "]").siblings("p").hide();
    return true;
  }
}

//생일 인증
function isDate(name){
    let $bir = $("input[name=" + name + "]");
    let bir = $bir.val();

    if(bir ==""){
        $("input[name=" + name + "]").siblings("p").show();
        return false;
    }else {
        $("input[name=" + name + "]").siblings("p").hide();
        return true;
      }
}

//성별인증
function isCheck(name) {
    let isCheck = $("input[name=" + name + "]").is(":checked");
  
    if (isCheck) {
      $("input[name=" + name + "]").parent().siblings("p").hide();
      return true;
    } else {
      $("input[name=" + name + "]").parent().siblings("p").show();
      return false;
    }
  }