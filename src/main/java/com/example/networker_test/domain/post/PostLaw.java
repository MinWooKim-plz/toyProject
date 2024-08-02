package com.example.networker_test.domain.post;

import java.time.LocalDateTime;
import java.util.List;

import com.example.networker_test.domain.comment.Comment;

import com.example.networker_test.domain.comment.CommentLaw;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class PostLaw {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(length=100)
    private String subject;

    @Column(columnDefinition = "TEXT")
    private String content;

    private LocalDateTime createDate;

    @Column(columnDefinition = "TEXT")
    private String userId;

    private Integer viewCount;

    private Integer recommendCount;

    @OneToMany(mappedBy = "postLaw", cascade = CascadeType.REMOVE)
    private List<CommentLaw> commentLawList;


}

