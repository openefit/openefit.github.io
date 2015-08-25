/**
 * Created by medlinker-pc on 2015/8/5.
 */
define(function () {
    // 过滤非法字符
    function stripscript(s){
        var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%]");
        var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs+s.substr(i, 1).replace(pattern, '');
        }
        return rs;
    }

    function htmlspecialchars(str) {
        var s = "";
        if (str.length == 0) return "";
        for(var i=0; i<str.length; i++){
            switch (str.substr(i,1)){
                case "<": s += "&lt;"; break;
                case ">": s += "&gt;"; break;
                case "&": s += "&amp;"; break;
                case " ":
                    if(str.substr(i + 1, 1) == " "){
                        s += " &nbsp;";
                        i++;
                    } else s += " ";
                    break;
                case "\"": s += "&quot;"; break;
                case "\n": s += "<br>"; break;
                default: s += str.substr(i,1); break;
            }
        }
        return s;
    }
    return {
        stripscript: stripscript,
        htmlspecialchars: htmlspecialchars
    };
});