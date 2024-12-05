package upc.edu.pe.happypawsbackend.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Mascota")
public class Mascota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int IdMascota;

    @Column(name = "NombreMascota", nullable = false, length = 30)
    private String NombreMascota;

    @Column(name = "NacimientoMascota", nullable = false)
    private LocalDate NacimientoMascota;

    @Column(name = "RazaMascota", nullable = false, length = 30)
    private String RazaMascota;

    @Column(name = "SexoMascota", nullable = false, length = 30)
    private String SexoMascota;

    @Column(name = "EstadoMascota", nullable = false, length = 30)
    private String EstadoMascota;

    @Column(name = "FechaIngresoMascota", nullable = false)
    private LocalDate FechaIngresoMascota;

    @Column(name = "EstadoAdopcio", nullable = false)
    private boolean EstadoAdopcion;

    @ManyToOne
    @JoinColumn(name = "IdAlbergue")
    private Albergue Albergue;
}
