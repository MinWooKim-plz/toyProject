package com.example.networker_test.dto.order.shippinginfo;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ShippingInfoDTO {
    private String receiver;
    private String postcode;
    private String address;
    private String addressDetail;
    private String mobile;
}
