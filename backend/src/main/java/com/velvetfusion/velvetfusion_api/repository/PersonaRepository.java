package com.velvetfusion.velvetfusion_api.repository;
import com.velvetfusion.velvetfusion_api.model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long> {
    List<Persona> findByArcana(String arcana);
    List<Persona> findByLevelGreaterThanEqual(int level);
    Optional<Persona> findByName(String name);
    Optional<Persona> findFirstByArcanaAndLevelGreaterThanEqualOrderByLevelAsc(String arcana, int level);
}
