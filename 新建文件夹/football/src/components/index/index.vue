<template>
	<div>
		<router-view keep-alive></router-view>
		<footer>
			<ul>
				<li class="left-align curr" v-link="{path:'/index/idx'}"><a ><i class="iconfont">&#xe61d;</i><span>首页</span></a></li>
				<li class="left-align" v-link="{path:'/index/find'}"><a ><i class="iconfont">&#xe603;</i><span>发现</span></a></li>
				<li class="right-align" v-link="{path:'/index/user'}"><a ><i class="iconfont">&#xe66e;</i><span>我的</span></a></li>
				<li class="right-align" @tap="close"><a class="close" href="javaScript:void(0)"><i class="iconfont">&#xe63a;</i><span>退出</span></a></li>
			</ul>
			<div class="photo iconfont">&#xec81;</div>
		</footer>
	</div>
</template>
<script>
	module.exports={
		methods:{
			close:function(){
				window.localStorage.removeItem("id");
			}
		}
	}
</script>
<style>
	header,footer{
		width:100%;
		height:44px;
		line-height: 44px;
		background:#0dc441;
		text-align: center;
		font-size: 16px;
		position:absolute;
		z-index:2;
		color:#fff;
	}
	header a{
		display: inline-block;
		width:0.54rem;
		height:22px;
		line-height: 22px;
		background:#3dd067;
		color:#a3e9b7;
		font-size:12px;
	}
	header a.left{
		border-radius:5px 0 0 5px;
	}
	header a.right{
		border-radius:0 5px 5px 0;
	}
	header a.curr{
		width:0.6rem;
		background:#64d985;
		color:#fff;
	}
	footer{
		bottom:1px;
		font-size:12px;
		background: #fff;
		border-top:1px solid #d9d9d9;
	}
	footer ul{
		width:2.9rem;
		height:100%;
		margin:0 auto;
		display: -webkit-box;
	}
	footer li{
		-webkit-box-flex:1;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		line-height: 22px;
		line-height:22px;
		color:#ccc;
	}
	footer li a{
		color:#ccc;
	}
	footer li.curr a{
		color:#0dc441;
	}
	footer li.left-align i,footer li.left-align span{
		text-align: left;
	}
	footer li.left-align i{
		padding-left: 3px;
	}
	footer li.right-align i,footer li.right-align span{
		text-align: right;
	}
	footer li.right-align i{
		padding-right: 3px;
	}
	footer li i,footer li span{
		display: block;
		-webkit-box-flex:1;
		height:22px;
		line-height: 22px;
		text-align:center;
		overflow: hidden;
	}
	footer li i{
		line-height: 30px;
	}
	footer .photo{
		position: absolute;
		width:52px;
		height:52px;
		line-height:44px;
		font-size: 27px;
		color:#d6d6d6;
		border:1px solid #dfe0df;
		border-radius:50%;
		bottom:0;
		left:50%;
		background:#fff;
		z-index:3;
		-webkit-transform:translate(-50%,0);
		transform:translate(-50%,0);

	}
	section{
		width:100%;
		height:100%;
		display: -webkit-box;
		-webkit-box-orient:vertical;
		position: absolute;
		padding-top:44px;
		padding-bottom:44px;
		
	}
</style>
