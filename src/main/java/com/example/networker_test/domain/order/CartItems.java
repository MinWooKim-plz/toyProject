package com.example.networker_test.domain.order;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Entity
@Getter
@Setter
@Table(name = "cartitems")
public class CartItems {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cartitemid; // 고유한 카트 아이템 ID

    @ManyToOne
    @JoinColumn(name = "orderid", nullable = false)
    private OrderInfo orderInfo;

    @Column(name = "productid", nullable = false)
    private String productId; // 상품 ID

    @Column(name = "productname", nullable = false)
    private String productName; // 상품 이름

    @Column(name = "productprice", nullable = false)
    private BigDecimal productPrice; // 상품 가격

    @Column(name = "productimage", nullable = true, columnDefinition = "TEXT")
    private String productImage; // 상품 이미지 URL

    @Column(name = "productcount", nullable = false)
    private int productCount; // 상품 수량


}
