import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, RouterLink, RouterOutlet],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

}
