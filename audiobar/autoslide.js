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

var zl=30;//��Ƶ����Ϊ30s
var tm=zl*1000/100;//���ʱ��

var barl=bar.offsetWidth;//���Ŀ��
var btnl=btn.offsetWidth;//�����Ŀ��
var diff=barl-btnl;//��Ƶ���ȶ�Ӧ�����ĳ���


barr.innerHTML=zl;
var barv=barr.innerHTML;

var n=0;

butt0.onclick=function(){
    //���ÿ�ΰ�ť�ϵ���ʽ�任
    //if(n%2==0){
    //    butt0.style.color='orange';
    //}else{
    //    butt0.style.color='blue';
    //}

    //if(butt0.style.color=='orange') {
    if(n%2==0) {//���һ�������Σ���Ϊ���ţ���ڶ���ż���Σ���Ϊֹͣ
        st = setInterval(function(){
            btn.style.left = parseInt(btn.style.left) + 1 + "px";
            lef.style.width = parseInt(lef.style.width) + 1 + 'px';
            //alert((parseInt(lef.style.width)/289*100).toFixed(2)+"%");//�ٷֱ�
            title0.innerHTML = (parseInt(lef.style.width) / diff * barv).toFixed(1);//toFixed()ΪС���������λ
            if (parseInt(btn.style.left) == diff) {//289Ϊ������Ŀ�ȼ�ȥ�����Ŀ�ȡ���Ƶ�ܳ����Ǻ�������Ӧ��
                clearInterval(st);
            }
        }, tm);//�������д���Ϊ100
    }else{
        clearInterval(st);
        alert((parseInt(lef.style.width)/289*100).toFixed(2)+"%");//�ٷֱ�
    }
    n=n+1;
    //����һ����ͣ��ťʱ���
    //butt1.onclick=function(){
    //    clearInterval(st);
    //
    //}

}
