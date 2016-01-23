package com.pzy.controller.front;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.pzy.entity.User;
import com.pzy.service.UserService;
/***
 * 后台首页，处理后台登录验证权限等操作
 * @author qq:263608237
 *
 */
@Controller
@RequestMapping("/")
public class FrontController {
	
	@Autowired
	private UserService userService;
	@RequestMapping("index")
	public String index() {
		return "admin/login";
	}
	@RequestMapping("register")
	public String register() {
		return "admin/register";
	}
	@RequestMapping("doregister")
	public String doregister(User user,Model model) {
		user.setCreateDate(new Date());
		userService.save(user);
		model.addAttribute("tip","恭喜您注册成功，请登录！");
		return "admin/login";
	}
	
	@RequestMapping("exmple")
	public String exmple() {
		return "exmple";
	}
}

