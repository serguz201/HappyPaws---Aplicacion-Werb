package upc.edu.pe.happypawsbackend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.happypawsbackend.entities.Role;
import upc.edu.pe.happypawsbackend.repositories.IRoleRepository;
import upc.edu.pe.happypawsbackend.serviceinterfaces.IRoleService;

import java.util.List;

@Service
public class RoleServiceImplement implements IRoleService {
    @Autowired
    private IRoleRepository rR;

    @Override
    public List<Role> list() {
        return rR.findAll();
    }

    @Override
    public void insert(Role rol) {
        rR.save(rol);
    }

    @Override
    public Role listId(Long idRol) {
        return rR.findById(idRol).orElse(new Role());
    }

    @Override
    public void update(Role rol) {
        rR.save(rol);
    }

    @Override
    public void delete(Long idRol) {
        rR.deleteById(idRol);
    }

    @Override
    public List<String[]> countrol() {
        return rR.countrol();
    }
}
