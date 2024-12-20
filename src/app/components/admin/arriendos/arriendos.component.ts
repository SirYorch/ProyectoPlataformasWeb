import { Component, ElementRef, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { ArriendosService } from '../../../services/arriendos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "../menu/menu.component";
@Component({
  selector: 'app-arriendos',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuComponent],
  templateUrl: './arriendos.component.html',
  styleUrl: './arriendos.component.scss'
})
export class ArriendosComponent {
  @ViewChild('crear') crear!: ElementRef;

  arriendos: any[] = []; // Lista de arriendos
  nuevoArriendo = { placa: '', inicio: '', fin: '', estado: 'Pendiente', nombreUsuario: '' };

  constructor(
    private arriendosService: ArriendosService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerArriendos();
  }

  // Mostrar/Ocultar el formulario de creación
  desplegarCrear() {
    this.crear.nativeElement.classList.toggle('desplegarCrear');
  }


  // Buscar información del usuario asociada a una placa
  buscarUsuarioPorPlaca() {
    if (!this.nuevoArriendo.placa) {
      alert('Por favor, ingresa una placa válida.');
      return;
    }

    this.arriendosService.obtenerUsuarioPorPlaca(this.nuevoArriendo.placa).then((snapshot) => {
      if (!snapshot.empty) {
        const userDoc = snapshot.docs[0].data();
        this.nuevoArriendo.nombreUsuario = userDoc['nombre'] || '';
        alert(`Usuario encontrado: ${this.nuevoArriendo.nombreUsuario}`);
      } else {
        alert('No se encontró un usuario asociado a esta placa.');
        this.nuevoArriendo.nombreUsuario = '';
      }
    });
  }

  // Crear o actualizar un arriendo
  async crearArriendo() {
    const { placa, inicio, fin, estado, nombreUsuario } = this.nuevoArriendo;

    if (!placa || !inicio || !fin || !estado || !nombreUsuario) {
      alert('Por favor, completa todos los campos antes de guardar.');
      return;
    }

    try {
      await this.arriendosService.crearArriendoPorPlaca(placa, {
        inicio,
        fin,
        estado,
        nombreUsuario,
        
      });
      this.obtenerArriendos();
      this.desplegarCrear();
      alert('Arriendo creado exitosamente.');
    } catch (error) {
      console.error('Error al crear arriendo:', error);
    }
  }

  // Eliminar un arriendo por placa
  eliminarArriendo(placa: string) {
    this.arriendosService.eliminarArriendoPorPlaca(placa).then(() => {
      this.obtenerArriendos();
      alert('Arriendo eliminado exitosamente.');
    }).catch((error) => console.error('Error al eliminar arriendo:', error));
  }

  // Obtener todos los arriendos
  obtenerArriendos() {
    this.arriendosService.obtenerTodosLosArriendos().then((snapshot) => {
      this.arriendos = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          placa: doc.id, // Asumimos que la placa es el ID del documento
          inicio: data['inicio'].toDate ? data['inicio'].toDate().toLocaleDateString() : data['inicio'],
          fin: data['fin'].toDate ? data['fin'].toDate().toLocaleDateString() : data['fin'],
          estado: data['estado'] || 'Pendiente',
          nombreUsuario: data['nombreUsuario'] || '',
          
        };
      });
      console.log(this.arriendos); // Verifica los datos procesados
    }).catch((error) => {
      console.error('Error al obtener arriendos:', error);
    });
  }
  
}
