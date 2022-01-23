/*! main.js | developed by Zaiyu.co */
$(function() {

    /*
      Use Bootstrap tooltip
    */
    $('[data-toggle="tooltip"]').tooltip();




    /*
      Header sticky
    */
    var $header = $('.header');
    var handleHeader = function() {
        var _top = $(document).scrollTop();

        if (_top > 50) {
            $header.addClass('header-sticky');
        } else {
            $header.removeClass('header-sticky');
        }
    };

    handleHeader(); // page load init

    $(window).scroll(function() {
        handleHeader();
    });




    /*
      Nav toggle
    */
    var $body = $('body');
    var $toggle = $('.nav-toggle');
    var $nav = $('.j-nav');
    var $links = $('.j-links');
    var navTimer = null;
    var navFlag = true;

    $toggle.on('click', function() {
        var $this = $(this);

        if ($this.hasClass('active')) {
            $body.removeClass('no-scroll');
            $nav.removeClass('active');
            $links.removeClass('active');
            $this.removeClass('active');
        } else {
            $body.addClass('no-scroll');
            $nav.addClass('active');
            $links.addClass('active');
            $this.addClass('active');
        }
    });

    $nav.on('click', 'a', function() {
        $body.removeClass('no-scroll');
        $nav.removeClass('active');
        $links.removeClass('active');
        $toggle.removeClass('active');
    });

    /*
      Nav sub
    */
    $nav.on('click', 'li', function(event) {
        event.stopPropagation();
    });

    $nav.on('mouseover', 'li', function() {
        var $this = $(this);

        if (!$body.hasClass('no-scroll') && navFlag) {
            navTimer = setTimeout(function() {
                $this.siblings().removeClass('hover');
                $this.addClass('hover');
                navFlag = false;
            }, 100);
        }
    });

    $nav.on('mouseleave', 'li', function() {
        clearTimeout(navTimer);
        navTimer = null;

        navFlag = true;
        $(this).removeClass('hover');
    });

    $nav.on('mouseleave', '.nav-sub', function() {
        $(this).parent().removeClass('hover');
    });

    $('body, .nav-sub a').on('click', function() {
        $nav.find('li').removeClass('hover')
    });

    $('.nav-sub').on('click', function(event) {
        event.stopPropagation();
    });




    /*
      Go to top
    */
    var $gotop = $('.gotop');

    $(window).on('scroll', function() {
        if ($(document).scrollTop() > 500) {
            $gotop.fadeIn();
        } else {
            $gotop.fadeOut(100);
        }
    });

    $gotop.on('click', function(event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    });




    $('.fixed-btns').find('span.link').on('click', function() {
        if ($(this).hasClass('show')) {
            $(this).removeClass('show').addClass('hide');
        } else {
            $(this).removeClass('hide').addClass('show');
        }
    });




    /*
      Products menu
    */
    if ($('#MenuProducts')) {
        // init active
        var _hash = window.location.hash;
        if (_hash.indexOf('#s') === 0) {
            $('#MenuProducts').find('a[href="' + _hash + '"]').parent().addClass('active');
        }

        // scroll to
        $('#MenuProducts').onePageNav({
            currentClass: 'active',
            changeHash: true,
            scrollSpeed: 750,
            scrollThreshold: 0.2,
            easing: 'swing'
        });
    }




    /*
      Page animation
    */
    var showPic = {
        distance: '30px',
        origin: 'top',
        opacity: 0,
        delay: 800,
        duration: 2000,
        interval: 1000,
        easing: 'cubic-bezier(0,1,.3,1)',
        reset: true,
        mobile: false
    };
    var showTitle = {
        distance: '50px',
        origin: 'top',
        opacity: 0,
        delay: 500,
        duration: 800,
        easing: 'cubic-bezier(0,1,.3,1)',
        reset: true,
        useDelay: 'onload',
        mobile: false
    };
    var showTitleSub = {
        opacity: 0,
        delay: 500,
        duration: 800,
        reset: true,
        useDelay: 'onload',
        mobile: false
    };

    // ScrollReveal().reveal('.js-show', showPic);
    ScrollReveal().reveal('.js-show-title', showTitle);
    ScrollReveal().reveal('.js-show-title-sub', showTitleSub);




    /*
      Circle mouseover
    */
    var $circleNav = $('.j-circle .item-circle-nav');
    var $circleTitle = $('.j-circle .item-circle-title');
    var $circleContent = $('.j-circle .item-circle-content');

    $circleNav.on('mouseover', '.item', function() {
        var $this = $(this);
        var $target = $this.data('target');

        $this.siblings().removeClass('active');
        $this.addClass('active');
        $circleTitle.find('.' + $target).siblings().removeClass('active');
        $circleTitle.find('.' + $target).addClass('active');
        $circleContent.find('.' + $target).siblings().removeClass('active');
        $circleContent.find('.' + $target).addClass('active');
    });

    $circleTitle.on('touchend', '.item', function() {
        var $this = $(this);
        var $target = 'item-' + ($this.index() + 1);

        $circleNav.find('.' + $target).siblings().removeClass('active');
        $circleNav.find('.' + $target).addClass('active');
        $circleTitle.find('.' + $target).siblings().removeClass('active');
        $circleTitle.find('.' + $target).addClass('active');
        $circleContent.find('.' + $target).siblings().removeClass('active');
        $circleContent.find('.' + $target).addClass('active');
    });




    /*
      Tabs more
    */
    (function() {
        var container = document.querySelector('#NavTabs');

        if (container) {
            var primary = container.querySelector('.section-tabs');
            var primaryItems = container.querySelectorAll('.section-tabs > li:not(.more)');
            container.classList.add('jsfied');

            // insert "more" button and duplicate the list

            primary.insertAdjacentHTML('beforeend', `
        <li class="more">
            <button type="button" aria-haspopup="true" aria-expanded="false">更多</button>
            <ul class="secondary">
            ${primary.innerHTML}
            </ul>
        </li>
        `);

            var secondary = container.querySelector('.secondary');
            var secondaryItems = secondary.querySelectorAll('li');
            var allItems = container.querySelectorAll('li');
            var moreLi = primary.querySelector('.more');
            var moreBtn = moreLi.querySelector('button');

            moreBtn.addEventListener('click', e => {
                e.preventDefault();
                container.classList.toggle('show-secondary');
                moreBtn.setAttribute('aria-expanded', container.classList.contains('show-secondary'));
            });

            // adapt tabs

            var doAdapt = () => {
                // reveal all items for the calculation
                allItems.forEach(item => {
                    item.classList.remove('hidden');
                });

                // hide items that won't fit in the Primary
                var stopWidth = moreBtn.offsetWidth;
                var hiddenItems = [];
                var primaryWidth = primary.offsetWidth;

                primaryItems.forEach((item, i) => {
                    if (primaryWidth >= stopWidth + item.offsetWidth) {
                        stopWidth += item.offsetWidth;
                    } else {
                        item.classList.add('hidden');
                        hiddenItems.push(i);
                    }
                });

                // toggle the visibility of More button and items in Secondary
                if (!hiddenItems.length) {
                    moreLi.classList.add('hidden');
                    container.classList.remove('show-secondary');
                    moreBtn.setAttribute('aria-expanded', false);
                } else {
                    secondaryItems.forEach((item, i) => {
                        if (!hiddenItems.includes(i)) {
                            item.classList.add('hidden');
                        }
                    });
                }
            };

            doAdapt(); // adapt immediately on load
            window.addEventListener('resize', doAdapt); // adapt on window resize

            // hide Secondary on the outside click

            document.addEventListener('click', e => {
                var el = e.target;
                while (el) {
                    if (el === secondary || el === moreBtn) {
                        return;
                    }
                    el = el.parentNode;
                }
                container.classList.remove('show-secondary');
                moreBtn.setAttribute('aria-expanded', false);
            });
        }
    })();




    /*
      Video modal
    */
    $('#VideoModal').on('show.bs.modal', function(event) {
        var _button = $(event.relatedTarget);
        var _url = _button.data('url');
        var _video = _button.data('video');

        var $iframe = $('#VideoModalSource');
        var $video = $('#VideoModalFile');

        if (_video) {
            $iframe.css('display', 'none');

            $video.find('source').eq(0).attr('src', '/media/' + _video);
            $video.get(0).load();
            $video.get(0).play();
        } else {
            $video.css('display', 'none');

            $iframe.attr('src', _url);
        }
    });

    $('#VideoModal').on('hide.bs.modal', function() {
        $('#VideoModalFile').get(0).pause();
        $('#VideoModal').find('iframe').attr('src', 'about:blank');
        console.clear();
    });




    /*
      City select
    */
    $('#CitySelect').cxSelect({
        url: '/static/js/vendor/cityData.min.json',
        selects: ['province', 'city', 'area'],
        emptyStyle: 'none',
    });




    /*
      Form try & join
    */
    var $ftry = $('#FormTry');
    var $fjoin = $('#FormJoin');

    var fnFormTip = function(msg, atype) {
        var _msg = msg;
        var _atype = atype;

        if (!_msg) {
            _msg = '请填全内容'
        }

        if (_atype) {
            _atype = atype;
        } else {
            _atype = 'danger';
        }
        $('.js-tips').html('<div class="alert alert-' + _atype + ' alert-dismissible fade show" role="alert">' +
            _msg +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '</div>');
    };


    var fnFormtry = function() {
        $.ajax({
            type: $ftry.attr('method'),
            url: $ftry.attr('action'),
            data: $ftry.serialize(),
            success: function(data) {
                if (data.success == 'true') {
                    fnFormTip('您的申请试用已提交，我们会有专员和您一对一沟通', 'success');
                    $ftry[0].reset();
                } else {
                    fnFormTip(data.msg);
                }

                refCaptcha();
            },
            error: function(data) {
                fnFormTip(data.msg);
            }
        });
    };

    $ftry.submit(function() {
        if (!$ftry.find('#type').val()) {
            fnFormTip('请选择类型');
        } else if (!$ftry.find('#province').val()) {
            fnFormTip('请选择省份（市级选市即可）');
        } else if (!$ftry.find('#city').val()) {
            fnFormTip('请选择城市（上级为市级选区即可）');
        } else if (!$ftry.find('#phone').val()) {
            fnFormTip('请填写手机号');
        } else if (!$ftry.find('#count').val()) {
            fnFormTip('请选择门店数');
        } else if (!$ftry.find('#content').val()) {
            fnFormTip('请填写详细问题和需求');
        } else {
            if (/^\d*$/.test($ftry.find('#phone').val())) {
                fnFormtry();
            } else {
                fnFormTip('请填写正确手机号码');
            }
        }

        return false;
    });


    var fnFormjoin = function() {
        $.ajax({
            type: $fjoin.attr('method'),
            url: $fjoin.attr('action'),
            data: $fjoin.serialize(),
            success: function(data) {
                if (data.success == 'true') {
                    fnFormTip('您的申请加盟已提交，我们会有专员和您一对一沟通', 'success');
                    $fjoin[0].reset();
                } else {
                    fnFormTip(data.msg);
                }

                refCaptcha();
            },
            error: function(data) {
                fnFormTip(data.msg);
            }
        });
    };

    $fjoin.submit(function() {
        if (!$fjoin.find('#name').val()) {
            fnFormTip('请填写联系人');
        } else if (!$fjoin.find('#phone').val()) {
            fnFormTip('请填写联系电话');
        } else if (!$fjoin.find('#province').val()) {
            fnFormTip('请选择省份（市级选市即可）');
        } else if (!$fjoin.find('#city').val()) {
            fnFormTip('请选择城市（上级为市级选区即可）');
        } else if (!$fjoin.find('#content').val()) {
            fnFormTip('请填写备注');
        } else {
            if (/^\d*$/.test($fjoin.find('#phone').val())) {
                fnFormjoin();
            } else {
                fnFormTip('请填写正确手机号码');
            }
        }

        return false;
    });


    // 验证码
    var $captcha_0 = $('#id_captcha_0');
    var $captcha_1 = $('#id_captcha_1');
    var $captcha_img = $('.captcha');

    $('.captcha').on('click', function() {
        refCaptcha();
    });

    function refCaptcha() {
        $.getJSON('/captcha/refresh/', function(result) {
            $captcha_img.attr('src', result['image_url']);
            $captcha_0.val(result['key']);
            $captcha_1.val('');
        });
    }

});


// Helper function
function isElementInViewport(el) {
    // special bonus for those using jQuery
    if (typeof jQuery === 'function' && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        (rect.top <= 0 &&
            rect.bottom >= 0) ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
        (rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
}