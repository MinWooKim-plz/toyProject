package com.example.networker_test.repository.post;

import com.example.networker_test.domain.post.Post;
import com.example.networker_test.domain.post.PostLaw;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostLawRepository extends JpaRepository<PostLaw, Integer> {
    PostLaw findBySubject(String subject);
    PostLaw findBySubjectAndContent(String subject, String content);
    List<PostLaw> findBySubjectLike(String subject);
    Page<PostLaw> findAll(Pageable pageable);

}

