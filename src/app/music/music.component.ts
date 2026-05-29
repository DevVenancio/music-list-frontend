import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-music',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.css']
})
export class MusicComponent {

}
