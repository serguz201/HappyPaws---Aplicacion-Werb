package upc.edu.pe.happypawsbackend.controllers;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import upc.edu.pe.happypawsbackend.dtos.MascotaByAdopcionDTO;
import upc.edu.pe.happypawsbackend.dtos.MascotaByRazaDTO;
import upc.edu.pe.happypawsbackend.dtos.MascotaDTO;
import upc.edu.pe.happypawsbackend.entities.Mascota;
import upc.edu.pe.happypawsbackend.serviceinterfaces.IMascotaService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/mascotas")
public class MascotaController {
    @Autowired
    private IMascotaService mascotaService;

    @GetMapping
    //PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public List<MascotaDTO> listar() {
        return mascotaService.list().stream().map(x -> {
            ModelMapper m = new ModelMapper();
            return m.map(x, MascotaDTO.class);
        }).collect(Collectors.toList());
    }

    @PostMapping
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('ADMINISTRADOR')")
    public void insertar(@RequestBody MascotaDTO mascotaDTO) {
        ModelMapper m = new ModelMapper();
        Mascota mascota = m.map(mascotaDTO, Mascota.class);
        mascotaService.insert(mascota);
    }

    @PutMapping
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('ADMINISTRADOR')")
    public void modificar(@RequestBody MascotaDTO mascotaDTO) {
        ModelMapper m = new ModelMapper();
        Mascota mascota = m.map(mascotaDTO, Mascota.class);
        mascotaService.update(mascota);
    }

    @DeleteMapping("/{id}")
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('ADMINISTRADOR')")
    public void eliminar(@PathVariable("id") Integer id){
        mascotaService.delete(id);
    }

    @GetMapping("/buscarxestado")
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public List<MascotaDTO> noadoptados(@RequestParam("estado") boolean estado){
        return mascotaService.mascotasestado(estado).stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,MascotaDTO.class);
        }).collect(Collectors.toList());
    }
    @GetMapping("/buscarxraza")
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public List<MascotaDTO> buscarporraza(@RequestParam("raza") String raza){
        return mascotaService.mascotasrazas(raza).stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,MascotaDTO.class);
        }).collect(Collectors.toList());
    }
    @GetMapping("/buscarxsexo")
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public List<MascotaDTO> buscarporsexo(@RequestParam("sexo") String sexo){
        return mascotaService.mascotassexo(sexo).stream().map(x->{
            ModelMapper m = new ModelMapper();
            return m.map(x,MascotaDTO.class);
        }).collect(Collectors.toList());
    }

    @GetMapping("/mascotaxraza")
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public List<MascotaByRazaDTO> mascotaporraza(){
        List<String[]> lista = mascotaService.mascotaxraza();
        List<MascotaByRazaDTO> ListDTO = new ArrayList<>();
        for (String[] columna:lista) {
            MascotaByRazaDTO dto = new MascotaByRazaDTO();
            dto.setAlbergue(columna[0]);
            dto.setRaza(columna[1]);
            dto.setCount(Integer.parseInt(columna[2]));
            ListDTO.add(dto);
        }
        return ListDTO;
    }

    @GetMapping("/mascotaxadopcion")
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('CLIENTE') or hasAuthority('ADMINISTRADOR')")
    public List<MascotaByAdopcionDTO> mascotaporadopcion(){
        List<String[]> lista = mascotaService.mascotaxadopcion();
        List<MascotaByAdopcionDTO> ListDTO = new ArrayList<>();
        for (String[] columna:lista) {
            MascotaByAdopcionDTO dto = new MascotaByAdopcionDTO();
            dto.setNombreAlbergue(columna[0]);
            dto.setCount(Integer.parseInt(columna[1]));
            ListDTO.add(dto);
        }
        return ListDTO;
    }

    @GetMapping("/{id}")
    //@PreAuthorize("hasAuthority('ALBERGUE') or hasAuthority('ADMINISTRADOR')")
    public MascotaDTO listarId(@PathVariable("id") Integer id){
        ModelMapper m=new ModelMapper();
        MascotaDTO dto=m.map(mascotaService.listId(id),MascotaDTO.class);
        return dto;
    }
}
