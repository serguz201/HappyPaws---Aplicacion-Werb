package upc.edu.pe.happypawsbackend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.happypawsbackend.entities.Comprobante;
import upc.edu.pe.happypawsbackend.repositories.IComprobanteRepository;
import upc.edu.pe.happypawsbackend.serviceinterfaces.IComprobanteService;

import java.util.List;

@Service
public class ComprobanteServiceImplement implements IComprobanteService {
    @Autowired
    private IComprobanteRepository comprobanteRepository;


    @Override
    public List<Comprobante> list() {
        return comprobanteRepository.findAll();
    }

    @Override
    public void insert(Comprobante comprobante) {
        comprobanteRepository.save(comprobante);
    }

    @Override
    public void update(Comprobante comprobante) {
        comprobanteRepository.save(comprobante);
    }

    @Override
    public void delete(int comprobanteId) {
        comprobanteRepository.deleteById(comprobanteId);
    }

    @Override
    public Comprobante listId(int id) {
        return comprobanteRepository.findById(id).orElse(new Comprobante());
    }
}
