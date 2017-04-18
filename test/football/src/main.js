//1引入vue
var Vue=require("vue");
//2引入路由
var VueRouter=require("vue-router");
//引入http请求
var vueResource =require("vue-resource");
Vue.use(vueResource);
//3路由的配置
var routeCofig=require("./router-config.js");
//显示调用
Vue.use(VueRouter);
//声明路由
var router=new VueRouter({
	linkActiveClass:"curr"
});
router.alias({
	"/":"/index/idx",
	"/index/idx":"/index/idx/hot",
	"*":"/index/idx/hot"
})
//配置路由
routeCofig(router);
var App=Vue.extend(require("./app.vue"));
router.start(App,"#app");