$(document).ready(function() {
    new Swiper('.swiper-container', {
        autoplay: true, //自动播放
        direction: 'horizontal', // 水平切换选项
        loop: true, // 循环模式选项
        // 如果需要分页器
        pagination: {
            el: '.swiper-pagination',
        }
    });

    // 给产品抽屉添加点击事件
    $('.section_02 .list-title').click(function() {
        $(this).parent().toggleClass('product-list-item-open');
    });

    // 菜单按钮点击事件
    $('.top-menu-bar-button').click(function() {
        $('body').toggleClass('menu-open');
    });

    var tempH = 0;
    var header = $('header');
    var topMenuBar = $('.top-menu-bar');
    $(document).scroll(function() {
        var scroH = $(document).scrollTop(); //滚动高度
        if (scroH > topMenuBar.height() && scroH > tempH && $('.menu-open').length === 0) {
            header.addClass('hidden');
        }
        if (scroH < tempH) {
            header.removeClass('hidden');
        }
        tempH = scroH;
    });
})