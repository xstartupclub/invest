$(document).ready(function() {

	$.ajax({
		type : 'GET',
		url : '/invest/main/getData.do',
		data : {
			"sqlId" : "1"
		},
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

	$('body').on('click', '.title', function() {
		$(this).siblings(".content").css("display", "block");
	});

	$('body').on('click', '.fold-up', function() {
		$(this).parents(".content").css("display", "none");
	});
	
	function dispData(data) {
		var termHtml="";
		if (data) {
			for (var i=0; i<data.length; i++) {			
			termHtml += "<div class='term'>"
				     + "<a href='#' class='title'>" + data[i].name + (data[i].name_en?"("+data[i].name_en+")":"") + "</a>"
				     + "<div class='content'>" + data[i].meaning + "</div>"
				     + "<a href='#' class='fold-up'>收起</a>"
				     +  "</div>";			
			}
		}
		$(".terms").html(termHtml);
	}

});