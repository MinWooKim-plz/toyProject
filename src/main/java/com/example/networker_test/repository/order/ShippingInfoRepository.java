package com.example.networker_test.repository.order;

import com.example.networker_test.domain.order.ShippingInfo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShippingInfoRepository extends JpaRepository<ShippingInfo, Long> {
}
