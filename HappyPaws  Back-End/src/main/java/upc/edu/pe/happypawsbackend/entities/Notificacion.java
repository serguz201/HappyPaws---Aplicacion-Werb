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
@Table(name = "Notificacion")
public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int IdNotificacion;

    @Column(name = "Mensaje", nullable = false, length = 100)
    private String Mensaje;

    @Column(name = "IdEmisor", nullable = false)
    private int IdEmisor;

    @Column(name = "Tipo", nullable = false, length = 30)
    private String Tipo;

    @Column(name = "FechaEnvio", nullable = false)
    private LocalDate FechaEnvio;

    @ManyToOne
    @JoinColumn(name = "IdUsuario")
    private Users users;
}

