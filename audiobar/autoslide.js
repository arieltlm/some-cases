/**
 * Created by tlm on 2016/1/9.
 */
/**
 * Created by tlm on 2016/1/9.
 */
var btn=document.getElementById("btnl0");
var title0=document.getElementById("titlel0");
var lef=document.getElementsByClassName("left")[0];
var barr=document.getElementsByClassName("bars_r0")[0];
var bar=document.getElementById("bar0");

var butt0=document.getElementById("butt0");
//var butt1=document.getElementById("butt1");

btn.style.left=Number(btn.style.left);
lef.style.width=Number(lef.style.width);

var zl=30;//音频长度为30s
var tm=zl*1000/100;//间隔时间

var barl=bar.offsetWidth;//条的宽度
var btnl=btn.offsetWidth;//竖条的宽度
var diff=barl-btnl;//音频长度对应的条的长度


barr.innerHTML=zl;
var barv=barr.innerHTML;

var n=0;

butt0.onclick=function(){
    //针对每次按钮上的样式变换
    //if(n%2==0){
    //    butt0.style.color='orange';
    //}else{
    //    butt0.style.color='blue';
    //}

    //if(butt0.style.color=='orange') {
    if(n%2==0) {//点第一（奇数次）次为播放，点第二（偶数次）次为停止
        st = setInterval(function(){
            btn.style.left = parseInt(btn.style.left) + 1 + "px";
            lef.style.width = parseInt(lef.style.width) + 1 + 'px';
            //alert((parseInt(lef.style.width)/289*100).toFixed(2)+"%");//百分比
            title0.innerHTML = (parseInt(lef.style.width) / diff * barv).toFixed(1);//toFixed()为小数点后保留几位
            if (parseInt(btn.style.left) == diff) {//289为这个条的宽度减去竖条的宽度。音频总长度是和这个相对应的
                clearInterval(st);
            }
        }, tm);//设置运行次数为100
    }else{
        clearInterval(st);
        alert((parseInt(lef.style.width)/289*100).toFixed(2)+"%");//百分比
    }
    n=n+1;
    //再做一个暂停按钮时如此
    //butt1.onclick=function(){
    //    clearInterval(st);
    //
    //}

}
