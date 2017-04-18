define(function(require,exports,module){
	var $=require("zepto"),iscrollRefresh=require("iscrollRefresh"),template=require("artTamplate");
	require("tap");
	require("swiper");
	require("iscroll");
	var arr=["足球现场","足球生活","足球美女"],scroll=$(".scroll"),swiperContainer=$(".swiper-container"),check=$(".check");
	scroll.height(swiperContainer.height()-check.height());
	var mySwiper = new Swiper('.swiper-container', {
		pagination: '.check',
		paginationClickable: true,
		bulletClass:"tab",
		bulletActiveClass:"curr",
		paginationBulletRender: function (index, className) {
		    return '<a class="' + className + '">' + arr[index] + '</a>';
		},
		onInit:function(swiper){
			getList(swiper.activeIndex);
		},
		onSlideChangeEnd:function(swiper){
			if(!$(".content").eq(swiper.activeIndex).has("dl").length){
				getList(swiper.activeIndex);
			}
		}
	});
	function getList(index){
		$.get("api/leftlve",{"pg":index},function(data){
			if(!data.error){
				render(data,index);
			}else{
				alert("数据请求错误");
			}
		})
	}
	function render(data,index){
		var $content=$(".content").eq(index);
		var html=template('list_tmpl',data);
		$content.append(html);
		setTimeout(function(){
			arrObj[index].refresh();
			arrObj[index].maxScrollY+=40;
			arrObj[index].maxS=arrObj[index].maxScrollY;
			iscrollRefresh._refresh(arrObj[index]);
			$(".down").eq(index).css("opacity","1");
		},10);
	}
	var scrollObj={
		mouseWheel:true,
		scrollbars:true,
		probeType:2,
		fadeScrollbars:true,
		startY:-40
	};
	var myscroll0=new IScroll("#scroll0",scrollObj);
	var myscroll1=new IScroll("#scroll1",scrollObj);
	var myscroll2=new IScroll("#scroll2",scrollObj);
	var arrObj=[myscroll0,myscroll1,myscroll2];
	for(var i=0;i<3;i++){
		arrObj[i].maxScrollY+=40;
		arrObj[i].pd="";
		arrObj[i].index=i;
		iscrollRefresh.iscrollRefresh(arrObj[i],getList);
	}
})