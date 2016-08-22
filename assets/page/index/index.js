'use strict';

/**
 * Demo.
 */
require(['/assets/page/index/vendors/cash.min.js'], function ($cash) {
    window.$cash = $cash;
});
var demo = (function(window, undefined) {

    /**
     * Enum of CSS selectors.
     */
    var SELECTORS = {
        pattern: '.pattern',
        card: '.card',
        cardImage: '.card__image',
        cardClose: '.card__btn-close'
    };

    /**
     * Enum of CSS classes.
     */
    var CLASSES = {
        patternHidden: 'pattern--hidden',
        polygon: 'polygon',
        polygonHidden: 'polygon--hidden'
    };

    /**
     * Map of svg paths and points.
     */
    var polygonMap = {
        paths: null,
        points: null
    };

    /**
     * Container of Card instances.
     */
    var layout = {};

    /**
     * Initialise demo.
     */
    function init() {
        // For options see: https://github.com/qrohlf/Trianglify
        _initEvent();
    };


    function update() {
        _mapPolygons(pattern);

        _bindCards();
    }
    /**
     * Store path elements, map coordinates and sizes.
     * @param {Element} pattern The SVG Element generated with Trianglify.
     * @private
     */
    function _mapPolygons(pattern) {

        // Append SVG to pattern container.
        $cash(SELECTORS.pattern).append(pattern);

        // Convert nodelist to array,
        // Used `.childNodes` because IE doesn't support `.children` on SVG.
        polygonMap.paths = [].slice.call(pattern.childNodes);

        polygonMap.points = [];

        polygonMap.paths.forEach(function(polygon) {

            // Hide polygons by adding CSS classes to each svg path (used attrs because of IE).
            $cash(polygon).attr('class', CLASSES.polygon);

            var rect = polygon.getBoundingClientRect();

            var point = {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            };

            polygonMap.points.push(point);
        });

        // All polygons are hidden now, display the pattern container.
        $cash(SELECTORS.pattern).removeClass(CLASSES.patternHidden);
    };

    /**
     * Bind Card elements.
     * @private
     */
    function _bindCards() {

//    var elements = $cash(SELECTORS.card);

//    $cash.each(elements, function(card, i) {
//
//      var instance = new Card(i, card);
//
//      layout[i] = {
//        card: instance
//      };
//
//      var cardImage = $cash(card).find(SELECTORS.cardImage);
//      var cardClose = $cash(card).find(SELECTORS.cardClose);
//
//      $cash(cardImage).on('click', _playSequence.bind(this, true, i));
//      $cash(cardClose).on('click', _playSequence.bind(this, false, i));
//    });
        var $mainWrapper = $('.main-wrapper'),
            $cards = $mainWrapper.find('.card');

        $cards.each(function (i) {
            var instance = new Card(i, this);

            layout[i] = {
                card: instance
            }
        });
//      $mainWrapper.on('click', '.card', function () {
//          var cards = $mainWrapper.find('.card'),
//              me = $(this),
//              i = cards.index(me);
//
//          console.log('me index : ' + i);
//
//          var instance = new Card(i, me[0]);
//
//          layout[i] = {
//              card: instance
//          }
//          console.log('instance：') ;
//          console.log(instance);
//
//
//          var $cardImage = me.find(SELECTORS.cardImage);
//          var $cardClose = me.find(SELECTORS.cardClose);
//
//          $cardImage.on('click', _playSequence.bind(this, true, i));
//          $cardClose.on('click', _playSequence.bind(this, false, i));
//      });
    };

    /**
     * Create a sequence for the open or close animation and play.
     * @param {boolean} isOpenClick Flag to detect when it's a click to open.
     * @param {number} id The id of the clicked card.
     * @param {Event} e The event object.
     * @private
     *
     */
    function _playSequence(isOpenClick, id, e) {

        var card = layout[id].card;

        // Prevent when card already open and user click on image.
        if (card.isOpen && isOpenClick) return;

        // Create timeline for the whole sequence.
        var sequence = new TimelineLite({paused: true});

        var tweenOtherCards = _showHideOtherCards(id);

        if (!card.isOpen) {
            // Open sequence.

            _setPatternBgImg(e.target);

            sequence.add(tweenOtherCards);
            sequence.add(card.openCard(_onCardMove), 0);

        } else {
            // Close sequence.

            var closeCard = card.closeCard();
            var position = closeCard.duration() * 0.8; // 80% of close card tween.

            sequence.add(closeCard);
            sequence.add(tweenOtherCards, position);
        }

        sequence.play();
    };

    /**
     * Show/Hide all other cards.
     * @param {number} id The id of the clcked card to be avoided.
     * @private
     */
    function _showHideOtherCards(id) {

        var TL = new TimelineLite;

        var selectedCard = layout[id].card;

        for (var i in layout) {

            var card = layout[i].card;

            // When called with `openCard`.
            if (card.id !== id && !selectedCard.isOpen) {
                TL.add(card.hideCard(), 0);
            }

            // When called with `closeCard`.
            if (card.id !== id && selectedCard.isOpen) {
                TL.add(card.showCard(), 0);
            }
        }

        return TL;
    };

    /**
     * Add card image to pattern background.
     * @param {Element} image The clicked SVG Image Element.
     * @private
     */
    function _setPatternBgImg(image) {

        var imagePath = $cash(image).attr('xlink:href');

        $cash(SELECTORS.pattern).css('background-image', 'url(' + imagePath + ')');
    };

    /**
     * Callback to be executed on Tween update, whatever a polygon
     * falls into a circular area defined by the card width the path's
     * CSS class will change accordingly.
     * @param {Object} track The card sizes and position during the floating.
     * @private
     */
    function _onCardMove(track) {

        var radius = track.width / 2;

        var center = {
            x: track.x,
            y: track.y
        };

        polygonMap.points.forEach(function(point, i) {

            if (_detectPointInCircle(point, radius, center)) {
                $cash(polygonMap.paths[i]).attr('class', CLASSES.polygon + ' ' + CLASSES.polygonHidden);
            } else {
                $cash(polygonMap.paths[i]).attr('class', CLASSES.polygon);
            }
        });
    }

    /**
     * Detect if a point is inside a circle area.
     * @private
     */
    function _detectPointInCircle(point, radius, center) {

        var xp = point.x;
        var yp = point.y;

        var xc = center.x;
        var yc = center.y;

        var d = radius * radius;

        var isInside = Math.pow(xp - xc, 2) + Math.pow(yp - yc, 2) <= d;

        return isInside;
    };

    function _initEvent() {
        var $mainWrapper = $('.main-wrapper'),
            i,
            cards;

//        $mainWrapper.on('click', '.card', function () {
//            var cards = $mainWrapper.find('.card'),
//                me = $(this),
//                i = cards.index(me);
//
//            console.log('me index : ' + i);
//
//            var instance = new Card(i, me[0]);
//
//            console.log('instance：') ;
//            console.log(instance);
//
//            var $cardImage = me.find(SELECTORS.cardImage);
//            var $cardClose = me.find(SELECTORS.cardClose);
//
//            $cardImage.on('click', _playSequence.bind(this, true, i));
//            $cardClose.on('click', _playSequence.bind(this, false, i));
//        });
//
        var $navbar = $('.navbar-inverse');
        $mainWrapper.on('click', '.card '+SELECTORS.cardImage, function (e) {

            var me = $(this),
                self = me.parents('.card'),
                iframe = self.find('iframe'),
                cards = $mainWrapper.find('.card');
            i = cards.index(self);

            self.parents('.main-wrapper').find('.X_loadMore').addClass('animate');
            $navbar.addClass('animate');
            if (iframe.length>0) {
                iframe[0].src = iframe.attr('data-src');
            }
            _playSequence.bind(self[0], true, i)(e);
        });
        $mainWrapper.on('click', '.card '+SELECTORS.cardClose, function (e) {
            var me = $(this),
                self = me.parents('.card'),
                cards = $mainWrapper.find('.card');
            i = cards.index(self);
            _playSequence.bind(self[0], false, i)(e);
            setTimeout(function () {
                self.parents('.main-wrapper').find('.X_loadMore').removeClass('animate');
                $navbar.removeClass('animate');
            }, 2500);
        });
    }
    // Expose methods.
    return {
        init: init,
        update: update
    };

})(window);

window.onload = demo.init();
// Kickstart Demo.
//window.onload = demo.init;

// load resource
// with templates
//window.onload = function () {
//    window.pattern = Trianglify({
//        width: window.innerWidth,
//        height: window.innerHeight,
//        cell_size: 90,
//        variance: 1,
//        stroke_width: 1,
////      x_colors: 'Purples'
////        x_colors: 'Blues',
////        y_colors: 'Reds'
//        x_colors: 'random'
//    }).svg(); // Render as SVG.
//};
/**
 * 动态加载
 * card:
 *     index
 *     title
 *     subTitle
 *     image
 *
 */
require([
    'jQuery',
    'js/util/underscore',
    'vendor/jquery.qrcode.min',
    'js/util/xhr',
    'js/util/scrollLoad',
    'js/util/loading',
    'text!page/index/card.tpl.txt',
    'text!page/index/cards.json',
    'text!/cardsTpl/app-page.html'
], function ($, _, jOrcode, xhr, scrollLoad, loadingModule, tplCard, cardsJson, tplAppPage) {
    $(function () {

        window.pattern = Trianglify({
            width: window.innerWidth,
            height: window.innerHeight,
            cell_size: 90,
            variance: 1,
            stroke_width: 1,
//      x_colors: 'Purples'
//        x_colors: 'Blues',
//        y_colors: 'Reds'
            x_colors: 'random'
        }).svg(); // Render as SVG.

//        console.log('underscore');
//        console.log(_);
        // Dom

        var $answerListContainer = $('.main-wrapper .wrapper');
        var loading = loadingModule({ container: $answerListContainer.parent() });

        var cards = JSON.parse(cardsJson),
            total = cards && cards.includes.length;

//        获取卡片
        var getCards = (function (userId) {
            var more = true,
                start = 0,
                data = [],
                limit = 6,
                paused = false;
            window.cardIndex = 0;

            return function (success, fail) {
                if (paused) { return; }
                if (!$.isFunction(success) || !$.isFunction(fail)) { return; }
                if (!more) { return; }

                loading.begin();
                var resultArr = cards.includes.slice(start,start+limit);

                for(var i = 0; i< limit; i++) {
                    var now = resultArr[i];
                    if (now) {
                        require(['text!/cardsJson/'+now+'.json'], function (card) {
                            var card = JSON.parse(card);
//                            console.log('start: ' + start);
                            card.index = start + cardIndex;
//                            console.log('index: '+ card.index);
                            card.content = generateContent(card);
//                            console.log(Math.random(cards.image.default.total));
//                            console.log(cards.image.default.total);
                            card.image = card.image ? '/images/card/' + card.image : '/images/card/default/' + parseInt(Math.random()*(cards.image.default.total)+1) + '.jpg';
                            data.push(card);
                            success([card]);
                            cardIndex +=1;
                            demo.update();
                        })
                    } else{
//                        console.log('data');
//                        console.log(data);
//                        console.log(resultArr);
//                        success(data);
                    }
                }
//                try{
//                    var resultArr = cards.includes.slice(start,start+limit);
//
//                    for(var i = 0; i< limit; i++) {
//                        var now = resultArr[i];
//                        if (now) {
//                            require(['text!/card/'+now+'.json'], function (card) {
//                                var card = JSON.parse(card);
//                                card.index = start + i;
//                                card.content = generateContent(card);
//                                card.image = card.image ? '/images/card/' + card.image : '/images/default/' + Math.ceil(Math.random(cards.image.default.total)) + '.jpg';
////                                console.log(card);
//                                data.push(card);
//                                console.log(data);
//                            })
//                        }
//                    }
//
//                } catch (err){
//                    console.error('cars资源解析出错');
////                    fail(err);
//                    console.error(err);
//                }
                loading.stop();

                more = total > (start+limit) ? true : false;
                if (more) {
                    start += limit;
                } else {
                    loading.finish();
                }
            }
        })();

        function handlerSuccess (data) {
            renderFeedList(data || [], $answerListContainer);
        }

        function handlerFail (msg) {
            alert(msg);
        }

        function renderFeedList (feedList, $container) {
            var html = '';
//            $.each(feedList, function (i, feed) {
//                html += getCardDom(this);
//            });
//            for (var i =0; i<feedList.length; i++){
//                html += getCardDom(feedList[i]);
//            }
            var card = feedList[0];
            html += getCardDom(card);
            var $html = $(html);
            if (card.filter){
//                console.log('find filter');
                if (_.isArray(card.filter)){
                    _.each(card.filter, function (ele, idx, arr) {
                        $html.addClass(ele);
                    });
                }else {
                    $html.addClass(card.filter);
                }
            }
            if (card.wrapper && card.wrapper.class) {
                $html.find('.card__content').addClass(card.wrapper.class);
            }
            if (card.class) {
                $html.find('.card__copy .custom_content').addClass(card.class);
            }
            var $hasQrcode = $html.find('.qrcode');
            if ($hasQrcode.length > 0) {
                $hasQrcode.qrcode($hasQrcode.attr('data-text'));
            }
            $container.append($html);
        }

        function getCardDom (data) {
            return _.template(tplCard)(data);
        }

        function setMessage(msg, stopAutoClose, type) {
            var $error = $('.err-msg');
            $error.css('color', '#e40');
            type && (type.indexOf('success') > -1 ? (function () {
                $error.css('color', '#8cc274');
            }()) : (function () {
                $error.css('color', '#e40');
            }()));
            $error.html(msg).show();
            var timer = setTimeout(function () {
                $error.html('').hide();
            }, 3000);
            if (stopAutoClose) {
                clearTimeout(timer);
            }
        }

        function generateContent(card) {
            window.generatorTpl = {};

            var generator =window.generator= {
                'page': function () {
//                    console.log('on @page')
                    var tpl = '\
                    <iframe class="custom_content" frameborder="0" data-src="<%= url %>"></iframe>\
                    ';
                    return _.template(tpl)(card);
                }
                ,'app-page': function () {
                    return _.template(tplAppPage)(card);
                }
                ,'default': function () {
                    console.error('generate content on default');
                }
            } ;
            return generator[card['type']] ?  generator[card['type']](): generator['default']() ;
        }
        // 首次加载
        getCards(handlerSuccess, handlerFail);

        // 注册滚动加载
        scrollLoad.initHandler(function () {
            getCards(handlerSuccess, handlerFail);
        });
    });
});