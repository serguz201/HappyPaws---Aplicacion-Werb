package upc.edu.pe.happypawsbackend.serviceimplements;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import upc.edu.pe.happypawsbackend.entities.Users;
import upc.edu.pe.happypawsbackend.repositories.IUsersRepository;
import upc.edu.pe.happypawsbackend.serviceinterfaces.IUsersService;

import java.util.List;

@Service
public class UsersServiceImplement implements IUsersService {
    @Autowired
    private IUsersRepository uR;

    @Override
    public List<Users> list() {
        return uR.findAll();
    }

    @Override
    public void insert(Users users) {
        uR.save(users);
    }

    @Override
    public Users listId(Long idUsuario) {
        return uR.findById(idUsuario).orElse(new Users());
    }

    @Override
    public void update(Users users) {
        uR.save(users);
    }

    @Override
    public void delete(Long idUsuario) {
        uR.deleteById(idUsuario);
    }

    @Override
    public List<Users> searchEmail(String email) {
        return uR.findEmail(email);
    }

    @Override
    public List<Users> findactivos() {
        return uR.findactivos();
    }

    @Override
    public Users findOneByUsername(String user) {
        return uR.findOneByUsername(user);
    }

    @Override
    public Long findByUsername(String username) {
        Users user = uR.findUsersByUsername(username);
        return user.getId();
    }

    @Override
    public Users listId(long id) {
        return uR.findById(id).orElse(new Users());
    }

}
