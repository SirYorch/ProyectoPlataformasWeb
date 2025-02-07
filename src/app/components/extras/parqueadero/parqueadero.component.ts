import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-parqueadero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './parqueadero.component.html',
  styleUrl: './parqueadero.component.scss'
})
export class ParqueaderoComponent {
  mensaje = "";
  oculto= false;
  seleccionOcupar = false;
  seleccionReservar = false;

  funcion: () => void = () => {
    console.log("Ejecutando función...");
  };


  cambiarVisibilidad(){
    this.oculto = !this.oculto;
  }
  cambiarSeleccionOcupar( metodo: () => void){
    this.seleccionOcupar = true;
    this.funcion = metodo;
  }
  cambiarSeleccionReservar( metodo: () => void){
    this.seleccionReservar = true;
    this.funcion = metodo;
  }
  cambiarMensaje(mensaje:string){
    this.mensaje = mensaje;
  }

  ocupar(lugar: any, fila: any): void {
    console.log("Lugar seleccionado:", lugar);
    this.funcion();
  }
  reservar(lugar: any, fila: any): void {
    console.log("Lugar seleccionado:", lugar);
    this.funcion();
  }

  lugares: {
    id: number,
    posicion: string,
    estado: string,
  }[][] = [
    [
      { "id": 1, "posicion": "A1", "estado": "ocupado" },
      { "id": 2, "posicion": "A2", "estado": "ocupado" },
      { "id": 3, "posicion": "A3", "estado": "reservado" },
      { "id": 4, "posicion": "A4", "estado": "ocupado" },
      { "id": 5, "posicion": "A5", "estado": "ocupado" },
      { "id": 6, "posicion": "A6", "estado": "ocupado" },
      { "id": 7, "posicion": "A7", "estado": "reservado" },
      { "id": 8, "posicion": "A8", "estado": "reservado" }
    ],
    [
      { "id": 9, "posicion": "B1", "estado": "disponible" },
      { "id": 10, "posicion": "B2", "estado": "ocupado" },
      { "id": 11, "posicion": "B3", "estado": "ocupado" },
      { "id": 12, "posicion": "B4", "estado": "reservado" },
      { "id": 13, "posicion": "B5", "estado": "disponible" },
      { "id": 14, "posicion": "B6", "estado": "ocupado" },
      { "id": 15, "posicion": "B7", "estado": "disponible" },
      { "id": 16, "posicion": "B8", "estado": "reservado" }
    ],
    [
      { "id": 17, "posicion": "C1", "estado": "ocupado" },
      { "id": 18, "posicion": "C2", "estado": "reservado" },
      { "id": 19, "posicion": "C3", "estado": "reservado" },
      { "id": 20, "posicion": "C4", "estado": "reservado" },
      { "id": 21, "posicion": "C5", "estado": "disponible" },
      { "id": 22, "posicion": "C6", "estado": "reservado" },
      { "id": 23, "posicion": "C7", "estado": "ocupado" },
      { "id": 24, "posicion": "C8", "estado": "disponible" }
    ],
    [
      { "id": 25, "posicion": "D1", "estado": "disponible" },
      { "id": 26, "posicion": "D2", "estado": "reservado" },
      { "id": 27, "posicion": "D3", "estado": "disponible" },
      { "id": 28, "posicion": "D4", "estado": "disponible" },
      { "id": 29, "posicion": "D5", "estado": "ocupado" },
      { "id": 30, "posicion": "D6", "estado": "reservado" },
      { "id": 31, "posicion": "D7", "estado": "disponible" },
      { "id": 32, "posicion": "D8", "estado": "reservado" }
    ],
    [
      { "id": 33, "posicion": "E1", "estado": "disponible" },
      { "id": 34, "posicion": "E2", "estado": "ocupado" },
      { "id": 35, "posicion": "E3", "estado": "ocupado" },
      { "id": 36, "posicion": "E4", "estado": "reservado" },
      { "id": 37, "posicion": "E5", "estado": "reservado" },
      { "id": 38, "posicion": "E6", "estado": "disponible" },
      { "id": 39, "posicion": "E7", "estado": "ocupado" },
      { "id": 40, "posicion": "E8", "estado": "ocupado" }
    ]
  ]

}
