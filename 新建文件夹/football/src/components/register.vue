<template>
	<div>
		<header>足球圈--注册</header>
		<section>
			<article id="info">
				<p><input type="text" class="name" placeholder="手机号" v-model="user.name"></p>
				<p><input type="password" class="password" placeholder="密码" v-model="user.pwd"></p>
				<p><input type="text" class="nick" placeholder="昵称" v-model="user.nickName"></p>
				<p><input type="button" class="submit" value="提交" @click="register"></p>
			</article>
		</section>
		<div id="loadingToast" class="weui_loading_toast" v-show="isSb">
		    <div class="weui_mask_transparent"></div>
		    <div class="weui_toast" style="bottom:50%">
		        <div class="weui_loading">
		            <div class="weui_loading_leaf weui_loading_leaf_0"></div>
		            <div class="weui_loading_leaf weui_loading_leaf_1"></div>
		            <div class="weui_loading_leaf weui_loading_leaf_2"></div>
		            <div class="weui_loading_leaf weui_loading_leaf_3"></div>
		            <div class="weui_loading_leaf weui_loading_leaf_4"></div>
		            <div class="weui_loading_leaf weui_loading_leaf_5"></div>
		            <div class="weui_loading_leaf weui_loading_leaf_6"></div>
		            <div class="weui_loading_leaf weui_loading_leaf_7"></div>
		            <div class="weui_loading_leaf weui_loading_leaf_8"></div>
		            <div class="weui_loading_leaf weui_loading_leaf_9"></div>
		            <div class="weui_loading_leaf weui_loading_leaf_10"></div>
		            <div class="weui_loading_leaf weui_loading_leaf_11"></div>
		        </div>
		        <p class="weui_toast_content">注册中</p>
		    </div>
		</div>
		<div id="toast" v-show="err.isSs">
		    <div class="weui_mask_transparent"></div>
		    <div class="weui_toast" :style="err.style">
		        <p class="weui_toast_content" style="min-height:20px;line-height:20px;">{{err.msg}}</p>
		    </div>
		</div>
	</div>
</template>
<script>
	module.exports={
		data:function(){
			return {
				user:{
					name:"",
					pwd:"",
					nickName:""
				},
				err:{
					isSs:false,
					msg:"",
					style:{
						bottom:"0"
					}
				},
				isSb:false
			}
		},
		methods:{
			register:function(){
				var that=this;
				if(!this.user.name.trim()||!this.user.pwd.trim()||!this.user.nickName.trim()){
					this.err.msg="请填写完整";
					this.err.isSs=true;
					this.err.style.bottom="50px";
					setTimeout(function(){
						that.err.isSs=false;
						that.err.style.bottom="0";
					},500);
				}else{
					this.isSb=true;
					setTimeout(function(){
						that.$route.router.go("index/idx");
					},500);
				}
			}
		}
	}
</script>
<style scoped>
	body{
		background:#fff;
	}
	header{
		width:100%;
		background:#0dc441;
		text-align: center;
		font-size: 16px;
		height:0.44rem;
		line-height:0.44rem;
		color:#fff;
	}
	section{
		width:100%;
	}
	#info{
		width:2.9rem;
		margin: 0 auto;
	}
	#info p{
		margin:0.15rem 0 0.27rem;
		color:#999999;
	}
	#info input{
		width:2.9rem;
		height:0.33rem;
		border-bottom:1px solid #7f7f7f;
		color:#b2b2b2;
		font-size:14px;
	}
	#info input:foucs{
		border-bottom:1px solid #7f7f7f;
	}
	#info .submit{
		height:0.44rem;
		background:#0dc441;
		border:0;
		border-radius:4px;
		font-size:16px;
		color:#fff;
	}
	#info a{
		color:#a3e9b7;
		text-decoration: underline;
	}
</style>