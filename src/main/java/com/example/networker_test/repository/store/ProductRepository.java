package com.example.networker_test.repository.store;

import com.example.networker_test.domain.sotre.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
