$(document).ready(function(){
	$("body").load("box.htm",function(a,status,c){
		console.log(status);
		if(status == "error"){
			$("body").text("片段加载失败");
		}
	});
	$.getScript("hello.js").complete(function(){
		sayHello();
	});
});