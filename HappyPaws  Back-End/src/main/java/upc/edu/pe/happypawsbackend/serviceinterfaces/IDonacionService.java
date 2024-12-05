package upc.edu.pe.happypawsbackend.serviceinterfaces;

import upc.edu.pe.happypawsbackend.entities.Donacion;

import java.util.List;

public interface IDonacionService {
    public List<Donacion> list();
    public void insert(Donacion donacion);
    public void update(Donacion donacion);
    public void delete(int donacionId);
    public List<Donacion> findusuario(int id);
    public List<Donacion> findmontos();
    public List<String[]> donacionesxnombre();
    public Donacion listId(int id);
}
