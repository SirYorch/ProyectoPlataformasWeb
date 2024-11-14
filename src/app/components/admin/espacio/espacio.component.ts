import { Component, ElementRef, ViewChild } from '@angular/core';

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
}
