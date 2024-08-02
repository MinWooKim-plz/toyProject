package com.example.networker_test.domain.order;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;

@Entity
@Table(name = "paymentinfo")
@Getter
@Setter
public class PaymentInfo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "paymentid") // Column 명시
    private Integer paymentId;

    @ManyToOne
    @JoinColumn(name = "orderid", nullable = false)
    private OrderInfo orderInfo;

    @Column(name = "totalamount", precision = 10, scale = 2) // 명확한 Decimal 설정
    private BigDecimal totalAmount;

    @Column(name = "shippingfee", precision = 10, scale = 2) // 명확한 Decimal 설정
    private BigDecimal shippingFee;

    @Column(name = "finalamount", precision = 10, scale = 2) // 명확한 Decimal 설정
    private BigDecimal finalAmount;
}
