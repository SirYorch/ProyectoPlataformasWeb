import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-principal-a',
  standalone: true,
  imports: [],
  templateUrl: './principal-a.component.html',
  styleUrl: './principal-a.component.css'
})
export class PrincipalAComponent {
  @ViewChild('menu') menu!: ElementRef;

  swvisible() {
    this.menu.nativeElement.classList.toggle("oculto");
    console.log("ocultado");
  }
}
