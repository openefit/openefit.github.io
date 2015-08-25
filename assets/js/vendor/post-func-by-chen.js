/**
 * Created by chen on 2015/1/23.
 */
$(function () {
    $("h2").on('click', function () {
        console.log("h2 on click");
        this.nextUntil("h2").toggle("slow");
    });
});
