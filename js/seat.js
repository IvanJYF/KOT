(function () {
    //检查是否登录
    if(sessionStorage.uname){
        location="login.html";
    }
    loadSeat();

    pedA();
    //退出登录
    $(".exit").click(function () {
        sessionStorage.removeItem("uname");
        sessionStorage.removeItem("type");
        location="login.html";
    })

    //显示头部老师姓名
    $(".userInfo span").html(sessionStorage.uname);

    //点击座位，如果预定了就显示学员信息，空位就预定座位
    $(".seats li").click(function () {
        if($(this).hasClass("checked")){
            //已预订
            var sname = $(this).find("p:first-child").html();
            var teacher = $(this).find("p:last-child").html();
            if(teacher !=  $(".userInfo span").html()){
                $(".form-control").hide();
                $("#sForm input").prop("readonly",true);
                $("#sForm select").prop("disabled",true);
            }else{
                $(".form-control").show();
                $("#sForm input").prop("readonly",false);
                $("#sForm select").prop("disabled",false);
            }
            $("#steacher").prop("readonly",true);
            $.ajax({
                url:"",
                data:{sname:sname},
                tpye:"get",
                success: function (data) {
                   if(data.state==1){
                       $("#sForm #sname").val(data.sname);
                       $("#sForm #steacher").val(data.steacher);
                       $("#sForm #stype").val(data.stype);
                       $("#sForm #educ").val(data.educ);
                       $("#sForm #major").val(data.major);
                       $("#sForm #basic").val(data.basic);
                       $("#sForm #msgSource").val(data.msgSource);
                       $("#sForm #current").val(data.current);
                       $("#sForm #dutatiom").val(data.dutatiom);
                       $("#sForm #stage").val(data.stage);
                   }else{
                       alert("网络错误")
                   }
                }
            })

            $(".stu-form").slideDown(500);
        }else{
            //空位
            $(".dialog").fadeIn(500);
            $(".stu-form").slideUp(500);
            $(".booking").data("seatNo",$(this).index());
            var teacherName =  $(".userInfo span").html();
            //获取当前用户的学员姓名
            $.ajax({
                url:"",
                data:{teacherName:teacherName},
                type:"get",
                success: function (data) {
                   if(data-state==1){
                       var html = "";
                       //data=["张三","李四","王五","赵六"];
                       for(var sname of data){
                           html+=`
                            <option value="${sname}">${sname}</option>
                        `
                       }
                       $(".bookSit select").html(html);
                   }else{
                       alert("网络错误")
                   }

                }
            })
        }
    });

    //确认预定座位
    $(".booking").click(function () {
        var sname = $(".bookSit select").val();
        var seatno = $(".booking").data("seatNo");

        $.ajax({
            url:"",
            data:{sname:sname,seatno:seatno},
            type:"get",
            success: function (data) {
               if(data.state==1){
                   //loadSeat();
                   $(".seats li:eq("+seatno+")").addClass("checked");
                   $(".seats li:eq("+seatno+") p:first-child").html(sname);
                   $(".seats li:eq("+seatno+") p:last-child").html($(".userInfo span").html());
                   $(".dialog").fadeOut(500);
                   tips("预定成功","success")
               }else{
                   alert("网络错误")
               }
            }
        })

    });

    //更新
    $(".update").click(function () {
        $.ajax({
            url:"",
            data:$("#sForm").serialize(),
            type:"post",
            success:function(data){
                loadSeat();
                tips("更新成功","success")
                $(".stu-form").slideUp(500);
            },
            error:function(){
                alert("网络错误，请检查")
            }
        })
    })

    //取消预定
    $(".cancel").click(function () {
        var sname =  $("#sForm #sname").val();
        $.ajax({
            url:"",
            type:"get",
            data:{sname:sname},
            success: function () {
                tips("取消成功","success")
                loadSeat();
            }
        })
    })

    //关闭预定框
    $(".close").click(function(){
        $(".dialog").fadeOut(500);
    })
})()
function  loadSeat(){
    var className = sessionStorage.className;
    //显示头部老师姓名
    $(".userInfo span").html(sessionStorage.uname);
    $.ajax({
        url:"",
        data:{className:className},
        type:"get",
        success:function(classInfo){
            // 班级名称，项目经理，班级人数，创建时间
            var html="";
            html+=`
                <li>${classInfo.className}</li>
                <li>${classInfo.pManager}</li>
                <li>${classInfo.stuCount}</li>
                <li>${classInfo.createTime}</li>
            `;
            $(".class-Info ul").html(html);

            //学员名称，座位号,座位类型
            if(classInfo.seatType == 1){
                $(".seats").addClass("seats-1");
            }else{
                $(".seats").addClass("seats-2");
            }
            //生成座位，已预订添加checked类
             for(var stu of classInfo.stus){
                 $(".seats li:eq("+stu.seatNo+") p:first-child").html(stu.sName);
                 $(".seats li:eq("+stu.seatNo+") p:last-child").html(stu.steacher);
                 //D学员
                 if(stu.sType=="D"){
                     $(".seats li:eq("+stu.seatNo+")").addClass("dStu");
                 }else{
                     $(".seats li:eq("+stu.seatNo+")").addClass("checked");
                 }

             }
            //var no = 0;
            //$(".seats li:eq("+no+")").addClass("checked")


        },
        error:function(){
            alert("网络错误，请检查")
        }
    })
}

//提示框
function tips(msg,tipClass){
    $(".tips").html(msg);
    $(".tips").addClass(tipClass);
    //document.querySelector(".tips").innerHTML="更新成功";
    //document.querySelector(".tips").className="fade";
    setTimeout(function(){
        $(".tips").html("");
        $(".tips").removeClass(tipClass);
    },3100)
}
function pedA(){
    $("a").click(function (e) {
        e.preventDefault();

    })
}