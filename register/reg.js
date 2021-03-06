/**
 * Created by tlm on 2016/1/3.
 */
//获取下一个span，可以通过这个对象给状态
function gspan(cobj) {
    while (true) {
        if (cobj.nextSibling.nodeName != "SPAN") {
            cobj = cobj.nextSibling;
        }else {
            return cobj.nextSibling;
        }
    }

}

//通用检查方法
//第一个参数：obj，是用来检查的对象
//第二个参数：info，是用来检查的提示信息
//第三个参数：fun，是一个回调函数，用来坚持值是否按条件输入
//第四个参数：click只是一个状态，分清楚是单击提交按，还是失去焦点按
function check(aobj,info,fun,click){
    //document.frm.username.focus();//一打开页面，焦点就在第一个上面

    aobj.onfocus=function(){
        var sp=gspan(aobj,info);
        sp.innerHTML=info;
        sp.className="stats2";
    }
    aobj.onblur=function(){
        var sp=gspan(aobj);
        if(fun(this.value)){
            sp.innerHTML="输入正确";
            sp.className="stats4";

        }else if(aobj.value=="") {
            sp.innerHTML = "不能为空";
            sp.className = "stats3";
            //}else if()//写出其不合格的格式的
        }else{
            sp.innerHTML=info;
            sp.className="stats3";
        }
    }
    if(click=="click"){
        aobj.onblur();
    }
}

//页面加载完自动调用
onload=regs
//一个函数可以通过onsbmit调用也可以通过onload调用
function regs(click){

    var stat=true;
    var username=document.frm.username;
    //var username=document.getElementsByName("username")[0];
    var password=document.frm.password;
    var repass=document.frm.repass;
    var email=document.frm.email;
    var captcha=document.frm.captcha;
    var others=document.frm.others;
    check(username,"用户名的长度应该在3-20之间",function(val) {
        if (((val.length) >= 3) && ((val.length) <= 20) && (val.match(/^\S+$/)))
            return true;
        else {
            stat = false;
            return false;
        }
    },click);
    check(password,"密码必须在6—20位之间",function(val) {
        if (((val.length) >= 3) && ((val.length) <= 20) && (val.match(/^\S+$/)))
            return true;
        else{
            stat = false;
            return false;
        }
    },click);
    check(repass,"确定密码要和上面一致，规则也要相同",function(val) {
        if (((val.length) >= 3) && ((val.length) <= 20) && (val.match(/^\S+$/))&& val==password.value)
            return true;
        else{
            stat = false;
            return false;
        }
    },click);
    check(email,"要按邮箱规则输入",function(val){
        if(val.match(/\w+@\w+\.\w/))
            return true;
        else{
            stat = false;
            return false;
        }
    },click);
    return stat;
}