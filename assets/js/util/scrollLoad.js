/**
 * Created by medlinker-pc on 2015/8/6.
 */
define([
    'jQuery'
], function ($) {

    $.extend({
        getWindowWidth: function () {
            return $(window).width();
        },
        getWindowHeight: function () {
            return $(window).height();
        },
        getDocumentWidth: function () {
            return document.body.scrollWidth;
        },
        getDocumentHeight: function () {
            return document.body.scrollHeight;
        },
        getDocumentScrollLeft: function () {
            return $(document).scrollLeft();
        },
        getDocumentScrollTop: function () {
            return $(document).scrollTop();
        }
    });

    /**
     * 窗口滚动到底部插件
     * @constructor
     */
    function WinScroll () {
        // threshold, callback
        var args = Array.prototype.slice.call(arguments),
            threshold = 0,
            callback = function () {};

        this.timer = null;
        this.threshold = threshold;
        this.callback = callback;

        if (args.length = 1) {
            if (!isNaN(args[0])) {
                this.threshold = args[0];
            } else if ($.isFunction(args[0])) {
                this.callback = args[0];
            }
        } else if (args.length = 2){
            if (!isNaN(args[0])) {
                this.threshold = args[0];
            }
            if ($.isFunction(args[1])) {
                this.callback = args[1];
            }
        }

        this.init();
    }

    WinScroll.prototype = {
        constructor: WinScroll,
        init: function () {
            this.start();
            // 首次加载
            this.callback();
        },
        pause: function () {
            $(window).off('scroll.medlinker');
        },
        start: function () {
            var ts = this;
            $(window).on('scroll.medlinker', function () {
                if (ts.timer) {
                    clearTimeout(ts.timer);
                }
                ts.timer = setTimeout(function () {
                    ts.scroll.call(ts);
                }, 200);
            });
        },
        scroll: function () {
            var ts = this,
                docH = $.getDocumentHeight(),
                docScrollTop = $.getDocumentScrollTop(),
                winH = $.getWindowHeight();

            if ((ts.threshold + docScrollTop) >= docH - winH) {
                ts.callback();
            }
        }
    };
    return {
        initHandler: function (handler) {
            new WinScroll(handler);
        }
    };
});