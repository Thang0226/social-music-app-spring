package com.codegym.model;

import jakarta.persistence.*;
import lombok.Data;
//import org.springframework.security.core.GrantedAuthority;

@Entity
@Table(name = "role")
@Data

public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
}
