<template>
	<section class="heed">
		<div class="scroll">
			<div class="up" :style="iscrolllist[0].up">
				<span class="upicon"></span>
				<span class="upword">下拉刷新</span>
			</div>
			<div class="list">
				<div v-for="(index,value) in data">
					<div class="user">
						<div class="headpor" style="background:url('{{data[index].headpor}}') no-repeat 0/100%"></div>
						<div class="user_info">
							<p class="name">{{data[index].name}}</p>
							<p class="signature">{{data[index].signature}}</p>
						</div>
						<div class="praise" @tap="praise($index,$event)"><span>{{data[index].praise}}</span><i class="iconfont">&#xe65a;</i></div>
					</div>
					<div class="show">
						<img :src="data[index].img">
						<p class="word">{{data[index].word}}</p>
					</div>
				</div>
			</div>
			<div class="down" :style="iscrolllist[0].down">
				<span class="downicon"></span>
				<span class="downword">上拉加载</span>
			</div>
		</div>
	</section>
</template>
<script>
	var $=require("../../../static/assets/js/module/lib/zepto.min.seajs.js"),
		IScroll=require("../../../static/assets/js/module/lib/iscroll-probe.js");
		require("../../../static/assets/js/module/lib/zepto.tap.js")
	var arrObj=[];
	module.exports={
		data:function(){
			return {
				data:[],
				iscrolllist:[
					{up:{opacity:0},down:{opacity:0}}
				],
			}
		},
		ready:function(){
			this.getJson()
			var myscroll0=new IScroll(".heed",{
				mouseWheel:true,
				probeType:2,
				fadeScrollbars:true,
				startY:-40
			});
			arrObj=[myscroll0];
			arrObj[0].pd="";
			arrObj[0].index=0;
			this.iscrollRefresh(arrObj[0],this.getJson);
		},
		methods:{
			getJson:function(){
				var that=this;
				$.get("./static/test/heed.json",function(data){
					data.data.forEach(function(value,i){
						that.data.push(value);
					})
					setTimeout(function(){
						that._refresh(arrObj[0]);
						$(".down").css("opacity","1");
						arrObj[0].refresh();
						arrObj[0].maxScrollY-=40;
						arrObj[0].maxS=arrObj[0].maxScrollY;
					},10);
				})
				/*this.$http.get("./static/test/heed.json").then(function(data){
					data.data.data.forEach(function(value,i){
						that.data.push(value);
					})
					setTimeout(function(){
						that._refresh(arrObj[0]);
						$(".down").css("opacity","1");
						arrObj[0].refresh();
						arrObj[0].maxScrollY-=40;
						arrObj[0].maxS=arrObj[0].maxScrollY;
					},10);
				})*/
			},
			iscrollRefresh:function(obj,getList){
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
			},
			_refresh:function(obj){
				$(".downicon").eq(obj.index).removeClass("loading");
				$(".downword").eq(obj.index).html("上拉加载");
				obj.pd="";
			},
			praise:function(index,event){
				event.preventDefault();
				var obj=$(".praise").eq(index);
				if(obj.hasClass("red")){
					obj.removeClass("red").find("span").html(obj.find("span").html()-1);
				}else{
					obj.addClass("red").find("span").html(parseInt(obj.find("span").html())+1);
				}
			}
		}
	}
</script>
<style>
	section.heed{
		overflow-y:scroll; 
	}
	section.heed .scroll{
		padding-top:0;

	}
	section.heed .show img{
		width:3.2rem;
		height:3.2rem;
		display: block;
	}
	section.heed .show .word{
		width:100%;
		height:0.33rem;
		line-height:0.33rem;
		border-bottom:1px solid #e5e5e5;
		padding-left:0.2rem;
		margin-bottom:0.05rem;
	}
	section.heed .show,section.heed .user{
		background:#fff;
	}
	footer{
		bottom:0px;
	}
	.heed .user .red{
		color:red;
	}
</style>