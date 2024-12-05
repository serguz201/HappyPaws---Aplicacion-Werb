package upc.edu.pe.happypawsbackend.dtos;

import lombok.Getter;
import lombok.Setter;
import upc.edu.pe.happypawsbackend.entities.Albergue;

@Getter
@Setter
public class ComentarioDTO {
    private int IdComentario;
    private String Comentario;
    private double Estrella;
    private Albergue albergue;
}
