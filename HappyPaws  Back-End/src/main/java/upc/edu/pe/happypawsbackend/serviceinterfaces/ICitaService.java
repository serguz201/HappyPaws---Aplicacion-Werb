package upc.edu.pe.happypawsbackend.serviceinterfaces;

import upc.edu.pe.happypawsbackend.entities.Cita;

import java.util.List;

public interface ICitaService {
    public List<Cita> list();
    public void insert(Cita cita);
    public void update(Cita cita);
    public void delete(int citaId);
    public List<Cita> findid(int id);
    public List<Cita> findusuario(int id);
    public List<Cita> findalbergue(int id);
    public List<Cita> findpendiente();
    public Cita listId(int id);
}
