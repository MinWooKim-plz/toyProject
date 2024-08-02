package com.example.networker_test.dto.order.paymentinfo;

import com.example.networker_test.domain.order.PaymentInfo;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Getter
@Setter
public class PaymentInfoDTO {

    private Integer paymentId;      // 결제 정보 ID
    private String orderId;         // 주문 번호
    private BigDecimal totalAmount; // 총 주문 금액
    private BigDecimal shippingFee; // 배송료
    private BigDecimal finalAmount; // 최종 결제 금액


}
