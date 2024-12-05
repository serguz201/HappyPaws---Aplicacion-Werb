package upc.edu.pe.happypawsbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.happypawsbackend.entities.Albergue;

import java.util.List;

@Repository
public interface IAlbergueRepository extends JpaRepository<Albergue, Integer> {
    @Query(value = "SELECT a.* FROM albergue a WHERE a.nombre_albergue like %:nombre%", nativeQuery = true)
    public List<Albergue> findname(@Param("nombre") String nombre);

    @Query(value = "SELECT * FROM Albergue\n" +
            "WHERE EXTRACT(HOUR FROM NOW()) BETWEEN hora_apertura AND hora_cierre", nativeQuery = true)
    public List<Albergue> AbiertoAhora();

    @Query(value = "SELECT a.nombre_albergue, a.capacidad_maxima\n" +
            " FROM Albergue a JOIN Mascota m \n" +
            " ON m.id_albergue = a.id_albergue\n" +
            " GROUP BY a.nombre_albergue, a.capacidad_maxima\n" +
            " HAVING COUNT(m.id_mascota) <= a.capacidad_maxima;", nativeQuery = true)
    public List<String[]> albergueporcantidad();


}
