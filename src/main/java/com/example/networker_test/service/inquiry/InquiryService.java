package com.example.networker_test.service.inquiry;

import com.example.networker_test.domain.user.User;
import com.example.networker_test.dto.inquiry.request.InquiryRequest;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class InquiryService {
    private final JavaMailSender mailSender;

    public InquiryService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public ResponseEntity<String> sendInquiry(InquiryRequest inquiryRequest, MultipartFile file, HttpSession session) {
        User user = (User) session.getAttribute("user");
        String subject, text;

        if (user != null) {
            subject = "Networker 문의 : " + inquiryRequest.getInquiryType() + "(" + user.getEmail() + ")";
            text = "아이디 : " + user.getEmail() + " / 닉네임 :" + user.getNickname() + "\n\n"
                    + "문의 종류 : " + inquiryRequest.getInquiryType() + "\n\n"
                    + "내용 : " + inquiryRequest.getContent() + "\n\n"
                    + "희망 수신 Email: " + inquiryRequest.getEmail();
        } else {
            subject = "Networker 문의 : " + inquiryRequest.getInquiryType() + "(비회원)";
            text = "비회원 문의\n\n"
                    + "문의 종류 : " + inquiryRequest.getInquiryType() + "\n\n"
                    + "내용 : " + inquiryRequest.getContent() + "\n\n"
                    + "희망 수신 Email: " + inquiryRequest.getEmail();
        }

        try {
            sendEmailWithAttachment("yuntyu01@gmail.com", subject, text, file);
            return ResponseEntity.ok("문의가 성공적으로 접수되었습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("문의 접수 중 오류가 발생했습니다.");
        }
    }

    public void sendEmailWithAttachment(String to, String subject, String text, MultipartFile file) throws Exception {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(to);
        helper.setSubject(subject);
        helper.setText(text);
        helper.setFrom("yunty01@gmail.com");

        if (file != null && !file.isEmpty()) {
            helper.addAttachment(file.getOriginalFilename(), file);
        }

        mailSender.send(message);
    }
}
