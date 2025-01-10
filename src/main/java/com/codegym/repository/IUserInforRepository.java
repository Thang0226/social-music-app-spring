package com.codegym.repository;

import com.codegym.model.Song;
import com.codegym.model.User;
import com.codegym.model.UserInfor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserInforRepository extends JpaRepository<UserInfor, Long> {
    Optional<UserInfor> findByUser(User user);
}
