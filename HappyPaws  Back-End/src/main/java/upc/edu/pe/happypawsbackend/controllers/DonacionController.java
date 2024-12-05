package upc.edu.pe.happypawsbackend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.happypawsbackend.dtos.DonacionByNameDTO;
import upc.edu.pe.happypawsbackend.dtos.DonacionDTO;
import upc.edu.pe.happypawsbackend.entities.Donacion;
import upc.edu.pe.happypawsbackend.serviceinterfaces.IDonacionService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/donaciones")
public class DonacionController {
    @Autowired
    private IDonacionService donacionService;

    @GetMapping
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public List<DonacionDTO> listar() {
        return donacionService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, DonacionDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    //@PreAuthorize("hasAuthority('CLIENTE') OR hasAuthority('ADMINISTRADOR')")
    public void insertar(@RequestBody DonacionDTO donacionDTO) {
        ModelMapper m = new ModelMapper();
        Donacion donacion = m.map(donacionDTO, Donacion.class);
        donacionService.insert(donacion);
    }
    @PutMapping
    //@PreAuthorize("hasAuthority('CLIENTE') OR hasAuthority('ADMINISTRADOR')")
    public void modificar(@RequestBody DonacionDTO donacionDTO) {
        ModelMapper m = new ModelMapper();
        Donacion donacion = m.map(donacionDTO, Donacion.class);
        donacionService.update(donacion);
    }
    @DeleteMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public void eliminar(@PathVariable("id") Integer id){
        donacionService.delete(id);
    }
    @GetMapping("/buscarxusuario")
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public List<DonacionDTO> buscarporusuario(@RequestParam("id") int id){
        return donacionService.findusuario(id).stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,DonacionDTO.class);
        }).collect(Collectors.toList());
    }
    @GetMapping("/buscarxmonto")
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public List<DonacionDTO> buscarpormonto(){
        return donacionService.findmontos().stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,DonacionDTO.class);
        }).collect(Collectors.toList());
    }

    @GetMapping("/donacionxnombre")
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public List<DonacionByNameDTO> donacionpornombre(){
        List<String[]> lista = donacionService.donacionesxnombre();
        List<DonacionByNameDTO> ListDTO = new ArrayList<>();
        for (String[] columna:lista) {
            DonacionByNameDTO dto = new DonacionByNameDTO();
            dto.setNombre(columna[0]);
            dto.setApellido(columna[1]);
            dto.setMontoTotal(Double.parseDouble(columna[2]));
            ListDTO.add(dto);
        }
        return ListDTO;
    }

    @GetMapping("/{id}")
    //@PreAuthorize("hasAuthority('ADMINISTRADOR')")
    public DonacionDTO listarId(@PathVariable("id") Integer id){
        ModelMapper m=new ModelMapper();
        DonacionDTO dto=m.map(donacionService.listId(id),DonacionDTO.class);
        return dto;
    }
}
