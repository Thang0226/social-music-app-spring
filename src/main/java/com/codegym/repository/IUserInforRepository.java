package com.codegym.repository;

import com.codegym.model.UserInfor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserInforRepository extends JpaRepository<UserInfor, Long> {
}
