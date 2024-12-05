package upc.edu.pe.happypawsbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "Albergue")
public class Albergue {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int IdAlbergue;

    @Column(name = "NombreAlbergue", nullable = false, length = 30)
    private String NombreAlbergue;

    @Column(name = "DireccionAlbergue", nullable = false, length = 100)
    private String DireccionAlbergue;

    @Column(name = "TelefonoAlbergue", nullable = false, length = 30)
    private String TelefonoAlbergue;

    @Column(name = "EmailAlbergue", nullable = false, length = 100)
    private String EmailAlbergue;

    @Column(name = "CapacidadMaxima", nullable = false)
    private int CapacidadMaxima;

    @Column(name = "HoraApertura", nullable = false)
    private int HoraApertura;

    @Column(name = "HoraCierre", nullable = false)
    private int HoraCierre;

    @Column(name = "WebSite", nullable = false, length = 30)
    private String WebSite;

    @Column(name = "AcreditacionAlbergue", nullable = false, length = 50)
    private String AcreditacionAlbergue;
}
