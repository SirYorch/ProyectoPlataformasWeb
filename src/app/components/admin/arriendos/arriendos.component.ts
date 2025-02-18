import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
import { GoogleAuthService } from '../../../services/google-auth.service';
import { ReadService } from '../../../services/read.service';
import { Router } from '@angular/router';
import { UserInfoService } from '../../../services/user-info.service';
import { ArriendosService } from '../../../services/arriendos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "../menu/menu.component";
import { UsuarioService } from '../../../services/usuario.service';
import { ParqueaderoComponent } from "../../extras/parqueadero/parqueadero.component";
import { ReservaService } from '../../../services/reserva.service';
import { ConfirmDialogsComponent } from "../../extras/confirm-dialogs/confirm-dialogs.component";
import { PopUpsComponent } from "../../extras/pop-ups/pop-ups.component";
@Component({
  selector: 'app-arriendos',
  standalone: true,
  imports: [FormsModule, CommonModule, MenuComponent, ParqueaderoComponent, ConfirmDialogsComponent, PopUpsComponent],
  templateUrl: './arriendos.component.html',
  styleUrl: './arriendos.component.scss'
})
export class ArriendosComponent {
seleccionarPlaca(objeto:any ) {
  console.log(objeto)
this.nuevo.nombreUsuario = objeto.nombre
this.nuevo.uid = objeto.uid
}
  placasFiltradas: any;
  usuariosCompletos: any;

eliminarArriendo(uid: string) {
  this.ConfirmDialogsComponent.desplegarConfirmacion("Está seguro de querer eliminar el arriendo?",()=>{
    this.arriendosService.eliminarArriendo(uid).then(()=>{
      this.PopUpsComponent.desplegarSuccess("Se ha eliminado el arriendo")
    });
  })
}

nuevo:any = {
  inicio: new Date(),
  fin: new Date(),
  usuario_id: '',
  lugar_id: 2,
  placa: "",
  nombreUsuario: ''
} ;

nuevoArriendo:{
  fechaInicio:Date,
  fechaFin:Date,
}= {
  fechaInicio : new Date(),
  fechaFin : new Date(),
};
lugarid = 0;


@ViewChild(PopUpsComponent) PopUpsComponent!: PopUpsComponent;
@ViewChild(ConfirmDialogsComponent) ConfirmDialogsComponent!: ConfirmDialogsComponent;


crearArriendo() {
    const timestampIniciogl = this.crearTimestamp(this.nuevo.inicio);
    const timestampFingl = this.crearTimestamp(this.nuevo.fin);

    this.nuevoArriendo.fechaInicio = new Date(timestampIniciogl)
    this.nuevoArriendo.fechaFin = new Date(timestampFingl)

    const usuario = this.nuevo.uid;
    this.arriendosService.crearArriendo(usuario,this.lugarid,this.nuevoArriendo).then(
      ()=>{
        this.PopUpsComponent.desplegarSuccess("Se ha creado el arriendo correctamente")
        this.desplegarCrear();
      }
    );
}


  // Método para crear un timestamp a partir de una fecha base y una hora en formato "HH:mm"
  crearTimestamp(fechaBase: Date): number {
    const fecha = new Date(fechaBase); // Clonar la fecha base
    return fecha.getTime(); // Devolver el timestamp
  }
  @ViewChild('crear') crear!: ElementRef;
  arriendosProm: Promise<any> | undefined;
; // Lista de arriendos
  
  user: any;
  tipo: Promise<string> | undefined;

  constructor(
    private arriendosService: ArriendosService,
    private usuarioService: UsuarioService,
    private router: Router,
    private userService: UserInfoService
  ) {}


  @ViewChild('arrendar', { read: ElementRef }) arrendar!: ElementRef;
  @ViewChild('arrendar') arrendarComponent!: ParqueaderoComponent;


  seleccionarArrendar() {
    this.arrendar.nativeElement.classList.remove("parking-hidden");

    this.arrendarComponent.cambiarMensaje("Seleccione un lugar para arrendar");
    this.arrendarComponent.cambiarSeleccionArrendar(()=>{
      this.ocultarArrendar();
      this.lugarid = this.arrendarComponent.valorLugar
    });
  }
  ocultarArrendar(){
    this.arrendar.nativeElement.classList.add("parking-hidden");
  }

  

  usuarios:any;

  async ngOnInit(): Promise<void> {
    this.validarUsuario();
    
    
    this.usuarioService.obtenerUsuarios().subscribe(
      res=>{
        this.usuarios = [];
        this.usuariosCompletos = res
        for(let valor of res){
          if(valor.arriendo){
            this.usuarios.push(valor)
          }
        }
      }
      
    )
    
    //eliminar valores predeterminados de arriendos y cargar los arriendos desde el backend

    //agregar funcionalidad de CREAR arriendo

    //agregar funcionalidad de ELIMINAR arriendo    
  }

  filtrarPlacas(): void {
    const valor: string = this.nuevo.placa.trim().toLowerCase();
    this.placasFiltradas = []; // Limpiar la lista antes de comenzar
    if (valor.length > 0) {
      for (let cliente of this.usuariosCompletos) {
        if (cliente.placa.toLowerCase().includes(valor)) {
          const coso  = {
            placa: cliente.placa,
            nombre: cliente.nombre,
            uid: cliente.uid
          }
          this.placasFiltradas.push(coso);
        }
      }
    }
  
    // Buscar usuario exacto si la placa ingresada coincide completamente
    let usuarioEncontrado = null;
    for (let user of this.usuarios) {
      if (user.placa.toLowerCase() === valor) {
        usuarioEncontrado = user;
        break; // Detener el bucle al encontrar el usuario
      }
    }
  
    this.nuevo.nombreUsuario = usuarioEncontrado ? usuarioEncontrado.nombre : '';
  }
  

  

  validarUsuario(){

    this.user = this.userService.getUser();
    this.tipo = this.userService.validarUsuario(this.user).then(tipo => tipo ?? "ERROR");
    this.tipo?.then(tipoUsuario => {
      switch (tipoUsuario) {
      case 'ADMIN':
        break;
      case 'CLIENTE':
        this.router.navigate(['cliente/principal']);
        break;
      case 'ERROR':
      default:
        this.router.navigate(['/login']);
        break;
      }
    }).catch(error => {
      this.router.navigate(['/login']);
    });
  }


  // Mostrar/Ocultar el formulario de creación
  desplegarCrear() {
    this.crear.nativeElement.classList.toggle('desplegarCrear');
  }


  // Buscar información del usuario asociada a una placa
  // buscarUsuarioPorPlaca() {
  //   if (!this.nuevoArriendo.placa) {
  //     alert('Por favor, ingresa una placa válida.');
  //     return;
  //   }

  //   this.arriendosService.obtenerUsuarioPorPlaca(this.nuevoArriendo.placa).then((snapshot) => {
  //     if (!snapshot.empty) {
  //       const userDoc = snapshot.docs[0].data();
  //       this.nuevoArriendo.nombreUsuario = userDoc['nombre'] || '';
  //       alert(`Usuario encontrado: ${this.nuevoArriendo.nombreUsuario}`);
  //     } else {
  //       alert('No se encontró un usuario asociado a esta placa.');
  //       this.nuevoArriendo.nombreUsuario = '';
  //     }
  //   });
  // }

  // Crear o actualizar un arriendo
  // async crearArriendo() {
  //   const { placa, inicio, fin, estado, nombreUsuario } = this.nuevoArriendo;

  //   if (!placa || !inicio || !fin || !estado || !nombreUsuario) {
  //     alert('Por favor, completa todos los campos antes de guardar.');
  //     return;
  //   }

  //   try {
  //     await this.arriendosService.crearArriendoPorPlaca(placa, {
  //       inicio,
  //       fin,
  //       estado,
  //       nombreUsuario,
        
  //     });
  //     this.obtenerArriendos();
  //     this.desplegarCrear();
  //     alert('Arriendo creado exitosamente.');
  //   } catch (error) {
  //     console.error('Error al crear arriendo:', error);
  //   }
  // }

  // Eliminar un arriendo por placa
  // eliminarArriendo(placa: string) {
  //   this.arriendosService.eliminarArriendoPorPlaca(placa).then(() => {
  //     this.obtenerArriendos();
  //     alert('Arriendo eliminado exitosamente.');
  //   }).catch((error) => console.error('Error al eliminar arriendo:', error));
  // }

  // Obtener todos los arriendos
  obtenerArriendos() {

  }
  
}
