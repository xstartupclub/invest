package club.xstartup.invest.common;

public class DriverManagerDataSource extends
		org.springframework.jdbc.datasource.DriverManagerDataSource {
	@Override
	public void setUrl(String url){
		try {
			//切换连接数据库
			super.setUrl(url);			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Override
	public void setPassword(String password) {
		//解密后密码
		try {
			//super.setPassword(DESEncrypt.decryptString(password, "xstartup"));
			super.setPassword(password);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	@Override
	public void setUsername(String username) {
		//解密后用户名
		try {
			//super.setUsername(DESEncrypt.decryptString(username, "xstartup"));
			super.setUsername(username);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
