package club.xstartup.invest.interceptor;

import java.lang.annotation.Annotation;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import club.xstartup.invest.annotation.LoginRequired;
import club.xstartup.invest.common.HtmlUtil;
import club.xstartup.invest.entity.User;


/**
 * 登录拦截器
 */
public class LoginInterceptor extends HandlerInterceptorAdapter {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (handler instanceof HandlerMethod) {
            LoginRequired loginRequired = findAnnotation((HandlerMethod) handler, LoginRequired.class);
            //没有声明需要权限,或者声明不验证权限
            if(loginRequired==null){
                return true;
            }else{
            	User user = (User)request.getSession(true).getAttribute("loginUser");
        		if (user==null) {        			
            		Map<String, Object> result = new HashMap<String, Object>();
            		result.put("status", 10001);
    				result.put("msg", "请先登陆");
            		HtmlUtil.renderJson(response, result);	
            		return false;
            	} else {
            		return true;
            	}      
            }
        }else{
            return true;
        }
    }

    private <T extends Annotation> T findAnnotation(HandlerMethod handler, Class<T> annotationType) {
        T annotation = handler.getBeanType().getAnnotation(annotationType);
        if (annotation != null) return annotation;
        return handler.getMethodAnnotation(annotationType);
    }
}