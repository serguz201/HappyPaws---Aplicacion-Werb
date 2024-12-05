package upc.edu.pe.happypawsbackend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.happypawsbackend.dtos.NotificacionByDateDTO;
import upc.edu.pe.happypawsbackend.dtos.NotificacionDTO;
import upc.edu.pe.happypawsbackend.entities.Notificacion;
import upc.edu.pe.happypawsbackend.serviceinterfaces.INotificacionService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/notificaciones")
public class NotificacionController {
    @Autowired
    private INotificacionService notificacionService;

    @GetMapping
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public List<NotificacionDTO> listar() {
        return notificacionService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, NotificacionDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public void insertar(@RequestBody NotificacionDTO notificacionDTO) {
        ModelMapper m = new ModelMapper();
        Notificacion notifiacion = m.map(notificacionDTO, Notificacion.class);
        notificacionService.insert(notifiacion);
    }
    @PutMapping
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public void modificar(@RequestBody NotificacionDTO notificacionDTO) {
        ModelMapper m = new ModelMapper();
        Notificacion notificacion = m.map(notificacionDTO, Notificacion.class);
        notificacionService.update(notificacion);
    }
    @DeleteMapping("/{id}")
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public void eliminar(@PathVariable("id") Integer id){
        notificacionService.delete(id);
    }
    @GetMapping("/buscarxemisor")
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public List<NotificacionDTO> buscarporemisor(@RequestParam("id") int id){
        return notificacionService.findemisor(id).stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,NotificacionDTO.class);
        }).collect(Collectors.toList());
    }
    @GetMapping("/buscarxrecepetor")
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public List<NotificacionDTO> buscarporreceptor(@RequestParam("id") int id){
        return notificacionService.findreceptor(id).stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,NotificacionDTO.class);
        }).collect(Collectors.toList());
    }

    @GetMapping("/notificacionxfecha/{fecha}")
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public List<NotificacionByDateDTO> notificacionporfecha(@PathVariable("fecha") LocalDate fecha){
        List<String[]> lista = notificacionService.notifiacionxfecha(fecha);
        List<NotificacionByDateDTO> ListDTO = new ArrayList<>();
        for (String[] columna:lista) {
            NotificacionByDateDTO dto = new NotificacionByDateDTO();
            dto.setNombre(columna[0]);
            dto.setApellido(columna[1]);
            dto.setCantidad(Integer.parseInt(columna[2]));
            ListDTO.add(dto);
        }
        return ListDTO;
    }

    @GetMapping("/{id}")
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public NotificacionDTO listarId(@PathVariable("id") Integer id){
        ModelMapper m=new ModelMapper();
        NotificacionDTO dto=m.map(notificacionService.listId(id),NotificacionDTO.class);
        return dto;
    }
}
