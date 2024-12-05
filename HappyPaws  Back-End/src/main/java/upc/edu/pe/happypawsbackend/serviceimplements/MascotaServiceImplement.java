package upc.edu.pe.happypawsbackend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.happypawsbackend.entities.Mascota;
import upc.edu.pe.happypawsbackend.repositories.IMascotaRepository;
import upc.edu.pe.happypawsbackend.serviceinterfaces.IMascotaService;

import java.util.List;

@Service
public class MascotaServiceImplement implements IMascotaService {
    @Autowired
    private IMascotaRepository mascotaRepository;


    @Override
    public List<Mascota> list() {
        return mascotaRepository.findAll();
    }

    @Override
    public void insert(Mascota mascota) {
        mascotaRepository.save(mascota);
    }

    @Override
    public void update(Mascota mascota) {
        mascotaRepository.save(mascota);
    }

    @Override
    public void delete(int mascotaId) {
        mascotaRepository.deleteById(mascotaId);
    }

    @Override
    public List<Mascota> mascotasestado(boolean estado) {
        return mascotaRepository.findestado(estado);
    }

    @Override
    public List<Mascota> mascotasrazas(String raza) {
        return mascotaRepository.findraza(raza);
    }

    @Override
    public List<Mascota> mascotassexo(String sexo) {
        return mascotaRepository.findsexo(sexo);
    }

    @Override
    public List<String[]> mascotaxraza() {
        return mascotaRepository.mascotaxraza();
    }

    @Override
    public List<String[]> mascotaxadopcion() {
        return mascotaRepository.mascotaxadopcion();
    }

    @Override
    public Mascota listId(int id) {
        return mascotaRepository.findById(id).orElse(new Mascota());
    }
}
