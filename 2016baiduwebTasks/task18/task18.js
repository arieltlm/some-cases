function addEventHandler(ele, event, hanlder) {
    if (ele.addEventListener){
        ele.addEventListener(event, hanlder, false);
    } else if (ele.attachEvent) {
        ele.attachEvent("on"+event, hanlder);
    } else  {
        ele["on" + event] = hanlder;
    }
}

var button=document.getElementsByTagName('button'),
    span=document.getElementsByTagName('span'),
    queues=document.getElementById('queues'),
    quequeadd=document.getElementById('inputs'),
    queue=new Array();
  


addEventHandler(button[0],'click',leftIn);
addEventHandler(button[1],'click',leftOut);
addEventHandler(button[2],'click',rightIn);
addEventHandler(button[3],'click',rightOut);
addEventHandler(queues,'mouseover',dell);



//左侧入
function leftIn(){
  if(!quequeadd.value.match(/^[0-9]*$/)){
  alert("请输入数字");
  return;
  }
    queue.unshift(quequeadd.value);
    newQueue();
}
//左侧出
function leftOut(){
  alert(queue.shift());
  //queue.shift();
  newQueue();
}
//右侧入
function rightIn(){
  if(!quequeadd.value.match(/^[0-9]+$/)){
  alert("请输入数字");
  return;
  }
  queue.push(quequeadd.value);
  newQueue();
}
//右侧出
function rightOut(){
  alert(queue.pop());
  newQueue();
}
//删除
function del(n){
  queue.splice(n,1);
  newQueue();
}

//删除哪一个
function dell(){
  for(var i=0;i<span.length;i++){
        (function(num){
            span[i].onclick=function(){
                for(var n=0;n<span.length;n++){
                    if(n==num){
                        del(n);
                    }
                }
            }
        })(i);
    }
}
//队列显示
function newQueue(){
    var newQue='';
    for(var i=0;i<queue.length;i++){
      newQue +='<span>'+queue[i]+'</span>';
    }
    queues.innerHTML=newQue;
}