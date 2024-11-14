import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tarifas',
  standalone: true,
  imports: [],
  templateUrl: './tarifas.component.html',
  styleUrl: './tarifas.component.scss'
})
export class TarifasComponent {

  @ViewChild('menu') menu!: ElementRef;

  swvisible() {
    this.menu.nativeElement.classList.toggle("oculto");
    console.log("ocultado");
  }
}
