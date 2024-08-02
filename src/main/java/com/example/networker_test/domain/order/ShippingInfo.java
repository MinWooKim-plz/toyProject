package com.example.networker_test.domain.order;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "shippinginfo")
public class ShippingInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "shippingid")
    private Long shippingId;

    @ManyToOne
    @JoinColumn(name = "orderid", nullable = false)
    private OrderInfo orderInfo;

    @Column(length = 255)
    private String receiver;

    @Column(length = 10)
    private String postcode;

    @Column(columnDefinition = "TEXT")
    private String address;

    @Column(name = "addressdetail", columnDefinition = "TEXT")
    private String addressDetail;

    @Column(length = 20)
    private String mobile;

}
