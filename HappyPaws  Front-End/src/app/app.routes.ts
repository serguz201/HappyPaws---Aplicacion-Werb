import { Routes } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { CreaeditauserComponent } from './components/users/creaeditauser/creaeditauser.component';
import { AlbergueComponent } from './components/albergue/albergue.component';
import { CreaeditaalbergueComponent } from './components/albergue/creaeditaalbergue/creaeditaalbergue.component';
import { CitaComponent } from './components/cita/cita.component';
import { CreaeditacitaComponent } from './components/cita/creaeditacita/creaeditacita.component';
import { ComentarioComponent } from './components/comentario/comentario.component';
import { CreaeditacomentarioComponent } from './components/comentario/creaeditacomentario/creaeditacomentario.component';
import { ComprobanteComponent } from './components/comprobante/comprobante.component';
import { CreaeditacomprobanteComponent } from './components/comprobante/creaeditacomprobante/creaeditacomprobante.component';
import { DonacionComponent } from './components/donacion/donacion.component';
import { MascotaComponent } from './components/mascota/mascota.component';
import { CreaeditamascotaComponent } from './components/mascota/creaeditamascota/creaeditamascota.component';
import { CreaeditanotificacionComponent } from './components/notificacion/creaeditanotificacion/creaeditanotificacion.component';
import { RoleComponent } from './components/role/role.component';
import { CreaeditaroleComponent } from './components/role/creaeditarole/creaeditarole.component';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { CreaeditadonacionComponent } from './components/donacion/creaeditadonacion/creaeditadonacion.component';
import { LoginComponent } from './components/login/login.component';
import { LandingpageHappyPawsComponent } from './components/landingpage-happy-paws/landingpage-happy-paws.component';
import { segGuard } from './guard/seguridad.guard';
import { HomeComponent } from './components/home/home.component';
import { RolebyuserComponent } from './components/role/rolebyuser/rolebyuser.component';
import { AlbergueByCountDTO } from './models/AlbergueByCountDTO';
import { AlberguebycountComponent } from './components/albergue/alberguebycount/alberguebycount.component';
import { MascotaByAdopcionDTO } from './models/MascotaByAdopcionDTO';
import { MascotabyadopcionComponent } from './components/mascota/mascotabyadopcion/mascotabyadopcion.component';
import { MascotabyrazaComponent } from './components/mascota/mascotabyraza/mascotabyraza.component';
import { DonacionbynameComponent } from './components/donacion/donacionbyname/donacionbyname.component';
import { AlbergueabiertoComponent } from './components/albergue/albergueabierto/albergueabierto.component';
import { DonacionesxmontosComponent } from './components/donacion/donacionesxmontos/donacionesxmontos.component';
import { UsersactivosComponent } from './components/users/usersactivos/usersactivos.component';
import { CitaspendientesComponent } from './components/cita/citaspendientes/citaspendientes.component';
import { NotficacionesxfechaComponent } from './components/notificacion/notficacionesxfecha/notficacionesxfecha.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'landing',
        component: LandingpageHappyPawsComponent,
    }, 

    {
        path:'usuarios', component:UsersComponent,
        children:[
            {
                path:'nuevo', component:CreaeditauserComponent
            },
            {
                path:'ediciones/:id', component:CreaeditauserComponent
            },
            {
                path:'activos', component:UsersactivosComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    {
        path:'albergues', component:AlbergueComponent,
        children:[
            {
                path:'nuevo', component:CreaeditaalbergueComponent
            },
            {
                path:'ediciones/:id', component:CreaeditaalbergueComponent
            },
            {
                path:'alberguexcantidad', component:AlberguebycountComponent
            }
            ,
            {
                path:'abiertoahora', component:AlbergueabiertoComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
    },
    {
        path:'citas', component:CitaComponent,
        children:[
            {
                path:'nuevo', component:CreaeditacitaComponent
            },
            {
                path:'ediciones/:id', component:CreaeditacitaComponent
            },
            {
                path:'buscarxpendiente', component:CitaspendientesComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada un
    },
    {
        path:'comentarios', component:ComentarioComponent,
        children:[
            {
                path:'nuevo', component:CreaeditacomentarioComponent
            },
            {
                path:'ediciones/:id', component:CreaeditacomentarioComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada un
    },
    {
        path:'comprobantes', component:ComprobanteComponent,
        children:[
            {
                path:'nuevo', component:CreaeditacomprobanteComponent
            },
            {
                path:'ediciones/:id', component:CreaeditacomprobanteComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada un
    },
    {
        path:'donaciones', component:DonacionComponent,
        children:[
            {
                path:'nuevo', component:CreaeditadonacionComponent
            },
            {
                path:'ediciones/:id', component:CreaeditadonacionComponent
            }
            ,
            {
                path:'donacionxnombre', component:DonacionbynameComponent
            },
            {
                path:'buscarxmonto', component:DonacionesxmontosComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada un
    },
    {
        path:'mascotas',  component:MascotaComponent,
        children:[
            {
                path:'nuevo', component:CreaeditamascotaComponent
            },
            {
                path:'ediciones/:id', component:CreaeditamascotaComponent
            }
            ,
            {
                path:'mascotaxraza', component:MascotabyrazaComponent
            }
            ,
            {
                path:'mascotaxadopcion', component:MascotabyadopcionComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada un
    },
    {
        path:'notificaciones', component:NotificacionComponent,
        children:[
            {
                path:'nuevo', component:CreaeditanotificacionComponent
            },
            {
                path:'ediciones/:id', component:CreaeditanotificacionComponent
            },
            {
                path:'notificacionxfecha', component:NotficacionesxfechaComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada un
    },
    {
        path:'roles',  component:RoleComponent,
        children:[
            {
                path:'nuevo', component:CreaeditaroleComponent
            },
            {
                path:'ediciones/:id', component:CreaeditaroleComponent
            },
            {
                path:'nuevo', component:CreaeditaroleComponent
            },
            {
                path:'rolxuser', component:RolebyuserComponent
            }
        ],
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada un
    },

    {
        path: 'homes',
        component: HomeComponent,
        canActivate: [segGuard], // solo construcciones, se debe agregar a cada uno
      },
];

