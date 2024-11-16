
  import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})
export class UsuariosComponent implements OnInit{

  @ViewChild('menu') menu!: ElementRef;

  swvisible() {
    this.menu.nativeElement.classList.toggle("oculto");
    console.log("ocultado");
  }
  logout(){
    this.googleuser.logout();
    this.userService.clearUser();
    this.router.navigate([''])
  }

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
