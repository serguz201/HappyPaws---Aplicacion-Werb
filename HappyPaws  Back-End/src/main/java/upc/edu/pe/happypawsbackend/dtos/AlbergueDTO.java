package upc.edu.pe.happypawsbackend.dtos;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlbergueDTO {
    private int IdAlbergue;
    private String NombreAlbergue;
    private String DireccionAlbergue;
    private String TelefonoAlbergue;
    private String EmailAlbergue;
    private int CapacidadMaxima;
    private int HoraApertura;
    private int HoraCierre;
    private String WebSite;
    private String AcreditacionAlbergue;
}
