/**
 * Created by tlm on 2016/1/9.
 */

scale = function (btnl, btnr, barl, titlel,titler) {
    this.btnl = document.getElementById(btnl);
    this.btnr = document.getElementById(btnr);
    this.barl = document.getElementById(barl);
    this.barr = document.getElementById(barl);
    this.titlel = document.getElementById(titlel);
    this.titler = document.getElementById(titler);
    this.stepl = this.barl.getElementsByClassName("left")[0];
    this.stepr = this.barl.getElementsByClassName("right")[0];
    //this.barr = document.getElementsByClassName("bars_r0")[0];
    this.init();
    var zl=30;//音频长度为30s
    //this.barr.innerHTML=zl;//这个可以不要，因为autoslide.js中有了这个设置
};
scale.prototype = {
    init: function () {
        var f = this, g = document, b = window, m = Math;
        f.btnl.onmousedown = function (e) {
            var x = (e || b.event).clientX;
            var l = this.offsetLeft;
            var max = f.barl.offsetWidth - this.offsetWidth;

            g.onmousemove = function (e) {
                var thisXl = (e || b.event).clientX;
                var to = m.min(max, m.max(0, l + (thisXl - x)));//这个我将-2改为0了
                f.btnl.style.left = to + 'px';
                f.ondragl(m.round(m.max(0, to / max) * zl*10), to);//这个改了
                b.getSelection ? b.getSelection().removeAllRanges() : g.selection.empty();
            };
            g.onmouseup = new Function('this.onmousemove=null');
        };


    },
    ondragl: function (pos, x) {
        this.stepl.style.width = Math.max(0, x) + 'px';
        this.titlel.innerHTML = pos/10 + '';
    }

};
new scale('btnl0','btnr0', 'bar0', 'titlel0','titler0');



