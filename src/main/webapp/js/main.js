var dataList = {
		"listStockHold":[],
		"listStockBill":[],
		"listAccountBill":[]
};
$(document).ready(function() {

	$.ajax({
		type : 'GET',
		url : '/invest/main/maininit.do',
		dataType : 'json',
		success : function(rs) {
			if (rs.status == 0) {
				dispData(rs.data)
			} else {
			}
		},
		error : function() {
		}
	});

	$('body').on('click', '.addStockHold', function() {
		$.ajax({
			type : 'GET',
			url : '/invest/main/addStockHold.do?code='+$('#stockHold .saveForm .code').val(),
			dataType : 'json',
			success : function(rs) {
				if (rs.status == 0) {
					dispStockHold(rs.listStockHold)
				} else {
				}
			},
			error : function() {
			}
		});
	});

	var oldStockHoldRow = -1;
	var oldStockHoldTr;
	$('body').on('click', '.list-stockHold td', function() {
		var row = $(this).parent().parent().find("tr").index($(this).parent()[0]);
		if (oldStockHoldRow == row) {
			return;
		}
		if (oldStockHoldTr) {
			oldStockHoldTr.css("background","white");
		}
		$(this).parent().css("background","lightblue");
		oldStockHoldRow = row;
		oldStockHoldTr = $(this).parent();
		
		//赋值
		var selectItem = dataList.listStockHold[row-1];
		$('#stockHold .saveForm .code').val(selectItem.code);
		
	});
	
	$('body').on('click', '#stockHold .delete', function() {
		$.ajax({
			type : 'GET',
			url : '/invest/main/deleteStockHold.do?code='+$('#stockHold .saveForm .code').val(),
			dataType : 'json',
			success : function(rs) {
				if (rs.status == 0) {
					oldStockHoldTr.remove();
					//清空 form
					$('#stockHold .saveForm .form-control').val("");
				} else {
				}
			},
			error : function() {
			}
		});
	});
	
	$('body').on('click', '#stockBill .search', function() {
		$.ajax({
			type : 'POST',
			url : '/invest/main/getStockBill.do',
			data : {
				"startDate" : $("#stockBill .startDate").val(),
				"endDate" : $("#stockBill .endDate").val()
			},
			dataType : 'json',
			success : function(rs) {
				if (rs.status == 0) {
					dispStockBill(rs.data.listStockBill);
				} else {
				}
			},
			error : function() {
			}
		});
	});
	
	$('body').on('click', '#stockBill .save', function() {
		$.ajax({
			type : 'POST',
			url : '/invest/main/saveStockBill.do',
			data : {
				"id" : $("#stockBill .saveForm .id").val(),
				"code" : $("#stockBill .saveForm .code").val(),
				"date" : $("#stockBill .saveForm .date").val(),
				"type" : $("#stockBill .saveForm .type").val(),
				"price" : $("#stockBill .saveForm .price").val(),
				"volume" : $("#stockBill .saveForm .volume").val(),
				"amount" : $("#stockBill .saveForm .amount").val(),
				"startDate" : $("#stockBill .startDate").val(),
				"endDate" : $("#stockBill .endDate").val()
			},
			dataType : 'json',
			success : function(rs) {
				if (rs.status == 0) {
					dispStockBill(rs.listStockBill);
					//清空 form
					$('#stockBill .saveForm .form-control').val("");
				} else {
				}
			},
			error : function() {
			}
		});
	});
	
	var oldStockBillRow = -1;
	var oldStockBillTr;
	$('body').on('click', '.list-stockBill td', function() {
		var row = $(this).parent().parent().find("tr").index($(this).parent()[0]);
		if (oldStockBillRow == row) {
			return;
		}
		if (oldStockBillTr) {
			oldStockBillTr.css("background","white");
		}
		$(this).parent().css("background","lightblue");
		oldStockBillRow = row;
		oldStockBillTr = $(this).parent();
		
		//赋值
		var selectBill = dataList.listStockBill[row-1];
		$('#stockBill .saveForm .id').val(selectBill.id);
		$('#stockBill .saveForm .code').val(selectBill.code);
		$('#stockBill .saveForm .date').val(selectBill.date);
		$('#stockBill .saveForm .type').val(selectBill.type);
		$('#stockBill .saveForm .price').val(selectBill.price);
		$('#stockBill .saveForm .volume').val(selectBill.volume);
		$('#stockBill .saveForm .amount').val(selectBill.amount);
	});
	
	$('body').on('click', '#stockBill .delete', function() {
		$.ajax({
			type : 'GET',
			url : '/invest/main/deleteStockBill.do?id='+$('#stockBill .saveForm .id').val(),
			dataType : 'json',
			success : function(rs) {
				if (rs.status == 0) {
					oldStockBillTr.remove();
					//清空 form
					$('#stockBill .saveForm .form-control').val("");
				} else {
				}
			},
			error : function() {
			}
		});
	});
	
	$('body').on('click', '#stockBill .reset', function() {
		//清空 form
		$('#stockBill .saveForm .form-control').val("");
		oldStockBillRow = -1;
	});
	
	
	$('body').on('click', '#accountBill .search', function() {
		$.ajax({
			type : 'POST',
			url : '/invest/main/getAccountBill.do',
			data : {
				"startDate" : $("#accountBill .startDate").val(),
				"endDate" : $("#accountBill .endDate").val()
			},
			dataType : 'json',
			success : function(rs) {
				if (rs.status == 0) {
					dispAccountBill(rs.data.listAccountBill);
				} else {
				}
			},
			error : function() {
			}
		});
	});
	
	$('body').on('click', '#accountBill .save', function() {
		$.ajax({
			type : 'POST',
			url : '/invest/main/saveAccountBill.do',
			data : {
				"id" : $("#accountBill .saveForm .id").val(),
				"date" : $("#accountBill .saveForm .date").val(),
				"type" : $("#accountBill .saveForm .type").val(),
				"amount" : $("#accountBill .saveForm .amount").val(),
				"money" : $("#accountBill .saveForm .money").val(),
				"stock" : $("#accountBill .saveForm .stock").val(),
				"startDate" : $("#accountBill .startDate").val(),
				"endDate" : $("#accountBill .endDate").val()
			},
			dataType : 'json',
			success : function(rs) {
				if (rs.status == 0) {
					dispAccountBill(rs.listAccountBill);
					//清空 form
					$('#accountBill .saveForm .form-control').val("");
				} else {
				}
			},
			error : function() {
			}
		});
	});
	
	var oldAccountBillRow = -1;
	var oldAccountBillTr;
	$('body').on('click', '.list-accountBill td', function() {
		var row = $(this).parent().parent().find("tr").index($(this).parent()[0]);
		if (oldAccountBillRow == row) {
			return;
		}
		if (oldAccountBillTr) {
			oldAccountBillTr.css("background","white");
		}
		$(this).parent().css("background","lightblue");
		oldAccountBillRow = row;
		oldAccountBillTr = $(this).parent();
		
		//赋值
		var selectBill = dataList.listAccountBill[row-1];
		$('#accountBill .saveForm .id').val(selectBill.id);
		$('#accountBill .saveForm .date').val(selectBill.date);
		$('#accountBill .saveForm .type').val(selectBill.type);
		$('#accountBill .saveForm .amount').val(selectBill.amount);
		$('#accountBill .saveForm .money').val(selectBill.money);
		$('#accountBill .saveForm .stock').val(selectBill.stock);
	});
	
	$('body').on('click', '#accountBill .delete', function() {
		$.ajax({
			type : 'GET',
			url : '/invest/main/deleteAccountBill.do?id='+$('#accountBill .saveForm .id').val(),
			dataType : 'json',
			success : function(rs) {
				if (rs.status == 0) {
					oldAccountBillTr.remove();
					//清空 form
					$('#accountBill .saveForm .form-control').val("");
				} else {
				}
			},
			error : function() {
			}
		});
	});
	
	$('body').on('click', '#accountBill .reset', function() {
		//清空 form
		$('#accountBill .saveForm .form-control').val("");
		oldAccountBillRow = -1;
	});
	
	function dispData(data) {
		dispCodeData(data.listCode4StockBill,$('#stockBill .type'));
		dispCodeData(data.listCode4AccountBill,$('#accountBill .type'));
		dispStockHold(data.listStockHold);
		dispStockBill(data.listStockBill);
		dispAccountBill(data.listAccountBill);	
	}
	
	function dispCodeData(data, obj) {
		if (data) {
			for (var i=0; i<data.length; i++) {			
				obj.append("<option value='"+data[i].code+"'>"+data[i].name+"</option");			
			}
		}
	}
	
	function dispStockHold(data) {
		dataList.listStockHold = data;
		$(".list-stockHold table").html("");
		var content="<tr><th class='th1'>代码</th><th class='th2'>名称</th></tr>";
		if (data) {
			for (var i=0; i<data.length; i++) {			
				content += "<tr>"
				     + "<td class='code'><a href='#'>" + data[i].code + "</a></td>"
				     + "<td>" + data[i].name + "</td>"
				     +  "</tr>";			
			}
		}
		$(".list-stockHold table").html(content);
	}
	
	function dispStockBill(data) {
		dataList.listStockBill = data;
		oldStockBillRow = -1;
		oldStockBillTr;
		$(".list-stockBill table").html("");
		var content="<tr><th class='th0 hidden'>id</th><th class='th1'>代码</th><th class='th2'>名称</th>"
			+ "<th class='th3'>交易日期</th>"
			+ "<th class='th4'>交易类型</th>"
			+ "<th class='th5'>交易价格</th>"
			+ "<th class='th6'>交易数量</th>"
			+ "<th class='th7'>交易金额</th>"
				"</tr>";
		if (data) {
			for (var i=0; i<data.length; i++) {	
				content += "<tr>"
					 + "<td class='hidden'>" + data[i].id + "</td>"
				     + "<td>" + data[i].code + "</td>"
				     + "<td>" + data[i].name + "</td>"
				     + "<td>" + data[i].date + "</td>"
				     + "<td>" + data[i].typeName + "</td>"
				     + "<td>" + data[i].price + "</td>"
				     + "<td>" + data[i].volume + "</td>"
				     + "<td>" + data[i].amount + "</td>"
				     +  "</tr>";			
			}
		}
		$(".list-stockBill table").html(content);
	}
	
	function dispAccountBill(data) {
		dataList.listAccountBill = data;
		$(".list-accountBill table").html("");
		var content="<tr>"
			+ "<th class='th1'>交易日期</th>"
			+ "<th class='th2'>交易类型</th>"
			+ "<th class='th3'>交易金额</th>"
			+ "<th class='th4'>资金</th>"
			+ "<th class='th5'>股份</th>"
				"</tr>";
		if (data) {
			for (var i=0; i<data.length; i++) {	
				content += "<tr>"
				     + "<td>" + data[i].date + "</td>"
				     + "<td>" + data[i].typeName + "</td>"
				     + "<td>" + data[i].amount + "</td>"
				     + "<td>" + data[i].money + "</td>"
				     + "<td>" + data[i].stock + "</td>"
				     +  "</tr>";			
			}
		}
		$(".list-accountBill table").html(content);
	}
	
});