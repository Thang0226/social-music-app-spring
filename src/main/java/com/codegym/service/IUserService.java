package com.codegym.service;

import com.codegym.model.User;

public interface IUserService extends IService<User> {
    User findByUsername(String username);
}
