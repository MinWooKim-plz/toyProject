package com.example.networker_test.domain.order;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "orderinfo")
public class OrderInfo {
    @Id
    @Column(name = "orderid", length = 36)
    private String orderId;

    @Column(name = "userid")
    private String userid;

    @Column(name = "ordername")
    private String orderName;

    @Column(name = "email")
    private String email;

    @Column(name = "mobile", length = 20)
    private String mobile;

    @Column(updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
    }
}
