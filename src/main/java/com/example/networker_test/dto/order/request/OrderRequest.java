package com.example.networker_test.dto.order.request;
import com.example.networker_test.dto.order.cartItem.CartItemsDTO;
import com.example.networker_test.dto.order.orderinfo.OrderInfoDTO;
import com.example.networker_test.dto.order.paymentinfo.PaymentInfoDTO;
import com.example.networker_test.dto.order.shippinginfo.ShippingInfoDTO;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

public class OrderRequest {

    @Setter
    @Getter
    public static class OrderData {
 ;
        private OrderInfoDTO orderInfo;
        private ShippingInfoDTO shippingInfo;
        private PaymentInfoDTO paymentInfo;
        private List<CartItemsDTO> cartItems;

        public OrderData(OrderInfoDTO orderInfo, ShippingInfoDTO shippingInfo, PaymentInfoDTO paymentInfo, List<CartItemsDTO> cartItems) {
            this.orderInfo = orderInfo;
            this.shippingInfo = shippingInfo;
            this.paymentInfo = paymentInfo;
            this.cartItems = cartItems;
        }
    }

}
