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
@Table(name = "Cita")
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int IdCita;

    @Column(name = "FechaCita", nullable = false)
    private LocalDate FechaCita;

    @Column(name = "HoraCita", nullable = false)
    private int HoraCita;

    @Column(name = "EstadoCita", nullable = false, length = 30)
    private String EstadoCita;

    @Column(name = "TipoCita", nullable = false, length = 30)
    private String TipoCita;

    @Column(name = "ComentarioCita", nullable = false, length = 30)
    private String ComentarioCita;

    @ManyToOne
    @JoinColumn(name = "IdAlbergue")
    private Albergue Albergue;

    @ManyToOne
    @JoinColumn(name = "IdUsuario")
    private Users users;
}
