//게시글
package com.example.networker_test.domain.post;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

import com.example.networker_test.domain.comment.Comment;

import com.example.networker_test.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Post {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	@Column(length=100)
	private String subject;
	
	@Column(columnDefinition = "TEXT")
	private String content;
	
	private LocalDateTime createDate;

	@ManyToOne
	@JoinColumn(name = "author_id")
	private User author;

	private Integer viewCount;

	private Integer recommendCount;
	
	@OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
	private List<Comment> commentList;

	@OneToMany(mappedBy = "post")
	private Set<PostRecommendation> recommendations;
	

}
