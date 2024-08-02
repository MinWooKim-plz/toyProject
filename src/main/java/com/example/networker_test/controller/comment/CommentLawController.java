package com.example.networker_test.controller.comment;

import com.example.networker_test.domain.post.PostLaw;
import com.example.networker_test.service.comment.CommentLawService;
import com.example.networker_test.service.comment.CommentService;
import com.example.networker_test.service.post.PostLawService;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.networker_test.domain.post.Post;
import com.example.networker_test.service.post.PostService;

import lombok.RequiredArgsConstructor;

@Controller
@RequestMapping("/commentlaw")
@RequiredArgsConstructor
public class CommentLawController {

    private final PostLawService postLawService;//의존성 주입
    private final CommentLawService commentLawService;//의존성 주입

    @PostMapping("/create/{id}")//댓글 등록 처리
    public String createComment(Model model, @PathVariable("id") Integer id, @RequestParam(value="content")String content) {
        PostLaw postLaw = this.postLawService.getPost(id);
        this.commentLawService.create(postLaw,content);
        return String.format("redirect:/lawsupport/detail/%s", id);//댓글 등록 후 등록 확인을 위한 reload
    }


}
