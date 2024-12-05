package upc.edu.pe.happypawsbackend.serviceinterfaces;

import upc.edu.pe.happypawsbackend.entities.Comentario;

import java.util.List;

public interface IComentarioService {
    public List<Comentario> list();
    public void insert(Comentario comentario);
    public void update(Comentario comentario);
    public void delete(int comentarioId);
    public List<Comentario> findname(String name);
    public Comentario listId(int id);
}
