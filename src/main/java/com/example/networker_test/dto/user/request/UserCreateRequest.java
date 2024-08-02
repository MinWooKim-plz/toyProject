package com.example.networker_test.dto.user.request;

public class UserCreateRequest {
    private String nickname;
    private String email;
    private String password;
    private String nationality;

    public String getNickname() {
        return nickname;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getNationality() {
        return nationality;
    }
}

