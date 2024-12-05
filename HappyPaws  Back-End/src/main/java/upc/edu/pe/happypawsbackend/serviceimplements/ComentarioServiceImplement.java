package upc.edu.pe.happypawsbackend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.happypawsbackend.entities.Comentario;
import upc.edu.pe.happypawsbackend.repositories.IComentarioRepository;
import upc.edu.pe.happypawsbackend.serviceinterfaces.IComentarioService;

import java.util.List;

@Service
public class ComentarioServiceImplement implements IComentarioService {
    @Autowired
    private IComentarioRepository comentarioRepository;


    @Override
    public List<Comentario> list() {
        return comentarioRepository.findAll();
    }

    @Override
    public void insert(Comentario comentario) {
        comentarioRepository.save(comentario);
    }

    @Override
    public void update(Comentario comentario) {
        comentarioRepository.save(comentario);
    }

    @Override
    public void delete(int comentarioId) {
        comentarioRepository.deleteById(comentarioId);
    }

    @Override
    public List<Comentario> findname(String name) {
        return comentarioRepository.findalbergue(name);
    }

    @Override
    public Comentario listId(int id) {
        return comentarioRepository.findById(id).orElse(new Comentario());
    }
}
