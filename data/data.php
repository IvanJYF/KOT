<?php
header("Content-Type:application/json");
    $result = [
        ["uname"=>"张三","usex"=>"男","upwd"=>"qweasd","uJob"=>"项目经理","uTel"=>"1342234222"],
        ["uname"=>"张三","usex"=>"男","upwd"=>"qweasd","uJob"=>"项目经理","uTel"=>"1342234222"],
        ["uname"=>"张三","usex"=>"男","upwd"=>"qweasd","uJob"=>"项目经理","uTel"=>"1342234222"],
        ["uname"=>"张三","usex"=>"男","upwd"=>"qweasd","uJob"=>"项目经理","uTel"=>"1342234222"],
        ["uname"=>"张三","usex"=>"男","upwd"=>"qweasd","uJob"=>"项目经理","uTel"=>"1342234222"],
        ["uname"=>"张三","usex"=>"男","upwd"=>"qweasd","uJob"=>"项目经理","uTel"=>"1342234222"],
        ["uname"=>"张三","usex"=>"男","upwd"=>"qweasd","uJob"=>"项目经理","uTel"=>"1342234222"]
    ];


    $pager = [
        "pno"=>1,
        "pageCount"=>10,
        "users"=>$result
    ];
    echo json_encode($pager);
?>