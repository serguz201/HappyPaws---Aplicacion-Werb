package upc.edu.pe.happypawsbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import upc.edu.pe.happypawsbackend.entities.Role;

import java.util.List;

@Repository
public interface IRoleRepository extends JpaRepository<Role, Long> {
    @Query(value = "SELECT r.rol, COUNT(r.user_id) AS Cantidad_Usuarios" +
            " FROM Roles  r GROUP BY r.rol", nativeQuery = true)
    public List<String[]> countrol();
}
