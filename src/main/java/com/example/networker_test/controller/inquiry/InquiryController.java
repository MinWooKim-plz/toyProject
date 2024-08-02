package com.example.networker_test.controller.inquiry;

import com.example.networker_test.dto.inquiry.request.InquiryRequest;
import com.example.networker_test.service.inquiry.InquiryService;
import jakarta.servlet.http.HttpSession;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
public class InquiryController {

    private final InquiryService inquiryService;

    public InquiryController(InquiryService inquiryService) {
        this.inquiryService = inquiryService;
    }

    @PostMapping("/inquiry")
    public ResponseEntity<String> sendInquiry( @RequestPart("inquiryRequest") InquiryRequest inquiryRequest,
                                               @RequestPart(value = "file", required = false) MultipartFile file,
                                               HttpSession session) {
        return inquiryService.sendInquiry(inquiryRequest, file, session);
    }
}