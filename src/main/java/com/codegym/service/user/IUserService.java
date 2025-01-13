package com.codegym.service.user;

import com.codegym.model.User;
import com.codegym.service.IGenerateService;

public interface IUserService extends IGenerateService<User> {
    User findByUsername(String username);
}
