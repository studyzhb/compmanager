require(['jquery','main','ajaxAddress','lay-model','log','params'],function($,myObj,ajaxAddress,layObj,log,params){
    
    var common=myObj.load();
   
	var user=common.cookieUtil.getCookie('username');
	
	var userObj={
		methods:{
			updateAuthorList:function(){
				var self=this;
				config.ajax('get',ajaxAddress.preFix+ajaxAddress.getAuthorlist,function(data){
					
					if(data.code=='401'||!data.code){
						open('login.html','_self');
						return;
					}
					if(!!user){
						$('.username').text(cookieUtil.getCookie('username'));
					}else{
						open('login.html','_self');
					}
					self.renderlist(data.data);
				});
			},
			renderlist:function(data){
				var tempHtml=slider.innerHTML;
				$('#sliderPage').html('');
				$.each(data,function(index,item){

					layObj.laytpl(tempHtml).render(item,function(html){
					
					
						$('#sliderPage').append(html);

					})
				})
			}
		}
	}

	if(!!user){
		$('.username').text(cookieUtil.getCookie('username'));
		userObj.methods.updateAuthorList();
	}else{
		open('index.html','self');
	}
	

	$('.quit').on('click',function(){
	
		common.tools.ajax('get',ajaxAddress.quit,function(data){
			if(data.code==200){
				layer.msg('退出成功');
				cookieUtil.removeCookie('username');
				cookieUtil.removeCookie('authorlist');
				cookieUtil.removeCookie('token');
				setTimeout(function(){
					open('login.html','_self');
				},500);
				
			}else{
				layer.msg('网络错误，请稍后重试');
				setTimeout(function(){
					open('login.html','_self');
				},500);
			}
		})
	});

})