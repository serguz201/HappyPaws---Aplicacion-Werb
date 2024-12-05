package upc.edu.pe.happypawsbackend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.happypawsbackend.dtos.ComentarioDTO;
import upc.edu.pe.happypawsbackend.entities.Comentario;
import upc.edu.pe.happypawsbackend.serviceinterfaces.IComentarioService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comentarios")
public class ComentarioController {
    @Autowired
    private IComentarioService comentarioService;

    @GetMapping
    //@PreAuthorize("hasAuthority('ALBERGUE') OR hasAuthority('ADMINISTRADOR')")
    public List<ComentarioDTO> listar() {
        return comentarioService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, ComentarioDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    //@PreAuthorize("hasAuthority('CLIENTE') OR hasAuthority('ADMINISTRADOR')")
    public void insertar(@RequestBody ComentarioDTO comentarioDTO) {
        ModelMapper m = new ModelMapper();
        Comentario comentario = m.map(comentarioDTO, Comentario.class);
        comentarioService.insert(comentario);
    }
    @PutMapping
    //@PreAuthorize("hasAuthority('CLIENTE') OR hasAuthority('ADMINISTRADOR')")
    public void modificar(@RequestBody ComentarioDTO comentarioDTO) {
        ModelMapper m = new ModelMapper();
        Comentario comentario = m.map(comentarioDTO, Comentario.class);
        comentarioService.update(comentario);
    }
    @DeleteMapping("/{id}")
    //@PreAuthorize("hasAuthority('CLIENTE') OR hasAuthority('ADMINISTRADOR')")
    public void eliminar(@PathVariable("id") Integer id){
        comentarioService.delete(id);
    }

    @GetMapping("/buscarxnombre")
    //@PreAuthorize("hasAuthority('CLIENTE') OR hasAuthority('ADMINISTRADOR')")
    public List<ComentarioDTO> recuperar(@RequestParam("name") String name){
        return comentarioService.findname(name).stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,ComentarioDTO.class);
        }).collect(Collectors.toList());
    }


    @GetMapping("/{id}")
    //@PreAuthorize("hasAuthority('CLIENTE') OR hasAuthority('ADMINISTRADOR')")
    public ComentarioDTO listarId(@PathVariable("id") Integer id){
        ModelMapper m=new ModelMapper();
        ComentarioDTO dto=m.map(comentarioService.listId(id),ComentarioDTO.class);
        return dto;
    }
}
