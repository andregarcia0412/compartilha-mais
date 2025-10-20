package com.vortex_project.vortex_project.controller;

import com.vortex_project.vortex_project.domain.LoginDTO;
import com.vortex_project.vortex_project.domain.User;
import com.vortex_project.vortex_project.domain.UserDTO;
import com.vortex_project.vortex_project.service.UserService;
import jakarta.servlet.http.HttpSession;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public List<UserDTO> listUsers(){
        return userService.listUsers();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUser(@PathVariable("id") long id){
        UserDTO userDTO = userService.getUser(id);
        if(userDTO.getEmail() != null){
            return ResponseEntity.ok(userDTO);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getLoggedUser(HttpSession session){
        if(session.getAttribute("userId") == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Realize login"));
        }
        UserDTO userDTO = new UserDTO((long) session.getAttribute("userId"), (String) session.getAttribute("userName"), (String) session.getAttribute("userEmail"), (int) session.getAttribute("userPoints"));
        return ResponseEntity.ok(userDTO);
    }

    @PostMapping()
    public ResponseEntity<?> addUser(@RequestBody User body, HttpSession session){
        if (userService.addUser(body)){
            session.setAttribute("userId", body.getId());
            session.setAttribute("userName", body.getName());
            session.setAttribute("userEmail", body.getEmail());
            session.setAttribute("userPoints", body.getPoints());
            return ResponseEntity.ok(Map.of("message", "Usuário criado com sucesso"));
        }
        return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("error", "Email já cadastrado"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDTO loginDTO, HttpSession session){
        UserDTO userDTO = userService.verifyLogin(loginDTO);

        if(userDTO.getEmail() != null){
            session.setAttribute("userId", userDTO.getId());
            session.setAttribute("userName", userDTO.getName());
            session.setAttribute("userEmail", userDTO.getEmail());
            session.setAttribute("userPoints", userDTO.getPoints());

            return ResponseEntity.ok(userDTO);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("error", "Usuário ou senha incorretos"));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session){
        session.invalidate();
        return ResponseEntity.ok(Map.of("message", "Logout realizado"));
    }
}
