(function () {
    //检查是否登录
    if(sessionStorage.uname){
        location="login.html";
    }
    loadpage();

    //阻止a默认行为
    pedA();

    $(".exit").click(function () {
        sessionStorage.removeItem("uname");
        sessionStorage.removeItem("type");
        location="login.html";
    })

    //多选框
    $("#ckbAll").change(function () {
        $("#tbody input[name=ckb]").prop("checked",$(this).prop("checked"));
        if($(this).prop("checked")){
            $("#tbody input[name=ckb]").parent().parent().addClass("active");
        }else {
            $("#tbody input[name=ckb]").parent().parent().removeClass("active");
        }
    })
    $("#tbody").on("click","tr",function () {
        var flag = $(this).find("input[name=ckb]").prop("checked");
        $(this).find("input[name=ckb]").prop("checked",!flag);
        if(!flag){
            $(this).addClass("active");
        }else {
            $(this).removeClass("active");
        }
    })
    $("#tbody").on("click","input",function () {
        var ckb = $(this).get(0);
        var flag = $(ckb).prop("checked");
        $(ckb).prop("checked",!flag);
    })

    //添加修改数据
    $(".add-control button").click(function (e) {
        e.preventDefault();
        var uname = $("[name=uname]").val();
        var upwd = $("[name=upwd]").val();
        var uTel = $("[name=uTel]").val();
        var nreg = /^[\u2E80-\u9FFF]{2,6}$/;
        var preg = /^[a-zA-Z0-9]{6,12}$/;
        var treg = /^[0-9]{11}$/;

        if(!nreg.test(uname)){
            $(".errMsg").html("用户名格式有误!!");
            $("[name=uname]").focus();
            return;
        }
        if(!preg.test(upwd)){
            $(".errMsg").html("密码格式有误!!");
            $("[name=upwd]").focus();
            return;
        }
        if(!treg.test(uTel)){
            $(".errMsg").html("电话格式有误!!");
            $("[name=uTel]").focus();
            return;
        }
        //修改
        if($(".user-add").hasClass("user-update")){
            $.ajax({
                url:"",
                data:$("#form").serialize(),
                type:"post",
                success:function(data){
                    tips("修改成功","success")
                    $(".errMsg").html("");
                    $(".addInfo .addHead h2").html("新建用户");
                    loadpage();
                    document.querySelector("#form").reset();
                    $(".user-add").addClass("user-update");
                    $("[name=uname]").prop("readonly",false);
                },
                error:function(){
                    alert("网络错误，请检查");
                }
            })
        }else{     //添加
            $.ajax({
                url:"",
                data:$("#form").serialize(),
                type:"post",
                success:function(data){
                    //alert("添加成功");
                    tips("添加成功","success");
                    $(".errMsg").html("");
                    loadpage();
                    document.querySelector("#form").reset();
                },
                error:function(){
                    alert("网络错误，请检查")
                }
            })
        }
    })
    //让数据显示在表单中
    $(".user-edit").click(function () {
        var ckb = $("#tbody input[name=ckb]:checked");
        if(ckb.length==0){
            tips("请选择","error");
            return;
        }
        if(ckb.length>1){
            tips("只能编辑一位","error");
            return;
        }

        $(".addInfo .addHead h2").html("编辑用户");

        var $td = $("#tbody tr.active td");
        $("[name=uname]").val($td.eq(1).html());
        $("[name=usex]").val($td.eq(2).html());
        $("[name=upwd]").val($td.eq(3).html());
        $("[name=uJob]").val($td.eq(4).html());
        $("[name=uTel]").val($td.eq(5).html());

        $(".user-add").addClass("user-update");
        $("[name=uname]").prop("readonly",true);

    })

    //确认删除
    $(".user-del").click(function(){
        var ckb = $("#tbody input[name=ckb]:checked");
        if(ckb.length==0){
            tips("请选择","error");
            return;
        }
        $(".dialog").fadeIn(300);
    })
    //取消确认删除
    $("#closeBtn").click(function(){
        $(".dialog").fadeOut(300);
    })
    //删除
    $("#delBtn").click(function(){
        var ckbs = $("#tbody input[name=ckb]:checked");
        var unames = [];
        for(ckb of ckbs){
           unames.push($(ckb).val());
        }

        $.ajax({
            url:"",
            data:{uname:unames},
            type:"post",
            success:function(data){
                tips("删除成功","success")
                $(".dialog").fadeOut(100);
                loadpage();
            },
            error:function(){
                alert("网络错误，请检查")
            }
        })
    });




})();

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

//数据显示，分页
function loadpage(pno=0,kw=""){
    $.ajax({
        url:"data/data.php",
        data:{pno:pno,pSize:10,kw:kw},
        type:"get",
        success:function(pager){
            var data = pager.users;
            var html="";
            for(var user of data){
                html+="<tr>";
                    html+="<td><input type='checkbox' name='ckb' value='"+user.uname+"'></td>"
                    html+="<td>"+user.uname+"</td>"
                    html+="<td>"+user.usex+"</td>"
                    html+="<td>"+user.upwd+"</td>"
                    html+="<td>"+user.uJob+"</td>"
                    html+="<td>"+user.uTel+"</td>"
                html+="</tr>";

            }
            $("#tbody").html(html);
            //分页
            html="";
            html+="<li class='"+(pager.pno<=1?'disabled':'')+"'><a href='"+(pager.pno>1?pager.pno-1:'#')+"'>上一页</a></li>";

            if(pager.pno-2>0)
                html+="<li><a href='#'>"+(pager.pno-2)+"</a></li>";
            if(pager.pno-1>0)
                html+="<li><a href='#'>"+(pager.pno-1)+"</a></li>";

            html+="<li class='active'><a href='#'>"+pager.pno+"</a></li>";

            if(pager.pno+1<pager.pageCount)
                html+="<li><a href='#'>"+(pager.pno+1)+"</a></li>";
            if(pager.pno+2<=pager.pageCount)
                html+="<li><a href='#'>"+(pager.pno+2)+"</a></li>";

            html+="<li class='"+(pager.pno>=pager.pageCount?'disabled':'')+"'><a href='"+(pager.pno<pager.pageCount?pager.pno+1:'#')+"'>下一页</a></li>";

            $("#page .pageList").html(html);


        },
        error:function(){
            alert("网络错误，请检查")
        }
    })
}

function pedA(){
    $("a").click(function (e) {
        e.preventDefault();

    })
}