
  import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../admin/menu/menu.component';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule,MenuComponent],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit{

  
  usuarios:any[] = [];

  constructor(private googleuser: GoogleAuthService,private read: ReadService,private router:Router,private userService: UserInfoService){

  }
  async ngOnInit(): Promise<void> {
    this.usuarios = await this.googleuser.getUsers();
    console.log(this.usuarios)
  }

  verUsuario(uid:string){
    this.userService.saveOtherUser(uid);
    this.router.navigate(['admin/perfilCliente']);
  }
}
