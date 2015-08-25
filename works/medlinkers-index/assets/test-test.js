/**
 * Created by user on 2015/1/8.
 */
//    $.Velocity.mock = true; //for test-> 0 duration and 0 delay.
var playing = false;
var playingduration = 1500;
$(function () {
    var pg = 0;
    $(document).mousewheel(function(event,delta){
        if(!playing){
        if (delta < 0){
            if (pg == 3) {
                pg = 0;
                core(4,true)
            }
            else {
                pg += 1;
                console.log(pg);
                core(pg, true);
            }

        }
            if(delta > 0){
            if (pg == 0) {

            }else{
                core(pg,false);
                pg -=1;

            }
        }
        }
    });

    function playingdelay(){
        playing = true;
        setTimeout(function(){playing = false;},playingduration);
    }
    var core = function(pg , direction){
        var $p101 = $('#p101');
        var $p102 = $('#p102');
        var $p201 = $('#p201');
        var $p202 = $('#p202');
        var $p301 = $('#p301');
        var $p302 = $('#p302');
        var $p001 = $('#p001');
        var $p002 = $('#p002');

//        var p0in = function () {
//            $p001.velocity(
//                "slideDown"
//                ,1500, function () {
//                    $p002.velocity("fadeIn",500)
//                });
//        }
        var initial = true;
        var pinitial = [
            { e: $p001, p: "transition.swoopIn", o: { duration: 1000 } },
            { e: $p002, p: "fadeIn", o: { duration: 1000 } },
        ]
        var reset = [
            {e:$p302, p:"transition.prespectiveRightOut", o:{duration:1000}},
            {e:$p301, p: "transition.perspectiveUpOut", o: {duration:1000}},
        ]
        var p0in = [
            {e:$p302, p:"transition.slideLeftBigOut", o:{duration:1000}},
              {e:$p301, p: "transition.perspectiveUpOut", o: {duration:1000}},

            { e: $p001, p: "transition.swoopIn", o: { duration: 1000 } },
            { e: $p002, p: "fadeIn", o: { duration: 1000 } },
        ]

//        var p0out = function () {
//            $p002.velocity(
//                "fadeOut"
//                ,500, function () {
//                    $p001.velocity("slideUp",1500)
//                });
//        }
//        var p0out = [
//
//        ]
//        var p1in = function () {
//            $p102.velocity(
//                "fadeIn"
//                ,1500, function () {
//                    $p101.velocity("slideDown",500)
//                });
//        }
        var p1in = [
            {e: $p002, p: "fadeOut", o: {duration:1000}},
            {e: $p001, p: "transition.swoopOut", o:{duration:1000}},
            {e:$p102, p: "transition.shrinkIn" , o: {duration:1000}},
            {e: $p101, p: "transition.bounceUpIn", o: {duration:1000}}
        ];
        var p2in = [
            {e: $p101, p: "transition.bounceUpOut", o: {duration:1000}},
            {e:$p102, p: "transition.shrinkOut" , o: {duration:1000}},
            {e:$p201, p: "transition.slideLeftBigIn", o: {duration:1000}},
            {e:$p202, p:"transition.flipYIn",o:{duration:1000}}


        ];

        var p3in = [
            {e:$p202, p:"transition.flipYOut",o:{duration:1000}},
            {e:$p201, p: "transition.slideLeftBigOut", o: {duration:1000}},
            {e:$p301, p: "transition.perspectiveUpIn", o: {duration:1000}},
            {e:$p302, p:"transition.slideLeftBigIn", o:{duration:1000}},

        ];
        var p3out =[
            {e:$p302, p:"transition.slideLeftBigOut", o:{duration:1000}},
            {e:$p301, p: "transition.perspectiveUpOut", o: {duration:1000}},
            {e:$p201, p: "transition.slideLeftBigIn", o: {duration:1000}},
            {e:$p202, p:"transition.flipYIn",o:{duration:1000}}
        ];
        var p2out =[
            {e:$p202, p:"transition.flipYOut",o:{duration:1000}},
            {e:$p201, p: "transition.slideLeftBigOut", o: {duration:1000}},
            {e:$p102, p: "transition.shrinkIn" , o: {duration:1000}},
            {e: $p101, p: "transition.bounceUpIn", o: {duration:1000}}
        ]
        var p1out = [
            {e: $p101, p: "transition.bounceUpOut", o: {duration:1000}},
            {e:$p102, p: "transition.shrinkOut" , o: {duration:1000}},
            { e: $p001, p: "transition.swoopIn", o: { duration: 1000 } },
            { e: $p002, p: "fadeIn", o: { duration: 1000 } },
        ];

//        var p1out = function () {
//            $p101.velocity(
//                "fadeOut"
//                ,1500, function () {
//                    $p102.velocity("slideUp",1500)
//                });
//        }
//
//        var p2in = function () {
//            $p201.velocity(
//                "slideDown"
//                ,1500, function () {
//                    $p202.velocity("fadeIn",1500)
//                });
//        }
//        var p2out = function () {
//            $p201.velocity(
//                "slideUp"
//                ,1500, function () {
//                    $p202.velocity("fadeOut",1500)
//                });
//        }
//
//        var p3in = function () {
//            $p302.velocity(
//                "fadeIn"
//                ,1500, function () {
//                    $p301.velocity("slideDown",1500)
//                });
//        }
//        var p3out = function () {
//            $p301.velocity(
//                "fadeOut"
//                ,1500, function () {
//                    $p302.velocity("slideUp",1500)
//                });
//        }


        if  (pg == 0) {
//            if (initial){
//            if(direction) {
            playingduration = 2000;
            playingdelay();
                $.Velocity.RunSequence(pinitial);
//            }else{
//                $.Velocity.RunSequence(p2back);
//            }
//                initial = false;
//            }else{
////            p0in();
//            $.Velocity.RunSequence(p0in);}

        }
        if (pg ==1) {
            console.log(direction)
            if (direction ){
//                p0out();
//                p1in();
//                $('body')[0].style["background-color"] = "#fff";
                playingduration = 4000;
                playingdelay();
                $.Velocity.RunSequence(p1in);
            }else{
                playingduration = 4000;
                playingdelay();
                $.Velocity.RunSequence(p1out);
            }

        }
        if (pg ==2) {
            if(direction){
//                p1out();
//                p2in()
//                $('body')[0].style["background-color"] = "#f3f3f3";
//                $('body').velocity({backgroundColor: "#f3f3f3"},{duration: 30000,easing: "linear",complete: function () {
//                    alert("done");
//                },});
                playingduration = 4000;
                playingdelay();
                $.Velocity.RunSequence(p2in);
            }else{
                playingduration = 4000;
                playingdelay();
                $.Velocity.RunSequence(p2out);
            }

        }
        if (pg == 3) {
            if(direction){
//                p2out();
//                p3in();
//                $('body')[0].style["background-color"] = "#f3f3f3";

                playingduration = 4000;
                playingdelay();
                $.Velocity.RunSequence(p3in);
            }else{
                playingduration = 4000;
                playingdelay();
                $.Velocity.RunSequence(p3out);
            }
        }
        if (pg == 4 ) {

            playingduration = 4000;
            playingdelay();
            $.Velocity.RunSequence(p0in);
        }
    };

    core(0,true);
//    $('#p101').velocity("slideDown",2000,function(){
//        $('#p102').velocity("fadeIn",2000);
//    });
});
