package upc.edu.pe.happypawsbackend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.happypawsbackend.dtos.ComprobanteDTO;
import upc.edu.pe.happypawsbackend.entities.Comprobante;
import upc.edu.pe.happypawsbackend.serviceinterfaces.IComprobanteService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/comprobantes")
public class ComprobanteController {
    @Autowired
    private IComprobanteService comprobanteService;

    @GetMapping
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public List<ComprobanteDTO>
    listar() {
        return comprobanteService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, ComprobanteDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    //@PreAuthorize("hasAuthority('CLIENTE') OR hasAuthority('ADMINISTRADOR')")
    public void insertar(@RequestBody ComprobanteDTO comprobanteDTO) {
        ModelMapper m = new ModelMapper();
        Comprobante comprobante = m.map(comprobanteDTO, Comprobante.class);
        comprobanteService.insert(comprobante);
    }
    @PutMapping
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public void modificar(@RequestBody ComprobanteDTO comprobanteDTO) {
        ModelMapper m = new ModelMapper();
        Comprobante comprobante = m.map(comprobanteDTO, Comprobante.class);
        comprobanteService.update(comprobante);
    }
    @DeleteMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public void eliminar(@PathVariable("id") Integer id){
        comprobanteService.delete(id);
    }


    @GetMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public ComprobanteDTO listarId(@PathVariable("id") Integer id){
        ModelMapper m=new ModelMapper();
        ComprobanteDTO dto=m.map(comprobanteService.listId(id),ComprobanteDTO.class);
        return dto;
    }
}
