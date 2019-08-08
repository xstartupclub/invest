var exerciseList = [];
var startTime;
var endTime;
$(document).ready(function() {
	
	//生成题目
	$('body').on('click', '#create', function() {
		$('#check').css("display","none");
		createExercise();
	});
	
	//提交计算结果并检查
	$('body').on('click', '#finish', function() {
		//检查结果
		checkExercise(exerciseList);
	});
	
	function createExercise() {
		exerciseList = [];
		var count = $('.count').val();
		//count = 2;
		for (var i=0; i<count; i++) {
			exerciseList.push(getOneExercise());
		}
		dispExercise(exerciseList);
		startTime = new Date();
	}
	
	function dispExercise(exerciseList) {
		var exerciseHtml="";
		if (exerciseList) {
			for (var i=0; i<exerciseList.length; i++) {	
				var item = exerciseList[i];
				exerciseHtml += "<div class='exercise'><div class='question'>"
				     + item.oper1 + " " +item.symbol1 + " " + item.oper2;
				if (item.symbol2) {
					exerciseHtml += " " +item.symbol2 + " " + item.oper3;
				}
				exerciseHtml += "</div> = ";
				exerciseHtml += "<div class='answer'><input type='text' /></div>";
				exerciseHtml += "<div class='check'></div>";
				exerciseHtml += "</div>";			
			}
		}
		$(".content").html(exerciseHtml);
	}
	
	function checkExercise(exerciseList) {
		endTime = new Date();
		
		var answer = $(".answer input");
		//先计算所有题目的答案
		for (var i=0; i<exerciseList.length; i++) {	
			var result = 0;
			var item = exerciseList[i];
			if (item.symbol1 == "+") {
				result = item.oper1 + item.oper2;
			} else {
				result = item.oper1 - item.oper2;
			}
			if (item.symbol2) {
				if (item.symbol2 == "+") {
					result = result + item.oper3;
				} else {
					result = result - item.oper3;
				}
			}
			exerciseList[i].result = result;
		}
		
		//循环检查答案是否正确，正确打勾，错误打叉	
		var index = 0;
		var right = 0;
		$(".answer input").each(function(){
		    if ($(this).val() && ($(this).val() == exerciseList[index].result)) {
		    	$(this).parents(".exercise").find(".check").html("✔");
		    	$(this).parents(".exercise").find(".check").css("color","green");
		    	right++;
		    } else {
		    	$(this).parents(".exercise").find(".check").html("╳");
		    	$(this).parents(".exercise").find(".check").css("color","red");
		    }
		    index++;
		  });
		
		var score = right/exerciseList.length;
		var time = (endTime.getTime()-startTime.getTime())/1000; //时间差的秒数
		$('.score').html("得分:<span style='color:red;font-size:150%;padding:0 100px;'>" + score + "</span>用时(秒)：" + time);
	}
		
	function getOneExercise() {
		var exercise = {
				"oper1": 0,
				"symbol1": "+",
				"oper2": 0,
				"symbol2": "",
				"oper3": 0,
				"result": -999999999
		}
		if (getOperationCnt()==2) {
			exercise.oper1 =  getRandom(0,10);
			exercise.symbol1 = getSymbol();
			exercise.oper2 =  getRandom(10,20);
		} else {
			exercise.oper1 =  getRandom(0,10);
			exercise.symbol1 = getSymbol();
			exercise.oper2 =  getRandom(0,10);
			exercise.symbol2 = getSymbol();
			exercise.oper3 =  getRandom(0,10);
		}
		return exercise;
	}
	
	//确定题目中有几个运算数
	function getOperationCnt() {
		return getRandom(2,3);
	}
	
	//运算符
	function getSymbol() {
		if (getRandom(1,2) == 1) {
			return "+";
		} else {
			return "-";
		}		
	}
	
	//取得指定范围随机数[start,end]
	function getRandom(start,end) {
		var rand = parseInt(Math.random() * (end - start + 1) + start); 
		return rand;
	}

});