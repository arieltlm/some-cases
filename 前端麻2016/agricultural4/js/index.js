$(document).ready(function(){
	
	var li_num=$(".expert_li").length;
	var res_four = li_num - 4;
	var ul_width = li_num * 240 +'px';
	var res_width = res_four *(-240) +'px';
	
	$(".expert_lists").css("width",ul_width);
	$(".sright").hover(function(){
		if($(".expert_lists").css('left')<=res_width){
			$(".sright").css("color","rgba(230,230,230,0.3)");
		}else{
			$(".sright").css("color","rgba(240,240,240,0.6)");
		}
	})
	$(".sleft").hover(function(){
		if($(".expert_lists").css('left')>=0+'px'){
			$(".sleft").css("color","rgba(230,230,230,0.3)");
		}else{
			$(".sleft").css("color","rgba(240,240,240,0.6)");
		}
	})

	$(".sright").click(function(){
		if($(".expert_lists").css('left')<=res_width){
			$(".expert_lists").css("left",res_width);
			$(".sright").css("color","rgba(230,230,230,0.3)");
		}else{
			$(".expert_lists").css("left","-=240px");
			$(".sright").css("color","rgba(240,240,240,0.6)");

		}
	})
	$(".sleft").click(function(){
		if($(".expert_lists").css('left')>=0+'px'){
			$(".expert_lists").css("left",0+'px');
			$(".sleft").css("color","rgba(230,230,230,0.3)");
		}else{
			$(".expert_lists").css("left","+=240px");
			$(".sleft").css("color","rgba(240,240,240,0.6)");
		}
	})
})