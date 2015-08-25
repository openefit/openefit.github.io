/**
 * Created on 2015/8/5.
 *
 */
define([
    'jQuery'
], function ($) {
    return {
        req: function (options) {
            var defaults = {
                url: '#',
                type: 'post',
                dataType: 'json',
                data: {},
                timeout: 3000,
                beforeSend: $.noop,
                success: $.noop,
                fail: $.noop,
                complete: $.noop
            };
            $.ajax($.extend({}, defaults, options));
        }
    };
});