<template>
	<div>
		<header>发现</header>
		<section>
			<div class="scroll">
				<p><input type="text" class="search" placeholder="请输入昵称"><input type="button" class="btn" value="搜索" @click="search"></p>
				<div class="list">
					<div class="user" v-for="value in data">
						<div class="headpor" style="background:url('{{value.headpor}}')"></div>
						<div class="user_info">
							<p class="name">{{value.name}}</p>
							<p class="signature">{{value.signature}}</p>
						</div>
						<div class="praise" v-if="value.follow"><a class="" @click="attention($index)">取关</a></div>
						<div class="praise" v-else><a class="curr" @click="attention($index)">关注</a></div>
					</div>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
	module.exports={
		data:function(){
			return{
				data:{}
			}
		},
		methods:{
			search:function(){
				var that=this;
				this.$http.get("./static/test/search.json").then(function(data){
					that.data=data.data.data;
				})
			},
			attention:function(index){
				var obj=$(".praise a").eq(index)
				if(obj.html()=="关注"){
					obj.removeClass("curr").html("取关");
				}else{
					obj.addClass("curr").html("关注");
				}
			}
		}
	}
</script>
<style scoped>
	section .scroll{
		width:100%;
		height:100%;
		padding-bottom:0.05rem;
		background:#fff;
		background-clip:content-box;
		display:-webkit-box;
		-webkit-box-orient:vertical;
	}
	section .scroll>p{
		height:0.33rem;
		width:100%;
		border-bottom:1px solid #cdcdcd;
		line-height:0.33rem;
		padding:0 0.05rem;
		background:#fff;
	}
	section .scroll>p input.search{
		width:2.59rem;
		height:0.24rem;
		border:1px solid #aaa;
		border-radius: 0.025rem;
		padding-left:0.06rem;
		color:#ccc;
	}
	section .scroll>p input.btn{
		width:0.45rem;
		height:0.23rem;
		background:#0dc441;
		color:#fff;
		border-radius: 0.025rem;
		margin-left:0.05rem;
	}
	section .users{
		width:100%;
		height:4.17rem;
		background:#fff;
		margin:0.05rem 0;
	}
	section .praise{
		text-align: right;
	}
	section .user{
		border-bottom: 1px solid #e5e5e5;
	}
	section .list{
		-webkit-box-flex:1;
		overflow-y:scroll;
	}
</style>