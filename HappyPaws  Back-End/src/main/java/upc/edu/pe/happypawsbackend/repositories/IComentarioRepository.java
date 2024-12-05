package upc.edu.pe.happypawsbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.happypawsbackend.entities.Comentario;

import java.util.List;

@Repository
public interface IComentarioRepository extends JpaRepository<Comentario, Integer> {
    @Query(value = "SELECT c.* FROM public.comentario c\n" +
            " Join albergue a on a.id_albergue = c.id_albergue\n" +
            " WHERE a.nombre_albergue like %:nombre%", nativeQuery = true)
    public List<Comentario> findalbergue(@Param("nombre") String nombre);
}
