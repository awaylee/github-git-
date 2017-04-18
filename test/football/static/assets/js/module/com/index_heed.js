define(function(require,exports,module){
	var $=require("zepto"),iscrollRefresh=require("iscrollRefresh"),template=require("artTamplate");
	require("tap");
	require("swiper");
	require("iscroll");
	getList(1);
	function getList(index){
		$.get("api/heed",{"pg":index},function(data){
			if(!data.error){
				render(data);
			}else{
				alert("数据请求错误");
			}
		})
	}
	function render(data){
		var $list=$(".list");
		var html=template('list_tmpl',data);
		$list.append(html);
		setTimeout(function(){
			gogo();
		},50);
	}
	var myScroll=new IScroll(".heed",{
		mouseWheel:true,
		probeType:2,
		fadeScrollbars:true,
		startY:-40
	});
	myScroll.maxScrollY-=40;
	myScroll.maxS=myScroll.maxScrollY;
	myScroll.index=0;
	myScroll.pd="";
	iscrollRefresh.iscrollRefresh(myScroll,getList);
	function gogo(){
		myScroll.refresh();
		myScroll.maxScrollY-=40;
		console.log(myScroll.maxScrollY)
		myScroll.maxS=myScroll.maxScrollY;
		iscrollRefresh._refresh(myScroll);
		$(".down").css("opacity","1");
		$(".up").css("opacity","1");
		$(".praise").on("tap",function(){
			if($(this).hasClass("red"))
				$(this).removeClass("red").find("span").html(parseInt($(this).find("span").html())-1);
			else
				$(this).addClass("red").find("span").html(parseInt($(this).find("span").html())+1);
		})
	}
})