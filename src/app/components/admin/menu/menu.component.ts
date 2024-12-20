import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

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