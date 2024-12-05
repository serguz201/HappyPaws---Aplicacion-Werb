package upc.edu.pe.happypawsbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "Users")
public class Users implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, length = 30)
    private String username;
    @Column(length = 200)
    private String password;

    private Boolean enabled;

    @Column(name = "Nombre",length = 40,nullable = false)
    private String Nombre;

    @Column(name = "Apellido",length = 40,nullable = false)
    private String Apellido;

    @Column(name = "Direccion",length = 80,nullable = false)
    private String Direccion;

    @Column(name = "Telefono",length = 40,nullable = false)
    private String Telefono;

    @Column(name = "Email",length = 40,nullable = false)
    private String Email;

    @Column(name = "Genero",length = 40,nullable = false)
    private String Genero;

    @Column(name = "FechaRegistro",nullable = false)
    private LocalDate FechaRegistro;
    @JsonIgnore
    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    private List<Role> roles;


}
