define(function(require,exports,module){
	var $=require("zepto"),validator=require("common");
	require("tap");
	//1.获取节点
	var phone=$(".name"),pwd=$(".password"),nick=$(".nick"),btn=$(".submit"),loadingToast=$("#loadingToast"),toast=$("#toast");
	//2.验证数据
	var sample={};
	//3.提交数据
	btn.on("tap",function(){
		sample.phone=phone.val().trim();
		sample.pwd=pwd.val().trim();
		sample.nick=nick.val().trim();
		if(!sample.phone||!validator.phone(sample.phone)){
			show("手机号错误了");
			return;
		}
		//密码验证
		if(sample.pwd.length<6||sample.pwd.length>20){
			show("密码长度错误");
			return;
		}
		if(!sample.nick){
			show("昵称不能为空");
			return;
		}
		loadingToast.show();
		$.post("/api/register",sample,function(data){
			if(!data.error){
				location.href="index.html";
			}else{
				loadingToast.hide();
			}
		})
	});
	var show=function(str){
		toast.show().find(".weui_toast").css("bottom","50px").find(".weui_toast_content").html(str);
		setTimeout(function(){
			toast.hide().find(".weui_toast").css("bottom","0px");
		},1000)
	}
})