/**
 * Created by chen on 2015/8/21.
 */
define('demo', function () {
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
            $mainWrapper.on('click', '.card '+SELECTORS.cardImage, function (e) {

                var me = $(this),
                    self = me.parents('.card'),
                    iframe = self.find('iframe'),
                    cards = $mainWrapper.find('.card');
                i = cards.index(self);

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
            });
        }
        // Expose methods.
        return {
            init: init,
            update: update
        };

    })(window);

    return demo;
});