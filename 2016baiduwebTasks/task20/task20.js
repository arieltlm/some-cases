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
    checks=document.getElementById("checks"),
    queue=new Array();
    for(var i=0;i<span.length;i++){
      queue[i]=span[i].innerHTML;
    }
   
addEventHandler(button[0],'click',leftIn);
addEventHandler(button[1],'click',leftOut);
addEventHandler(button[2],'click',rightIn);
addEventHandler(button[3],'click',rightOut);
addEventHandler(button[4],'click',match);
addEventHandler(queues,'mouseover',dell);


//左侧入
function leftIn(){
    var elements= quequeadd.value.replace(/[^\d\u4e00-\u9fa5a-zA-Z]+/g," ").split(" ");
    for(var i=elements.length-1;i>=0;i--){
      queue.unshift(elements[i]);
    }
    
    newQueue();
}
//左侧出
function leftOut(){
  alert(queue.shift());
  newQueue();
}
//右侧入
function rightIn(){
    var elements= quequeadd.value.replace(/[^\d\u4e00-\u9fa5a-zA-Z]+/g," ").split(" ");
    for(var i=0;i<=elements.length-1;i++){
      queue.push(elements[i]);
    }
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
var nnn=new Array();
nnn[0]=-1;
//队列显示
function newQueue(){
    var newQue='';
    // if(queue.length>60){
    //   alert("队列元素数量最多限制为60个");
    //   return;
    // }
    var j=0;
    for(var i=0;i<queue.length;i++){
      
       if(i==nnn[j]){
        newQue +='<span class="matchs">'+queue[i]+'</span>';
        j++;
        continue;
        }else
         newQue +='<span>'+queue[i]+'</span>';
       
      }
    queues.innerHTML=newQue;
  }

//匹配
function match(){
   var reg=new RegExp("("+checks.value+")","g");
  var elespan=queues.innerHTML.replace(/<[^>]+>/g," ").trim();//替换所有的span标签为空格，只留下队列中的内容
  var elements= elespan.replace(/[^\d\u4e00-\u9fa5a-zA-Z]+/g," ").split(" ");
  var ii=0;
  for(var i=0;i<elements.length;i++){
    if(elements[i].search(reg)!=-1){
      nnn[ii]=i;
      ii++;
    }
  }
  newQueue();
 
}
