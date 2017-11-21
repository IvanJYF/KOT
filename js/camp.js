(function(){
    //检查是否登录
    if(sessionStorage.uname){
        location="login.html";
    }
    $(".exit").click(function () {
        sessionStorage.removeItem("uname");
        sessionStorage.removeItem("type");
        location="login.html";
    })

    loadpage();

    //阻止a默认行为
    pedA();

    //搜索
    $(".user-search").click(function(){
        var kw = $("kw").val();
        loadpage(0,kw);
    });

    //班级筛选
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
        var isPast = $(this).children().data("ispaat");
        var classType = $(".firstMenu .active").children().html();
        loadpage(0,"",classType,isPast);
    });
    $(".filterMenu a").click(function (e) {
        e.preventDefault();
    })

    //点击班级进入座位表，并将班级名称放入session
    $(".camp-info").click(function(){
        sessionStorage.className = $(this).find(".intro span").html();
        location="seat_info.html";
    })

})();

function loadpage(pno=0,kw="",type="",isPast=0){

    $.ajax({
        url:"",
        data:{pno:pno,pSize:9,kw:kw,type:type,isPast:isPast},
        type:"get",
        success:function(pager){
            var data = pager.data;
            var html="";
            for(var camp of data){
                html+=`
                         <li class="${camp.ctype}">
                            <div class="intro">
                                <div>【<span>${camp.cName}</span>】</div>
                                <div>${camp.cTeacher}</div>
                            </div>
                        </li>
                    `;
                html+="<li class='"+camp.ctype+"'>";
                    html+="<div class='intro'>";
                        html+="<div>【<span>"+camp.cName+"</span>】</div>";
                        html+="<div>"+camp.cTeacher+"</div>";
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

function pedA(){
    $("a").click(function (e) {
        e.preventDefault();

    })
}