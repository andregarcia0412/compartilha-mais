package com.vortex_project.vortex_project.service;

import com.vortex_project.vortex_project.database.DBConnection;
import com.vortex_project.vortex_project.domain.LoginDTO;
import com.vortex_project.vortex_project.domain.User;
import com.vortex_project.vortex_project.domain.UserDTO;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class UserService{
    @Autowired
    private DBConnection dbConnection;

    public List<UserDTO> listUsers(){
        List<UserDTO> users = new ArrayList<>();
        String sql = "SELECT id, name, email, points FROM tb_user";
        try(Connection connection = dbConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)){
            ResultSet resultSet = statement.executeQuery();

            while(resultSet.next()){
                users.add(new UserDTO(resultSet.getLong("id") ,resultSet.getString("name"), resultSet.getString("email"), resultSet.getInt("points")));
            }

            return users;

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public UserDTO getUser(long id){
        String sql = "SELECT id, name, email, points FROM tb_user WHERE id = ?";
        try(Connection connection = dbConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)){
            statement.setLong(1, id);
            ResultSet resultSet = statement.executeQuery();
            if(resultSet.next()){
                return new UserDTO(resultSet.getLong("id"), resultSet.getString("name"), resultSet.getString("email"), resultSet.getInt("points"));
            }
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return new UserDTO();
    }

    public boolean addUser(User user){
        if(emailAlreadyExists(user.getEmail())){
           return false;
        }
        String sql = "INSERT INTO tb_user (email, password, name, points) VALUES (?,?,?,?)";
        try (Connection connection = dbConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)){
            statement.setString(1, user.getEmail());
                statement.setString(2, encryptPassword(user.getPassword()));
                statement.setString(3, user.getName());
                statement.setInt(4, user.getPoints());
                statement.executeUpdate();
                ResultSet resultSet = statement.getGeneratedKeys();
                if(resultSet.next()){
                    user.setId(resultSet.getLong(1));
                }
                rewardRefferer(user);
                return true;

            } catch (SQLException ex) {
            throw new RuntimeException(ex);
        }
    }

    public UserDTO verifyLogin(LoginDTO loginDTO){
        String sql = "SELECT id, name, email, password, points FROM tb_user WHERE email = ?";
        try(Connection connection = dbConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)){
            statement.setString(1, loginDTO.getEmail());
            ResultSet resultSet = statement.executeQuery();

            if(resultSet.next() && verifyPassword(loginDTO.getPassword(), resultSet.getString("password"))){
                return new UserDTO(resultSet.getLong("id"), resultSet.getString("name"), resultSet.getString("email"), resultSet.getInt("points"));
            }
            return new UserDTO();

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean emailAlreadyExists(String email){
        String sql = "SELECT name FROM tb_user WHERE email = ?";
        try(Connection connection = dbConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)) {
            statement.setString(1, email);
            ResultSet resultSet = statement.executeQuery();

            return resultSet.next();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    private String encryptPassword(String password){
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    private boolean verifyPassword(String password, String hash){
        return BCrypt.checkpw(password, hash);
    }

    public void rewardRefferer(User user){
        if(user.getReferrerId() == 0){
            return;
        }
        String sql = "UPDATE tb_user SET points = points + 1 WHERE id = ?";
        try(Connection connection = dbConnection.getConnection();
            PreparedStatement statement = connection.prepareStatement(sql)){

            statement.setLong(1, user.getReferrerId());
            statement.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}
