import { Routes } from '@angular/router';
import { MainComponent } from './components/extras/main/main.component';
import { PerfilComponent } from './components/cliente/perfil/perfil.component';
import { TarifasComponent } from './components/admin/tarifas/tarifas.component';
import { ArriendosComponent } from './components/admin/arriendos/arriendos.component';
import { EspacioComponent } from './components/admin/espacio/espacio.component';
import { HorariosComponent } from './components/admin/horarios/horarios.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
import { MainAComponent } from './components/admin/main-a/main-a.component';
import { LoginComponent } from './components/extras/login/login.component';
import { MainCComponent } from './components/cliente/main-c/main-c.component';
import { PerfilCComponent } from './components/admin/perfil-c/perfil-c.component';
import { PerfilAComponent } from './components/admin/perfil-a/perfil-a.component';
import { HistorialComponent } from './components/cliente/historial/historial.component';
import { ReservasComponent } from './components/admin/reservas/reservas.component';
import { TicketsComponent } from './components/admin/tickets/tickets.component';

export const routes: Routes = [
    {
        path:"",
        component: MainComponent
    },
    {
        path:"cliente/perfil",
        component: PerfilComponent
    },
    {
        path:"admin/perfilCliente",
        component: PerfilCComponent
    },
    {
        path:"admin/perfil",
        component: PerfilAComponent
    },
    {
        path:"cliente/principal",
        component: MainCComponent
    },
    {
        path:"admin/tarifas",
        component: TarifasComponent
    },
    {
        path:"admin/arriendos",
        component: ArriendosComponent
    },
    {
        path:"admin/espacio",
        component: EspacioComponent
    },
    {
        path:"admin/horarios",
        component: HorariosComponent
    },
    {
        path:"admin/usuarios",
        component: UsuariosComponent
    },
    {
        path:"admin/principal",
        component: MainAComponent
    },
    {
        path:"login",
        component: LoginComponent
    },
    {
        path:"cliente/historial",
        component: HistorialComponent
    },
    {
        path:"admin/reservas",
        component: ReservasComponent
    },
    {
        path:"admin/tickets",
        component: TicketsComponent
    },
];
