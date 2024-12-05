package upc.edu.pe.happypawsbackend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.happypawsbackend.dtos.UsersDTO;
import upc.edu.pe.happypawsbackend.entities.Users;
import upc.edu.pe.happypawsbackend.serviceinterfaces.IUsersService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private IUsersService usersService;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public List<UsersDTO> listar() {
        return usersService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, UsersDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') OR hasAuthority('ADMINISTRADOR')")
    public void registrar(@RequestBody UsersDTO usuariodto) {
        ModelMapper m = new ModelMapper();
        Users u = m.map(usuariodto, Users.class);
        String encodedPassword = passwordEncoder.encode(u.getPassword());
        u.setPassword(encodedPassword);
        usersService.insert(u);
    }
    @PutMapping
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') OR hasAuthority('ADMINISTRADOR')")
    public void modificar(@RequestBody UsersDTO usuariodto) {
        ModelMapper m = new ModelMapper();
        Users user = m.map(usuariodto, Users.class);
        usersService.update(user);
    }
    @DeleteMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public void eliminar(@PathVariable("id") Long id){
        usersService.delete(id);
    }

    @GetMapping("/recuperar")
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') OR hasAuthority('ADMINISTRADOR')")
    public List<UsersDTO> recuperar(@RequestParam("email") String email){
        return usersService.searchEmail(email).stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,UsersDTO.class);
        }).collect(Collectors.toList());
    }
    @GetMapping("/activos")
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public List<UsersDTO> activos(){
        return usersService.findactivos().stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,UsersDTO.class);
        }).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public UsersDTO listarId(@PathVariable("id") Integer id){
        ModelMapper m=new ModelMapper();
        UsersDTO dto=m.map(usersService.listId(id),UsersDTO.class);
        return dto;
    }
}
