  import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-main-c',
  standalone: true,
  imports: [],
  templateUrl: './main-c.component.html',
  styleUrl: './main-c.component.scss'
})
export class MainCComponent {

  @ViewChild('menu') menu!: ElementRef;

  swvisible() {
    this.menu.nativeElement.classList.toggle("oculto");
    console.log("ocultado");
  }
}
