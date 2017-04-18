define(function(require,exports,module){
	var $=require("zepto"),validator=require("common");
	require("tap");
	var phone=$(".name"),pwd=$(".password"),btn=$(".submit"),loadingToast=$("#loadingToast"),toast=$("#toast");
	//2.验证数据
	var sample={};
	//3.提交数据
	btn.on("tap",function(event){
		event.preventDefault();
		sample.phone=phone.val().trim();
		sample.pwd=pwd.val().trim();
		//手机验证
		if(!sample.phone||!validator.phone(sample.phone)){
			show("手机号错误了");
			return;
		}
		//密码验证
		if(sample.pwd.length<6||sample.pwd.length>20){
			show("密码长度错误");
			return;
		}
		loadingToast.show();
		$.post('/api/login', sample, function(data){
			if(!data.error){
				location.href="user.html";
				window.localStorage.setItem("id",data.id);
			}else{
				show(data.message);
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