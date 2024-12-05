package upc.edu.pe.happypawsbackend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import upc.edu.pe.happypawsbackend.entities.Comprobante;

@Repository
public interface IComprobanteRepository extends JpaRepository<Comprobante, Integer> {
}
