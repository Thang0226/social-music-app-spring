package com.codegym.controller;

import com.codegym.config.jwt.JwtResponse;
import com.codegym.config.jwt.service.JwtService;
import com.codegym.model.DTO.user.UserDTO;
import com.codegym.model.User;
import com.codegym.model.UserInfor;
import com.codegym.service.IUserInforService;
import com.codegym.service.impl.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/music")
public class UserController {
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private UserService userService;
    @Autowired
    private IUserInforService userInforService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Authentication authentication
                = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtService.generateToken(authentication);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User currentUser = userService.findByUsername(user.getUsername());
        return ResponseEntity.ok(new JwtResponse(currentUser.getId(), jwt, userDetails.getUsername(), userDetails.getAuthorities()));
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDTO userDTO) {
        if (userValidated(userDTO)) {
            User user = new User();
            user.setUsername(userDTO.getUsername());
            String rawPassword = userDTO.getPassword();
            String password = (new BCryptPasswordEncoder(12)).encode(rawPassword);
            user.setPassword(password);
            userService.save(user);
            UserInfor userInfor = new UserInfor();
            userInfor.setFullName(userDTO.getFullName());
            userInfor.setEmail(userDTO.getEmail());
            userInfor.setPhoneNumber(userDTO.getPhoneNumber());
            userInfor.setUser(user);
            userInforService.save(userInfor);
            return ResponseEntity.ok().body("Sign up successful");
        } else {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    }

    private boolean userValidated(UserDTO userDTO) {
        String username = userDTO.getUsername();
        String password = userDTO.getPassword();
        String re_password = userDTO.getRe_password();
        if (!password.equals(re_password)) {
            return false;
        }
        User user = userService.findByUsername(username);
        return user == null;
    }
}
