package com.example.networker_test.dto.order.cartItem;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CartItemsDTO {
    private int cartItemId; // 고유한 카트 아이템 ID

    private String orderId; // 주문 번호 (OrderInfo와 연결)

    @JsonProperty("id")
    private String productId; // 상품 ID

    @JsonProperty("name")
    private String productName; // 상품 이름

    @JsonProperty("price")
    private BigDecimal productPrice; // 상품 가격

    @JsonProperty("image")
    private String productImage; // 상품 이미지 URL

    @JsonProperty("count")
    private int productCount; // 상품 수량

}
