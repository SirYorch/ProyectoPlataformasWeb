import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { InicioComponent } from './component/inicio/inicio.component';
import { TarifasComponent } from './component/admin/tarifas/tarifas.component';
import { PerfilComponent } from './component/cliente/perfil/perfil.component';
import { PrincipalComponent } from './component/cliente/principal/principal.component';
import { ArriendosComponent } from './component/admin/arriendos/arriendos.component';
import { EspacioComponent } from './component/admin/espacio/espacio.component';
import { HorariosComponent } from './component/admin/horarios/horarios.component';
import { UsuariosComponent } from './component/admin/usuarios/usuarios.component';
import { PrincipalAComponent } from './component/admin/principal-a/principal-a.component';
import { LoginComponent } from './component/login/login.component';

export const routes: Routes = [
    {
        path:"",
        component: InicioComponent
    },
    {
        path:"cliente/perfil",
        component: PerfilComponent
    },
    {
        path:"cliente/principal",
        component: PrincipalComponent
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
        component: PrincipalAComponent
    },
    {
        path:"login",
        component: LoginComponent
    },
];
