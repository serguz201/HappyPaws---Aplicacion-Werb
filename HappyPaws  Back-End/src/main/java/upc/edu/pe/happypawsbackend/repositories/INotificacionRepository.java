package upc.edu.pe.happypawsbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.happypawsbackend.entities.Notificacion;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface INotificacionRepository extends JpaRepository<Notificacion, Integer> {
    @Query(value = "SELECT * FROM public.notificacion n WHERE n.id_emisor = :id", nativeQuery = true)
    public List<Notificacion> findemisor(@Param("id") int id);

    @Query(value = "SELECT * FROM public.notificacion n WHERE n.id_usuario = :id", nativeQuery = true)
    public List<Notificacion> findreceptor(@Param("id") int id);

    @Query(value = "SELECT u.nombre, u.apellido, COUNT(n.id_notificacion) AS Cantidad_Notificaciones\n" +
            " FROM Notificacion n JOIN Users u\n" +
            " ON n.id_usuario = u.id Where n.fecha_envio = :fecha \n" +
            " GROUP BY u.nombre, u.apellido\n" +
            "Order By Cantidad_Notificaciones DESC", nativeQuery = true)
    public List<String[]> notifiacionxfecha(@Param("fecha") LocalDate fecha);

}
