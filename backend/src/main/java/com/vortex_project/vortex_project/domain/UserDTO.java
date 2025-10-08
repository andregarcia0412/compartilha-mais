package com.vortex_project.vortex_project.domain;

public class UserDTO {
    private long id;
    private String name;
    private String email;
    private int points;

    public UserDTO(long id, String name, String email, int points) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.points = points;
    }

    public UserDTO(){}

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

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

    public int getPoints() {
        return points;
    }

    public void setPoints(int points) {
        this.points = points;
    }
}
