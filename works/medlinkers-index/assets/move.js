/**
 * Created by user on 2015/1/8.
 */
var pn = 0;
var direction = true;
var initial = true;
var playing = false;
var playingDuration = 1500;

var scrollFunc=function(event,delta){
    var myevent = event || window.event;
    if (!playing) {
        if (delta < 0) {
            motion(true);
        }else{
            motion(false);
        }
    };
}

if(document.addEventListener){
    document.addEventListener('DOMMouseScroll',scrollFunc,false);
}
window.onmousewheel=document.onmousewheel=scrollFunc(event,delta);
document.onkeydown = function(event) {
    event=event || window.event;
    var c = event.keyCode;
    if (c==40||c==32||c==39) {
        motion(true);
    }else if (c==38||c==37) {
        motion(false);
    }
}
function playingdelay(){
    playing = true;
    setTimeout(function(){playing = false;},playingduration);
}
function motion (direction) {
    if (direction == true) {
        if (pn == 3) {
            pn = 0;
            core(0,true);
            playingdelay();
        }else{
            pnsnap = pn;
            pn += 1;
            core(pn,false);
            playingdelay();
        }
    }else{
        if (pn == 0) {
        }else{
            pnsnap = pn;
            pn -= 1;
            core(pn,false);
            playingdelay();
        }
    }

}
var stage1 = $('.segment-1');
var stage2 = $('.segment-2');
var stage3 = $('.segment-3');
var stage4 = $('.segment-4');

function core(pn,loop){
    if (pn == 0) {
        $(".segment-1 text").velocity("fadeIn",1000);
    }
}
//$(document).ready(function(){
////    $(".segment").css("visibility","hidden");
////    core(0,false);
////    mac();
////    $('.segment-1 .left').css("opacity","0");
////    $('.segment-1 .right').css("opacity","0");
////
////    $('.segment-2 .left').css("opacity","0");
////    $('.segment-2 .right').css("opacity","0");
////
////    $('.segment-3 .left').css("opacity","0");
////    $('.segment-3 .right').css("opacity","0");
////
////    $('.segment-4 .left').css("opacity","0");
////    $('.segment-4 .right').css("opacity","0");
//
//    $('.segment-1 text').velocity("fadeIn",1000);
//});

$(function () {
    $(".segment .left.text").volocity({
        opacity: 1
    },{
        duration; 1500;
    display: block,

    })
});