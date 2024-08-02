package com.example.networker_test.repository.order;

import com.example.networker_test.domain.order.OrderInfo;
import com.example.networker_test.domain.order.PaymentInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PaymentInfoRepository extends JpaRepository<PaymentInfo, Long>
{

    PaymentInfo findByOrderInfo(OrderInfo orderInfo);
}
