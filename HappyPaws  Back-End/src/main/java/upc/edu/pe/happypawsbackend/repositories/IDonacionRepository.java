package upc.edu.pe.happypawsbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.happypawsbackend.entities.Donacion;

import java.util.List;

@Repository
public interface IDonacionRepository extends JpaRepository<Donacion, Integer> {
    @Query(value = "SELECT * FROM public.donacion d WHERE d.id_usuario = :id", nativeQuery = true)
    public List<Donacion> findusuario(@Param("id") int id);

    @Query(value = "SELECT * FROM public.donacion d ORDER BY d.monto DESC", nativeQuery = true)
    public List<Donacion> findmontos();
    @Query(value = "SELECT u.nombre, u.apellido, SUM(d.monto) AS Monto_Total\n" +
            " FROM Donacion d JOIN Users u \n" +
            " ON d.id_usuario = u.id\n" +
            " GROUP BY u.nombre, u.apellido\n" +
            " ORDER BY Monto_Total DESC", nativeQuery = true)
    public List<String[]> donacionesxnombre();
}
