package upc.edu.pe.happypawsbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.happypawsbackend.entities.Cita;

import java.util.List;

@Repository
public interface ICitaRepository extends JpaRepository<Cita, Integer> {
    @Query(value = "SELECT * FROM public.cita c WHERE c.id_cita = :id", nativeQuery = true)
    public List<Cita> findid(@Param("id") int id);

    @Query(value = "SELECT * FROM public.cita c WHERE c.id_usuario = :id", nativeQuery = true)
    public List<Cita> findusuario(@Param("id") int id);

    @Query(value = "SELECT * FROM public.cita c WHERE c.id_albergue = :id", nativeQuery = true)
    public List<Cita> findalbergue(@Param("id") int id);

    @Query(value = "SELECT * FROM public.cita c WHERE UPPER(c.estado_cita) = 'PENDIENTE'", nativeQuery = true)
    public List<Cita> findpendiente();
}
