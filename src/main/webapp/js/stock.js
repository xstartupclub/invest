var listStockTitle = [];
var listReportTitle = [];
var stockList = [];
var curStock = {
		"dayData":[],
		"report":[]
};
var labelList = [];
var peList = [];
var priceList = [];
var config;

$(document).ready(function() {
	
	initCanvas();
	
	$.ajax({
		type : 'GET',
		url : '/invest/main/stockinit.do',
		dataType : 'json',
		success : function(rs) {
			if (rs.status == 0) {
				dispListFilter(rs.data.listFilter);
				dispListTitle(rs.data.listTitle);
			} else {
			}
		},
		error : function() {
		}
	});
	
	$('body').on('click', '#search1', function() {
		search(0); //临时自定义查询
	});
	
	$('body').on('click', '#save', function() {
		if (!$('#filterName').val()) {
			alert("请输入名称");
			return;
		}
		saveFilter(); //保存查询条件
	});

	$('body').on('click', '#search2', function() {
		search(1); //filter查询
	});
	var oldRow = -1;
	var oldTr;
	//点击某行数据
	$('body').on('click', '.tbl-stock-data td', function() {
		var row = $(this).parent().parent().find("tr").index($(this).parent()[0]);
		if (oldRow == row) {
			return;
		}
		getStockData(stockList[row].code);
		if (oldTr) {
			oldTr.css("background","white");
		}
		$(this).parent().css("background","lightblue");
		oldRow = row;
		oldTr = $(this).parent();
	});
	
	function search(type) {
		var sqlId="";
		if (type==1) {
			sqlId = $("#filter").val();
		}
		$.ajax({
			type : 'POST',
			url : '/invest/main/getData.do',
			data : {
				"sqlId" : "8,"+sqlId,//多个sql拼接查询
				"condition" : getCondition(type)
			},
			dataType : 'json',
			success : function(rs) {
				if (rs.status == 0) {
					stockList = rs.data;
					dispData(rs.data)
				} else {
				}
			},
			error : function() {
			}
		});
	}
	function getFilters() {
		$.ajax({
			type : 'GET',
			url : '/invest/main/getFilters.do',
			dataType : 'json',
			success : function(rs) {
				if (rs.status == 0) {
					dispListFilter(rs.listFilter);
				}
			},
			error : function() {
			}
		});
	}
	
	function saveFilter() {
		$.ajax({
			type : 'POST',
			url : '/invest/main/saveFilter.do',
			data : {
				"condition" : getCondition(0),
				"comment" : getConditionComment(),
				"name" : $('#filterName').val()
			},
			dataType : 'json',
			success : function(rs) {
				if (rs.status == 0) {
					getFilters();
					alert("保存成功");
				}
			},
			error : function() {
			}
		});
	}
	
	//type:0 自定义临时查询  1 filter查询
	function getCondition(type) {
		var condition = "";
		var comment = "";
		if (type == 0) {
			if ($('#code').val()) {
				condition += " and A.code='"+ $('#code').val()+ "'";
			}
			if ($('#name').val()) {
				condition += " and A.name like'%"+ $('#name').val()+ "%'";
			}
			condition += " and cast(A.price as decimal(18,4)) between "+ $('#price1').val()+ " and " + $('#price2').val();			
			condition += " and cast(A.pe_ration as decimal(18,4)) between "+ $('#peRation1').val()+ " and " + $('#peRation2').val();			
			condition += " and cast(A.change_rate as decimal(18,4)) between "+ $('#changeRate1').val()+ " and " + $('#changeRate2').val();			
			condition += " and cast(A.field12 as decimal(18,4)) between "+ $('#sellProfit1').val()+ " and " + $('#sellProfit2').val();
			condition += " and cast(A.field10 as decimal(18,4)) between "+ $('#netProfitRate1').val()+ " and " + $('#netProfitRate2').val();			
			condition += " and cast(A.field10 as decimal(18,4)) between "+ $('#assetRate1').val()+ " and " + $('#assetRate2').val();			
			condition += " and cast(A.field14 as decimal(18,4)) between "+ $('#guxiRate1').val()+ " and " + $('#guxiRate2').val();
			if ($('#field13').val()=="0") {
				condition += " and (A.field13 like '%不分配%' or coalesce(A.field13,'-')='-') "
			} else {
				condition += " and ((A.field13 <>'-' AND A.field13 <>'不分配不转增')) "
			}
			
		} else {
			
		}
		return condition;
	}
	
	function getConditionComment() {
		var comment = "";
		if ($('#code').val()) {
			comment += "代码:" + $('#code').val();
		}
		if ($('#name').val()) {
			comment += " 名称:" + $('#name').val();
		}
		comment += " 价格:" +$('#price1').val() + "~" + $('#price2').val();
		comment += " PE:" +$('#peRation1').val() + "~" + $('#peRation2').val();
		comment += " 换手率:" +$('#changeRate1').val() + "~" + $('#changeRate2').val();
		comment += " 毛利率:" +$('#sellProfit1').val() + "~" + $('#sellProfit2').val();
		comment += " 净利率:" +$('#netProfitRate1').val() + "~" + $('#netProfitRate2').val();
		comment += " 净资产收益率:" +$('#assetRate1').val() + "~" + $('#assetRate2').val();
		comment += " 股息率:" +$('#guxiRate1').val() + "~" + $('#guxiRate2').val();
		return comment;
	}

	function getStockData(stock) {
		$.ajax({
			type : 'POST',
			url : '/invest/main/getData.do',
			data : {
				"sqlId" : "3",
				"condition" : " and code='" + stock +"' order by date asc"
			},
			dataType : 'json',
			success : function(rs) {
				if (rs.status == 0) {
					curStock.dayData = rs.data;
					getStockReport(stock);
				} else {
					alert("取得数据失败");
				}
			},
			error : function() {
			}
		});
	}
	
	function getStockReport(stock) {
		$.ajax({
			type : 'POST',
			url : '/invest/main/getData.do',
			data : {
				"sqlId" : "4",
				"condition" : " and code='" + stock +"' order by date desc"
			},
			dataType : 'json',
			success : function(rs) {
				if (rs.status == 0) {
					curStock.report = rs.data;
					//再绘图
					dispStockDetail();
				} else {
				}
			},
			error : function() {
			}
		});
	}
	function dispListFilter(data) {
		$("#filter").html("");
		var options="";
		for (var i=0;i<data.length;i++) {
			options+="<option value='"+data[i].id+"'>"+data[i].name+"</option>";	
		}
		$("#filter").html(options);
	}
	function dispListTitle(data) {
		//stock列表
		listHtml="<tr>";
		listHtml+="<th class='th-no'>序号</th>";
		for (var i=0;i<data.length;i++) {
			if (i<17||i>18) { //17~18两列重复列
				listHtml+="<th class='th"+i+"'>"+data[i].title+"</th>";
			}	
		}
		listHtml+="<th class='fill-width'></th>";
		listHtml+="</tr>";
		$(".tbl-stock-title").html(listHtml)
		
		//report列表
		listHtml="<tr>";
		for (var i=17;i<data.length;i++) {
			listHtml+="<th class='th"+i+"'>"+data[i].title+"</th>";
		}
		listHtml+="</tr>";
		$(".tbl-report").html(listHtml);
	}
	function dispData(data) {
		listHtml="";
		$(".tbl-stock-data tr.data").remove();
		if (data && data.length > 0) {			
			for (var i=0; i<data.length; i++) {		
				var stock = data[i]; 
				listHtml += "<tr class='data'>"	
				listHtml += "<td>"+(i+1)+ "</td>"
					+"<td>"+stock.code+ "</td>"
					         + "<td>"+stock.date+ "</td>"
					         + "<td>"+stock.name+ "</td>"
					         + "<td>"+stock.price+ "</td>"
					         + "<td>"+stock.rise+ "</td>"
					         + "<td>"+stock.rise_amount+ "</td>"
					         + "<td>"+stock.volume+ "</td>"
					         + "<td>"+stock.volume_amount+ "</td>"
					         + "<td>"+stock.amplitude+ "</td>"
					         + "<td>"+stock.price_high+ "</td>"
					         + "<td>"+stock.price_low+ "</td>"
					         + "<td>"+stock.price_open+ "</td>"
					         + "<td>"+stock.last_close+ "</td>"
					         + "<td>"+stock.vol_rate+ "</td>"
					         + "<td>"+stock.change_rate+ "</td>"
					         + "<td>"+stock.pe_ration+ "</td>"
					         + "<td>"+stock.pb_ration+ "</td>";				         
				for (var n=1;n<=16;n++) {
					listHtml += "<td>"+eval('stock.field'+n)+ "</td>"
				}
				listHtml += "<td class='fill-width'></td>"; //填充长度
				listHtml += "</tr>"	
			}
			$(".tbl-stock-data").append(listHtml);
		}
	}
	
	function dispStockDetail() {
		//dayData
		dispDayData();
		//report
		dispReport();
	}
	
	function dispDayData() {
		var dayData = curStock.dayData;
		labelList = [];
		priceList = [];
		peList = [];
		for (var i=0; i<dayData.length; i++) {
			labelList.push(transYmd(dayData[i].date));
			priceList.push(dayData[i].price);
			peList.push(dayData[i].pe_ration);			
		}
		
		config.data.labels = labelList;
		config.data.datasets[0].data = priceList;
		config.data.datasets[1].data = peList;
		
		window.myLine.update();
		
	}
	
	function dispReport() {
		var reports = curStock.report;
		var htmlContent = "";
		$(".tbl-report tr.data").remove();
		if (reports && reports.length > 0) {
			for (var i=0; i<reports.length; i++) {
				htmlContent += "<tr class='data'>"
							+ "<td>" + reports[i].code + "</td>"
							+ "<td>" + transYmd(reports[i].date) + "</td>";
				for (var j=1; j<=16; j++) {
					htmlContent += "<td>" + eval('reports[i].field'+(j)) + "</td>";
				}
				htmlContent += "</tr>";
			}
		} else {
			htmlContent += "<tr><td>无数据</td></tr>"
		}
		
		$(".tbl-report").append(htmlContent);
	}
	
	function initCanvas() {
		var timeFormat = 'MM/DD/YYYY';
		var color = Chart.helpers.color;
		config = {
			type: 'line',
			data: {
				labels: [ // Date Objects
				],
				datasets: [{
					label: 'Price',
					backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
					borderColor: window.chartColors.red,
					fill: false,
					data: [],
				}, {
					label: 'PE',
					backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
					borderColor: window.chartColors.blue,
					fill: false,
					data: [],
				}]
			},
			options: {
				title: {
					text: 'Chart.js Time Scale'
				},
				scales: {
					xAxes: [{
//						type: 'time',
//						time: {
//							parser: timeFormat,
//							// round: 'day'
//							//tooltipFormat: 'll HH:mm'
//						},
						scaleLabel: {
							display: true,
							labelString: 'Date'
						}
					}],
					yAxes: [{
						scaleLabel: {
							display: true,
							labelString: 'value'
						}
					}]
				},
			}
		};

		
		var ctx = document.getElementById('canvas').getContext('2d');
		window.myLine = new Chart(ctx, config);

	}
	function transYmd(date) {
		var reg = new RegExp("-","g");//g,表示全部替换。
		date = date.replace(reg,"");
		return date.substring(0,8)
	}
    function getDate(date) {
        var now_date = new Date();
        var year = parseInt(date.substring(0,4));
        var month = parseInt(date.substring(5,7)) -1 ;
        var day = parseInt(date.substring(8,10)) ;
        return new Date(year, month, day).getTime();
    }
    
    function gd(year, month, day) {
    	var now_date = new Date();
    	 var diff = now_date.getTimezoneOffset() * -1 * 60 * 1000;
        //return new Date(year, month - 1, day).getTime();
        return new Date(year, month - 1, day).getTime() + diff;
    }

});