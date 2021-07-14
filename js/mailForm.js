//폼메일 즉시 실행 함수 
(function(){
    //emiljs user_id값 인수로 전달
    emailjs.init("user_cB5AWKHU4F5u82JFKxIyT");
})();

//브라우저가 로딩시
window.addEventListener("load",()=>{
    const form = document.querySelector("#contact-form");

    form.addEventListener('submit', e=>{
        e.preventDefault();

        // 고유 contact 숫자 랜덤하게 생성
        e.currentTarget.contact_number.value = Math.random() * 100000 | 0;

        emailjs
            .sendForm('service_qilhev1', 'template_q4m56r3', e.currentTarget) //serviceID, templateID입력
            .then(
                response=> {
                    console.log('메일 발송 성공', response.status, response.text); 
                    alert("문의 내용이 전송되었습니다.");   
                    form.reset();   
                }, 
                error=>{
                    console.log('메일 발송 실패', error);
                    alert("메일 발송에 실패했습니다.");
                }
            );
    });   
});