package com.example.networker_test.controller.post;


import java.util.List;

import com.example.networker_test.domain.post.Post;
import com.example.networker_test.domain.post.PostLaw;
import com.example.networker_test.service.post.PostLawService;
import com.example.networker_test.service.post.PostService;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/lawsupport")
@RequiredArgsConstructor
public class PostLawController {

    private final PostLawService postLawService;//의존성 주입

    @GetMapping("/main")//게시물 리스트 페이지 연결
    public String list(Model model, @RequestParam(value="page",defaultValue = "0")int page) {
        if (page < 0) {
            page = 0; // 페이지 번호가 음수일 경우 0으로 설정
        }
        Page<PostLaw> paging = this.postLawService.getList(page);
        model.addAttribute("paging", paging);
        return "lawsupport";
    }

    @GetMapping(value="/detail/{id}")//특정 게시물의 페이지 연결
    public String detail(Model model, @PathVariable("id") Integer id) {
        PostLaw postLaw = this.postLawService.getPost(id);
        model.addAttribute("postLaw", postLaw);
        return "post_law";
    }

    @GetMapping("/create")//게시물 등록 요청 페이지 연결
    public String postCreate() {
        return "createpost_law";
    }

    @PostMapping("/create")//게시물 등록 처리
    public String questionCreate(@RequestParam(value="subject")String subject, @RequestParam(value="content")String content) {
        this.postLawService.create(subject, content);
        return "redirect:/lawsupport/main";//저장 후 목록으로
    }
}