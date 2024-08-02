package com.example.networker_test.repository.comment;

import com.example.networker_test.domain.comment.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer>{
	

}
