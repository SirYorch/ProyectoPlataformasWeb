import { Component } from '@angular/core';
import { MenuComponent } from "../../admin/menu/menu.component";
import { MenuCComponent } from "../menu-c/menu-c.component";

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [MenuComponent, MenuCComponent],
  templateUrl: './historial.component.html',
  styleUrl: './historial.component.scss'
})
export class HistorialComponent {

}
