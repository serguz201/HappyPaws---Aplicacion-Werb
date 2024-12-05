package upc.edu.pe.happypawsbackend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.happypawsbackend.dtos.RolByUserDTO;
import upc.edu.pe.happypawsbackend.dtos.RoleDTO;
import upc.edu.pe.happypawsbackend.entities.Role;
import upc.edu.pe.happypawsbackend.serviceinterfaces.IRoleService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/roles")

public class RolController {
    @Autowired
    private IRoleService roleService;

    @GetMapping
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public List<RoleDTO> listar() {
        return roleService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, RoleDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public void insertar(@RequestBody RoleDTO roledto) {
        ModelMapper m = new ModelMapper();
        Role role = m.map(roledto, Role.class);
        roleService.insert(role);
    }
    @PutMapping
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public void modificar(@RequestBody RoleDTO roledto) {
        ModelMapper m = new ModelMapper();
        Role role = m.map(roledto, Role.class);
        roleService.update(role);
    }

    @DeleteMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public void eliminar(@PathVariable("id") Long id){
        roleService.delete(id);
    }

    @GetMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public RoleDTO listarId(@PathVariable("id") Long id){
        ModelMapper m=new ModelMapper();
        RoleDTO dto=m.map(roleService.listId(id),RoleDTO.class);
        return dto;
    }

    @GetMapping("/rolxuser")
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public List<RolByUserDTO> rolporuser(){
        List<String[]> lista = roleService.countrol();
        List<RolByUserDTO> ListDTO = new ArrayList<>();
        for (String[] columna:lista) {
            RolByUserDTO dto = new RolByUserDTO();
            dto.setNombreRol(columna[0]);
            dto.setCount(Integer.parseInt(columna[1]));
            ListDTO.add(dto);
        }
        return ListDTO;
    }
}
