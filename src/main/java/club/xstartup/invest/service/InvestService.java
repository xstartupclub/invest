package club.xstartup.invest.service;

import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import club.xstartup.invest.dao.InvestDao;

@Service("InvestService")
public class InvestService<T> {

	@Autowired
	private InvestDao<T> dao;

	public InvestDao<T> getDao() {
		return dao;
	}

	public String getSql(int sqlId) {
		return getDao().getSql(sqlId);
	}

	public List<Map<String, String>> getData(String value) {
		return getDao().getData(value);
	}
	
	public List<Map<String, String>> getFilters() {
		return getDao().getFilters();
	}
	
	public void saveFilter(Map<String, Object> params) {
		getDao().saveFilter(params);
	}
	
	public void addStockHold(String code) {
		getDao().addStockHold(code);
	}
	
	public void deleteStockHold(String code) {
		getDao().deleteStockHold(code);
	}
	
	public void saveStockBill(Map<String, Object> params) {
		if (params.containsKey("id")
				&&!StringUtils.isEmpty(params.get("id"))) {
			getDao().deleteStockBill(Integer.valueOf(params.get("id").toString()));
		}
		getDao().addStockBill(params);
	}
	
	public void deleteStockBill(int id) {
		getDao().deleteStockBill(id);
	}
	
	public void saveAccountBill(Map<String, Object> params) {
		if (params.containsKey("id")
				&&!StringUtils.isEmpty(params.get("id"))) {
			getDao().deleteAccountBill(Integer.valueOf(params.get("id").toString()));
		}
		getDao().addAccountBill(params);
	}
	
	public void deleteAccountBill(int id) {
		getDao().deleteAccountBill(id);
	}
	
	public List<Map<String, String>> getCodeData(int type) {
		return getDao().getCodeData(type);
	}
	
}
