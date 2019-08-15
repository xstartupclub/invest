var config;
var config_pe;
var volAmtList = [];
$(document).ready(function() {
	initCanvas();
	initPeCanvas();
	$.ajax({
		type : 'POST',
		url : '/invest/main/getData.do',
		data : {
			"sqlId" : "19"
		},
		dataType : 'json',
		success : function(rs) {
			if (rs.status == 0) {
				volAmtList = rs.data;
				dispVolAmtData();
			} else {
			}
		},
		error : function() {
		}
	});
	
	function dispVolAmtData() {		
		var labelList = [];
		var shangzVolList = [];
		var shangzAmtList = [];
		var shenzVolList = [];
		var shenzAmtList = [];
		var chuangyVolList = [];
		var chuangyAmtList = [];
		var shangzPeList = [];
		var shenzPeList = [];
		var chuangyPeList = [];
		for (var i=0; i<volAmtList.length; i++) {
			labelList.push(volAmtList[i].date);
			shangzVolList.push(volAmtList[i].volume1);
			shangzAmtList.push(volAmtList[i].amount1);
			shenzVolList.push(volAmtList[i].volume2);
			shenzAmtList.push(volAmtList[i].amount2);
			chuangyVolList.push(volAmtList[i].volume3);
			chuangyAmtList.push(volAmtList[i].amount3);
			shangzPeList.push(volAmtList[i].pe1);
			shenzPeList.push(volAmtList[i].pe2);
			chuangyPeList.push(volAmtList[i].pe3);
		}
		
		config.data.labels = labelList;
		config.data.datasets[0].data = shangzVolList;
		config.data.datasets[1].data = shangzAmtList;
		config.data.datasets[2].data = shenzVolList;
		config.data.datasets[3].data = shenzAmtList;
		config.data.datasets[4].data = chuangyVolList;
		config.data.datasets[5].data = chuangyAmtList;
		
		config_pe.data.labels = labelList;
		config_pe.data.datasets[0].data = shangzPeList;
		config_pe.data.datasets[1].data = shenzPeList;
		config_pe.data.datasets[2].data = chuangyPeList;
		
		window.myLine.update();	
		window.myLinePe.update();
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
					label: 'shangz-vol',
					backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
					borderColor: window.chartColors.red,
					fill: false,
					data: [],
				}, {
					label: 'shangz-amount',
					backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
					borderColor: window.chartColors.red,
					fill: false,
					data: [],
				}, {
					label: 'shenz-amount',
					backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
					borderColor: window.chartColors.blue,
					fill: false,
					data: [],
				}, {
					label: 'shenz-amount',
					backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
					borderColor: window.chartColors.blue,
					fill: false,
					data: [],
				}, {
					label: 'chuangy-amount',
					backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
					borderColor: window.chartColors.yellow,
					fill: false,
					data: [],
				}, {
					label: 'chuangy-amount',
					backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
					borderColor: window.chartColors.yellow,
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

		var ctx = document.getElementById('day_volume').getContext('2d');
		window.myLine = new Chart(ctx, config);
	}
	
	function initPeCanvas() {
		var timeFormat = 'MM/DD/YYYY';
		var color = Chart.helpers.color;
		config_pe = {
			type: 'line',
			data: {
				labels: [ // Date Objects
				],
				datasets: [{
					label: 'shangz-pe',
					backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
					borderColor: window.chartColors.red,
					fill: false,
					data: [],
				}, {
					label: 'shenz-pe',
					backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
					borderColor: window.chartColors.blue,
					fill: false,
					data: [],
				}, {
					label: 'chuangy-pe',
					backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
					borderColor: window.chartColors.yellow,
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

		var ctx = document.getElementById('day_pe').getContext('2d');
		window.myLinePe = new Chart(ctx, config_pe);
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
        return new Date(year, month - 1, day).getTime() + diff;
    }

});