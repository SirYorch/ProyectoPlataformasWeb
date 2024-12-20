import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-menu-c',
  standalone: true,
  imports: [],
  templateUrl: './menu-c.component.html',
  styleUrl: './menu-c.component.scss'
})
export class MenuCComponent {



  @ViewChild('menu') menu!: ElementRef;
  googleuser: any;
  userService: any;
  router: any;

  swvisible() {
    this.menu.nativeElement.classList.toggle("oculto");
  }

  
  logout(){
    this.googleuser.logout();
    this.userService.clearUser();
    this.router.navigate([''])
  }


}
