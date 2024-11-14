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
];
