$(document).ready(function(){
	$('#btn').on("click",function(){
		$('#result').text("数据请求中，请稍候");
		$.get("Server.php",{name:$("#namevalue").val()},function(data){
			$("#result").text(data);
		}).error(function(){
			$("#result").text("服务器错误");
		});
	});
});