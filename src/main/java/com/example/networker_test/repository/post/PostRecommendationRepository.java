package com.example.networker_test.repository.post;

import com.example.networker_test.domain.post.Post;
import com.example.networker_test.domain.post.PostRecommendation;
import com.example.networker_test.domain.user.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRecommendationRepository extends JpaRepository<PostRecommendation, Long> {

    boolean existsByPostAndUser(Post post, User user);
}

