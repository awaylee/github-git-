define(function(require,exports,module){
	var $=require("zepto");
	require("tap");
	template=require("artTamplate");
	$(".list").height($(".scroll").height()-$(".scroll>p").height());
	$(".btn").on("tap",function(){
		$(".list").empty();
		getList($(".search").val());
	})
	function getList(str){
		var p={};
		p.arr=[];
		$.get("api/search",{"pg":str},function(data){
			if(!data.error){
				var data=data.data
				for(var i=0,len=data.length;i<len;i++){
					if(data[i].name.indexOf(str)>=0){
						p.arr.push(data[i]);
					}
				}
				console.log(p);
				render(p);
			}else{
				alert("数据请求错误");
			}
		})
	}
	function render(data){
		var $list=$(".list");
		var html=template('list_tmpl',data);
		$list.append(html);
		$(".praise a").on("tap",function(){
			if($(this).html()=="关注"){
				var name=$(this).html("取关").removeClass("curr").parents(".user").find(".name").html();
				getFollow(name,1)
			}else{
				var name=$(this).html("关注").addClass("curr").parents(".user").find(".name").html();
				getFollow(name,0)
			}
		})
	}
	function getFollow(name,value){
		$.get("api/search",{"name":name,"follow":value},function(data){
			
		});
	}
})