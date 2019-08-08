package club.xstartup.invest.common;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServletResponse;
import com.alibaba.fastjson.JSON;

public class HtmlUtil {

	public static void renderJson(HttpServletResponse response, Object jsonObj) {
		renderJson(response,JSON.toJSONString(jsonObj));
	}
	
	public static void renderJson(HttpServletResponse response, String jsonStr) {
		response.setContentType("application/json");
		writer(response, jsonStr);
	}

	public static void writer(HttpServletResponse response, String str) {
		try {
			// 设置页面不缓存
			response.setHeader("Pragma", "No-cache");
			response.setHeader("Cache-Control", "no-cache");
			response.setCharacterEncoding("UTF-8");
			PrintWriter out = null;
			out = response.getWriter();
			out.print(str);
			out.flush();
			out.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
