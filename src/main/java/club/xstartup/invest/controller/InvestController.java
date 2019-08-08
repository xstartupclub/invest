package club.xstartup.invest.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import club.xstartup.invest.common.HtmlUtil;
import club.xstartup.invest.entity.Invest;
import club.xstartup.invest.service.InvestService;

@Controller 
@RequestMapping("/main")
public class InvestController {
	@Autowired(required  = false)
	private InvestService<Invest> investService;
	
	
	@RequestMapping("/maininit")
	public void maininit(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> data = new HashMap<String, Object>();
		result.put("status", 0);
		
		List<Map<String, String>> listCode4StockBill = investService.getCodeData(1);
		data.put("listCode4StockBill", listCode4StockBill);
		
		List<Map<String, String>> listCode4AccountBill = investService.getCodeData(2);
		data.put("listCode4AccountBill", listCode4AccountBill);
				
		data.put("listStockHold", 	getStockHoldData());//查询持仓
		data.put("listStockBill", getStockBillData(request));
		data.put("listAccountBill", getAccountBillData(request));
		result.put("data", data);
		HtmlUtil.renderJson(response, result);
	}
	
	@RequestMapping("/stockinit")
	public void stockinit(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> data = new HashMap<String, Object>();
		result.put("status", 0);
		List<Map<String, String>> listFilter = investService.getFilters();
		data.put("listFilter", listFilter);
		
		String sqlContent = investService.getSql(9);
		List<Map<String, String>> listTitle = investService.getData(sqlContent);
		
		data.put("listTitle", listTitle);
		result.put("data", data);
		HtmlUtil.renderJson(response, result);
	}
	
	@RequestMapping("/getStockHold")
	public void getStockHold(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> data = new HashMap<String, Object>();
		result.put("status", 0);
		
		data.put("listStockHold", getStockHoldData());
	
		result.put("data", data);
		HtmlUtil.renderJson(response, result);
	}
	
	@RequestMapping("/getStockBill")
	public void getStockBill(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> data = new HashMap<String, Object>();
		result.put("status", 0);
		
		//查询交易
		data.put("listStockBill", getStockBillData(request));
		result.put("data", data);
		HtmlUtil.renderJson(response, result);
	}
	
	@RequestMapping("/getAccountBill")
	public void getAccountBill(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> data = new HashMap<String, Object>();
		result.put("status", 0);	
		data.put("listAccountBill", getAccountBillData(request));
		result.put("data", data);
		HtmlUtil.renderJson(response, result);
	}
	
	
	@RequestMapping("/addStockHold")
	public void addStockHold(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", 0);
		
		String code = request.getParameter("code");
		investService.addStockHold(code);
		result.put("listStockHold", getStockHoldData());
		HtmlUtil.renderJson(response, result);
	}
	
	@RequestMapping("/deleteStockHold")
	public void deleteStockHold(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", 0);
		
		String code = request.getParameter("code");
		investService.deleteStockHold(code);
		HtmlUtil.renderJson(response, result);
	}
	
	
	@RequestMapping("/saveStockBill")
	public void saveStockBill(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", 0);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", request.getParameter("id"));
		params.put("code", request.getParameter("code"));
		params.put("date", request.getParameter("date"));
		params.put("type", request.getParameter("type"));
		params.put("price", request.getParameter("price"));
		params.put("volume", request.getParameter("volume"));
		params.put("amount", request.getParameter("amount"));
		investService.saveStockBill(params);
		result.put("listStockBill", this.getStockBillData(request));
		HtmlUtil.renderJson(response, result);
	}
	
	@RequestMapping("/deleteStockBill")
	public void deleteStockBill(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", 0);
		
		String id = request.getParameter("id");
		investService.deleteStockBill(Integer.valueOf(id));
		HtmlUtil.renderJson(response, result);
	}
	
	@RequestMapping("/saveAccountBill")
	public void saveAccountBill(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", 0);
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("id", request.getParameter("id"));
		params.put("date", request.getParameter("date"));
		params.put("type", request.getParameter("type"));
		params.put("amount", request.getParameter("amount"));
		params.put("money", request.getParameter("money"));
		params.put("stock", request.getParameter("stock"));
		investService.saveAccountBill(params);
		result.put("listAccountBill", this.getAccountBillData(request));
		HtmlUtil.renderJson(response, result);
	}
	
	@RequestMapping("/deleteAccountBill")
	public void deleteAccountBill(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", 0);
		
		String id = request.getParameter("id");
		investService.deleteAccountBill(Integer.valueOf(id));
		HtmlUtil.renderJson(response, result);
	}
	
	@RequestMapping("/getData")
	public void getData(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", 0);
		String sqlId = request.getParameter("sqlId");
		String[] listSqlId = sqlId.split(",");
		String sqlContent = "";
		if (StringUtils.isEmpty(sqlId)) {
			sqlContent = request.getParameter("sql");
		} else {
			for (int i=0;i<listSqlId.length;i++) {
				sqlContent += investService.getSql(Integer.valueOf(listSqlId[i])) + " ";
			}
			
			String condition = request.getParameter("condition");
			if (!StringUtils.isEmpty(condition)) {
				sqlContent += " " +condition;
			}			
		}		
		
		List<Map<String, String>> data = investService.getData(sqlContent);
		
		result.put("data", data);
		HtmlUtil.renderJson(response, result);
	}
	
	@RequestMapping("/getFilters")
	public void getFilters(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", 0);
		List<Map<String, String>> listFilter = investService.getFilters();
		result.put("listFilter", listFilter);
		HtmlUtil.renderJson(response, result);
	}
	
	@RequestMapping("/saveFilter")
	public void saveFilter(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		result.put("status", 0);
		
		String condition = request.getParameter("condition");
		String comment = request.getParameter("comment");
		String name = request.getParameter("name");
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("content", condition);
		params.put("comment", comment);
		params.put("name", name);
		params.put("type", 5);
		investService.saveFilter(params);
		HtmlUtil.renderJson(response, result);
	}
	
	@RequestMapping("/getDetail")
	public void getDetail(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String, Object> result = new HashMap<String, Object>();
		Map<String, Object> data = new HashMap<String, Object>();
		result.put("status", 0);
		
		List<Map<String, String>> stockData = investService.getData(investService.getSql(3));
		data.put("stockData", stockData);
		List<Map<String, String>> stockReport = investService.getData(investService.getSql(4));
		data.put("stockReport", stockReport);
		result.put("data", data);
		
		HtmlUtil.renderJson(response, result);
	}
	
	private List<Map<String, String>> getStockHoldData() {
		//查询持仓
		String sqlContent = investService.getSql(5);
		List<Map<String, String>> listStockHold = investService.getData(sqlContent);
		return listStockHold;
	}
	
	private List<Map<String, String>> getStockBillData(HttpServletRequest request) {
		//查询股票交易记录
		String sqlContent = investService.getSql(6);
		String condition = "";
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		if (!StringUtils.isEmpty(startDate)) {
			condition += " and date >= '" + startDate + "'";
		}
		if (!StringUtils.isEmpty(endDate)) {
			condition += " and date <= '" + endDate + "'";
		}
		sqlContent = sqlContent.replace("{}", condition);
		List<Map<String, String>> listStockBill = investService.getData(sqlContent);
		return listStockBill;
	}
	
	private List<Map<String, String>> getAccountBillData(HttpServletRequest request) {
		//查询股票交易记录
		String sqlContent = investService.getSql(7);
		String condition = "";
		String startDate = request.getParameter("startDate");
		String endDate = request.getParameter("endDate");
		if (!StringUtils.isEmpty(startDate)) {
			condition += " and date >= '" + startDate + "'";
		}
		if (!StringUtils.isEmpty(endDate)) {
			condition += " and date <= '" + endDate + "'";
		}
		sqlContent = sqlContent.replace("{}", condition);
		List<Map<String, String>> listAccountBill = investService.getData(sqlContent);
		return listAccountBill;
	}
}
