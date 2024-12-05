package upc.edu.pe.happypawsbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import upc.edu.pe.happypawsbackend.entities.Mascota;

import java.util.List;

@Repository
public interface IMascotaRepository extends JpaRepository<Mascota, Integer> {
    @Query(value = "SELECT * FROM public.mascota m WHERE m.estado_adopcio = :estado", nativeQuery = true)
    public List<Mascota> findestado(@Param("estado") boolean estado);

    @Query(value = "SELECT * FROM public.mascota m WHERE m.raza_mascota = :raza", nativeQuery = true)
    public List<Mascota> findraza(@Param("raza") String raza);

    @Query(value = "SELECT * FROM public.mascota m WHERE m.sexo_mascota = :sexo", nativeQuery = true)
    public List<Mascota> findsexo(@Param("sexo") String sexo);

    @Query(value = "SELECT a.nombre_albergue, m.raza_mascota, COUNT(m.id_mascota) AS Cantidad\n" +
            " FROM Mascota m\n" +
            " JOIN Albergue a ON m.id_albergue = a.id_albergue\n" +
            " Where m.estado_adopcio = 'false'\n" +
            " GROUP BY a.nombre_albergue, m.raza_mascota", nativeQuery = true)
    public List<String[]> mascotaxraza();

    @Query(value = "SELECT a.nombre_albergue, COUNT(m.id_mascota) AS Mascotas_No_Adoptadas\n" +
            "FROM Mascota m JOIN Albergue a ON m.id_albergue = a.id_albergue\n" +
            "WHERE m.estado_adopcio = 'false' GROUP BY a.nombre_albergue", nativeQuery = true)
    public List<String[]> mascotaxadopcion();

}
