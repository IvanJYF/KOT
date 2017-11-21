(function () {
    //检查是否登录
    if(sessionStorage.uname){
        location="login.html";
    }
    $(".exit").click(function () {
        sessionStorage.removeItem("uname");
        sessionStorage.removeItem("type");
        location="login.html";
    })

    //数据加载
    loadpage();

    //阻止a默认行为
    pedA();

})();

//数据显示，分页
function loadpage(pno=0,kw=""){
    $.ajax({
        url:"",
        data:{pno:pno,pSize:10,kw:kw},
        type:"get",
        success:function(pager){
            var data = pager.data;
            var html="";
            for(var stu of data){
                html+="<tr>";
                    html+="<td>"+stu.sname+"</td>";
                    html+="<td>"+stu.steacher+"</td>";
                    html+="<td>"+stu.stype+"</td>";
                    html+="<td>"+stu.educ+"</td>";
                    html+="<td>"+stu.major+"</td>";
                    html+="<td>"+stu.basic+"</td>";
                    html+="<td>"+stu.msgSource+"</td>";
                    html+="<td>"+stu.current+"</td>";
                    html+="<td>"+stu.studyTime+"</td>";
                    html+="<td>"+stu.stage+"</td>";
                    html+="<td>"+stu.className+"</td>";
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