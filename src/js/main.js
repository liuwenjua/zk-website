(function($) {

    'use strict';

    var imgFlag = false;
    // 默认图片 的 滑入滑出
    $(document).on("mouseenter", ".btn-full", function(e) {
        if (imgFlag == false) {
            if (window.location.href.indexOf('index.html') > 0) {
                $(".imgs").attr("src", "./images/2.png")
            } else {
                $(".imgs").attr("src", "../../images/2.png") //  三横杠半
            }

        }
    })
    $(document).on("mouseleave", ".btn-full", function(e) {
        if (imgFlag == false) {
            //  三横杠全
            if (window.location.href.indexOf('index.html') > 0) {
                $(".imgs").attr("src", "./images/1.png")
            } else {
                $(".imgs").attr("src", "../../images/1.png")
            }
        }
    })

    // 默认图片点击
    $(document).on("click", ".btn-img", function(e) {
        if (imgFlag == false) {
            $(".btn-img").addClass("btn-half").removeClass("btn-full")
            if (window.location.href.indexOf('index.html') > 0) {
                $(".imgs").attr("src", "./images/3.png")
            } else {
                $(".imgs").attr("src", "../../images/3.png")
            }

        } else {
            $(".btn-img").addClass("btn-full").removeClass("btn-half")
            if (window.location.href.indexOf('index.html') > 0) {
                $(".imgs").attr("src", "./images/1.png")
            } else {
                $(".imgs").attr("src", "../../images/1.png")
            }
        }
        $('.model').toggle() // 模态框显示隐藏
        imgFlag = !imgFlag
    })

    // 点击后的图片滑入滑出
    $(document).on("mouseenter", ".btn-half", function(e) {
        if (imgFlag == true) {
            if (window.location.href.indexOf('index.html') > 0) {
                $(".imgs").attr("src", "./images/4.png")
            } else {
                $(".imgs").attr("src", "../../images/4.png")
            }
            // $("#imgs").attr("src", "./images/4.png") //  一横杠
        }
    })
    $(document).on("mouseleave", ".btn-half", function(e) {
        if (imgFlag == true) {
            if (window.location.href.indexOf('index.html') > 0) {
                $(".imgs").attr("src", "./images/3.png")
            } else {
                $(".imgs").attr("src", "../../images/3.png")
            }
            // $("#imgs").attr("src", "./images/3.png") //  X 型
        }
    })

    $('#time-line li').click(function() {
        var index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        if (index == 0) {
            $(this).parent().parent().next().css('left', '250px');
        } else if (index == 1) {
            $(this).parent().parent().next().css('left', '470px');
        } else if (index == 2) {
            $(this).parent().parent().next().css('left', '700px');
        } else if (index == 3) {
            $(this).parent().parent().next().css('left', '920px');
        }
        $('.aa .tab').eq(index).css('display', 'block').siblings().css('display', 'none')
    })

    $('.line').click(function() {
        $('.mob-nav').toggle()
        $(this).toggleClass("cur");
    })

    function removeClass(ele, cls) {
        if (hasClass(ele, cls)) {
            var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)"); //正则表达式，需要补血
            ele.className = ele.className.replace(reg, " ");
        }
    }



    var contentWayPoint = function() {
        var i = 0;
        $('.element-animate').waypoint(function(direction) {
            console.info(direction, i)
            if (direction === 'down' && !$(this.element).hasClass('element-animated')) {

                i++;
                $(this.element).addClass('item-animate');
                setTimeout(function() {

                    $('body .element-animate.item-animate').each(function(k) {
                        var el = $(this);
                        setTimeout(function() {
                            var effect = el.data('animate-effect');
                            if (effect === 'fadeIn') {
                                el.addClass('fadeIn element-animated');
                            } else if (effect === 'fadeInLeft') {
                                el.addClass('fadeInLeft element-animated');
                            } else if (effect === 'fadeInRight') {
                                el.addClass('fadeInRight element-animated');
                            } else {
                                el.addClass('fadeInUp element-animated');
                            }
                            el.removeClass('item-animate');
                        }, k * 100);
                    });

                }, 100);
            }
        }, {
            offset: '100%'
        });
    };
    contentWayPoint();
})(jQuery);
(function (doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if(clientWidth>=640){
                docEl.style.fontSize = '100px';
            }else{
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
