//댓글
package com.example.networker_test.domain.comment;

import java.time.LocalDateTime;

import com.example.networker_test.domain.post.Post;

import com.example.networker_test.domain.user.User;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Comment {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;//댓글 고유번호
	
	@Column(columnDefinition = "TEXT")//댓글의 내용
	private String content;
	
	private LocalDateTime createDate;//댓글 작성일

	private Integer recommendCount;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "post_id")
	private Post post;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	private User author;

}
