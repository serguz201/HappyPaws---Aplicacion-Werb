package upc.edu.pe.happypawsbackend.serviceinterfaces;

import upc.edu.pe.happypawsbackend.entities.Users;

import java.util.List;

public interface IUsersService {
    public List<Users> list();
    public void insert(Users users);
    public Users listId(Long idUsuario);
    public void update(Users users);
    public void delete(Long idUsuario);
    public List<Users> searchEmail(String email);
    public List<Users> findactivos();
    public Users findOneByUsername(String user);
    Long  findByUsername(String username);
    public Users listId(long id);
}
