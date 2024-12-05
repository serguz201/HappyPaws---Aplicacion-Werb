package upc.edu.pe.happypawsbackend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.happypawsbackend.dtos.CitaDTO;
import upc.edu.pe.happypawsbackend.entities.Cita;
import upc.edu.pe.happypawsbackend.serviceinterfaces.ICitaService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/citas")
//@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') OR hasAuthority('ADMINISTRADOR')")
public class CitaController {
    @Autowired
    private ICitaService citaService;

    @GetMapping
    public List<CitaDTO> listar() {
        return citaService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, CitaDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    public void insertar(@RequestBody CitaDTO citaDTO) {
        ModelMapper m = new ModelMapper();
        Cita cita = m.map(citaDTO, Cita.class);
        citaService.insert(cita);
    }
    @PutMapping
    public void modificar(@RequestBody CitaDTO citaDTO) {
        ModelMapper m = new ModelMapper();
        Cita cita = m.map(citaDTO, Cita.class);
        citaService.update(cita);
    }
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable("id") Integer id){
        citaService.delete(id);
    }
    @GetMapping("/buscarxid")
    public List<CitaDTO> buscarporid(@RequestParam("id") Integer id){
        return citaService.findid(id).stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,CitaDTO.class);
        }).collect(Collectors.toList());
    }
    @GetMapping("/buscarxusuario")
    public List<CitaDTO> buscarporusuario(@RequestParam("id") Integer id){
        return citaService.findusuario(id).stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,CitaDTO.class);
        }).collect(Collectors.toList());
    }
    @GetMapping("/buscarxalbergue")
    public List<CitaDTO> buscarporalbergue(@RequestParam("id") Integer id){
        return citaService.findalbergue(id).stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,CitaDTO.class);
        }).collect(Collectors.toList());
    }
    @GetMapping("/buscarxpendiente")
    public List<CitaDTO> buscarporpendiente(){
        return citaService.findpendiente().stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,CitaDTO.class);
        }).collect(Collectors.toList());
    }
    @GetMapping("/{id}")
    public CitaDTO listarId(@PathVariable("id") Integer id){
        ModelMapper m=new ModelMapper();
        CitaDTO dto=m.map(citaService.listId(id),CitaDTO.class);
        return dto;
    }
}
