package com.codegym.controller;

import com.codegym.config.jwt.JwtResponse;
import com.codegym.config.jwt.service.JwtService;
import com.codegym.model.DTO.user.AccountDTO;
import com.codegym.model.DTO.user.UserDTO;
import com.codegym.model.User;
import com.codegym.model.UserInfor;
import com.codegym.service.user.IUserInforService;
import com.codegym.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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
            return ResponseEntity.badRequest().body("Invalid username or passwords");
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
        if (user != null) {
            return false;
        }
        return true;
    }

    @PostMapping("/username")
    public ResponseEntity<?> checkUsername(@RequestBody String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid username");
        } else {
            return ResponseEntity.ok().body(username);
        }
    }

    @PostMapping("/update")
    public ResponseEntity<?> showUpdateForm(@RequestBody String username) {
        User user = userService.findByUsername(username);
        Optional<UserInfor> userInfor = userInforService.findByUser(user);
        UserDTO userDTO = new UserDTO();
        if (userInfor.isPresent()) {
            userDTO.setFullName(userInfor.get().getFullName());
            userDTO.setEmail(userInfor.get().getEmail());
            userDTO.setPhoneNumber(userInfor.get().getPhoneNumber());
            userDTO.setUsername(username);
            return ResponseEntity.ok(userDTO);
        } else {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    }

    @PutMapping("/update")
    public ResponseEntity<?> updateUserInfor(@RequestBody UserDTO userDTO) {
        User user = userService.findByUsername(userDTO.getUsername());
        Optional<UserInfor> userInforOptional = userInforService.findByUser(user);
        if (userInforOptional.isPresent()) {
            UserInfor userInfor = userInforOptional.get();
            userInfor.setFullName(userDTO.getFullName());
            userInfor.setEmail(userDTO.getEmail());
            userInfor.setPhoneNumber(userDTO.getPhoneNumber());
            userInforService.save(userInfor);
            return ResponseEntity.ok().body("Update successfully");
        } else {
            return ResponseEntity.badRequest().body("Invalid username or password");
        }
    }

    @PostMapping("/username4password")
    public ResponseEntity<?> showChangeForm(@RequestBody String username) {
        User user = userService.findByUsername(username);
        if (user == null) {
            return ResponseEntity.badRequest().body("Invalid username");
        } else {
            return ResponseEntity.ok().body(username);
        }
    }

    @PutMapping("/update4password")
    public ResponseEntity<?> changePassword(@RequestBody AccountDTO accountDTO) {
        return null;
    }
}
