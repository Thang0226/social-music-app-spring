package com.codegym.service.user;

import com.codegym.model.User;
import com.codegym.model.UserInfor;
import com.codegym.service.IGenerateService;

import java.util.Optional;

public interface IUserInforService extends IGenerateService<UserInfor> {
    Optional<UserInfor> findByUser(User user);
}
