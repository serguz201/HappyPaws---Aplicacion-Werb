package upc.edu.pe.happypawsbackend.serviceinterfaces;

import upc.edu.pe.happypawsbackend.entities.Albergue;

import java.util.List;

public interface IAlbergueService {
    public List<Albergue> list();
    public void insert(Albergue albergue);
    public void update(Albergue albergue);
    public void delete(int albergueId);
    public List<Albergue> findalbergue(String albergueName);
    public List<Albergue> AbiertoAhora();
    public List<String[]> albergueporcantidad();
    public Albergue listId(int id);
}
