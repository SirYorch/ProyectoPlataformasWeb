import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-a',
  standalone: true,
  imports: [],
  templateUrl: './main-a.component.html',
  styleUrl: './main-a.component.scss'
})
export class MainAComponent {
  
  @ViewChild('menu') menu!: ElementRef;

  swvisible() {
    this.menu.nativeElement.classList.toggle("oculto");
    console.log("ocultado");
  }
}
