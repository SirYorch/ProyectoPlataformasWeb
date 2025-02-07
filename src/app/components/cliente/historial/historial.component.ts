import { Component } from '@angular/core';
import { MenuComponent } from "../../admin/menu/menu.component";
import { MenuCComponent } from "../menu-c/menu-c.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [MenuComponent, MenuCComponent, CommonModule, FormsModule ],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {
  user: any;
  constructor(
    private router: Router,
    private userService: UserInfoService,
    private usuarioService: UsuarioService
  ) {}
  arriendos:{id: number,
    fecha: string,
    hora_entrada: string,
    hora_salida: string,
    precio: number,
    estado: string}[] =[
    {
      id: 1,
      fecha: "2021-07-01",
      hora_entrada: "08:00",
      hora_salida: "12:00",
      precio: 5000,
      estado: "Pagado"
    },
    {
      id: 2,
      fecha: "2021-07-02",
      hora_entrada: "08:00",
      hora_salida: "12:00",
      precio: 5000,
      estado: "Pagado"
    },
    {
      id: 3,
      fecha: "2021-07-03",
      hora_entrada: "08:00",
      hora_salida: "12:00",
      precio: 5000,
      estado: "Pagado"
    }  
  ]
  
}
