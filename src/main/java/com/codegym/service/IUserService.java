package com.codegym.service;

import com.codegym.model.User;

public interface IUserService extends IGenerateService<User> {
    User findByUsername(String username);
}
