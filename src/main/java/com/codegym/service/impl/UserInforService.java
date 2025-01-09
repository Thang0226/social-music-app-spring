package com.codegym.service.impl;

import com.codegym.model.UserInfor;
import com.codegym.repository.IUserInforRepository;
import com.codegym.repository.IUserRepository;
import com.codegym.service.IUserInforService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserInforService implements IUserInforService {
    @Autowired
    private IUserInforRepository userInforRepository;

    @Override
    public Iterable<UserInfor> findAll() {
        return userInforRepository.findAll();
    }

    @Override
    public Optional<UserInfor> findById(Long id) {
        return userInforRepository.findById(id);
    }

    @Override
    public void save(UserInfor object) {
        userInforRepository.save(object);
    }

    @Override
    public void deleteById(Long id) {
        userInforRepository.deleteById(id);
    }
}
