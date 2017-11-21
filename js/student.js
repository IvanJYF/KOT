(function(){

    //判断是否登录了，没有就返回登录页面
    if(sessionStorage.uname){
        location="login.html";
    }
    else{
        $(".exit").click(function () {
            sessionStorage.removeItem("uname");
            sessionStorage.removeItem("type");
            location="login.html";
        })

        loadpage();
        pedA();
        //显示头部老师姓名
        $(".userInfo span").html(sessionStorage.uname);
        //添加表单显示
        $("#stu-add").click(function(){
            isShow();
            //显示表单
            $(".stu-form").addClass("showlist");
            //隐藏时长
            $(".studyTime").css("display","none");

            //让提交按钮变成添加按钮，并让编辑和删除失效
            $(".stu-submit").addClass("dataIn usable");
            $(".stu-edit").addClass("disable");
            $(".stu-del").addClass("disable");
            $(".disable").prop("disabled",true);
            //关闭后变回普通按钮
            $(".stu-form>.close").click(function(){
                $(".stu-submit").removeClass("dataIn usable");
            });
            //让所有能填信息的文本框启用
            $(".r-only").prop("disabled",false);
            //显示顾问老师名字
            $("#steacher").val($(".userInfo span").html());

        });
        //点击提交按钮，插入数据
        $(".stu-submit").click(function () {
            if($(this).hasClass("dataIn")){
                var sname = $("[name=sname]").val();
                var educ = $("[name=educ]").val();
                var major = $("[name=major]").val();
                var current = $("[name=current]").val();
                var reg = /^[\u2E80-\u9FFF]{1,20}$/;

                if(!reg.test(sname)){
                    $(".errMsg").html("姓名格式有误!!");
                    $("[name=sname]").focus();
                    return;
                }
                if(!reg.test(educ)){
                    $(".errMsg").html("学历格式有误!!");
                    $("[name=educ]").focus();
                    return;
                }
                if(!reg.test(major)){
                    $(".errMsg").html("专业格式有误!!");
                    $("[name=major]").focus();
                    return;
                }
                if(!reg.test(current)){
                    $(".errMsg").html("目前情况格式有误!!");
                    $("[name=current]").focus();
                    return;
                }

                 $.ajax({
                     url:"",
                     data:$("#sForm").serialize(),
                     type:"post",
                     success:function(data){
                         if(data.state==1){
                             tips("添加成功","success");
                             $(".disable").prop("disabled",false);
                             $(".stu-edit").removeClass("disable");
                             $(".stu-del").removeClass("disable");
                             loadpage();
                             $(".errMsg").html("");
                             $(".stu-form").removeClass("showlist");
                             $(".stu-list>li").removeClass("active");
                             document.querySelector("#sForm").reset();
                             //显示顾问老师名字
                             $("#steacher").val($(".userInfo span").html());
                             $(".errMsg").html("");
                         }else{
                             $(".errMsg").html(data.msg);
                         }
                     },
                     error:function(){
                        alert("网络错误，请检查")
                     }
                 })
            }

        })

        //关闭表单框
        $(".stu-form>.close").click(function(){
            $(".disable").prop("disabled",false);
            $(".stu-edit").removeClass("disable");
            $(".stu-del").removeClass("disable");
            $(".stu-form").removeClass("showlist");
            $(".stu-list>li").removeClass("active");
            document.querySelector("#sForm").reset();
        });

        //双击查看学生信息
        $(".stu-list>li").dblclick(function () {
            if( $(".stu-submit").hasClass("dataIn")) return;

            //显示顾问老师名字
            $("#steacher").val($(".userInfo span").html());
            //判断这个学生的顾问老师是否一致
            if($(this).data("tname") === uname){
                $(".form-control").show();
            }else{
                $(".form-control").hide();
            }

            var uname = $(this).find(".stu-info span:first-child").html()
            $.ajax({
                url:"",
                data:{uname:uname},
                type:"get",
                success:function(data){
                    $("#sForm #sname").val(data.sname);
                   // $("#sForm #steacher").val(data.steacher);
                    $("#sForm #stype").val(data.stype);
                    $("#sForm #educ").val(data.educ);
                    $("#sForm #major").val(data.major);
                    $("#sForm #basic").val(data.basic);
                    $("#sForm #msgSource").val(data.msgSource);
                    $("#sForm #current").val(data.current);
                    $("#sForm #dutatiom").val(data.dutatiom);
                    $("#sForm #stage").val(data.stage);
                },
                error:function(){
                    alert("网络错误，请检查")
                }
            })

            isShow();
            //显示表单
            $(".stu-form").addClass("showlist");
            //显示时长
            $(".studyTime").css("display","block");
            //让提交按钮变成添加按钮，并让编辑和删除失效
            $(".stu-submit").addClass("disable");
            $(".stu-edit").addClass("usable");
            $(".stu-del").addClass("usable");
            $(".disable").prop("disabled",false);
            //让所有能填信息的文本框禁用
            $(".r-only").prop("disabled",true);
            //学员信息框选中
            $(this).addClass("active").siblings().removeClass("active");
            //关闭后变回普通按钮
            $(".stu-form>.close").click(function(){
                $(".stu-submit").removeClass("disable");
                $(".stu-edit").removeClass("usable");
                $(".stu-del").removeClass("usable");
            });

        })


        //是否删除
        $(".stu-list .stu-del").click(function(){
            $(".dialog").fadeIn(500);
            $("#delBtn").data("sname",$(this).data());
        })
        $(".form-control .stu-del").click(function(){
            $(".dialog").fadeIn(500);
            var stuname = $(".stu-list>li.active .stu-info span:first-child").html();
            $("#delBtn").data("sname2",stuname);
        })
        //取消确认删除
        $("#closeBtn").click(function(){
            $(".dialog").fadeOut(500);

        })
        //删除
        $("#delBtn").click(function(){
            // var uname = $(this).data("uname")||$("#sname").val();
            //console.log(uname)
            var sname = $(this).data("sname").sname || $(this).data("sname2")
            console.log(sname)
            $.ajax({
                url:"",
                data:{uid:sname},
                type:"post",
                success:function(data){
                    if(data.state==1){
                        tips("删除成功","success");
                        $(".dialog").fadeOut(500);
                        loadpage();
                    }else{
                        tips("删除失败","error");
                    }
                },
                error:function(){
                    alert("网络错误，请检查")
                }
            })
        });

        //编辑
        $(".stu-edit").click(function () {

            isShow();
            //信息框选中
            $(this).parent().parent().parent().addClass("active").siblings().removeClass("active");
            //显示表单
            $(".stu-form").addClass("showlist");
            //显示时长
            $(".studyTime").css("display","none");
            //让提交按钮变成添加按钮，并让编辑和删除失效
            $(".stu-submit").addClass("usable dataUp");
            $(".stu-edit").addClass("usable");
            $(".stu-del").addClass("usable");
            $(".stu-edit").prop("disabled",false);
            //让所有能填信息的文本框启用
            $(".r-only").prop("disabled",false);
            //关闭后变回普通按钮
            $(".stu-form>.close").click(function(){
                $(".stu-submit").removeClass("dataUp usable");
            });

            //显示顾问老师名字
            $("#steacher").val($(".userInfo span").html());
            var stuname = $(".stu-list>li.active .stu-info span:first-child").html();
            $.ajax({
                url:"",
                type:"get",
                data:{sname:stuname},
                success:function(data){
                    $("[name=sname]").val(data.sname);
                   // $("[name=steacher]").val(data.steacher);
                    $("[name=stype]").val(data.stype);
                    $("[name=educ]").val(data.educ);
                    $("[name=major]").val(data.major);
                    $("[name=basic]").val(data.basic);
                    $("[name=msgSource]").val(data.msgSource);
                    $("[name=current]").val(data.current);
                    $("[name=stage]").val(data.stage);
                }
            })

        })
        //点击提交按钮，执行更新操作
        $(".stu-submit").click(function () {
            if($(this).hasClass("dataUp")){
                var sname = $("[name=sname]").val();
                var educ = $("[name=educ]").val();
                var major = $("[name=major]").val();
                var basic = $("[name=basic]").val();
                var current = $("[name=current]").val();
                var reg = /^[\u2E80-\u9FFF]{1,20}$/;

                if(!reg.test(sname)){
                    $(".errMsg").html("姓名格式有误!!");
                    $("[name=sname]").focus();
                    return;
                }
                if(!reg.test(educ)){
                    $(".errMsg").html("学历格式有误!!");
                    $("[name=educ]").focus();
                    return;
                }
                if(!reg.test(major)){
                    $(".errMsg").html("专业格式有误!!");
                    $("[name=major]").focus();
                    return;
                }
                if(!reg.test(current)){
                    $(".errMsg").html("目前情况格式有误!!");
                    $("[name=current]").focus();
                    return;
                }

                $.ajax({
                    url:"",
                    data:$("#sForm").serialize(),
                    type:"post",
                    success:function(data){
                       if(data.state==1){
                           tips("更新成功","success");
                           loadpage();
                           $(".errMsg").html("");
                           $(".stu-form").removeClass("showlist");
                           $(".stu-list>li").removeClass("active");
                           document.querySelector("#sForm").reset();
                           $(".errMsg").html("");
                       }else{
                           $(".errMsg").html(data.msg);
                       }
                    },
                    error:function(){
                        alert("网络错误，请检查")
                    }
                })
            }

        })

        //搜索
        $(".user-search").click(function(){
            var kw = $("kw").val();
            loadpage(0,kw);
        });

        //班级选择
        $(".firstMenu>li:not(:first-child)").click(function(){
            $(".filterMenu").css("height",90);
        })
        $(".class-change li").click(function(){
            $(this).addClass("active").siblings().removeClass("active");

        })
        $(".firstMenu>li:first-child").click(function(){
            $(".filterMenu").css("height",45);
            $(".class-change>li").removeClass("active");
            $(".class-change>li:first-child").addClass("active");
        })
        $(".firstMenu li").click(function(){
            var classType = "";
            if($(this).children().html()!=="所有"){
                classType = $(this).children().html();
            }
            loadpage(0,"",classType);
        });
        $(".isPast li").click(function(){
            var isPast = $(this).children().data("ispast");
            var classType = $(".firstMenu .active").children().html();
            loadpage(0,"",classType,isPast);
        });
        $(".filterMenu a").click(function (e) {
            e.preventDefault();
        })

    }
})();

//查询，分页
function loadpage(pno=0,kw="",type="",isPast=0){
    $.ajax({
        url:"",
        //16条
        data:{pno:pno,pSize:16,kw:kw,type:type,isPast:isPast},
        type:"get",
        success:function(pager){
            var data = pager.data;
            var html="";
            for(var stu of data){

                html+="<li data-tname='"+stu.steacher+"'>";
                    html+=" <div class='head-img'><div></div></div>";
                    html+="<div class='stu'>";
                        html+="<div class='stu-info'>";
                            html+="<span>"+stu.uname+"</span>";
                            html+="<span>"+stu.phone+"</span>";
                            html+="<p>"+stu.sDate+"</p>";
                        html+="</div>";
                        html+="<div class='stu-control'>";
                            html+="<button class='stu-edit' data-uname='"+stu.uname+"'>";
                                html+="<img src='img/camp/edit.png' title='编辑'>";
                            html+="</button>";
                            html+="<button class='stu-del' data-uname='"+stu.uname+"'>";
                                html+="<img src='img/camp/trash.png' title='删除'>";
                            html+="</button>";
                        html+="</div>";
                    html+="</div>";
                html+="</li>";
            }

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

function isShow(){
    if( $(".stu-submit").hasClass("dataUp")) $(".stu-submit").removeClass("dataUp");
    if( $(".stu-submit").hasClass("dataIn")) $(".stu-submit").removeClass("dataIn");
    if( $(".stu-submit").hasClass("usable")) $(".stu-submit").removeClass("usable");
    if( $(".stu-submit").hasClass("disable")) $(".stu-submit").removeClass("disable");

    if( $(".stu-edit").hasClass("usable")) $(".stu-submit").removeClass("usable");
    if( $(".stu-edit").hasClass("disable")) $(".stu-submit").removeClass("disable");

    if( $(".stu-del").hasClass("usable")) $(".stu-submit").removeClass("usable");
    if( $(".stu-del").hasClass("disable")) $(".stu-submit").removeClass("disable");
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