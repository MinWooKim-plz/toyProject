package com.example.networker_test.domain.comment;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.constraints.NotEmpty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CommentForm {
    @NotEmpty(message = "내용을 입력해주세요")
    private String content;
//템플릿에 글씨 적용 안함
}
