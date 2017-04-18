define(function(require,exports,module){
	var id=window.localStorage.getItem("id");
	if(!id){
		document.querySelector(".weui_mask").style.display="block";
		document.querySelector(".weui_dialog").style.display="block";
		document.querySelector(".weui_btn_dialog").onclick=function(){
			location.href="login.html";
		}
	}else{
		var $=require("zepto"),template=require("artTamplate");
		require("tap");
		require("swiper");
		getList(id);
		var mySwiper = new Swiper('.swiper-container', {
			onSlideChangeEnd:function(swiper){
				$(".check a").eq(swiper.activeIndex).addClass("curr").siblings("a").removeClass("curr");
			}
		})
		$(".check a").on("tap",function(){
			$(this).addClass("curr").siblings("a").removeClass("curr");
			mySwiper.slideTo($(this).index(), 1000, false);
			return false;
		});
		function getList(id){
			$.get("api/login",{"id":id},function(data){
				if(!data.error){
					render(data.data);
					console.log(data.data)
				}else{
					alert("数据请求错误");
				}
			})
		}
		function render(data){
			var html_user=template('list_tmpl',data.info),html_img=template('img_tmepl',data.img),html_follow=template('list_tmpl',data.follow),html_fans=template('list_tmpl',data.fans);
			$(".users").append(html_user);
			$(".show").append(html_img);
			$(".swiper-slide").eq(1).append(html_follow);
			$(".swiper-slide").eq(2).append(html_fans);
			$(".swiper-container").height($(".scroll").height()-$(".users").eq(0).height()-$(".check").height());
			$(".praise a").on("tap",function(){
				if($(this).html()=="关注"){
					var name=$(this).html("取关").removeClass("curr").parents(".user").find(".name").html();
				}else{
					var name=$(this).html("关注").addClass("curr").parents(".user").find(".name").html();
				}
			})
			setNum(data);
		}
		function setNum(data){
			$(".check a").eq(0).find("span").html(data.img.arr.length);
			$(".check a").eq(1).find("span").html(data.follow.arr.length);
			$(".check a").eq(2).find("span").html(data.fans.arr.length);
		}
	}
})