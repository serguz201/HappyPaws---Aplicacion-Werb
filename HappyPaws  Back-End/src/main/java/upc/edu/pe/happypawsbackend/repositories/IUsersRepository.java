package upc.edu.pe.happypawsbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import upc.edu.pe.happypawsbackend.entities.Users;

import java.util.List;

@Repository
public interface IUsersRepository extends JpaRepository<Users, Long> {

    //INSERTAR ROLES
    @Transactional
    @Modifying
    @Query(value = "insert into roles (rol, user_id) VALUES (:rol, :user_id)", nativeQuery = true)
    public void insRol(@Param("rol") String authority, @Param("user_id") Long user_id);

    public Users findOneByUsername(String username);

    public Users findUsersByUsername(String username);

    @Query(value = "Select * from public.users u where u.Email = :email", nativeQuery = true)
    public List<Users> findEmail(@Param("email") String email);

    @Query(value = "Select * from public.users u where u.enabled = 'true'", nativeQuery = true)
    public List<Users> findactivos();

}
