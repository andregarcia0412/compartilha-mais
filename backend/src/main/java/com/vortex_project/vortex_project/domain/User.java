package com.vortex_project.vortex_project.domain;

public class User {
    private long id;
    private String name;
    private String email;
    private String password;
    private int points;
    private long referrerId;

    public User(long id, String name, String email, String password, long referrerId){
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.points = 0;
        this.referrerId = referrerId;
    }

    public User(){}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getReferrerId() {
        return referrerId;
    }

    public void setReferrerId(long referrerId) {
        this.referrerId = referrerId;
    }
}
