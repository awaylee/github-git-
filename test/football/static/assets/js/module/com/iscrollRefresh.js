define(function(require,exports,module){
	function iscrollRefresh(obj,getList){
		obj.on("scrollStart",function(){
			this.refresh();
			this.maxScrollY+=40;
			this.maxS=this.maxScrollY;
		});
		obj.on("scroll",function(){
			if(this.y>-40&&this.directionY==-1){
				$(".up").eq(this.index).css("opacity","1");
			}
			if(this.y>5&&this.pd!="up"){
				this.pd="up";
				$(".upword").eq(this.index).html("松开刷新");
			}else if(this.y<5&&this.pd=="up"){
				this.pd="";
				$(".upword").eq(this.index).html("下拉刷新");
			}else if(this.y<=this.maxS-45&&this.pd!="down"){
				this.pd="down";
				$(".downword").eq(this.index).html("松开加载");
				this.maxScrollY=this.maxS-40;
			}else if(this.y>this.maxS-45&this.pd=="down"){
				this.pd="";
				$(".downword").eq(this.index).html("上拉加载");
				this.maxScrollY=this.maxS-40;
			}
		});
		obj.on("scrollEnd",function(){
			var that=this;
			if(this.y<0&&this.pd=="up"){
				this.pd="";
				$(".up").eq(this.index).css("opacity","0").find(".upword").html("下拉刷新");
				this.scrollTo(0,-40);
			}else if(this.y<this.maxS-40&&this.pd=="down"){
				this.pd="";
				this.maxScrollY=this.maxS;
				this.scrollTo(0,this.maxS);
				$(".downword").eq(this.index).html("上拉加载");
			}
			if(this.y>=0&&this.pd=="up"){
				$(".upicon").eq(this.index).addClass("loading");
				$(".upword").eq(this.index).html("刷新中...")
				setTimeout(function(){
					$(".up").eq(that.index).css("opacity","0").find(".upword").html("下拉刷新");
					$(".upicon").eq(that.index).removeClass("loading");
					that.scrollTo(0,-40);
					that.pd="";
				},1000)
			}else if(this.y==this.maxS-40&&this.pd=="down"){
				$(".downicon").eq(this.index).addClass("loading");
				$(".downword").eq(this.index).html("刷新中...");
				getList(this.index);
			}
			if(this.y<=0&&this.y>-40&&this.pd==""){
				this.scrollTo(0,-40);
				$(".up").eq(this.index).css("opacity","0").find(".upword").html("下拉刷新");
			}else if(this.y<=this.maxS&&this.y>=this.maxS-40&&this.pd==""){
				this.maxScrollY=this.maxS;
				that.scrollTo(0,that.maxS);
				$(".up").eq(this.index).css("opacity","0").find(".upword").html("上拉加载");
			}
		});
	}
	function _refresh(obj){
		$(".downicon").eq(obj.index).removeClass("loading");
		$(".downword").eq(obj.index).html("上拉加载");
		obj.pd="";
	}
	module.exports={
		"_refresh":_refresh,
		"iscrollRefresh":iscrollRefresh
	}
})