<template>
	<div>
		<header><a v-link="{path:'/index/idx/hot'}" class="curr left">热点</a><a v-link="{path:'/index/idx/focus'}" class="right">关注</a></header>
		<router-view keep-alive></router-view>
	</div>
</template>