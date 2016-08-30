/*这个小功能做完之后才觉得如此简单。
刚开始还一直在考虑使用select下拉列表呢还是ul。而下拉列表option内加不了图片，所以每个选项中没有图标。背景图片
也加不了。还学习了onchange方法，在切换option时，定义option的各个value值切换图片。
简单来说，最终实现如下：
    开始设置了原始origin的显示。
    使用ul，切换其li的显示与否，通过css控制位置。
    同时注意在点击了切换状态处，而未在li上做选择时，又在别处点击，此时要退出下拉表的显示，所以document上使其
    li显示为none。如此需加阻止冒泡事件，否则点击任何地方都none，列表永远显示不出来。
    
    中间的下拉小三角是通过css位置放置放于中间同时在其上同样绑定了点击出现下拉列表事件。
    在下拉表出现后，使用闭包，做了鼠标悬停效果，做了点击哪个li就让其li的内容给origin的内容。*/
window.onload=function(){
      
      function addHander(element,type,hander){
        if(element.addEventListener){
          element.addEventListener(type,hander,false);
        }else if(element.atachEvent){
          element.attachEvent('on'+type,hander);
        }else{
          element['on'+type]=hander;
        }
      }

      function removeHander(element,type,hander){
        if(element.removeEventListener){
            element.removeEventListener(type,hander,false);
        }else if(element.detachEvent){
            element.detachEvent('on'+type,hander);
        }else {
            element['on'+type]=null;
        }
      }
      function displayBlock(event,dis){
          event=event || window.event;
          //阻止冒泡
          if(event.stopPropagation){
              event.stopPropagation();
          }else{
              event.cancelBubble=true;
          }
          //下拉列表出现否
          for(var i=0;i<lis.length;i++){
            lis[i].style.display=dis;
          }
      }

      
      var panel=document.getElementById("panel"),
          origin=document.getElementById('origin'),
          lis=document.getElementsByTagName('li'),
          options=document.getElementsByTagName('option'),
          downlogo=document.getElementsByClassName('downlogo')[0];
      
      // 下拉列表的出现
      addHander(origin,'click',function(){
        displayBlock(event,'block');
      });
      addHander(downlogo,'click',function(){
        displayBlock(event,'block');
      });
      // 下拉列表的消失
      addHander(document,'click',function(){
        displayBlock(event,'none');
      });

        
      for(var i=0;i<lis.length;i++){
        (function(num){
          //下拉每一项的悬停
            addHander(lis[num],'mouseover',function(){
              for(var j=0;j<lis.length;j++){
                if(j==num){
                  lis[num].style.backgroundColor='#528693';
                }else{
                  lis[j].style.backgroundColor='#C9EAF2';
                }
              }
            });
            //选中哪个状态则将li的内容给上面div，同时点击后下拉消失
            addHander(lis[num],'click',function(){
              origin.innerHTML=lis[num].innerHTML;
              displayBlock(event,'none');
            })
        })(i);
      }
    



    //点击x关闭qq面板
    var close=document.getElementById("close");
    addHander(close,'click',function(){
        panel.style.display='none';
    });  





    //拖拽事件
    var loginPanel=document.getElementsByClassName("loginPanel")[0];
    addHander(loginPanel,'mousedown',Drag);

    function Drag(event){
        event=event||window.event;
        
        var disX=event.clientX-panel.offsetLeft,
            disY=event.clientY-panel.offsetTop;
            
        /*addHander(document,'mousemove',function(event){//刚忘了没写event，死活动不了
            event = event || window.event;
            fmove(event,disX,disY);
        });
        //不理解为何这样写如何般都停止不了move事件
        addHander(document,'mouseup',function(event){
            removeHander(document,'mousemove',function(event){
            event = event || window.event;
            fmove(event,disX,disY);
        });
      });  */
        //移动
        document.onmousemove=function(event){
            event = event || window.event;
            fmove(event,disX,disY);
        }
        // 释放鼠标
        document.onmouseup=function(){
           document.onmousemove=null;
           document.onmouseup=null;
        }
    }
    
    function fmove(event,X,Y){
            event=event || window.event;
            var oleft=event.clientX-X,
                otop=event.clientY-Y,
                winL=document.documentElement.clientWidth ||document.body.clientWidth,
                winH=document.documentElement.clientHeight||document.body.clientHeight,
                maxL=winL-panel.offsetWidth,
                maxH=winH-panel.offsetHeight;

            if(oleft<0){
                oleft=0;
            }else if(oleft>maxL){
                oleft=maxL;
            }
            if(otop<0){
                otop=0;
            }else if(otop>maxH){
                otop=maxH;
            }

            panel.style.left=oleft+'px';
            panel.style.top=otop+'px';
            
        }
}