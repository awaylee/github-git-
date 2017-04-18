<template>
	<section class="hot">
		<div class="check check1"><a class="tab currs">足球现场</a><a class="tab">足球生活</a><a class="tab">足球美女</a></div>
		<div class="swiper-container">
		  <div class="swiper-wrapper">
		    <div class="swiper-slide">
		    	<div class="scroll" id="scroll0">
		    		<div>
		    			<div class="up" :style="iscrolllist[0].up">
							<span class="upicon"></span>
							<span class="upword">下拉刷新</span>
						</div>
						<div class="content">
							<dl v-for="value in list1">
								<dt><a href="#"><img :src="value.imgSrc"></a></dt>
								<dd>{{value.description}}</dd>
							</dl>
						</div>
						<div class="down" :style="iscrolllist[0].down">
							<span class="downicon"></span>
							<span class="downword">上拉加载</span>
						</div>
		    		</div>
				</div>
		    </div>
		    <div class="swiper-slide">
		    	<div class="scroll" id="scroll1">
		    		<div>
		    			<div class="up" :style="iscrolllist[1].up">
							<span class="upicon"></span>
							<span class="upword">下拉刷新</span>
						</div>
						<div class="content">
							<dl v-for="value in list2">
								<dt><a href="#"><img :src="value.imgSrc"></a></dt>
								<dd>{{value.description}}</dd>
							</dl>
						</div>
						<div class="down" :style="iscrolllist[1].down">
							<span class="downicon"></span>
							<span class="downword">上拉加载</span>
						</div>
		    		</div>
				</div>
		    </div>
		    <div class="swiper-slide">
		    	<div class="scroll" id="scroll2">
		    		<div>
		    			<div class="up" :style="iscrolllist[2].up">
							<span class="upicon"></span>
							<span class="upword">下拉刷新</span>
						</div>
						<div class="content">
							<dl v-for="value in list3">
								<dt><a href="#"><img :src="value.imgSrc"></a></dt>
								<dd>{{value.description}}</dd>
							</dl>
						</div>
						<div class="down" :style="iscrolllist[2].down">
							<span class="downicon"></span>
							<span class="downword">上拉加载</span>
						</div>
		    		</div>
				</div>
		    </div>
		  </div>
		</div>
	</section>
</template>
<script>
	require("../../../static/assets/js/module/lib/swiper.min.js");
	var $=require("../../../static/assets/js/module/lib/zepto.min.seajs.js"),
		  IScroll=require("../../../static/assets/js/module/lib/iscroll-probe.js");
	require("../../../static/assets/js/module/lib/zepto.tap.js");
	var arrObj=[];

	module.exports={
		data:function(){
			return {
				list1:[],
				list2:[],
				list3:[],
				iscrolllist:[
					{up:{opacity:0},down:{opacity:0}},
					{up:{opacity:0},down:{opacity:0}},
					{up:{opacity:0},down:{opacity:0}}
				],
				mySwiper:"",
				arr:["足球现场","足球生活","足球美女"]
			}
		},
		ready:function(){
				var that=this;
				$(".scroll").height($(".swiper-container").height()-$(".check").height());
				this.mySwiper = new Swiper('.swiper-container', {
					pagination:".check1",
					bulletClass:"tab",
					paginationClickable: true,
					bulletActiveClass:"currs",
					paginationBulletRender: function (index, className) {
					   return '<a class="' + className + '">' + that.arr[index] + '</a>';
				},
				onInit:function(){
					that.getJson(1);
				},
				onSlideChangeEnd:function(swiper){
					if(!that["list"+(swiper.activeIndex+1)].length){
						that.getJson(swiper.activeIndex+1);
					}
				}
			});
			var scrollObj={
				mouseWheel:true,
				probeType:2,
				fadeScrollbars:true,
				startY:-40
			};
			var myscroll0=new IScroll("#scroll0",scrollObj);
			var myscroll1=new IScroll("#scroll1",scrollObj);
			var myscroll2=new IScroll("#scroll2",scrollObj);
			arrObj=[myscroll0,myscroll1,myscroll2];
			for(var i=0;i<3;i++){
				arrObj[i].maxScrollY+=40;
				arrObj[i].pd="";
				arrObj[i].index=i;
				that.iscrollRefresh(arrObj[i],this.getJson);
			}
		},
		route:{
			data:function(){
				
			}
		},
		methods:{
			getJson:function(index){
				var that=this;
				var arrt="list"+index;
				this.$http.get("./static/test/leftlve.json").then(function(data){
					data.data.data.forEach(function(value,i){
						that[arrt].push(value);
					});
					//Array.prototype.push.apply(that[arrt],data.data.data)
					//console.log(that[arrt])
					setTimeout(function(){
						that._refresh(arrObj[index-1]);
						$(".down").eq(index-1).css("opacity","1");
						arrObj[index-1].refresh();
						arrObj[index-1].maxScrollY+=10;
						arrObj[index-1].maxS=arrObj[index-1].maxScrollY;
					},100);
				})
			},
			swiperInit:function(){
				
			},
			iscrollRefresh:function(obj,getList){
				obj.on("scroll",function(){
					console.log(this.maxScrollY)
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
						getList(this.index+1);
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
			}
		}
	}
</script>
<style>
	section.hot{
		background:#fff;
	}
	section.hot .check{
		width:100%;
		height:0.355rem;
		border-bottom:1px solid #d9d9d9;
		display: -webkit-box;
		position: absolute;
		z-index: 2;
		top:44px;
		background-color:rgba(255,255,255,0.5);
	}
	section.hot .check a{
		display: block;
		-webkit-box-flex:1;
		height:0.355rem;
		line-height: 0.355rem;
		text-align: center;
		color:#666666;
		font-size:14px;
		border-bottom: 5px solid transparent;
	}
	section.hot .check a:hover{
		text-decoration: none;
	}
	section.hot .check a.currs{
		color:#0dc441;
		border-bottom-color:#0dc441;
	}
	section.hot .swiper-container{
		-webkit-box-flex:1;
		padding-top:0.355rem;
	}
	section.hot .swiper-wrapper{
		height:100%;
	}
	section.hot .swiper-slide{
		height:100%;
	}
	section.hot .scroll{
		
		
	}
	section.hot .content{
		overflow: hidden;
	}
	section.hot .scroll dl{
		float:left;
		width:1.555rem;
		margin-top:0.1rem;
	}
	section.hot .scroll dl:nth-child(2n){
		margin-left:0.09rem;
	}
	section.hot .scroll dl img{
		width:1.555rem;
		height:1.555rem;
		display: block;
		border:1px solid #e5e5e5;
	}
	section.hot .scroll dl dd{
		border:1px solid #e5e5e5;
		border-top:0;
		width:1.555rem;
		line-height:0.29rem;
		overflow: hidden;
		text-overflow:ellipsis;
		white-space: nowrap;
		padding:0 0.16rem 0 0.1rem;
	}
</style>