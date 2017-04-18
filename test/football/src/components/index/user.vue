<template>
	<div>
		<div class="weui_mask" v-if="noload"></div>
		<div class="weui_dialog" v-if="noload">
	        <div class="weui_dialog_hd"><strong class="weui_dialog_title">用户没有登录</strong></div>
	        <div class="weui_dialog_bd">请登录</div>
	        <div class="weui_dialog_ft">
	            <a @tap="go" class="weui_btn_dialog primary">确定</a>
	        </div>
	    </div>
		<header>个人中心</header>
		<section>
			<div class="scroll">
				<div class="users">
					<div class="user">
						<div class="headpor" style="background:url('{{info[0].headpor}}') no-repeat center/100%"></div>
						<div class="user_info">
							<p class="name">{{info[0].name}}</p>
							<p class="signature">{{info[0].signature}}</p>
						</div>
					</div>
				</div>
				<div class="check">
					<a class="curr" @click="change(0)">照片(<span>{{img.length}}</span>)</a><a @click="change(1)">关注(<span>{{follow.length}}</span>)</a><a @click="change(2)">粉丝(<span>{{fans.length}}</span>)</a>
				</div>
				<div class="swiper-container">
					<div class="swiper-wrapper">
				    	<div class="swiper-slide">
				    		<ul class="show curr" v-for="(index,value) in img">
				    			<li><img :src="img[index]"></li>
				    		</ul>
				    	</div>
						<div class="swiper-slide">
							<div class="user" v-for="(index,value) in follow">
								<div class="headpor" style="background:url('{{value.headpor}}') no-repeat center/100%"></div>
								<div class="user_info">
									<p class="name">{{value.name}}</p>
									<p class="signature">{{value.signature}}</p>
								</div>
								<div class="praise" v-if="value.follow"><a class="" @click="attention($index)">取关</a></div>
								<div class="praise" v-else><a class="curr" @click="attention($index)">关注</a></div>
							</div>
						</div>
						<div class="swiper-slide">
							<div class="user" v-for="(index,value) in fans">
								<div class="headpor" style="background:url('{{value.headpor}}') no-repeat center/100%"></div>
								<div class="user_info">
									<p class="name">{{value.name}}</p>
									<p class="signature">{{value.signature}}</p>
								</div>
								<div class="praise" v-if="value.follow"><a class="" @click="attention($index+follow.length)">取关</a></div>
								<div class="praise" v-else><a class="curr" @click="attention($index+follow.length)">关注</a></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	require("../../../static/assets/js/module/lib/swiper.min.js");
	var $=require("../../../static/assets/js/module/lib/zepto.min.seajs.js");
	module.exports={
		data:function(){
			return{
				"info":[{"name":"我叫猫小萌",
						"signature":"我是猫小萌我怕谁!哈哈哈哈!",
						"headpor":"./static/assets/img/tou.png"}],
				"img":["./static/assets/img/001.png"],
				"follow":[{"name":"我叫猫小萌","signature":"我是猫小萌我怕谁!哈哈哈哈!","headpor":"./static/assets/img/tou.png","follow":1}],
				"fans":[{"name":"我叫猫小萌","signature":"我是猫小萌我怕谁!哈哈哈哈!","headpor":"./static/assets/img/tou.png","follow":1}],
				mySwiper:"",
				noload:false
			}
		},
		ready:function(){
			var id=window.localStorage.getItem("id");
			if(!id){
				this.noload=true;
			}else{
				this.noload=false;
				this.getJson();
				this.mySwiper = new Swiper('.swiper-container', {
					onSlideChangeStart:function(swiper){
						$(".check a").eq(swiper.activeIndex).addClass("curr").siblings("a").removeClass("curr");
					}
				});
			}
		},
		route: {
			activate:function(){
				var id=window.localStorage.getItem("id");
				if(!id){
					this.noload=true;
				}else{
					this.noload=false;
					this.getJson();
					this.mySwiper = new Swiper('.swiper-container', {
						onSlideChangeStart:function(swiper){
							$(".check a").eq(swiper.activeIndex).addClass("curr").siblings("a").removeClass("curr");
						}
					});
				}
			}
		},
		methods:{
			getJson:function(){
				var that=this;
				this.$http.get("./static/test/login.json").then(function(data){
					that.info=data.data.data.info.slice(0);
					that.img=data.data.data.img.slice(0);
					that.follow=data.data.data.follow.slice(0);
					that.fans=data.data.data.fans.slice(0);
				})
			},
			change:function(index){
				$(".check a").eq(index).addClass("curr").siblings("a").removeClass("curr");
				this.mySwiper.slideTo(index, 500, false);
				return false;
			},
			attention:function(index){
				var obj=$(".praise a").eq(index)
				if(obj.html()=="关注"){
					obj.removeClass("curr").html("取关");
				}else{
					obj.addClass("curr").html("关注");
				}
			},
			go:function(){
				this.$route.router.go("/login");
			}
		}
	}
</script>
<style scoped>
	section .scroll{
		width:100%;
		height:100%;
		padding:0.05rem 0;
		background:#fff;
		background-clip:content-box;
	}
	section .check{
		width:100%;
		height:0.22rem;
		border-bottom:1px solid #e5e5e5;
		display: -webkit-box;
	}
	section .check a{
		display: block;
		-webkit-box-flex:1;
		height:0.21rem;
		line-height:0.21rem;
		border-bottom:2.5px solid transparent;
		text-align: center;
		color:#999;
		font-size: 12px;
	}
	section .check a.curr{
		border-bottom-color:#0dc441;
		color:#0dc441;
	}
	section ul.show{
		display: none;
	}
	section ul.curr{
		display: block;
	}
	section .show li{
		float:left;
	}
	section .show li:nth-child(2n){
		margin-left:0.025rem;
	}
	section .show img{
		width:1.575rem;
		height:1.575rem;
	}
</style>