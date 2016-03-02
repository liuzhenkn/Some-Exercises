window.onload = function(){
	waterfall("main","content");
	var dataInt={'data':[{'src':'66.jpg'},{'src':'72.jpg'},{'src':'73.jpg'},{'src':'74.jpg'},{'src':'86.jpg'},{'src':'82.jpg'},{'src':'83.jpg'},{'src':'84.jpg'}]};
	window.onscroll=function(){
		if (checkScrollSide()) {
			var cparent = document.getElementById("main");
			for(var i =0;i<dataInt.data.length;i++){//创建新的节点
				var ccontent = document.createElement('div');
				ccontent.className = "content";
				cparent.appendChild(ccontent);
				var contentBox = document.createElement("div");
				contentBox.className = "box";
				ccontent.appendChild(contentBox);
				var img = document.createElement('img');
				img.src = "img/"+dataInt.data[i].src;
				contentBox.appendChild(img);
			}
			waterfall("main","content");//重新排布
		}
	}
}

function waterfall(parent,content){
	var cparent = document.getElementById(parent);
	var ccontent = getChildElement(cparent,content);//获取cparent下特定content
	var imgWidth = ccontent[0].offsetWidth;//获取content的宽度
	var num = Math.floor(document.documentElement.clientWidth / imgWidth);//计算一行图片个数
	cparent.style.cssText = "width:"+imgWidth*num+"px;margin:0 auto;";//设置cparent的宽度

	var contentHeight = [];
	for(var i = 0;i<ccontent.length;i++){
		if(i<num){
			contentHeight[i] = ccontent[i].offsetHeight;
		}else{
			var minHeight = Math.min.apply(null,contentHeight);//获取第一排数组中最小高度
			ccontent[i].style.position = "absolute";
			ccontent[i].style.top = minHeight+"px";
			var minIndex = getMinHeightIndex(contentHeight,minHeight);//获取最小高度的图片的序号
			ccontent[i].style.left = ccontent[minIndex].offsetLeft+"px";
			contentHeight[minIndex] += ccontent[i].offsetHeight; //更新添加后这一列的高度
			//console.log(minHeight);
		}

	}
}

function getChildElement(parent,content){
	var contentArr = [];//设置数组存储选出的子元素
	var allcontent = parent.getElementsByTagName("*");//选出所有的子元素
	for(i = 0; i<allcontent.length;i++){//遍历子元素、判断类别、压入数组
		if (allcontent[i].className == content) {
			contentArr.push(allcontent[i]);
		}
	}
	return contentArr;
}

function getMinHeightIndex(contentHeight,minHeight){
	for(var j in contentHeight){
		if(contentHeight[j] == minHeight)
			return j;
	}
}

function checkScrollSide(){//判断是否加载
	var cparent = document.getElementById("main");
	var ccontent = getChildElement(cparent,"content");
	var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;//获取最后一张图片所在列的高度
	var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;//获取滚动高度
	var documentHeight = document.documentElement.clientHeight;//获取浏览器窗口高度
	return (lastContentHeight<scrollTop+documentHeight)?1:0;
}