require(['jQuery'], function ($) {
    $(function () {
        var $work = $('main .row a');

        $('.navbar').on('click', '[data-select]', function () {
            var me = $(this),
                attr = me.attr('data-select'),
                $cards = $('.main-wrapper .wrapper .card');

            $cards.css('display', 'none');
//            console.log($cards);
            window.$cards = $cards;
//            console.log($cards.filter(attr));
            $cards.filter(attr).css('display', 'block');
        });
    });
});