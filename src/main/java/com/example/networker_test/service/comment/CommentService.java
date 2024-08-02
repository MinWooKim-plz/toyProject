package com.example.networker_test.service.comment;

import java.time.LocalDateTime;

import com.example.networker_test.domain.comment.Comment;
import com.example.networker_test.domain.post.Post;
import com.example.networker_test.domain.user.User;
import com.example.networker_test.repository.comment.CommentRepository;
import com.example.networker_test.repository.post.PostRepository;
import com.example.networker_test.repository.user.UserRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
@RequiredArgsConstructor
public class CommentService {

	private final CommentRepository commentRepository;
	private final UserRepository userRepository;
	private final PostRepository postRepository;

	private static final Logger logger = LoggerFactory.getLogger(CommentService.class);

	public void create(Integer postId, String content, HttpSession session) {
		try {

			User user = (User) session.getAttribute("user");
			if (user == null) {
				throw new RuntimeException("User not found in session");
			}

			Post post = postRepository.findById(postId)
					.orElseThrow(() -> new RuntimeException("Post not found"));

			Comment comment = new Comment();
			comment.setContent(content);
			comment.setCreateDate(LocalDateTime.now());
			comment.setPost(post);
			comment.setAuthor(user);

			commentRepository.save(comment);
		} catch (Exception e) {
			logger.error("Error creating comment", e);
			throw e;
		}
	}
}
