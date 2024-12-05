package upc.edu.pe.happypawsbackend.serviceinterfaces;

import upc.edu.pe.happypawsbackend.entities.Comprobante;

import java.util.List;

public interface IComprobanteService {
    public List<Comprobante> list();
    public void insert(Comprobante comprobante);
    public void update(Comprobante comprobante);
    public void delete(int comprobanteId);
    public Comprobante listId(int id);
}
