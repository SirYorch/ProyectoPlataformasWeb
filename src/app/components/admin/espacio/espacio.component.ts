import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-espacio',
  standalone: true,
  imports: [],
  templateUrl: './espacio.component.html',
  styleUrl: './espacio.component.scss'
})
export class EspacioComponent {
  
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

  constructor(private googleuser: GoogleAuthService,private read: ReadService,private router:Router,private userService: UserInfoService){

  }
}
