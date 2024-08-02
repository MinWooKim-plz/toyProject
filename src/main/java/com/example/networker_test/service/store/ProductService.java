package com.example.networker_test.service.store;

import com.example.networker_test.domain.sotre.Product;
import com.example.networker_test.repository.store.ProductRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public List<Product> getProduct(){
        saveProduct();
        return productRepository.findAll();
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public void saveProduct(){
        productRepository.save(new Product(1L, 5000L, "산타 마리아 올라운드 시즈닝", "../src/assets/spice.jpg",
                "구운 고기와 가금류를 위해 특별히 맞춘 흠잡을 데 없는 향신료! \n 소금, 파프리카 흑후추, 마늘, 쿠민, 고수, 생강 등 향신료와 허브의 조화로운 조합!" ));
        productRepository.save(new Product(2L, 7000L, "인도 홍차", "../src/assets/tea.jpg",
                "아름다운 황금빛의 프리미엄 블렌드는 풍부하고 부드러운 맛을 제공하는 고급 홍차입니다."));
        productRepository.save(new Product(3L, 10000L, "곽티슈 세트", "../src/assets/tisu.jpg",
                "잘풀리는 곽티슈 리얼 실키 티슈 3곽 세트"));
        productRepository.save(new Product(4L, 2500L, "미소시루", "../src/assets/miso.jpg",
                "마루코메 미소시루 즉석 된장국! 뜨거운 물에 잘 풀어주기만 하면 바로 완성!"));
        productRepository.save(new Product(5L, 7000L, "Nước Chấm 소스", "../src/assets/nuocmom.jpg",
                "다양한 요리에 어울리는 생선 소스를 베이스로 한 베트남의 클래식 조미료!"));
    }


}
