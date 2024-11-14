import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-arriendos',
  standalone: true,
  imports: [],
  templateUrl: './arriendos.component.html',
  styleUrl: './arriendos.component.scss'
})
export class ArriendosComponent {
  @ViewChild('menu') menu!: ElementRef;

  swvisible() {
    this.menu.nativeElement.classList.toggle("oculto");
    console.log("ocultado");
  }
}
