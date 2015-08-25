require(['jQuery'], function ($) {
    $(function () {
        var smoke_pos = 0,
            smoke_sudu = 4;

        var time1, time2;

        var $work = $('main .row a');

        setInterval(function () {
            $(".smoke").css({backgroundPosition: '0' + (smoke_pos -= smoke_sudu) + 'px'});
        }, 30);*

        $('.jumbotron')
            .mouseover(function () {
                $(this).css("backgroundPosition", "0 -300px");
                smoke_sudu = 8
            })
            .mouseout(function () {
                $(this).css("backgroundPosition", "0 0");
                smoke_sudu = 4

            });

        $("[desc]")
            .bind('mouseover', function () {

                var $this = $(this);
                var desc = $this.attr('desc');
                $this.data('name', $this.html());
                desc == '' ? 0 : $this.html(desc);
            })
            .bind('mouseout', function () {
                var $this = $(this);
                $this.attr('desc', $this.html());
                $this.html($this.data('name'));
            });

        $("[data-select]").bind("click", function () {
            $work.css('display', 'none');
            $($(this).attr('data-select')).css('display', 'block');
        });
    });
});