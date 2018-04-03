$(document).ready(function(){
	//弹出层
	var height_body = $("body").height();
	console.log(height_body)
	$("#t-weixin").click(function(){
		$("#bubble-box").show();
		$("#bubble-box").css('height',height_body + 'px')
	})
	$("#bubble-close").click(function(){
		$("#bubble-box").hide();
	})
	// 轮播
	var width_body = $("body").width();
	var num=$("#carousel li").length;
	var i = 1;
	var speed=1000;
	$("#carousel .imgs").css("width",width_body+'px');

	$("#carousel").css("width",width_body * num+'px');

	var ca1=setInterval(function(){
		var leftValue='-'+width_body*i;
		$("#carousel").animate({
			left:leftValue+'px'
		},speed);
		//图片与下面的圆圈对应，改变背景色
		for(var m=0;m<num-1;m++){
			if(m==i){
				$(".circles .circle").eq(m).css("background-color","orange");
			}else{
				$(".circles .circle").eq(m).css("background-color","#E3E3E4");
			}
		}
		//最后一个li和第一个span相对应
		if(i==num-1){
			$(".circles .circle").eq(0).css("background-color","orange");
		}
		i++;
		if(i==num){
			i=0;
			speed=0;
		}else{
			speed=1000;
		}
	},3000);
})
