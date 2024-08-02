package com.example.networker_test.service.post;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.example.networker_test.domain.post.Post;
import com.example.networker_test.domain.post.PostLaw;
import com.example.networker_test.repository.post.PostLawRepository;
import com.example.networker_test.repository.post.PostRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.networker_test.exception.DataNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PostLawService {

    private final PostLawRepository postLawRepository;

    public List<PostLaw> getList(){
        return this.postLawRepository.findAll();//등록된 게시물 전체 조회
    }

    public PostLaw getPost(Integer id) {
        Optional<PostLaw> postLaw = this.postLawRepository.findById(id);//id 유무에 따라 페이지 연결
        if(postLaw.isPresent()) {
            return postLaw.get();//존재|해당 페이지 연결
        }else {
            throw new DataNotFoundException("E:POST NOT FOUND");//존재하지않는 id|404 pagenotfound 연결 및 E:POST NOT FOUND 남김(상위 디렉토리의 클래스로 연결)
        }
    }
    public Page<PostLaw> getList(int page) {
        List<Sort.Order>sorts = new ArrayList<>();
        sorts.add(Sort.Order.desc("createDate"));
        Pageable pageable = PageRequest.of(page,30, Sort.by(sorts));//paging scope
        return this.postLawRepository.findAll(pageable);
    }

    public void create(String subject, String content) {
        PostLaw pos = new PostLaw();
        pos.setSubject(subject);
        pos.setContent(content);
        pos.setCreateDate(LocalDateTime.now());
        this.postLawRepository.save(pos);
        //게시물 생성 처리 연결(controller - entity)
    }
}

