package club.xstartup.invest.dao;

import java.util.List;
import java.util.Map;

public interface InvestDao<T> extends BaseDao<T> {
	
	public String getSql(int sqlId);
	
	public List<Map<String, String>> getData(String value);
	
	public List<Map<String, String>> getFilters();
	
	public void saveFilter(Map<String, Object> params);
	
	public void addStockHold(String code);
	
	public void deleteStockHold(String code);
	
	public List<Map<String, String>> getCodeData(int type);
	
	public void addStockBill(Map<String, Object> params);
	
	public void deleteStockBill(int id);
	
	public void addAccountBill(Map<String, Object> params);
	
	public void deleteAccountBill(int id);
}
