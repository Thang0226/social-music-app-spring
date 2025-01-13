package com.codegym.repository;


import com.codegym.model.Singer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface ISingerRepository extends JpaRepository<Singer, Long> {
    @Query("SELECT s FROM Singer s ORDER BY s.id DESC")
    List<Singer> findNewSingers();

    Optional<Singer> findBySingerName(String singerName);
}
