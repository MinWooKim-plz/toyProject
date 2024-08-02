package com.example.networker_test.service.post;

import com.example.networker_test.domain.post.Post;
import com.example.networker_test.domain.post.PostRecommendation;
import com.example.networker_test.domain.user.User;
import com.example.networker_test.exception.DataNotFoundException;
import com.example.networker_test.repository.post.PostRecommendationRepository;
import com.example.networker_test.repository.post.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class PostRecommendationService {

    private final PostRecommendationRepository postRecommendationRepository;
    private final PostRepository postRepository;

    @Transactional
    public void recommendPost(Integer postId, User user) {
        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new DataNotFoundException("Post not found"));

        if (postRecommendationRepository.existsByPostAndUser(post, user)) {
            throw new IllegalArgumentException("User has already recommended this post");
        }

        PostRecommendation recommendation = new PostRecommendation();
        recommendation.setPost(post);
        recommendation.setUser(user);
        postRecommendationRepository.save(recommendation);
    }
}

