package com.example.networker_test.service.comment;

import java.time.LocalDateTime;

import com.example.networker_test.domain.comment.Comment;
import com.example.networker_test.domain.comment.CommentLaw;
import com.example.networker_test.domain.post.PostLaw;
import com.example.networker_test.repository.comment.CommentLawRepository;
import com.example.networker_test.repository.comment.CommentRepository;
import org.springframework.stereotype.Service;

import com.example.networker_test.domain.post.Post;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CommentLawService {

    private final CommentLawRepository commentLawRepository;

    public void create(PostLaw postLaw, String content) {
        CommentLaw commentLaw = new CommentLaw();
        commentLaw.setContent(content);
        commentLaw.setCreateDate(LocalDateTime.now());
        commentLaw.setPostLaw(postLaw);
        this.commentLawRepository.save(commentLaw);
    }//댓글 생성 처리 연결(controller - entity)

}