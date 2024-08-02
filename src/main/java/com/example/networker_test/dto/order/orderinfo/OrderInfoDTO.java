package com.example.networker_test.dto.order.orderinfo;

import com.example.networker_test.domain.order.OrderInfo;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class OrderInfoDTO {
    private String orderId;
    private String userId;
    private String orderName;
    private String email;
    private String mobile;
    private Date createdAt;



}
