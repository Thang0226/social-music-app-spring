package com.codegym.repository;

import com.codegym.model.Role;
import org.springframework.data.repository.CrudRepository;

public interface IRoleRepository extends CrudRepository<Role, Long> {
}
