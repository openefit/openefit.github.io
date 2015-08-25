/**
 * Created on 2015/8/7.
 */
define([
    'jQuery',
    'js/util/htmlSpecialChars'
], function ($, specialChars) {
    function Loading (opts) {
        this.$container = opts.container;
        this.loadingText = opts.loadingText;
        this.finishText = opts.finishText;
        this.$loading = null;
        this.$msg = null;

        this.init();
    }

    Loading.prototype = {
        constructor: Loading,
        init: function () {
            var ts = this;
            if (!ts.$container.length) {
                console.error('加载更多动画初始化失败！');
                return;
            }

            ts.$loading = ts.$container.find('> .X_loadMore');
            if (!ts.$loading.length) {
                ts.$loading = $('<div class="X_loadMore"><span class="icon-loading"></span><span class="msg"></span></div>');
                ts.$loading.appendTo(ts.$container);
            }

            ts.$msg = ts.$loading.find('.msg');
            ts.setLang(ts.loadingText);
        },
        setLang: function (txt) {
            this.$msg.html(specialChars.htmlspecialchars(txt));
            return this;
        },
        begin: function (txt) {
            var ts = this;
            ts.$loading.addClass('loading');
            return this;
        },
        stop: function () {
            var ts = this;
            ts.$loading.removeClass('loading');
            return this;
        },
        finish: function (txt) {
            var ts = this;
            ts.$loading.removeClass('loading').addClass('finish');
            ts.setLang(txt || ts.finishText);
            return this;
        }
    };

    return function (options) {
        var defaults = {
            container: '',
            loadingText: '正在加载数据',
            finishText: '没有了'
        };
        return new Loading($.extend({}, defaults, options));
    }
});