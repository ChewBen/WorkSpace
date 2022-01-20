// 留言板最大化最小化
$("#nb_nodeboard_close").on("click", function() {
    var that = $(this);
    if (!that.hasClass("nb-nodeboard-max")) {
        that.addClass("nb-nodeboard-max");
        $("#nb_nodeboard_set").css("display", "none");
    } else {
        that.removeClass("nb-nodeboard-max");
        $("#nb_nodeboard_set").css("display", "block");
    }
});

//导表批量开票-满足多种业务需求的行业解决方案
$(".industry_content li").hover(
    function() {
        $(this).find(".text").stop(true).animate({
            top: "0"
        }, 250);
        $(this).find(".text").addClass('hover')
    },
    function() {
        $(this).find(".text").stop(true).animate({
            top: "80%"
        }, 200);
        $(this).find(".text").removeClass('hover')
    }
)

//发送邮箱
$("#nb_nodeboard_send").on('click', function() {
    var typeName = $(this).attr("name");
    var messageContent = $("#nb-nodeboard-set-content-js").val();
    var companyName = $("#nb_nodeboard_ext_2").val();
    var telephone = $("#nb_nodeboard_set_phone").val();
    $.ajax({
        type: "POST",
        url: 'http://u.moredo.cn/mssageBoard/mssageBoard',
        contentType: "application/json;charset=utf-8",
        data: JSON.stringify({
            "messageContent": messageContent,
            "companyName": companyName,
            "telephone": telephone,
            "type": typeName
        }),
        dataType: 'json',
        cache: false,
        success: function(res) {
            if (res.code == 200) {
                $("#nb-nodeboard-set-content-js").val('');
                $("#nb_nodeboard_ext_2").val('');
                $("#nb_nodeboard_set_phone").val('');
                alert('发送成功，请等待工作人员联系。');
            } else {
                alert(res.message);
            }
        },
        error: function(res) {
            alert('网络错误');
        }
    });
});

$(".industry_content li").mouseover(function() {
    $(this).find(".ho_show").css("display", "block");
    $(this).find("li").css("background-color", "#");
});
$(".industry_content li").mouseout(function() {
    $(this).find(".ho_show").css("display", "none");
});

//数据格式化
function toThousands(num) {
    var result = '',
        counter = 0;
    num = (num || 0).toString();
    for (var i = num.length - 1; i >= 0; i--) {
        counter++;
        result = num.charAt(i) + result;
        if (!(counter % 3) && i != 0) {
            result = ',' + result;
        }
    }
    return result;
}

//nav点击 移动端
$(".navbar-toggle").on("click", function() {
    if ($(".navbar-collapse").hasClass("in")) {
        $(".navbar-collapse").removeClass("in");
    } else {
        $(".navbar-collapse").addClass("in");
    }
})