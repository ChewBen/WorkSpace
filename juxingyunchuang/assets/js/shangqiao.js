//咨询窗口
function open_video() {
    $("#zixun").fadeIn();
}
$("#zixun .close").click(function () {
    $("#zixun").fadeOut();
});

//自动第一次跳出  3000就是3秒
setTimeout('fireshow()',3000);
function fireshow(){
    $(".nb-dingwei").show();
}
//关闭后 6秒再次弹出
function closenb(){
    $(".nb-dingwei").hide();
    setTimeout(function(){
        $(".nb-dingwei").show();
    },6000)
}
function opennb(){
    $(".guanggao-dbbox").addClass("changedw");
    $("#nb-close").hide();
    $("#nb-show").hide();
    $("#nb-gb").show();
    $(".nb-dingwei").hide();
}
$("#nb-gb").click(function(){
    $(".guanggao-dbbox").removeClass("changedw");
    $("#nb-close").show();
    $("#nb-show").hide();
    $("#nb-gb").hide();
    $(".nb-dingwei").hide();//影藏
});
$("#nb-close").click(function(){
    $(".guanggao-dbbox").animate({bottom:'-284px'});
    $(".guanggao-dbbox").removeClass("changedw");
    $("#nb-close").hide();
    $("#nb-show").show();
});
$("#nb-show").click(function(){
    $(".guanggao-dbbox").animate({bottom:'0px'});
    $("#nb-close").show();
    $("#nb-show").hide();
});
//取消输入框空提示
$("#nb-nodeboard-set-content-js").focus(function(){
    $("#nb-nodeboard-tips-js").hide().fadeOut(500);
    $("#nb-nodeboard-set-content-js").css("border-color","#d5d5d5");
});
$("#nb_nodeboard_set_phone").focus(function(){
    $("#nb-nodeboardphone-tips-js").hide().fadeOut(500);
    $("#nb_nodeboard_phone").css("border-color","#d5d5d5");
});