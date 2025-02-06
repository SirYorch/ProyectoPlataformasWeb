import { Component, ElementRef, ViewChild, viewChild } from '@angular/core';

@Component({
  selector: 'app-pop-ups',
  standalone: true,
  imports: [],
  templateUrl: './pop-ups.component.html',
  styleUrl: './pop-ups.component.scss'
})
export class PopUpsComponent {
  mensaje = "Mensaje de prueba para errores y exitos";

    @ViewChild('success') success!: ElementRef;
    @ViewChild('error') error!: ElementRef;
}
