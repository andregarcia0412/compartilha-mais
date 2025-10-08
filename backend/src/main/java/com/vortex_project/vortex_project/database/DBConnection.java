package com.vortex_project.vortex_project.database;


import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@Service
public class DBConnection {
    private String URL = "jdbc:mysql://root:pTFJLgjggecKVJMgvSMLFxsnXKmhHcwV@yamabiko.proxy.rlwy.net:49470/railway";
    private String USER = "root";
    private String PASSWORD = "pTFJLgjggecKVJMgvSMLFxsnXKmhHcwV";

    public Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL,USER,PASSWORD);
    }
}
