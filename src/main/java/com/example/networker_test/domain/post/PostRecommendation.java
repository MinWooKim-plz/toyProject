package com.example.networker_test.domain.post;

import com.example.networker_test.domain.user.User;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class PostRecommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}

