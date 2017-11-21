
(function () {
    
    $(".loginBtn").click(function () {
        chekcUser();
    })

    $("#loginBox input").keydown(function(){
        if(event.keyCode=="13"){
            chekcUser();
        }
    })

})()
function chekcUser(){
    var uname = $("[name=uname]").val();
    var upwd = $("[name=upwd]").val();

    var nreg = /^[\u2E80-\u9FFFa-zA-Z]{2,6}$/;
    var preg = /^[a-zA-Z0-9]{6,12}$/;

    if(!nreg.test(uname)){
        $(".msg").html("账号格式有误!!");
        $("[name=uname]").focus();
        return;
    }
    if(!preg.test(upwd)){
        $(".msg").html("密码格式有误!!");
        $("[name=upwd]").focus();
        return;
    }

    $.ajax({
        url:"",
        type:"post",
        data:{aname:uname,apwd:upwd},
        success:function (data) {
            //账号或密码错误
            if(data.state==-1){
                $(".msg").html("账号或密码错误!!");
            }
            //登陆成功
            if(data.state==1){
                sessionStorage.uname=uname;
                if(data.type==1){
                    //管理员
                    location="admin_user.html";
                }else if(data.type==2){
                    //咨询顾问
                    sessionStorage.type=data.type;
                    location="student_manager.html";
                }
                else{
                    sessionStorage.type=data.type;
                    location="camp_manager_2.html";
                }
            }else{
                alert("登录失败")
            }
        },
        error:function () {
            alert("网络错误，请检查！");
        }
    })
}