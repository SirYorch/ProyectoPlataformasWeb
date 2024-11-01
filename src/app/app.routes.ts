import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { InicioComponent } from './component/inicio/inicio.component';
import { TarifasComponent } from './component/admin/tarifas/tarifas.component';
import { PerfilComponent } from './component/cliente/perfil/perfil.component';

export const routes: Routes = [
    {
        path:"",
        component: InicioComponent
    },
    {
        path:"clientes",
        component: PerfilComponent
    },
    {
        path:"admins",
        component: TarifasComponent
    },
];
