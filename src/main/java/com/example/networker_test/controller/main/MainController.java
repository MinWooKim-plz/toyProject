package com.example.networker_test.controller.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class MainController {
	@GetMapping("/main")
	public String mainMethod() {
		return "networker";
	}
	
	@GetMapping("/")
	public String rootURL() {
		return "redirect:/main";
	}
	

}
